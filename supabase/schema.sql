-- Create the table
create table posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  content text not null,
  user_id uuid references auth.users not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table posts enable row level security;

-- Policy: Anyone can read posts
create policy "Public posts are viewable by everyone."
  on posts for select
  using ( true );

-- Policy: Only authenticated users can insert posts
create policy "Users can insert their own posts."
  on posts for insert
  with check ( auth.uid() = user_id );

-- Policy: Users can update their own posts
create policy "Users can update own posts."
  on posts for update
  using ( auth.uid() = user_id );

-- Policy: Users can delete their own posts
create policy "Users can delete own posts."
  on posts for delete
  using ( auth.uid() = user_id );
