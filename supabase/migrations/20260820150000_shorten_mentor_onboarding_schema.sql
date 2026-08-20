create or replace function public.save_mentor_onboarding(
  p_id uuid,
  p_edit_token text,
  p_values jsonb,
  p_current_step integer,
  p_submit boolean default false
)
returns table (saved_at timestamptz, onboarding_submitted boolean)
language plpgsql
security definer
set search_path = ''
as $$
declare
  allowed_keys constant text[] := array[
    'full_name',
    'current_work',
    'application_area',
    'main_result',
    'priority_process',
    'process_current_steps',
    'process_frequency_time',
    'process_bottlenecks',
    'process_consequences',
    'attempted_improvements',
    'ai_current_use',
    'ai_built_with',
    'ai_limit',
    'ai_level',
    'ai_barriers',
    'desired_ai_help',
    'desired_delivery',
    'success_indicators',
    'success_expected_result',
    'human_responsibility',
    'why_now',
    'process_tools_systems',
    'application_restrictions',
    'bring_example',
    'practice_time',
    'session_availability',
    'between_session_barriers',
    'automation_details',
    'asset_details',
    'general_problem'
  ];
begin
  if p_id is null then
    raise exception 'onboarding id is required' using errcode = '22023';
  end if;

  if p_edit_token is null or length(p_edit_token) < 32 or length(p_edit_token) > 128 then
    raise exception 'invalid edit token' using errcode = '22023';
  end if;

  if p_current_step is null or p_current_step not between 0 and 9 then
    raise exception 'invalid current step' using errcode = '22023';
  end if;

  if jsonb_typeof(coalesce(p_values, '{}'::jsonb)) <> 'object' then
    raise exception 'values must be a JSON object' using errcode = '22023';
  end if;

  p_values := coalesce(p_values, '{}'::jsonb);

  if (p_values - allowed_keys) <> '{}'::jsonb then
    raise exception 'unsupported onboarding field' using errcode = '22023';
  end if;

  if pg_column_size(p_values) > 131072 then
    raise exception 'onboarding payload is too large' using errcode = '22023';
  end if;

  insert into public.mentor_onboardings (id, edit_token_hash, payload, current_step, submitted_at) values (
    p_id,
    extensions.digest(p_edit_token, 'sha256'),
    p_values,
    p_current_step,
    case when p_submit then now() else null end
  )
  on conflict (id) do update set
    payload = case
      when public.mentor_onboardings.submitted_at is not null then public.mentor_onboardings.payload
      else excluded.payload
    end,
    current_step = case
      when public.mentor_onboardings.submitted_at is not null
        then public.mentor_onboardings.current_step
      else excluded.current_step
    end,
    updated_at = case
      when public.mentor_onboardings.submitted_at is not null then public.mentor_onboardings.updated_at
      else now()
    end,
    submitted_at = case
      when public.mentor_onboardings.submitted_at is not null then public.mentor_onboardings.submitted_at
      when p_submit then now()
      else null
    end
  where public.mentor_onboardings.edit_token_hash = extensions.digest(p_edit_token, 'sha256')
  returning public.mentor_onboardings.updated_at, public.mentor_onboardings.submitted_at is not null
    into saved_at, onboarding_submitted;

  if not found then
    raise exception 'invalid resume token' using errcode = 'P0001';
  end if;

  return next;
end;
$$;

create or replace function public.validate_mentor_onboarding_submission()
returns trigger
language plpgsql
set search_path = ''
as $$
declare
  required_key text;
  required_keys constant text[] := array[
    'full_name',
    'current_work',
    'main_result',
    'priority_process',
    'process_current_steps',
    'process_frequency_time',
    'process_bottlenecks',
    'process_consequences',
    'attempted_improvements',
    'ai_current_use',
    'ai_built_with',
    'ai_limit',
    'desired_ai_help',
    'success_indicators',
    'success_expected_result',
    'human_responsibility',
    'why_now',
    'process_tools_systems',
    'application_restrictions',
    'between_session_barriers'
  ];
begin
  if new.submitted_at is null then
    return new;
  end if;

  foreach required_key in array required_keys loop
    if not (new.payload ? required_key)
      or new.payload -> required_key = 'null'::jsonb
      or (jsonb_typeof(new.payload -> required_key) = 'string' and btrim(new.payload ->> required_key) = '')
      or (jsonb_typeof(new.payload -> required_key) = 'array' and jsonb_array_length(new.payload -> required_key) = 0)
      or (jsonb_typeof(new.payload -> required_key) = 'object' and not exists (select 1 from jsonb_object_keys(new.payload -> required_key)))
    then
      raise exception 'required onboarding field is missing: %', required_key using errcode = '22023';
    end if;
  end loop;

  if jsonb_typeof(new.payload -> 'success_indicators') <> 'object'
    or jsonb_typeof(new.payload -> 'success_indicators' -> 'selected') <> 'array'
    or jsonb_array_length(new.payload -> 'success_indicators' -> 'selected') = 0
  then
    raise exception 'at least one success indicator is required' using errcode = '22023';
  end if;

  return new;
end;
$$;

revoke execute on function public.save_mentor_onboarding(uuid, text, jsonb, integer, boolean) from public;
grant execute on function public.save_mentor_onboarding(uuid, text, jsonb, integer, boolean)
  to anon, authenticated, service_role;

revoke execute on function public.validate_mentor_onboarding_submission() from public, anon, authenticated;
grant execute on function public.validate_mentor_onboarding_submission() to service_role;

notify pgrst, 'reload schema';
