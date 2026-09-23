# Technical Blog

Aplicación web para un blog de tecnología sobre **DevOps**, **GitHub Copilot** e **IA**.
Está construida con Vite, React y TypeScript, incluye cinco artículos ya publicados y cada
uno de ellos lleva una **animación interactiva del concepto que explica**.

## Características

- **5 artículos con contenido real** sobre experiencias de Copilot, distribución de Skills,
  servidores MCP, hooks de observabilidad y coste por tokens.
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

## Estructura

```
src/
├── animations/   Una animación interactiva por concepto (órbita, pipeline, MCP, hooks, tokens)
├── components/   Cabecera, portada, tarjeta de artículo y vista de artículo
├── data/         Contenido de los 5 artículos y su modelo de bloques
├── lib/          Búsqueda, tiempo de lectura, tema y enrutado por hash
└── test/         Tests de contenido, utilidades e interacción
```

Para añadir un artículo nuevo basta con agregar una entrada en `src/data/posts.ts`. Si el
artículo necesita una animación propia, se crea el componente en `src/animations/` y se
registra en `src/animations/index.ts`.
