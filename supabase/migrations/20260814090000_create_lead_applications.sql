create extension if not exists pgcrypto with schema extensions;

create table if not exists public.lead_applications (
  id uuid primary key,
  edit_token_hash bytea not null,
  payload jsonb not null default '{}'::jsonb check (jsonb_typeof(payload) = 'object'),
  current_step smallint not null default 0 check (current_step between 0 and 2),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  submitted_at timestamptz
);

comment on table public.lead_applications is
  'Rascunhos e candidaturas do formulário público do AI COWORK.';

alter table public.lead_applications enable row level security;

revoke all on table public.lead_applications from public, anon, authenticated;
grant select, insert, update, delete on table public.lead_applications to service_role;

create index if not exists lead_applications_submitted_at_idx
  on public.lead_applications (submitted_at desc nulls last);

create or replace function public.save_lead_application(
  p_id uuid,
  p_edit_token text,
  p_values jsonb,
  p_current_step integer,
  p_submit boolean default false
)
returns table (saved_at timestamptz, application_submitted boolean)
language plpgsql
security definer
set search_path = ''
as $$
declare
  allowed_keys constant text[] := array[
    'name',
    'whatsapp',
    'email',
    'role',
    'company',
    'capacity',
    'outcome',
    'time',
    'investment',
    'referral'
  ];
begin
  if p_id is null then
    raise exception 'application id is required' using errcode = '22023';
  end if;

  if p_edit_token is null or length(p_edit_token) < 32 or length(p_edit_token) > 128 then
    raise exception 'invalid edit token' using errcode = '22023';
  end if;

  if p_current_step is null or p_current_step not between 0 and 2 then
    raise exception 'invalid current step' using errcode = '22023';
  end if;

  if jsonb_typeof(coalesce(p_values, '{}'::jsonb)) <> 'object' then
    raise exception 'values must be a JSON object' using errcode = '22023';
  end if;

  p_values := coalesce(p_values, '{}'::jsonb);

  if (p_values - allowed_keys) <> '{}'::jsonb then
    raise exception 'unsupported form field' using errcode = '22023';
  end if;

  if pg_column_size(p_values) > 16384 then
    raise exception 'form payload is too large' using errcode = '22023';
  end if;

  insert into public.lead_applications (id, edit_token_hash, payload, current_step, submitted_at) values (
    p_id,
    extensions.digest(p_edit_token, 'sha256'),
    p_values,
    p_current_step,
    case when p_submit then now() else null end
  )
  on conflict (id) do update set
    payload = case
      when public.lead_applications.submitted_at is not null then public.lead_applications.payload
      else excluded.payload
    end,
    current_step = case
      when public.lead_applications.submitted_at is not null
        then public.lead_applications.current_step
      else excluded.current_step
    end,
    updated_at = case
      when public.lead_applications.submitted_at is not null then public.lead_applications.updated_at
      else now()
    end,
    submitted_at = case
      when public.lead_applications.submitted_at is not null then public.lead_applications.submitted_at
      when p_submit then now()
      else null
    end
  where public.lead_applications.edit_token_hash = extensions.digest(p_edit_token, 'sha256')
  returning public.lead_applications.updated_at, public.lead_applications.submitted_at is not null
    into saved_at, application_submitted;

  if not found then
    raise exception 'invalid resume token' using errcode = 'P0001';
  end if;

  return next;
end;
$$;

revoke execute on function public.save_lead_application(uuid, text, jsonb, integer, boolean) from public;
grant execute on function public.save_lead_application(uuid, text, jsonb, integer, boolean)
  to anon, authenticated, service_role;

notify pgrst, 'reload schema';
