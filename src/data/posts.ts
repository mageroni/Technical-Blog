export type AnimationId =
  | 'copilot-experiences'
  | 'skill-loader'
  | 'mcp-flow'
  | 'hooks-timeline'
  | 'token-budget'

export type Block =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'quote'; text: string }
  | { type: 'code'; language: string; code: string }
  | { type: 'animation'; animation: AnimationId; caption: string }

export type Post = {
  slug: string
  title: string
  summary: string
  author: string
  date: string
  tags: string[]
  accent: string
  animation: AnimationId
  blocks: Block[]
}

export const posts: Post[] = [
  {
    slug: 'las-muchas-caras-de-github-copilot',
    title: 'Las muchas caras de GitHub Copilot',
    summary:
      'Copilot dejó de ser un autocompletado en el IDE. Hoy es una familia de experiencias: CLI, Coding Agent, SDK y chat, todas sobre un mismo plano de control.',
    author: 'Equipo Technical Blog',
    date: '2026-01-14',
    tags: ['GitHub Copilot', 'IA', 'DevOps'],
    accent: '#7c5cff',
    animation: 'copilot-experiences',
    blocks: [
      {
        type: 'paragraph',
        text: 'Si tu única relación con GitHub Copilot es el chat dentro del editor, estás usando una fracción de la plataforma. Copilot creció hasta convertirse en una familia de experiencias que comparten políticas, facturación y contexto, pero que resuelven problemas distintos.',
      },
      {
        type: 'animation',
        animation: 'copilot-experiences',
        caption:
          'Haz clic en cada experiencia para ver cómo orbita alrededor del mismo plano de control.',
      },
      { type: 'heading', text: 'Cuatro experiencias, un mismo plano de control' },
      {
        type: 'list',
        items: [
          'Copilot en el IDE: la conversación y las sugerencias inline mientras escribes código.',
          'Copilot CLI: el agente en la terminal, ideal para tareas paralelas sin salir de tu máquina.',
          'Copilot Coding Agent: sesiones remotas que trabajan por ti en la infraestructura de GitHub mientras haces otra cosa.',
          'Copilot SDK: la misma capacidad agéntica empaquetada como librería para TypeScript, Python, Go o .NET.',
        ],
      },
      {
        type: 'paragraph',
        text: 'La palabra clave es continuidad. Cambias de superficie, no de gobierno: tus políticas de organización, tus límites de presupuesto y tus reglas de contenido viajan contigo.',
      },
      { type: 'heading', text: 'Varias tecnologías por debajo' },
      {
        type: 'paragraph',
        text: 'El nombre sigue siendo GitHub Copilot, pero el motor lo eliges tú. Puedes escoger el modelo y el agent loop que mejor se ajuste a cada tarea, y aun así mantener un único punto de control y una única factura. Un plano de control, muchos motores.',
      },
      { type: 'heading', text: 'Configuraciones que marcan la diferencia' },
      {
        type: 'list',
        items: [
          'Instructions: reglas que explican a Copilot cómo se trabaja en tu proyecto.',
          'Agents: personas o perfiles para que cada tarea reciba la perspectiva adecuada.',
          'Skills: Markdown más scripts para conectar servicios de terceros.',
          'Prompts: si repites un prompt, guárdalo; tu yo del futuro lo agradecerá.',
          'Hooks: visibilidad de lo que ocurre dentro de una sesión.',
          'Workflows: Copilot como un paso más dentro de tu pipeline.',
        ],
      },
      {
        type: 'code',
        language: 'markdown',
        code: `---
name: reviewer-backend
description: Revisa cambios de backend con foco en contratos de API
---

Actúa como revisor senior de servicios. Verifica versionado
de la API, compatibilidad hacia atrás y cobertura de tests.`,
      },
      {
        type: 'quote',
        text: 'Si solo usas Copilot como un chat local, estás dejando mucha potencia sobre la mesa.',
      },
      {
        type: 'paragraph',
        text: 'Empieza por lo simple: añade un archivo de instrucciones a tu repositorio, guarda dos prompts que repitas cada semana y delega una tarea pequeña al Coding Agent. Esa base hace que todo lo demás encaje.',
      },
    ],
  },
  {
    slug: 'skills-a-escala-con-un-agente-cargador',
    title: 'Skills a escala: un agente que reparte capacidades',
    summary:
      'Las Skills son solo Markdown y scripts, y por eso escalan tan bien. El reto no es crearlas, es distribuirlas de forma gobernada en decenas de repositorios.',
    author: 'Equipo Technical Blog',
    date: '2026-02-03',
    tags: ['GitHub Copilot', 'DevOps', 'Gobernanza'],
    accent: '#22c1a4',
    animation: 'skill-loader',
    blocks: [
      {
        type: 'paragraph',
        text: 'Una Skill es, literalmente, un archivo Markdown que describe qué hacer y, opcionalmente, un script que lo ejecuta. Sin SDK, sin build, sin framework. Si sabes escribir un README y un script de bash, sabes construir una Skill.',
      },
      {
        type: 'animation',
        animation: 'skill-loader',
        caption:
          'Reproduce el pipeline: el agente interpreta el prompt, busca las skills aprobadas y las materializa en tu repo.',
      },
      { type: 'heading', text: 'La parte incómoda: ejecutar comandos remotos' },
      {
        type: 'paragraph',
        text: 'Una Skill habilita la ejecución de comandos en tu infraestructura. Esa frase, por sí sola, levanta cejas en cualquier equipo de seguridad. Pero es la misma decisión de confianza que ya tomamos con los pipelines de CI/CD o con cualquier acción de terceros. La respuesta no es prohibir, es gobernar: curar lo que se permite, revisar lo que se ejecuta y poner barandillas.',
      },
      { type: 'heading', text: 'El patrón del agente cargador' },
      {
        type: 'list',
        items: [
          'Mantén un repositorio central con la lista curada de skills aprobadas.',
          'Crea un custom agent que se invoque al inicio de cada interacción.',
          'El agente analiza el prompt y decide qué skills son relevantes.',
          'Recrea esos archivos localmente en el repositorio de trabajo.',
          'Continúa la tarea, o la delega a otro agente que ya cuenta con las skills instaladas.',
        ],
      },
      {
        type: 'code',
        language: 'yaml',
        code: `---
name: skill-loader
description: Instala las skills aprobadas antes de ejecutar la tarea
tools: ["read", "write", "bash"]
---

1. Analiza el prompt del usuario.
2. Busca skills relevantes en la organización.
3. Escríbelas en .github/skills/.
4. Entrega el control al agente de implementación.`,
      },
      {
        type: 'paragraph',
        text: 'Piénsalo como un pipeline de distribución de capacidades, impulsado por la misma IA que las va a usar. Cuando la skill cambia, cambias el origen una vez y todos los repositorios reciben la versión nueva en su siguiente sesión.',
      },
      {
        type: 'quote',
        text: 'Si en tu carpeta de skills solo hay un Skill.md, estás dejando la mitad del valor sin usar. Acompáñalo de scripts.',
      },
    ],
  },
  {
    slug: 'mcp-para-todas-tus-sesiones',
    title: 'MCP para todas tus sesiones',
    summary:
      'Model Context Protocol conecta tus agentes con sistemas que no alcanzan solos. Configurarlo para una persona es fácil; hacerlo para cien repositorios es el verdadero reto.',
    author: 'Equipo Technical Blog',
    date: '2026-02-24',
    tags: ['IA', 'MCP', 'DevOps'],
    accent: '#3b82f6',
    animation: 'mcp-flow',
    blocks: [
      {
        type: 'paragraph',
        text: 'MCP es un protocolo abierto que permite una integración fluida entre aplicaciones basadas en LLM y fuentes de datos o herramientas externas. Traducido: deja que el modelo interactúe con sistemas a los que no llegaría por su cuenta.',
      },
      {
        type: 'animation',
        animation: 'mcp-flow',
        caption:
          'Activa y desactiva servidores para ver cómo cambia el contexto disponible para el agente.',
      },
      { type: 'heading', text: 'Un ejemplo cotidiano' },
      {
        type: 'paragraph',
        text: 'Tu backlog vive en Jira, tu código en GitHub y tus incidentes en otra herramienta. Con servidores MCP, el agente puede leer la tarea asignada, revisar la plantilla de API del equipo y dejar el trabajo listo para revisión sin que tú hagas de puente copiando y pegando contexto.',
      },
      { type: 'heading', text: 'Dónde se configura hoy' },
      {
        type: 'list',
        items: [
          'En el IDE: añadir un servidor MCP es casi tan simple como instalar una extensión.',
          'En Copilot CLI: se configura por comando, a nivel de usuario o de proyecto.',
          'En Copilot Coding Agent: se define en los ajustes del repositorio para que la sesión delegada arranque con el contexto correcto.',
          'En la empresa: los controles de IA permiten bloquear o permitir MCP y combinarlo con un registro de servidores aprobados.',
        ],
      },
      {
        type: 'code',
        language: 'json',
        code: `{
  "mcpServers": {
    "github": {
      "type": "http",
      "url": "https://api.githubcopilot.com/mcp/",
      "tools": ["*"]
    }
  }
}`,
      },
      { type: 'heading', text: 'El reto de escala' },
      {
        type: 'paragraph',
        text: 'Configurar servidor por servidor y repositorio por repositorio funciona bien para una persona, y muy mal para una organización. Aquí vuelve a ayudar el custom agent definido a nivel de empresa: su definición puede incluir los servidores MCP que toda sesión delegada debe levantar, sin tocar cien repositorios uno por uno.',
      },
      {
        type: 'quote',
        text: 'Trata el acceso MCP como cualquier otra integración remota: lista aprobada, revisión de seguridad y observabilidad.',
      },
    ],
  },
  {
    slug: 'hooks-observabilidad-de-tus-agentes',
    title: 'Hooks: observabilidad real de tus agentes',
    summary:
      'Los hooks ejecutan comandos en puntos clave del ciclo de vida de una sesión. Son la forma más directa de auditar, bloquear y entender lo que hace tu agente.',
    author: 'Equipo Technical Blog',
    date: '2026-03-11',
    tags: ['DevOps', 'IA', 'Gobernanza'],
    accent: '#f59e0b',
    animation: 'hooks-timeline',
    blocks: [
      {
        type: 'paragraph',
        text: 'Un hook es un comando que se ejecuta en un momento concreto del flujo del agente: al iniciar la sesión, al enviar un prompt, antes de invocar una herramienta o al cerrar la sesión. Es poco glamuroso y enormemente útil.',
      },
      {
        type: 'animation',
        animation: 'hooks-timeline',
        caption:
          'Ejecuta la sesión paso a paso y observa qué hook se dispara en cada momento.',
      },
      { type: 'heading', text: 'Para qué sirven de verdad' },
      {
        type: 'list',
        items: [
          'Auditar prompts y respuestas para cumplir requisitos de trazabilidad.',
          'Impedir el uso de herramientas no autorizadas antes de que se invoquen.',
          'Publicar métricas de sesión en tu plataforma de observabilidad.',
          'Dar feedback inmediato al desarrollador dentro de la propia sesión.',
        ],
      },
      { type: 'heading', text: 'Generarlos de forma determinista' },
      {
        type: 'paragraph',
        text: 'El archivo copilot-setup-steps.yml no se ejecuta solo: define los pasos de preparación que corren cuando el Coding Agent toma el control. Es determinista, así que el entorno se reconstruye igual cada vez. Un buen uso es generar los archivos de hooks en tiempo de ejecución desde un origen central.',
      },
      {
        type: 'code',
        language: 'yaml',
        code: `name: Copilot Setup Steps
on: workflow_dispatch

jobs:
  copilot-setup-steps:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Materializar hooks
        run: ./scripts/fetch-hooks.sh`,
      },
      {
        type: 'paragraph',
        text: 'La ventaja es clara: cuando la lógica de los hooks cambia, no hay que actualizar cada repositorio. Se cambia el origen y la siguiente sesión ya arranca con la versión correcta.',
      },
      {
        type: 'quote',
        text: 'Creatividad de la IA con la garantía de motores deterministas. Ese equilibrio es el que buscan los equipos regulados.',
      },
    ],
  },
  {
    slug: 'la-era-de-los-tokens-cultura-de-coste',
    title: 'La era de los tokens: una nueva cultura de coste',
    summary:
      'El consumo por tokens es ya el estándar. La pregunta interesante no es cuánto cuesta, sino cómo conseguimos que los equipos se preocupen por algo que nunca antes midieron.',
    author: 'Equipo Technical Blog',
    date: '2026-03-30',
    tags: ['IA', 'DevOps', 'FinOps'],
    accent: '#ef4444',
    animation: 'token-budget',
    blocks: [
      {
        type: 'paragraph',
        text: 'Casi todos los proveedores han migrado a modelos de consumo por tokens. No era difícil verlo venir: hay mucha computación detrás de cada prompt. Lo relevante ahora es la conversación que ese cambio nos obliga a tener.',
      },
      {
        type: 'animation',
        animation: 'token-budget',
        caption:
          'Mueve el deslizador de calidad del prompt y observa cuándo se aprueba o se detiene antes de gastar tokens.',
      },
      { type: 'heading', text: 'Medimos adopción cuando debíamos medir valor' },
      {
        type: 'paragraph',
        text: 'Durante meses premiamos el uso por el uso: tableros de quién usaba más IA, celebraciones de frecuencia. Si incentivas volumen, también incentivas desperdicio. El objetivo del desarrollo de software nunca fue el proceso, sino el resultado: capacidades entregadas, riesgos reducidos, errores evitados.',
      },
      { type: 'heading', text: 'Dos caminos para cambiar la cultura' },
      {
        type: 'list',
        items: [
          'Dejar actuar a la curva natural: presupuestos, límites y un flujo de aprobación cuando alguien los alcanza. Crea responsabilidad sobre el coste, pero tarda semanas o meses en calar.',
          'Crear bucles de feedback tempranos: recordar el coste en el momento del prompt. Requiere configuración, y acelera muchísimo el cambio de hábito.',
        ],
      },
      { type: 'heading', text: 'Un clasificador de prompts como portero' },
      {
        type: 'paragraph',
        text: 'La idea es sencilla: un hook evalúa la calidad y complejidad del prompt con reglas deterministas. Si la puntuación queda por debajo del umbral, la petición se cancela antes de llamar al modelo. Sin llamada, sin gasto y con feedback inmediato. Si lo supera, el desarrollador continúa y además recibe refuerzo de que escribió un buen prompt.',
      },
      {
        type: 'code',
        language: 'bash',
        code: `#!/usr/bin/env bash
score=$(classify_prompt "$COPILOT_PROMPT")

if [ "$score" -lt 80 ]; then
  echo "Prompt demasiado vago (score: $score). Añade contexto y criterios de aceptación."
  exit 1
fi

echo "Prompt sólido (score: $score). Continuamos."`,
      },
      {
        type: 'paragraph',
        text: 'No asignarías la tarea más repetitiva a tu especialista más caro si existe una forma más barata y adecuada de resolverla. Con los agentes debería pasar lo mismo: son una extensión del equipo y merecen un criterio económico igual de intencional.',
      },
      {
        type: 'quote',
        text: 'La oportunidad no está solo en controlar el coste después, sino en moldear el comportamiento antes de gastarlo.',
      },
    ],
  },
]

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug)
}

export const allTags: string[] = [
  ...new Set(posts.flatMap((post) => post.tags)),
].sort((a, b) => a.localeCompare(b, 'es'))
