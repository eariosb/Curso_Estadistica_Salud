export interface CourseModule {
  slug: string;
  num: string;
  title: string;
  short: string;
  tag: string;
  isBonus?: boolean;
}

export interface CourseMetadata {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  accentColor: string;
  secondaryColor: string;
  modules: CourseModule[];
}

export const courseModules: CourseModule[] = [
  {
    slug: "00-orientacion",
    num: "00",
    title: "Orientación del Curso",
    short: "Cómo está organizado el curso, qué componentes interactivos usarás y qué ruta seguir según tu especialidad.",
    tag: "Orientación",
  },
  {
    slug: "01-ansiedad-al-empoderamiento",
    num: "01",
    title: "De la Ansiedad al Empoderamiento",
    short: "Transforma el miedo a los números en confianza estadística.",
    tag: "Fundamentos",
  },
  {
    slug: "02-lenguaje-de-los-datos",
    num: "02",
    title: "El Lenguaje de los Datos: Variables",
    short: "Como los datos hablan: entender las variables y su papel en la investigación.",
    tag: "Fundamentos",
  },
  // ── NUEVO: antes de Probabilidad ──────────────────────────────
  {
    slug: "03-fundamentos-estadisticos-muestreo",
    num: "03",
    title: "Fundamentos Estadísticos y Muestreo",
    short: "Descriptiva vs. inferencial, medidas de tendencia y dispersión, y los tipos de muestreo que hacen válida cualquier conclusión.",
    tag: "Fundamentos",
  },
  {
    slug: "04-probabilidad-y-bayes",
    num: "04",
    title: "Probabilidad y el Teorema de Bayes",
    short: "Entender como la probabilidad ayuda a modelar procesos reales y tomar decisiones en contexto de incertidumbre.",
    tag: "Razonamiento",
  },
  {
    slug: "05-sesgos-en-investigacion",
    num: "05",
    title: "Sesgos en Investigación",
    short: "Detecta los errores ocultos que distorsionan la evidencia científica.",
    tag: "Lectura Crítica",
  },
  // ── NUEVO: después de Sesgos ──────────────────────────────────
  {
    slug: "06-muestreo-diseno-estudios",
    num: "06",
    title: "Muestreo Avanzado y Diseño de Estudios",
    short: "Tipos de muestreo en profundidad, cálculo de tamaño muestral, principios del diseño de experimentos y tipos de estudios en salud.",
    tag: "Diseño de Estudios",
  },
  // ── NUEVO: Regresión Lineal ────────────────────────────────────
  {
    slug: "07-regresion-lineal",
    num: "07",
    title: "Regresión Lineal: Modelando Relaciones en Salud",
    short: "De la correlación al modelo predictivo: interpretación de coeficientes, R², supuestos LINE y regresión múltiple con ejemplos clínicos reales.",
    tag: "Análisis",
  },
  {
    slug: "08-significancia-vs-relevancia",
    num: "08",
    title: "Significancia vs. Relevancia",
    short: "Leer resultados, entender como se producen y como afecta las decisiones en contexto.",
    tag: "Interpretación",
  },
  {
    slug: "09-pruebas-estadisticas-basicas",
    num: "09",
    title: "Pruebas Estadísticas Básicas",
    short: "T-Test, Wilcoxon, Chi-cuadrado: cuándo y por qué usar cada prueba.",
    tag: "Análisis",
  },
  {
    slug: "10-analisis-de-supervivencia",
    num: "10",
    title: "Análisis de Supervivencia",
    short: "Curvas Kaplan-Meier, censura y el tiempo hasta el evento.",
    tag: "Análisis Avanzado",
  },
  {
    slug: "11-modelos-multivariantes",
    num: "11",
    title: "Modelos Multivariantes",
    short: "Como entender el mundo multivariante, correlaciones, independencia, interacción.",
    tag: "Análisis Avanzado",
  },
  {
    slug: "12-evaluacion-critica-articulos",
    num: "12",
    title: "Evaluación Crítica de Artículos",
    short: "Pensamiento crítico e interpretación de resultados.",
    tag: "Lectura Crítica",
  },
  {
    slug: "13-etica-estadistica",
    num: "13",
    title: "Ética Estadística",
    short: "De buenas practicas a dilemas éticos: el impacto de tus decisiones en la confianza científica.",
    tag: "Ética Científica",
  },
  {
    slug: "14-diseno-estudio-piloto",
    num: "14",
    title: "Diseño y Plan de Análisis de un Estudio Piloto",
    short: "Una vision integral del proceso de diseño y análisis en estudios piloto.",
    tag: "Diseño de Estudios",
  },
  {
    slug: "bonus-guia-graficos",
    num: "★",
    title: "Guía para Leer Gráficos Estadísticos",
    short: "Una habilidad de alto valor en tiempos de explosión de datos: aprende a interpretar gráficos con confianza.",
    tag: "Referencia Visual",
    isBonus: true,
  },
];

export const bioestadisticaCourse: CourseMetadata = {
  id: "bioestadistica-clinica",
  title: "Bioestadística ",
  subtitle: "Para Profesionales de la Salud",
  description:
    "Un curso práctico que transforma la ansiedad estadística en criterio. Diseñado para enfermeras, médicos, odontologos, farmacéuticos, psicólogos, nutricionistas y todos los profesionales de la salud.",
  accentColor: "#2563EB",
  secondaryColor: "#059669",
  modules: courseModules,
};
