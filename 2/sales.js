/* ============================================================
   გაყიდვები: სტატუსი და ფასი Supabase-ის ცხრილიდან `units` (იხ. supabase/schema.sql).
   ერთეულის id: ბინა — a<ნომერი> (a15), პარკინგი — p<ნომერი> (p3),
   კომერციული — k<სართული>.<რიგით 0-დან> (k1.0, k-1.0).
   ცხრილში არ არსებული ერთეული იყიდება და ფასი არ აქვს.
   ============================================================ */
window.Sales = (() => {
  // Supabase → Project Settings → API: Project URL და anon public key
  const URL = 'https://aaciswtsjwxyefnkdwjn.supabase.co';
  const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFhY2lzd3Rzand4eWVmbmtkd2puIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI1NjIwNjUsImV4cCI6MjEwODEzODA2NX0.8Ep-iXYhAQWSl_fE1kJj7Kx17r3zPUxXnhv9p3gqklA';
  const CURRENCY = '$';

  const data = {};
  const configured = !!(URL && KEY);
  const ready = !configured ? Promise.resolve() :
    fetch(`${URL}/rest/v1/units?select=id,status,price`, { headers: { apikey: KEY, Authorization: `Bearer ${KEY}` } })
      .then(r => r.ok ? r.json() : [])
      .then(rows => rows.forEach(r => data[r.id] = r))
      .catch(() => {});   // ქსელის შეცდომისას ყველაფერი „იყიდება" რჩება

  const status = id => ['sold', 'reserved'].includes(data[id]?.status) ? data[id].status : 'free';
  const price = id => data[id]?.price ?? null;
  const fmt = v => v == null ? '' : CURRENCY + ' ' + Math.round(v).toLocaleString('en-US').replace(/,/g, ' ');
  const id = { apt: no => 'a' + no, park: no => 'p' + no, com: (fl, n) => `k${fl}.${n}` };
  return { URL, KEY, configured, data, ready, status, price, fmt, id };
})();
