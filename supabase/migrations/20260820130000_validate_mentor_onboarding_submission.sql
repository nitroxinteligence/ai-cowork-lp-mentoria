create or replace function public.validate_mentor_onboarding_submission()
returns trigger
language plpgsql
set search_path = ''
as $$
declare
  required_key text;
  required_keys constant text[] := array[
    'full_name',
    'preferred_name',
    'current_role',
    'sector_area',
    'work_structure',
    'professional_experience',
    'typical_week',
    'top_three_activities',
    'recurring_dependency',
    'postponed_work',
    'desired_work',
    'unsolved_problem_consequences',
    'attempted_solutions',
    'ai_routine_relief',
    'first_capability',
    'learn_alone',
    'delegate_to_ai',
    'why_now',
    'six_months_same_way',
    'worthwhile_outcome',
    'priority_process',
    'process_reason',
    'process_people',
    'process_volume',
    'process_current_steps',
    'process_sources',
    'process_output',
    'process_output_use',
    'process_time',
    'process_repetitive_parts',
    'process_human_judgement',
    'process_errors',
    'process_approver',
    'ideal_ai_help',
    'ai_excluded_responsibility',
    'better_process',
    'minimum_acceptable_result',
    'urgency_deadline',
    'best_ai_result',
    'most_frustrating_ai_experience',
    'ai_limit',
    'available_tools_licenses',
    'company_restrictions',
    'ai_approval_policy',
    'never_delegate_tasks',
    'human_decisions',
    'risky_ai_experience',
    'trust_requirements',
    'mentor_expectations',
    'point_a',
    'point_b',
    'important_unasked'
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

  if jsonb_typeof(new.payload -> 'top_three_activities') <> 'array'
    or jsonb_array_length(new.payload -> 'top_three_activities') < 3
  then
    raise exception 'three ranked activities are required' using errcode = '22023';
  end if;

  if jsonb_typeof(new.payload -> 'session_availability') <> 'object'
    or (select count(*) from jsonb_object_keys(new.payload -> 'session_availability')) < 6
  then
    raise exception 'availability for all six sessions is required' using errcode = '22023';
  end if;

  return new;
end;
$$;

drop trigger if exists mentor_onboardings_validate_submission on public.mentor_onboardings;

create trigger mentor_onboardings_validate_submission
before insert or update on public.mentor_onboardings
for each row execute function public.validate_mentor_onboarding_submission();

revoke execute on function public.validate_mentor_onboarding_submission() from public, anon, authenticated;
grant execute on function public.validate_mentor_onboarding_submission() to service_role;
