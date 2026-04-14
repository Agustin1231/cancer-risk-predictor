// Datos epidemiológicos del cáncer de mama en Colombia.
// Fuentes: GLOBOCAN 2022 (IARC/OMS), Cuenta de Alto Costo Colombia,
// MinSalud / SIVIGILA. Valores aproximados, útiles para fines educativos.
// Actualizar anualmente cuando se publiquen los nuevos reportes.

export const FUENTE = {
  texto: 'GLOBOCAN 2022, Cuenta de Alto Costo de Colombia, MinSalud',
  actualizado: '2024',
}

export const RESUMEN = {
  nuevos_casos_anuales: 15509,
  muertes_anuales: 4411,
  casos_acumulados_vivas: 98000,
  edad_media_dx: 56,
  tasa_incidencia: 47.3, // por 100.000 mujeres
  tasa_mortalidad: 13.3,
}

export const EVOLUCION = [
  { anio: 2015, casos: 7800, muertes: 3100 },
  { anio: 2016, casos: 8500, muertes: 3200 },
  { anio: 2017, casos: 9400, muertes: 3350 },
  { anio: 2018, casos: 10500, muertes: 3550 },
  { anio: 2019, casos: 11600, muertes: 3700 },
  { anio: 2020, casos: 12200, muertes: 3850 },
  { anio: 2021, casos: 13400, muertes: 4000 },
  { anio: 2022, casos: 14700, muertes: 4200 },
  { anio: 2023, casos: 15200, muertes: 4350 },
  { anio: 2024, casos: 15509, muertes: 4411 },
]

export const DEPARTAMENTOS = [
  { nombre: 'Bogotá D.C.', casos: 3120, tasa: 58.2 },
  { nombre: 'Antioquia', casos: 2450, tasa: 55.1 },
  { nombre: 'Valle del Cauca', casos: 1680, tasa: 51.7 },
  { nombre: 'Atlántico', casos: 980, tasa: 48.9 },
  { nombre: 'Santander', casos: 920, tasa: 49.2 },
  { nombre: 'Cundinamarca', casos: 840, tasa: 45.8 },
  { nombre: 'Risaralda', casos: 520, tasa: 50.3 },
  { nombre: 'Tolima', casos: 480, tasa: 43.1 },
  { nombre: 'Caldas', casos: 430, tasa: 47.6 },
  { nombre: 'Bolívar', casos: 420, tasa: 40.5 },
]

export const GRUPOS_EDAD = [
  { grupo: '20-29', porcentaje: 1.2 },
  { grupo: '30-39', porcentaje: 6.8 },
  { grupo: '40-49', porcentaje: 19.5 },
  { grupo: '50-59', porcentaje: 27.3 },
  { grupo: '60-69', porcentaje: 24.1 },
  { grupo: '70-79', porcentaje: 14.6 },
  { grupo: '80+', porcentaje: 6.5 },
]

export const REGIMEN = [
  { nombre: 'Contributivo', valor: 58 },
  { nombre: 'Subsidiado', valor: 36 },
  { nombre: 'Excepción / Especial', valor: 4 },
  { nombre: 'No asegurado', valor: 2 },
]

export const ESTADIO_DX = [
  { estadio: 'In situ (0)', porcentaje: 8, color: '#4a7c59' },
  { estadio: 'Temprano (I-II)', porcentaje: 52, color: '#7cb342' },
  { estadio: 'Localmente avanzado (III)', porcentaje: 28, color: '#c27803' },
  { estadio: 'Metastásico (IV)', porcentaje: 12, color: '#b42318' },
]

export const SOBREVIDA = [
  { estadio: 'In situ', anios5: 99 },
  { estadio: 'Temprano', anios5: 90 },
  { estadio: 'Loc. avanzado', anios5: 72 },
  { estadio: 'Metastásico', anios5: 28 },
]
