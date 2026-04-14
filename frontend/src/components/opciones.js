// Opciones del formulario alineadas con la codificación BCSC.
// Mantener en sync con backend/app/schemas.py

export const CAMPOS = [
  {
    key: 'age_group_5_years',
    label: '¿Cuántos años tenés?',
    hint: 'La edad es el factor que más pesa. No es modificable, pero sí nos dice qué controles corresponden.',
    opciones: [
      { value: 1, label: '18 a 29' }, { value: 2, label: '30 a 34' }, { value: 3, label: '35 a 39' },
      { value: 4, label: '40 a 44' }, { value: 5, label: '45 a 49' }, { value: 6, label: '50 a 54' },
      { value: 7, label: '55 a 59' }, { value: 8, label: '60 a 64' }, { value: 9, label: '65 a 69' },
      { value: 10, label: '70 a 74' }, { value: 11, label: '75 a 79' }, { value: 12, label: '80 a 84' },
      { value: 13, label: '85 o más' },
    ],
  },
  {
    key: 'race_eth',
    label: '¿Con qué origen étnico te identificás?',
    hint: 'Distintos grupos tienen patrones de riesgo distintos. Esta pregunta es opcional.',
    opciones: [
      { value: 1, label: 'Blanca no hispana' }, { value: 2, label: 'Negra no hispana' },
      { value: 3, label: 'Asiática / Pacífico' }, { value: 4, label: 'Nativa' },
      { value: 5, label: 'Hispana / Latina' }, { value: 6, label: 'Otra / mixta' },
      { value: 9, label: 'Prefiero no responder' },
    ],
  },
  {
    key: 'first_degree_hx',
    label: '¿Alguien muy cercano tuvo cáncer de mama?',
    hint: 'Madre, hermana o hija. Tener ese antecedente duplica o triplica el riesgo.',
    opciones: [
      { value: 0, label: 'No' }, { value: 1, label: 'Sí' }, { value: 9, label: 'No estoy segura' },
    ],
  },
  {
    key: 'age_menarche',
    label: '¿A qué edad tuviste tu primera menstruación?',
    hint: 'Haberla tenido muy temprano aumenta ligeramente el riesgo.',
    opciones: [
      { value: 0, label: 'A los 14 o después' }, { value: 1, label: 'Entre 12 y 13' },
      { value: 2, label: 'Antes de los 12' }, { value: 9, label: 'No lo recuerdo' },
    ],
  },
  {
    key: 'age_first_birth',
    label: '¿Tuviste hijos? ¿A qué edad tuviste el primero?',
    hint: 'Un primer embarazo joven protege; tenerlo tarde o no tenerlos se asocia a algo más de riesgo.',
    opciones: [
      { value: 0, label: 'Antes de los 20' }, { value: 1, label: 'Entre 20 y 24' },
      { value: 2, label: 'Entre 25 y 29' }, { value: 3, label: 'A los 30 o después' },
      { value: 4, label: 'No tuve hijos' }, { value: 9, label: 'Prefiero no responder' },
    ],
  },
  {
    key: 'BIRADS_breast_density',
    label: '¿Sabés si tus mamas son densas?',
    hint: 'Esto sale en el informe de mamografía (BI-RADS). Si nunca te hiciste una, seleccioná "No sé".',
    opciones: [
      { value: 1, label: 'Casi totalmente grasas' },
      { value: 2, label: 'Fibroglandulares dispersas' },
      { value: 3, label: 'Heterogéneamente densas' },
      { value: 4, label: 'Extremadamente densas' },
      { value: 9, label: 'No sé' },
    ],
  },
  {
    key: 'current_hrt',
    label: '¿Estás tomando terapia hormonal actualmente?',
    hint: 'Por ejemplo, tratamiento de reemplazo después de la menopausia.',
    opciones: [
      { value: 0, label: 'No' }, { value: 1, label: 'Sí' }, { value: 9, label: 'No estoy segura' },
    ],
  },
  {
    key: 'menopaus',
    label: '¿En qué momento estás respecto a la menopausia?',
    hint: 'Pre: todavía menstruás con normalidad. Peri: ciclos irregulares. Post: sin menstruación hace un año o más.',
    opciones: [
      { value: 1, label: 'Pre o peri-menopausia' },
      { value: 2, label: 'Post-menopausia (natural)' },
      { value: 3, label: 'Post-menopausia (quirúrgica)' },
      { value: 9, label: 'No sé' },
    ],
  },
  {
    key: 'bmi_group',
    label: '¿Cuál es tu rango de peso?',
    hint: 'IMC = peso(kg) / altura(m)². Este factor sí es modificable.',
    opciones: [
      { value: 1, label: 'IMC menor a 25' },
      { value: 2, label: 'IMC entre 25 y 29.9' },
      { value: 3, label: 'IMC entre 30 y 34.9' },
      { value: 4, label: 'IMC de 35 o más' },
      { value: 9, label: 'No sé' },
    ],
  },
  {
    key: 'biophx',
    label: '¿Alguna vez te hicieron una biopsia mamaria?',
    hint: 'Una punción o extirpación de tejido para estudiar un hallazgo, aunque haya dado bien.',
    opciones: [
      { value: 0, label: 'No' }, { value: 1, label: 'Sí' }, { value: 9, label: 'No estoy segura' },
    ],
  },
]

export const VALORES_INICIALES = Object.fromEntries(
  CAMPOS.map(c => [c.key, c.opciones[0].value])
)
