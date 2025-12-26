create type public.long_term_goal_type as enum ('annual', 'monthly', 'weekly');

create table public.long_term_goals (
    id uuid not null default gen_random_uuid(),
    user_id uuid not null references auth.users(id) on delete cascade,
    title text not null,
    is_completed boolean not null default false,
    type public.long_term_goal_type not null,
    year integer not null,
    month integer,
    week_number integer,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now(),
    
    constraint long_term_goals_pkey primary key (id),
    constraint long_term_goals_month_check check (month >= 1 and month <= 12),
    constraint long_term_goals_week_check check (week_number >= 1 and week_number <= 53)
);

-- RLS Policies
alter table public.long_term_goals enable row level security;

create policy "Users can view their own goals"
    on public.long_term_goals
    for select
    using (auth.uid() = user_id);

create policy "Users can insert their own goals"
    on public.long_term_goals
    for insert
    with check (auth.uid() = user_id);

create policy "Users can update their own goals"
    on public.long_term_goals
    for update
    using (auth.uid() = user_id);

create policy "Users can delete their own goals"
    on public.long_term_goals
    for delete
    using (auth.uid() = user_id);
