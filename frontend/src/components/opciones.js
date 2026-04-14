// Opciones del formulario alineadas con la codificación BCSC.
// Mantener en sync con backend/app/schemas.py

export const CAMPOS = [
  {
    key: 'age_group_5_years', label: 'Grupo de edad',
    opciones: [
      { value: 1, label: '18-29' }, { value: 2, label: '30-34' }, { value: 3, label: '35-39' },
      { value: 4, label: '40-44' }, { value: 5, label: '45-49' }, { value: 6, label: '50-54' },
      { value: 7, label: '55-59' }, { value: 8, label: '60-64' }, { value: 9, label: '65-69' },
      { value: 10, label: '70-74' }, { value: 11, label: '75-79' }, { value: 12, label: '80-84' },
      { value: 13, label: '85 o más' },
    ],
  },
  {
    key: 'race_eth', label: 'Origen étnico',
    opciones: [
      { value: 1, label: 'Blanca no hispana' }, { value: 2, label: 'Negra no hispana' },
      { value: 3, label: 'Asiática / Pacífico' }, { value: 4, label: 'Nativa' },
      { value: 5, label: 'Hispana' }, { value: 6, label: 'Otra / mixta' },
      { value: 9, label: 'Prefiero no responder' },
    ],
  },
  {
    key: 'first_degree_hx', label: 'Familiar de primer grado con cáncer de mama',
    opciones: [{ value: 0, label: 'No' }, { value: 1, label: 'Sí' }, { value: 9, label: 'No sé' }],
  },
  {
    key: 'age_menarche', label: 'Edad de la primera menstruación',
    opciones: [
      { value: 0, label: '14 años o más' }, { value: 1, label: '12-13 años' },
      { value: 2, label: 'Menos de 12' }, { value: 9, label: 'No sé' },
    ],
  },
  {
    key: 'age_first_birth', label: 'Edad del primer parto',
    opciones: [
      { value: 0, label: 'Menos de 20' }, { value: 1, label: '20-24' },
      { value: 2, label: '25-29' }, { value: 3, label: '30 o más' },
      { value: 4, label: 'Sin hijos' }, { value: 9, label: 'No sé' },
    ],
  },
  {
    key: 'BIRADS_breast_density', label: 'Densidad mamaria (BI-RADS)',
    opciones: [
      { value: 1, label: 'Casi totalmente grasa' },
      { value: 2, label: 'Densidad fibroglandular dispersa' },
      { value: 3, label: 'Heterogéneamente densa' },
      { value: 4, label: 'Extremadamente densa' },
      { value: 9, label: 'No sé' },
    ],
  },
  {
    key: 'current_hrt', label: 'Terapia hormonal actual',
    opciones: [{ value: 0, label: 'No' }, { value: 1, label: 'Sí' }, { value: 9, label: 'No sé' }],
  },
  {
    key: 'menopaus', label: 'Estado menopáusico',
    opciones: [
      { value: 1, label: 'Pre / peri-menopausia' },
      { value: 2, label: 'Post-menopausia (natural)' },
      { value: 3, label: 'Post-menopausia (quirúrgica)' },
      { value: 9, label: 'No sé' },
    ],
  },
  {
    key: 'bmi_group', label: 'Índice de masa corporal',
    opciones: [
      { value: 1, label: 'Menor a 25' }, { value: 2, label: '25 a 29.9' },
      { value: 3, label: '30 a 34.9' }, { value: 4, label: '35 o más' },
      { value: 9, label: 'No sé' },
    ],
  },
  {
    key: 'biophx', label: 'Biopsia mamaria previa',
    opciones: [{ value: 0, label: 'No' }, { value: 1, label: 'Sí' }, { value: 9, label: 'No sé' }],
  },
]

export const VALORES_INICIALES = Object.fromEntries(
  CAMPOS.map(c => [c.key, c.opciones[0].value])
)
