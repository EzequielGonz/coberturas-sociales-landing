-- ============================================================================
-- Tabla de consultas para Supabase.
-- 1) Ejecutar este archivo en Supabase → SQL Editor.
-- 2) En apps/web/src/lib/leads.ts: LEADS_PROVIDER = 'supabase' y completar
--    SUPABASE_CONFIG con la URL del proyecto y la anon key (Settings → API).
-- El sitio solo puede INSERTAR. Ver y gestionar consultas queda para el equipo.
-- ============================================================================

create table if not exists public.consultas (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  nombre        text not null check (char_length(nombre) between 1 and 120),
  apellido      text not null check (char_length(apellido) between 1 and 120),
  telefono      text not null check (char_length(telefono) between 8 and 50),
  email         text not null check (char_length(email) <= 254),
  busqueda      text not null,   -- Obra social / Prepaga / No estoy seguro/a / Quiero comparar opciones
  destinatario  text not null,   -- Para mí / Para mí y mi pareja / Para mi familia / Para otra persona
  personas      text not null,
  actual        text not null,   -- ¿Ya tiene cobertura?
  situacion     text,            -- Relación de dependencia / Monotributista / ... (formulario de artículos)
  zona          text,            -- CABA / Zona norte / oeste / sur (formulario de artículos)
  detalle       text check (char_length(detalle) <= 5000),
  origen        text check (char_length(origen) <= 300),  -- página desde la que llegó
  -- Seguimiento del asesor (lo completa el equipo, no el sitio)
  estado        text not null default 'nueva' check (estado in ('nueva', 'contactada', 'cotizada', 'afiliada', 'descartada')),
  notas         text
);

create index if not exists consultas_created_at_idx on public.consultas (created_at desc);

alter table public.consultas enable row level security;

drop policy if exists "formulario publico inserta" on public.consultas;
create policy "formulario publico inserta"
  on public.consultas for insert to anon
  with check (estado = 'nueva' and notas is null);

drop policy if exists "equipo gestiona consultas" on public.consultas;
create policy "equipo gestiona consultas"
  on public.consultas for all to authenticated
  using (true) with check (true);
