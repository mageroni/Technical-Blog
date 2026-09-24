export type AnimationId =
  | 'copilot-experiences'
  | 'skill-loader'
  | 'mcp-flow'
  | 'hooks-timeline'
  | 'token-budget'
  | 'managed-settings'
  | 'agentops-roi'

export type Block =
  | { type: 'paragraph'; text: string }
  | { type: 'link'; text: string; href: string }
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
    slug: 'agentops-para-managers-adopcion-y-roi',
    title: 'AgentOps para managers: adopción con impacto y ROI',
    summary:
      'Un marco práctico para convertir agentes de IA en capacidad de equipo medible: elegir casos de uso, gobernarlos y demostrar su retorno.',
    author: 'Equipo Technical Blog',
    date: '2026-09-24',
    tags: ['AgentOps', 'Gobernanza', 'ROI', 'IA'],
    accent: '#f59e0b',
    animation: 'agentops-roi',
    blocks: [
      {
        type: 'paragraph',
        text: 'Un agente no genera valor por estar disponible: lo genera cuando ayuda a un equipo a completar una tarea importante con menos tiempo, menos retrabajo o mejor calidad. Para quien gestiona equipos, AgentOps es la disciplina que conecta esa promesa técnica con prioridades de negocio, controles operativos y evidencia de retorno.',
      },
      {
        type: 'paragraph',
        text: 'Este enfoque será presentado en Nerdearla Argentina 2026, en la charla “AgentOps 4 Managers: Adopción + ROI”.',
      },
      { type: 'heading', text: 'La adopción no empieza por la herramienta' },
      {
        type: 'paragraph',
        text: 'El error habitual es distribuir una licencia, anunciar un piloto y esperar que aparezca la productividad. La adopción sostenible empieza con un problema concreto, una línea de base y una persona responsable del resultado. El agente es parte de la solución, no el objetivo del programa.',
      },
      {
        type: 'list',
        items: [
          'Selecciona un flujo frecuente y delimitado: preparar una propuesta, clasificar incidencias, revisar cambios repetitivos o generar documentación inicial.',
          'Define una métrica anterior al piloto: tiempo de ciclo, porcentaje de retrabajo, tasa de errores, volumen resuelto o satisfacción de quien usa el resultado.',
          'Aclara el límite de autonomía: qué puede sugerir, qué puede ejecutar y en qué punto debe intervenir una persona.',
          'Nombra a un responsable del proceso y a un grupo piloto representativo; no conviertas la primera prueba en una obligación para toda la organización.',
        ],
      },
      {
        type: 'quote',
        text: 'Un piloto útil no prueba que el agente funciona: prueba que mejora un resultado que el negocio ya considera importante.',
      },
      { type: 'heading', text: 'Priorizar: impacto, viabilidad y riesgo' },
      {
        type: 'paragraph',
        text: 'Un buen primer caso de uso combina volumen suficiente, pasos relativamente repetibles y una validación humana clara. No tiene que ser el proceso más vistoso. Los trabajos con información sensible, consecuencias irreversibles o criterios aún ambiguos pueden requerir más diseño de controles antes de convertirse en candidatos.',
      },
      {
        type: 'list',
        items: [
          'Impacto: ¿cuánto tiempo, coste, calidad o experiencia de cliente puede mejorar si funciona?',
          'Viabilidad: ¿el agente cuenta con instrucciones, contexto y herramientas aprobadas para completar el trabajo?',
          'Riesgo: ¿qué ocurre si se equivoca, quién detecta el error y cómo se revierte la acción?',
          'Aprendizaje: ¿el equipo podrá observar el resultado y ajustar el flujo en semanas, no en trimestres?',
        ],
      },
      {
        type: 'paragraph',
        text: 'Conviene puntuar estas dimensiones de forma visible y comparar oportunidades. Así se evita que el roadmap quede dominado por la demo más atractiva o por el área que más ruido hace. El caso ganador es el que permite aprender con seguridad y trasladar ese aprendizaje a otros flujos.',
      },
      {
        type: 'animation',
        animation: 'agentops-roi',
        caption:
          'Explora cómo cambia el beneficio anual estimado al elegir un flujo y ajustar la adopción del equipo. Es un modelo de conversación, no una predicción financiera.',
      },
      { type: 'heading', text: 'Medir ROI sin inventar precisión' },
      {
        type: 'paragraph',
        text: 'El ROI debe separar los beneficios observables de las hipótesis. Empieza por estimar el valor del tiempo liberado, la disminución de errores o el incremento de capacidad; después resta licencias, integración, gobierno, formación y supervisión. Si el tiempo ahorrado no se reasigna a una actividad valiosa, no debe contarse como ingreso realizado.',
      },
      {
        type: 'code',
        language: 'text',
        code: `beneficio anual = (horas ahorradas + horas de retrabajo evitadas) × coste/hora
                  + valor incremental verificable

ROI = (beneficio anual - coste anual total) / coste anual total`,
      },
      {
        type: 'paragraph',
        text: 'Reporta también las métricas operativas que explican el número: adopción activa por equipo, tasa de aceptación de sugerencias, tiempo de ciclo, calidad a la primera y porcentaje de intervenciones humanas. Una reducción de lead time sin caída de calidad es más defendible que una cifra aislada de prompts o sesiones.',
      },
      { type: 'heading', text: 'Gobierno que habilita en lugar de frenar' },
      {
        type: 'paragraph',
        text: 'El gobierno no es una revisión única antes de lanzar. Es un conjunto de decisiones repetibles: acceso a datos y herramientas, permisos mínimos, registro de acciones, evaluación de resultados, responsables de incidentes y criterios para pausar o retirar un agente. Cuanto más claro sea el límite, más fácil será que los equipos experimenten dentro de él.',
      },
      {
        type: 'list',
        items: [
          'Protege los datos: clasifica qué información puede entrar en el flujo y qué conectores están aprobados.',
          'Diseña revisiones proporcionales: una sugerencia de borrador no necesita el mismo control que una acción que modifica producción.',
          'Registra las decisiones relevantes y revisa muestras de resultados para detectar degradación, sesgos o patrones de error.',
          'Publica una vía de escalado: las personas deben poder reportar un resultado incorrecto, detener una automatización y saber quién responde.',
        ],
      },
      { type: 'heading', text: 'Un roadmap de 90 días' },
      {
        type: 'list',
        items: [
          'Días 1–30: elige uno o dos casos, toma la línea de base, establece controles y forma al grupo piloto con ejemplos de trabajo real.',
          'Días 31–60: ejecuta el piloto, revisa resultados semanalmente y ajusta instrucciones, contexto, permisos y puntos de revisión humana.',
          'Días 61–90: compara contra la línea de base, documenta los aprendizajes y decide explícitamente si escalar, iterar o retirar cada caso.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Escalar no significa copiar una automatización a toda la empresa. Significa reutilizar el método: priorizar con criterios comunes, instrumentar resultados, aplicar controles adecuados y comunicar el impacto con el lenguaje de cada stakeholder. Así AgentOps deja de ser una serie de pruebas aisladas y pasa a ser una capacidad de gestión.',
      },
      { type: 'heading', text: 'Inspiración' },
      {
        type: 'paragraph',
        text: 'Este artículo toma como punto de partida los temas de adopción, gobierno, métricas y retorno de la charla “AgentOps 4 Managers: Adopción + ROI” de Nerdearla Argentina, y desarrolla un marco propio para llevarlos a la práctica.',
      },
      {
        type: 'link',
        text: 'AgentOps 4 Managers: Adopción + ROI — Nerdearla Argentina',
        href: 'https://nerdearla.com/argentina/schedule/agentops-4-managers-adopcion-roi/',
      },
    ],
  },
  {
    slug: 'enterprise-managed-settings-gobernanza-de-copilot',
    title: 'Enterprise Managed Settings: gobernar Copilot más allá del proyecto',
    summary:
      'Qué son los ajustes administrados de Copilot, cómo desplegarlos desde GitHub y por qué una base empresarial complementa la configuración de proyecto y de usuario.',
    author: 'Equipo Technical Blog',
    date: '2026-09-23',
    tags: ['GitHub Copilot', 'Gobernanza', 'DevOps'],
    accent: '#22c1a4',
    animation: 'managed-settings',
    blocks: [
      {
        type: 'paragraph',
        text: 'Configurar Copilot para una persona es sencillo. Mantener criterios consistentes entre equipos, repositorios y herramientas requiere algo más que pedir a todos que copien el mismo archivo. Enterprise Managed Settings permite definir y distribuir ajustes administrados desde un punto central, con excepciones controladas para equipos de la empresa.',
      },
      { type: 'heading', text: '¿Qué son Enterprise Managed Settings?' },
      {
        type: 'paragraph',
        text: 'Son ajustes que los clientes compatibles de GitHub Copilot reciben y aplican como configuración empresarial. El archivo managed-settings.json permite expresar propiedades admitidas para gobernar el comportamiento del cliente: por ejemplo, bloquear determinadas operaciones, distribuir plugins aprobados o configurar el aislamiento de sesiones. No es un prompt ni un archivo de instrucciones que le pide al modelo que respete una regla.',
      },
      {
        type: 'paragraph',
        text: 'La documentación incluye Copilot CLI, VS Code, la aplicación GitHub Copilot, Copilot cloud agent y los IDE de JetBrains, pero no todas las propiedades funcionan en todos los clientes. Antes de prometer un control a seguridad o a un cliente, revisa la matriz de compatibilidad de la referencia oficial y verifica su comportamiento en las herramientas utilizadas.',
      },
      { type: 'heading', text: 'Empresa, proyecto y usuario: responsabilidades distintas' },
      {
        type: 'list',
        items: [
          'Usuario: preferencias personales y ajustes locales para trabajar con comodidad. No son un mecanismo fiable para imponer una base común a toda la empresa.',
          'Proyecto: contexto y convenciones del repositorio, como instrucciones de desarrollo y configuración de herramientas. Resultan útiles para ese trabajo, pero replicarlas en muchos repositorios puede generar divergencias.',
          'Empresa: controles y valores predeterminados administrados centralmente, aplicables según la propiedad, el cliente y el método de distribución. Las restricciones administradas no se anulan simplemente con una preferencia local.',
        ],
      },
      {
        type: 'paragraph',
        text: 'No se trata de eliminar la personalización. Los ajustes de proyecto y usuario siguen siendo útiles en lo que la empresa deja abierto. Tampoco todas las claves administradas son un bloqueo: model configura el modelo predeterminado de nuevas conversaciones, no una prohibición de cambiarlo después entre los modelos permitidos.',
      },
      { type: 'heading', text: '¿Por qué es importante para los clientes?' },
      {
        type: 'list',
        items: [
          'Consistencia: una base compartida reduce la dependencia de configuraciones manuales y de que cada desarrollador recuerde actualizar su equipo.',
          'Trazabilidad: alojar los ajustes en GitHub permite revisar cambios por pull request, conservar su historial y proteger quién puede aprobarlos.',
          'Seguridad y cumplimiento: los controles compatibles ayudan a implementar requisitos internos; no sustituyen una evaluación de riesgos ni garantizan cumplimiento por sí solos.',
          'Flexibilidad controlada: los equipos pueden recibir excepciones explícitas sin convertir cada repositorio en una política empresarial diferente.',
          'Operación a escala: un cambio central evita mantener copias en cada proyecto, aunque hay que contemplar los tiempos de actualización y comprobar su aplicación.',
        ],
      },
      {
        type: 'quote',
        text: 'El proyecto describe cómo trabajar; el usuario personaliza su experiencia; la empresa define la base de gobierno que no debe depender de ninguno de los dos.',
      },
      { type: 'heading', text: '1. Crear y seleccionar la fuente de gobierno' },
      {
        type: 'paragraph',
        text: 'Para un despliegue server-managed, elige una organización de la empresa y crea un repositorio llamado .github-private. GitHub recomienda visibilidad interna para que los miembros puedan consultar los ajustes. Limita las modificaciones a administradores y responsables de IA mediante CODEOWNERS y rulesets con las revisiones necesarias.',
      },
      {
        type: 'paragraph',
        text: 'No basta con crear el repositorio: entra en la empresa, abre AI controls → Agents → Configuration source y selecciona la organización que contiene .github-private. Configuration summary mostrará la configuración obtenida de esa fuente.',
      },
      {
        type: 'paragraph',
        text: 'Los ajustes se aplican a quienes reciben una licencia de Copilot de la empresa o de sus organizaciones, aunque no tengan acceso al repositorio o a la organización que lo aloja. Una empresa dedicada a Copilot Business sin organizaciones requiere considerar la guía específica enlazada al final.',
      },
      { type: 'heading', text: '2. Empezar con un ajuste de bajo impacto' },
      {
        type: 'paragraph',
        text: 'Dentro de .github-private, crea copilot/managed-settings.json y confirma el cambio en la rama predeterminada. La guía propone comenzar con auto como modelo predeterminado: Copilot selecciona entre los modelos permitidos por la empresa y puede reducir problemas de límites de solicitudes.',
      },
      {
        type: 'code',
        language: 'json',
        code: `{
  "model": "auto"
}`,
      },
      {
        type: 'paragraph',
        text: 'Este ejemplo cambia el inicio de las conversaciones nuevas; no obliga a mantener auto durante toda la sesión. La referencia admite model en CLI, VS Code, la aplicación GitHub Copilot y cloud agent, pero no en JetBrains. Usa un cliente compatible para probarlo.',
      },
      { type: 'heading', text: '3. Autorizar una excepción para un equipo' },
      {
        type: 'paragraph',
        text: 'Supongamos que special-team necesita elegir su propio valor inicial. Crea ese equipo a nivel de empresa: no es simplemente un equipo de una organización. Luego reemplaza el contenido de copilot/managed-settings.json para declarar que model admite una excepción de equipo, manteniendo auto como valor general.',
      },
      {
        type: 'code',
        language: 'json',
        code: `{
  "model": { "overridable": "auto" }
}`,
      },
      {
        type: 'paragraph',
        text: 'Crea copilot/teams/no-auto.json con el siguiente contenido. unmanaged retira el valor administrado de esta propiedad para el equipo; no desactiva el resto de los controles empresariales ni significa que cualquier usuario pueda saltarse una política.',
      },
      {
        type: 'code',
        language: 'json',
        code: `{
  "model": "unmanaged"
}`,
      },
      {
        type: 'paragraph',
        text: 'Crea copilot/team-mappings.json para vincular el archivo con el slug del equipo. La clave es el nombre del archivo y el valor es una lista de slugs de equipos empresariales; un archivo puede servir a varios equipos.',
      },
      {
        type: 'code',
        language: 'json',
        code: `{
  "no-auto.json": ["special-team"]
}`,
      },
      {
        type: 'paragraph',
        text: 'Confirma los tres archivos en la rama predeterminada. Solo las propiedades compatibles marcadas como overridable admiten estas excepciones; las demás permanecen bajo el control de la configuración base. Para usuarios que pertenecen a varios equipos, revisa las reglas de combinación en la guía de excepciones antes del despliegue.',
      },
      {
        type: 'animation',
        animation: 'managed-settings',
        caption:
          'Alterna entre un usuario general y special-team para observar el valor administrado de model en este ejemplo, sin otras fuentes de política.',
      },
      { type: 'heading', text: '4. Comprobar que la configuración está activa' },
      {
        type: 'list',
        items: [
          'Prueba con un usuario general y otro de special-team en un cliente que admita model. Inicia conversaciones nuevas: el primero debe recibir auto como valor inicial; el segundo no recibe ese valor impuesto por la empresa.',
          'En despliegues server-managed, los cambios suelen llegar en aproximadamente una hora. Reiniciar el cliente o volver a iniciar sesión provoca una actualización inmediata.',
          'Si no aparecen los ajustes, comprueba la fuente seleccionada, la rama predeterminada, la compatibilidad del cliente y que la licencia provenga de la empresa.',
          'Si el usuario recibe licencias de varias entidades de facturación, revisa que Usage billed to en su configuración personal de Copilot señale a esta empresa.',
        ],
      },
      { type: 'heading', text: 'Otras formas de distribuirlos y sus límites' },
      {
        type: 'paragraph',
        text: 'El repositorio central no es la única opción. La distribución nativa por MDM sirve para equipos Windows y macOS administrados por TI; la distribución mediante un archivo local administrado está disponible también en Linux, contenedores y Codespaces. Ambas se aplican a clientes locales en los dispositivos configurados, independientemente del origen de la licencia, y no al cloud agent.',
      },
      {
        type: 'paragraph',
        text: 'Si combinas fuentes, la precedencia documentada es MDM → server-managed → archivo administrado → ajustes de usuario. Como excepción, sandbox y permissions.deny, permissions.ask y permissions.allow se combinan en la dirección más restrictiva. Un archivo administrado del sistema no equivale a un archivo de configuración editable del proyecto.',
      },
      {
        type: 'paragraph',
        text: 'Ten en cuenta la disponibilidad: en Copilot CLI, si falla la consulta al servidor y no hay respuesta en caché, la política server-managed no está disponible para esa sesión. Para restricciones que deban mantenerse sin respuesta del servidor, considera MDM o archivos administrados y sigue los requisitos de ubicación y permisos de la guía de despliegue.',
      },
      { type: 'heading', text: 'Una base común, no una receta universal' },
      {
        type: 'paragraph',
        text: 'Empieza con el ejemplo de model, valida con un grupo piloto y documenta quién aprueba cambios y excepciones. Después incorpora únicamente las propiedades que hayas comprobado en tus clientes. El valor para una empresa no es tener más archivos JSON: es dejar de depender de configuraciones individuales para sostener criterios compartidos.',
      },
      { type: 'heading', text: 'Fuentes oficiales y siguientes pasos' },
      {
        type: 'paragraph',
        text: 'Contenido basado en la documentación de GitHub consultada el 23 de septiembre de 2026. La compatibilidad y las propiedades disponibles pueden evolucionar; consulta estas referencias antes de un despliegue.',
      },
      {
        type: 'link',
        text: 'Guía inicial: Getting started with enterprise-managed settings',
        href: 'https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/get-started',
      },
      {
        type: 'link',
        text: 'Crear y seleccionar el repositorio .github-private',
        href: 'https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/create-github-private-repo',
      },
      {
        type: 'link',
        text: 'Referencia de propiedades y compatibilidad por cliente',
        href: 'https://docs.github.com/en/enterprise-cloud@latest/copilot/reference/enterprise-administrators/enterprise-managed-settings',
      },
      {
        type: 'link',
        text: 'Excepciones para equipos empresariales',
        href: 'https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/override-settings-for-teams',
      },
      {
        type: 'link',
        text: 'Métodos de despliegue, precedencia y requisitos locales',
        href: 'https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/deploy-managed-settings',
      },
      {
        type: 'link',
        text: 'Copilot Business: empresas sin organizaciones',
        href: 'https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/copilot-business-only',
      },
    ],
  },
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
