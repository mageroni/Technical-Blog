# Technical Blog

Aplicación web para un blog de tecnología sobre **DevOps**, **GitHub Copilot** e **IA**.
Está construida con Vite, React y TypeScript, incluye seis artículos ya publicados y cada
uno de ellos lleva una **animación interactiva del concepto que explica**.

Actualizacion

## Características

- **6 artículos con contenido real** sobre experiencias de Copilot, distribución de Skills,
  servidores MCP, hooks de observabilidad, coste por tokens y Enterprise Managed Settings.
- **Una animación por artículo**, construida con SVG y `framer-motion`, e interactiva:
  se puede pausar, avanzar paso a paso, encender y apagar servidores o mover un deslizador.
- **Portada dinámica**: búsqueda instantánea (ignora acentos y mayúsculas), filtro por temas
  y tarjetas animadas que se reordenan con las transiciones de `AnimatePresence`.
- **Tema claro/oscuro** persistido en `localStorage` y sincronizado con las preferencias del
  sistema.
- **Barra de progreso de lectura**, revelado de contenido al hacer scroll y respeto por
  `prefers-reduced-motion`.
- Navegación por hash (`#/slug`), por lo que la app funciona como sitio estático.

## Puesta en marcha

Usa Node.js 22.22.2 o superior dentro de la rama 22, como en CI.

```bash
npm install
npm run dev      # servidor de desarrollo en http://localhost:5173
```

Otros comandos disponibles:

```bash
npm run build    # comprobación de tipos + build de producción en dist/
npm run preview  # sirve el build de producción
npm run lint     # oxlint
npm test         # tests con Vitest + Testing Library
```

## Integración continua y tests

El workflow `.github/workflows/ci.yml` se ejecuta con cada push y pull request,
y también permite ejecución manual desde GitHub Actions. Usa Node.js 22, caché de
npm e instalación reproducible con `npm ci`; después ejecuta lint, tests y el
build de producción, que incluye la comprobación de tipos de TypeScript.

Para reproducir las comprobaciones localmente:

```bash
npm ci
npm run lint
npm test
npm run build
```

Los tests están en `src/test/`. Además de las pruebas de contenido, búsqueda y
componentes, `useHashRoute.test.ts` muestra cómo probar navegación por hash con
`renderHook` y `waitFor`; `useTheme.test.ts` comprueba la preferencia del sistema,
la restauración del tema y su persistencia en `localStorage`.

## Estructura

```
src/
├── animations/   Una animación interactiva por concepto (órbita, pipeline, MCP, hooks, tokens, ajustes administrados)
├── components/   Cabecera, portada, tarjeta de artículo y vista de artículo
├── data/         Contenido de los 6 artículos y su modelo de bloques
├── lib/          Búsqueda, tiempo de lectura, tema y enrutado por hash
└── test/         Tests de contenido, utilidades e interacción
```

Para añadir un artículo nuevo basta con agregar una entrada en `src/data/posts.ts`. Si el
artículo necesita una animación propia, se crea el componente en `src/animations/` y se
registra en `src/animations/index.ts`.
