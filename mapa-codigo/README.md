# Mapa del código (Graphify)

Grafo del código de `apps/`, `scripts/` y `supabase/`, armado el 22/11/2026 con Graphify 0.9.115 (análisis local con tree-sitter: sin costo, nada sale de la máquina).

- Consultar antes de buscar con grep: `graphify query "pregunta" --graph mapa-codigo/graph.json`, `graphify explain "X" --graph mapa-codigo/graph.json`, `graphify path "A" "B" --graph mapa-codigo/graph.json`.
- Resumen legible: `GRAPH_REPORT.md`. Vista en el navegador: `graph.html`.
- Actualizar cuando cambie bastante el código: copiar `apps`, `scripts` y `supabase` (sin `node_modules` ni `dist`) a una carpeta vacía, correr `graphify update .` y copiar de vuelta `graph.json`, `GRAPH_REPORT.md` y `graph.html`.
- El hook `.claude/hooks/graphify.sh` instala Graphify al abrir cada sesión si falta y avisa dónde está este mapa.
