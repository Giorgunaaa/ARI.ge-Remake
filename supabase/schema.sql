-- designhub.ge/2 გაყიდვები. ერთხელ გაუშვი Supabase → SQL Editor-ში.

-- ერთეულის სტატუსი და ფასი. id-ის ფორმატი — 2/sales.js.
create table if not exists public.units (
  id         text primary key,
  status     text not null default 'free' check (status in ('free', 'reserved', 'sold')),
  price      numeric check (price >= 0),
  updated_at timestamptz not null default now()
);
-- ძველ ცხრილზეც (სტატუსი „დაჯავშნილი" მოგვიანებით დაემატა)
alter table public.units drop constraint if exists units_status_check;
alter table public.units add constraint units_status_check check (status in ('free', 'reserved', 'sold'));

-- ვისაც შეუძლია ცვლილება (ელფოსტა, რომლითაც Authentication-ში მომხმარებელი შექმენი)
create table if not exists public.admins (
  email text primary key
);
-- insert into public.admins (email) values ('admin@example.com');

alter table public.units  enable row level security;
alter table public.admins enable row level security;

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from admins where email = auth.jwt() ->> 'email');
$$;

-- საიტი ყველასთვის კითხულობს, წერს მხოლოდ ადმინი
drop policy if exists "units read"   on public.units;
drop policy if exists "units insert" on public.units;
drop policy if exists "units update" on public.units;
create policy "units read"   on public.units for select using (true);
create policy "units insert" on public.units for insert to authenticated with check (public.is_admin());
create policy "units update" on public.units for update to authenticated using (public.is_admin()) with check (public.is_admin());

create or replace function public.touch_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;
drop trigger if exists units_touch on public.units;
create trigger units_touch before update on public.units for each row execute function public.touch_updated_at();
