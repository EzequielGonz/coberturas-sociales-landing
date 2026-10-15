# Estrategia SEO — Compara Tu Obra Social

Se sumaron **66 páginas de contenido** en tres silos, sin cambiar el diseño de la home. Todas usan la misma tipografía, colores, botones, formulario y banda final que el inicio. El foco es **solo AMBA** (CABA y conurbano, sin La Plata) y el público es gente en relación de dependencia, de ingresos medios-altos y altos, individuos y familias de hasta 60 años.

## 1. Qué se agregó

| Silo | URL pilar | Páginas |
|---|---|---|
| Prepagas | `/prepagas` | 10 marcas, 3 comparativas, 6 perfiles (familias, parejas, jóvenes, embarazo, premium, relación de dependencia), 7 guías y 25 zonas del AMBA |
| Obras sociales | `/obras-sociales` | Derivación de aportes, cambio, trabajo nuevo, grupo familiar, cuánto se aporta, obra social o prepaga, personal de dirección, cambio de trabajo, PMO |
| Guías | `/guias` | Índice general, **cotizador de aportes**, glosario y documentos |

Cada página tiene: título y descripción para Google, migas de pan, índice lateral, **CTA en la mitad**, preguntas frecuentes, guías relacionadas, **formulario** (el de la home más "situación laboral" y "zona", para calificar la consulta) y la banda final. Lleva datos estructurados (InsuranceAgency, Article, BreadcrumbList, FAQPage) y entra sola en `/sitemap.xml`.

## 2. Dónde completar los datos

**`apps/web/src/constants/brand.ts`** — un solo archivo para todo el sitio:
- `SITE_URL` (dominio definitivo), `PHONE` y `PHONE_E164`, `WHATSAPP_NUMBER`, `EMAIL`.
- Redes: `INSTAGRAM_URL`, `FACEBOOK_URL`, `TIKTOK_URL`, `LINKEDIN_URL`. Aparecen solas en el footer.
- `VERIFICATION` (Google y Bing) e `INDEXNOW_KEY`.

Mientras `WHATSAPP_NUMBER` esté vacío, todos los botones de WhatsApp llevan al formulario, igual que hoy. Al completarlo, cada artículo abre WhatsApp con un mensaje que dice desde qué guía escribe la persona. Con `PHONE` cargado, los CTA muestran el número para llamar.

**`apps/web/src/constants/cta.ts`** — textos de todos los llamados a la acción.

## 3. Base de datos — IMPORTANTE

El sitio original **no guardaba las consultas en ningún lado**: el formulario solo mostraba "gracias". Sigue igual hasta que conectes un proveedor en **`apps/web/src/lib/leads.ts`**:

- `'supabase'`: ejecutar `supabase/consultas.sql`, completar `SUPABASE_CONFIG` y cambiar `LEADS_PROVIDER`. La tabla trae `estado` y `notas` para el seguimiento del asesor, y el sitio solo puede insertar.
- `'webhook'`: cualquier URL que reciba JSON (Make, Zapier, n8n, un CRM).

Aplica al formulario de la home y al de los artículos. Cada consulta guarda `origen`, la página de la que vino.

Si instalan Google Tag Manager, quedan listos los eventos `click_whatsapp`, `click_llamar` y `lead_enviado`.

## 4. Cambios en la home (sin tocar el diseño)

- **Header**: "Prepagas" y "Obras sociales" reemplazan al ancla "Coberturas". Las anclas ahora empiezan con `/#` para funcionar desde cualquier página. Entre 851 y 940 px se oculta "Inicio" (el logo cumple esa función) para que el menú no se desborde.
- **Footer**: enlaces a las dos secciones, el cotizador y las guías, más teléfono, email y redes cuando se carguen.
- **Metadatos**: título orientado a CABA y GBA, y datos estructurados del negocio.
- **Formulario**: mismo diseño y campos. Ahora envía por `leads.ts`, y si el envío falla muestra un aviso en lugar de perder la consulta.
- **Animaciones**: se corrigió un detalle técnico. Las secciones con animación de entrada solo se activaban en la primera carga, y al volver a la home desde un artículo podían quedar invisibles.

## 5. Contenido: cuidados y cómo crecer

- **Revisión antes de publicar**: el contenido sobre derivación de aportes, cambio de obra social, carencias y preexistencias está redactado con prudencia porque las normas cambiaron en los últimos años. Igual conviene que lo revise alguien del equipo que trabaje con los trámites vigentes.
- **Marcas**: solo se usan datos generales y estables. No hay precios ni nombres de planes, porque cambian seguido. Cada página aclara que son asesores independientes. Si tienen convenio con alguna prepaga, se puede sumar en `extra` (en `marcas.server.ts`).
- **Zonas**: los sanatorios figuran solo como referencia geográfica. Para diferenciarlas más, sumá en `extra` (en `zonas.server.ts`) datos reales del asesor en cada zona.
- **Cotizador**: estima aportes con 3% + 6% del sueldo bruto, menos el fondo solidario (se muestra un rango). Los porcentajes se ajustan arriba del archivo `cotizador.tsx`.
- **Nuevas páginas**: sumarlas al archivo del silo en `apps/web/src/content/` y agregar su ruta a un grupo de `HUBS` en `index.server.ts`. Enlaces internos dentro del texto: `[texto](/ruta)`.

## 6. Checklist de lanzamiento

1. Completar `brand.ts` y conectar la base de datos en `leads.ts`.
2. Revisar el contenido.
3. Conectar el dominio. Mientras el sitio esté en un dominio temporal de Hostinger, `robots.txt` bloquea la indexación a propósito.
4. Verificar el sitio en **Google Search Console** y enviar `/sitemap.xml`. Hacer lo mismo en **Bing Webmaster Tools**.
5. Cargar `INDEXNOW_KEY`, publicar y correr `node scripts/indexnow.mjs https://tudominio`.
6. Crear el **Google Business Profile** con los mismos datos del sitio y pedir reseñas.
7. En Search Console, pedir la indexación manual de los pilares, la derivación de aportes, las marcas principales y las zonas de CABA y zona norte.
