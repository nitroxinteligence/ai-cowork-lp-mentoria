create extension if not exists pgcrypto with schema extensions;

create table if not exists public.mentor_onboardings (
  id uuid primary key,
  edit_token_hash bytea not null,
  payload jsonb not null default '{}'::jsonb check (jsonb_typeof(payload) = 'object'),
  current_step smallint not null default 0 check (current_step between 0 and 9),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  submitted_at timestamptz
);

comment on table public.mentor_onboardings is
  'Rascunhos e respostas do onboarding pós-pagamento do mentorado AI COWORK.';

alter table public.mentor_onboardings enable row level security;

revoke all on table public.mentor_onboardings from public, anon, authenticated;
grant select, insert, update, delete on table public.mentor_onboardings to service_role;

create index if not exists mentor_onboardings_submitted_at_idx
  on public.mentor_onboardings (submitted_at desc nulls last);

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
    'preferred_name',
    'current_role',
    'current_moment',
    'sector_area',
    'work_structure',
    'decision_level',
    'professional_experience',
    'first_application_area',
    'typical_week',
    'time_consuming_work',
    'top_three_activities',
    'recurring_dependency',
    'sticking_points',
    'postponed_work',
    'desired_work',
    'unsolved_problem_consequences',
    'attempted_solutions',
    'ai_routine_relief',
    'desired_capabilities',
    'first_capability',
    'learn_alone',
    'delegate_to_ai',
    'why_now',
    'six_months_same_way',
    'worthwhile_outcome',
    'priority_process',
    'process_reason',
    'process_people',
    'process_frequency',
    'process_volume',
    'process_current_steps',
    'process_inputs',
    'process_sources',
    'process_output',
    'process_output_use',
    'process_time',
    'process_repetitive_parts',
    'process_human_judgement',
    'process_breaks',
    'process_errors',
    'process_approver',
    'ai_entry_points',
    'ideal_ai_help',
    'ai_excluded_responsibility',
    'better_process',
    'success_indicators',
    'minimum_acceptable_result',
    'urgency_deadline',
    'bring_example',
    'ai_tools_used',
    'ai_frequency',
    'ai_current_uses',
    'post_ai_result',
    'persistent_ai_structures',
    'connected_ai_tools',
    'ai_built_assets',
    'technical_self_assessment',
    'ai_confidence_scale',
    'best_ai_result',
    'most_frustrating_ai_experience',
    'ai_limit',
    'application_environment',
    'available_tools_licenses',
    'systems_sources',
    'company_restrictions',
    'ai_approval_policy',
    'it_access',
    'priority_data_types',
    'available_materials',
    'technical_operational_blocker',
    'never_delegate_tasks',
    'human_decisions',
    'risky_ai_experience',
    'ai_concerns',
    'trust_requirements',
    'session_availability',
    'practice_time',
    'between_session_blockers',
    'learning_preferences',
    'guidance_types',
    'mentor_expectations',
    'communication_needs',
    'point_a',
    'point_b',
    'important_unasked',
    'automation_trigger',
    'automation_input',
    'automation_rules',
    'automation_next_action',
    'automation_review_points',
    'automation_error_handling',
    'asset_to_build',
    'asset_users',
    'asset_main_flow',
    'asset_data_mode',
    'asset_success_test',
    'content_material_types',
    'content_audience',
    'content_references',
    'content_reviewer',
    'sales_stage',
    'crm_system',
    'sales_information',
    'sales_approval',
    'data_sources',
    'data_update_frequency',
    'data_questions',
    'data_output_format',
    'data_quality_problems'
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

  if pg_column_size(p_values) > 262144 then
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

revoke execute on function public.save_mentor_onboarding(uuid, text, jsonb, integer, boolean) from public;
grant execute on function public.save_mentor_onboarding(uuid, text, jsonb, integer, boolean)
  to anon, authenticated, service_role;

notify pgrst, 'reload schema';
