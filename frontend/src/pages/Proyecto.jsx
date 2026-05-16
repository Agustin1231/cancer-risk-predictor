import { motion } from 'framer-motion'
import { Icon } from '../components/Icon.jsx'

function Section({ numero, titulo, children, icon }) {
  return (
    <motion.section
      className="proj-section"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .4 }}
    >
      <div className="proj-section-head">
        <div className="proj-numero">
          {icon ? <Icon name={icon} size={20} /> : numero}
        </div>
        <h2>{titulo}</h2>
      </div>
      <div className="proj-section-body">{children}</div>
    </motion.section>
  )
}

function Chip({ children, color }) {
  return <span className="proj-chip" style={color ? { background: color + '20', color } : {}}>{children}</span>
}

export default function Proyecto() {
  return (
    <div className="proj">
      <motion.header
        className="proj-hero"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="proj-hero-badge">Proyecto Big Data · 2026</div>
        <h1>HealthAI Breast BDI</h1>
        <p className="proj-subtitle">
          Sistema de predicción de riesgo de cáncer de mama y panorama epidemiológico,
          construido sobre una arquitectura de Big Data que procesa más de 6 millones de mamografías
          y captura predicciones en streaming.
        </p>
        <div className="proj-meta">
          <div>
            <span className="proj-meta-label">Universidad</span>
            <span>San Buenaventura</span>
          </div>
          <div>
            <span className="proj-meta-label">Carrera</span>
            <span>Ingeniería de Sistemas</span>
          </div>
          <div>
            <span className="proj-meta-label">Dominio</span>
            <span><a href="https://bigdata.agustinynatalia.site" target="_blank" rel="noreferrer">bigdata.agustinynatalia.site</a></span>
          </div>
        </div>
        <div className="proj-actions no-print">
          <a
            className="btn btn-primary"
            href="/Informe_Tecnico_HealthAI_Breast_BDI.pdf"
            download="Informe_Tecnico_HealthAI_Breast_BDI.pdf"
          >
            <Icon name="download" size={16} /> Descargar informe técnico (PDF)
          </a>
          <a className="btn" href="https://github.com/Agustin1231/bigdata-sanbuenaventura" target="_blank" rel="noreferrer">
            <Icon name="info" size={16} /> Ver código en GitHub
          </a>
        </div>
      </motion.header>

      <Section numero="1" titulo="Resumen del proyecto" icon="sparkle">
        <p>
          HealthAI Breast BDI es una aplicación web que combina <strong>modelo predictivo</strong> y
          <strong> analítica epidemiológica</strong> para ofrecer una herramienta educativa sobre cáncer
          de mama. Se integra con una infraestructura Big Data en AWS (almacenamiento en S3, streaming con Kinesis
          Firehose, procesamiento con Apache Spark en EC2) y se despliega productivamente en un VPS
          mediante Coolify.
        </p>
        <p>
          El sistema tiene cinco módulos visibles para el usuario: <em>Mi espacio</em> (dashboard personal),
          <em> Mi riesgo</em> (evaluación tipo wizard), <em>Autoexamen</em> (guía interactiva con
          temporizador), <em>Plan semanal</em> (checklist de hábitos con persistencia local)
          y <em>Panorama</em> (dashboard epidemiológico del país con datos descargables).
        </p>
      </Section>

      <Section numero="2" titulo="Arquitectura Big Data" icon="chart">
        <div className="arq-diagrama">
          <div className="arq-col">
            <div className="arq-titulo">Captura</div>
            <div className="arq-box">Formulario Web (React)</div>
            <div className="arq-flecha">↓</div>
            <div className="arq-box">API FastAPI</div>
          </div>
          <div className="arq-col">
            <div className="arq-titulo">Ingesta streaming</div>
            <div className="arq-box primary">AWS Kinesis Firehose</div>
            <div className="arq-flecha">↓</div>
            <div className="arq-box primary">AWS S3 (Data Lake)</div>
          </div>
          <div className="arq-col">
            <div className="arq-titulo">Procesamiento</div>
            <div className="arq-box accent">EC2 Ubuntu + Apache Spark</div>
            <div className="arq-flecha">↓</div>
            <div className="arq-box accent">Jupyter Notebooks · PySpark</div>
          </div>
          <div className="arq-col">
            <div className="arq-titulo">Modelo y servicio</div>
            <div className="arq-box">modelo_riesgo.pkl (S3)</div>
            <div className="arq-flecha">↓</div>
            <div className="arq-box">Endpoint /predict</div>
          </div>
        </div>
        <p className="soft" style={{ marginTop: '1rem' }}>
          Cada predicción que hace un usuario se envía en tiempo real al stream de Kinesis Firehose,
          que la deposita comprimida en GZIP en S3 bajo el prefijo <code>raw/predictions/YYYY/MM/DD/</code>.
          Apache Spark en EC2 lee periódicamente esos lotes para reentrenamiento y análisis agregado —
          el patrón clásico de un pipeline batch-streaming sobre un data lake.
        </p>
      </Section>

      <Section numero="3" titulo="Fuentes de datos" icon="info">
        <div className="fuentes-grid">
          <div className="fuente-card">
            <h4>BCSC Risk Factor Dataset</h4>
            <Chip color="#c2185b">Entrenamiento del modelo</Chip>
            <p>
              Breast Cancer Surveillance Consortium (EE.UU.). Más de <strong>6 millones de mamografías</strong> reales,
              agregadas por combinación de factores. Tres archivos CSV de ~400 MB total.
            </p>
            <p className="soft"><strong>Link:</strong> <a href="https://www.bcsc-research.org/data/rfdataset" target="_blank" rel="noreferrer">bcsc-research.org/data/rfdataset</a></p>
          </div>

          <div className="fuente-card">
            <h4>GLOBOCAN 2022</h4>
            <Chip color="#7b5ea7">Panorama global</Chip>
            <p>
              Reporte de la Agencia Internacional para la Investigación del Cáncer (IARC/OMS).
              Provee incidencia, mortalidad y prevalencia por país.
            </p>
            <p className="soft"><strong>Link:</strong> <a href="https://gco.iarc.fr" target="_blank" rel="noreferrer">gco.iarc.fr</a></p>
          </div>

          <div className="fuente-card">
            <h4>Cuenta de Alto Costo</h4>
            <Chip color="#c27803">Colombia · oficial</Chip>
            <p>
              Organismo técnico obligatorio del sistema de salud colombiano. Publica anualmente la
              situación del cáncer de mama por régimen, departamento y grupo etario.
            </p>
            <p className="soft"><strong>Link:</strong> <a href="https://cuentadealtocosto.org" target="_blank" rel="noreferrer">cuentadealtocosto.org</a></p>
          </div>

          <div className="fuente-card">
            <h4>SIVIGILA / Datos Abiertos</h4>
            <Chip color="#4a7c59">Colombia · público</Chip>
            <p>
              Sistema de Vigilancia en Salud Pública del Instituto Nacional de Salud. Casos reportados
              del país. Disponible en el portal nacional de datos abiertos.
            </p>
            <p className="soft"><strong>Link:</strong> <a href="https://www.datos.gov.co" target="_blank" rel="noreferrer">datos.gov.co</a></p>
          </div>
        </div>
      </Section>

      <Section numero="4" titulo="Stack tecnológico" icon="activity">
        <div className="stack-grid">
          <div className="stack-col">
            <h4>Big Data y Machine Learning</h4>
            <ul>
              <li><strong>Apache Spark (PySpark)</strong> — procesamiento distribuido en EC2</li>
              <li><strong>Jupyter Notebooks</strong> — exploración, EDA y entrenamiento</li>
              <li><strong>Pandas · NumPy</strong> — manipulación tabular</li>
              <li><strong>Scikit-learn</strong> — modelo de clasificación</li>
              <li><strong>Joblib</strong> — serialización del modelo (<code>.pkl</code>)</li>
              <li><strong>Parquet</strong> — formato columnar del dataset limpio</li>
            </ul>
          </div>
          <div className="stack-col">
            <h4>Cloud · AWS</h4>
            <ul>
              <li><strong>S3</strong> — data lake (<code>raw/</code>, <code>clean/</code>, <code>models/</code>)</li>
              <li><strong>Kinesis Firehose</strong> — ingesta streaming a S3</li>
              <li><strong>EC2 (t3.medium · Ubuntu 22.04)</strong> — Spark + Jupyter</li>
              <li><strong>IAM</strong> — roles y políticas mínimas</li>
              <li><strong>AWS CLI</strong> — automatización</li>
            </ul>
          </div>
          <div className="stack-col">
            <h4>Backend</h4>
            <ul>
              <li><strong>FastAPI</strong> — API REST async</li>
              <li><strong>Pydantic</strong> — validación de esquemas</li>
              <li><strong>Uvicorn</strong> — servidor ASGI</li>
              <li><strong>Boto3</strong> — cliente AWS</li>
              <li><strong>Docker</strong> — contenerización</li>
            </ul>
          </div>
          <div className="stack-col">
            <h4>Frontend</h4>
            <ul>
              <li><strong>React 18 + Vite</strong></li>
              <li><strong>React Router</strong> — SPA multi-página</li>
              <li><strong>Recharts</strong> — visualización</li>
              <li><strong>Framer Motion</strong> — microinteracciones</li>
              <li><strong>Axios</strong> — cliente HTTP</li>
              <li><strong>Nginx</strong> — reverse proxy para <code>/api</code></li>
            </ul>
          </div>
          <div className="stack-col">
            <h4>Despliegue</h4>
            <ul>
              <li><strong>Coolify</strong> (self-hosted) · PaaS sobre VPS</li>
              <li><strong>Docker Compose</strong> · orquestación local</li>
              <li><strong>Traefik</strong> · routing interno de Coolify</li>
              <li><strong>Let's Encrypt</strong> · HTTPS automático</li>
              <li><strong>Cloudflare</strong> · DNS y CDN</li>
            </ul>
          </div>
          <div className="stack-col">
            <h4>Control y calidad</h4>
            <ul>
              <li><strong>Git · GitHub</strong></li>
              <li><strong>dotenv</strong> para secretos locales</li>
              <li><strong>ESLint</strong> · linting del frontend</li>
              <li><strong>Pydantic</strong> · validación backend</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section numero="5" titulo="Flujo de datos (pipeline)" icon="refresh">
        <ol className="proj-pasos">
          <li>
            <strong>Ingesta del dataset BCSC</strong> — se descargaron 3 archivos CSV de mamografías desde el
            portal BCSC-Research, se consolidaron y limpiaron con Pandas en el notebook <code>01_exploracion.ipynb</code>.
          </li>
          <li>
            <strong>Limpieza y transformación</strong> — imputación de "desconocidos" (código 9), codificación
            ordinal, verificación de pesos (<code>count</code>) y exportación a <strong>Parquet</strong> para
            lectura columnar eficiente.
          </li>
          <li>
            <strong>Análisis exploratorio</strong> — notebook <code>02_eda.ipynb</code>: distribuciones,
            correlaciones ponderadas, tasas por grupo etario, densidad mamaria y antecedentes familiares.
          </li>
          <li>
            <strong>Entrenamiento del modelo</strong> — notebook <code>03_modelo.ipynb</code>:
            regresión logística / random forest con <code>class_weight</code> para desbalance, evaluado con
            AUC-ROC, precision y recall.
          </li>
          <li>
            <strong>Procesamiento distribuido con Spark</strong> — notebook <code>04_spark_s3.ipynb</code>:
            lectura directa desde S3 con PySpark para análisis agregado sobre volúmenes mayores a la memoria RAM
            de una sola máquina.
          </li>
          <li>
            <strong>Servicio del modelo</strong> — el <code>.pkl</code> se carga en la API FastAPI; cada request
            al endpoint <code>/predict</code> devuelve nivel de riesgo, factores que pesan y plan de tamizaje.
          </li>
          <li>
            <strong>Captura streaming</strong> — cada predicción exitosa se envía a Kinesis Firehose, que la
            deposita comprimida en S3 para reentrenamiento continuo del modelo.
          </li>
        </ol>
      </Section>

      <Section numero="6" titulo="Despliegue en producción" icon="shield">
        <h4>Plan original: AWS EC2</h4>
        <p>
          El plan inicial contemplaba desplegar la aplicación en la misma instancia EC2 t3.medium que corre
          Spark. Se intentó levantar los contenedores con Docker Compose pero la instancia,
          dimensionada para procesamiento batch con Spark, <strong>no soportó adecuadamente las cargas
          combinadas</strong> (Spark + Jupyter + backend + frontend servidos simultáneamente) y el costo
          de escalar a una instancia mayor (t3.large o superior) excedía el presupuesto del proyecto.
        </p>

        <h4>Decisión: migración a VPS con Coolify</h4>
        <p>
          Se optó por mover el despliegue de la <strong>aplicación web</strong> a un VPS propio
          administrado con Coolify, manteniendo la infraestructura Big Data (S3, Kinesis, EC2 Spark) en AWS.
          Esto partió la arquitectura en dos planos claros:
        </p>
        <ul>
          <li><strong>Plano de datos y cómputo pesado</strong>: sigue en AWS (S3 + Kinesis + EC2 Spark).</li>
          <li><strong>Plano de servicio web</strong>: VPS con Coolify sirviendo backend y frontend.</li>
        </ul>
        <p>
          Coolify es un PaaS self-hosted (alternativa a Heroku/Vercel) que gestiona el ciclo de despliegue
          directamente desde el repositorio de GitHub. En cada push a <code>main</code>, Coolify:
        </p>
        <ol>
          <li>Clona el repositorio.</li>
          <li>Construye las imágenes Docker del backend y frontend con <code>docker compose build</code>.</li>
          <li>Orquesta los contenedores en una red interna con <strong>Traefik</strong> como reverse proxy.</li>
          <li>Gestiona HTTPS automáticamente con Let's Encrypt.</li>
          <li>Inyecta variables de entorno (credenciales AWS, nombres de bucket y stream).</li>
        </ol>
        <p>
          El dominio final (<code>bigdata.agustinynatalia.site</code>) apunta por Cloudflare al VPS;
          el frontend expone nginx en el puerto 80 y proxea <code>/api/*</code> al backend
          FastAPI en <code>backend:8000</code> vía red Docker interna.
        </p>
        <div className="callout">
          <strong>¿Por qué esta arquitectura híbrida tiene sentido?</strong>
          <p>
            Permite usar el <em>mejor servicio para cada carga</em>: AWS para el data lake y el procesamiento
            distribuido (donde sus ventajas son reales), y un VPS económico para servir la aplicación 24×7
            sin tener que pagar por una instancia EC2 sobredimensionada permanentemente encendida.
            Es el patrón estándar en startups y proyectos académicos reales.
          </p>
        </div>
      </Section>

      <Section numero="7" titulo="Cumplimiento de requisitos Big Data" icon="check">
        <div className="reqs">
          <div className="req">
            <span className="req-tag">Volumen</span>
            <p>Dataset BCSC con <strong>+6 millones de registros</strong> de mamografías. Uso de Parquet para lectura columnar eficiente y PySpark para procesamiento distribuido.</p>
          </div>
          <div className="req">
            <span className="req-tag">Velocidad</span>
            <p>Pipeline de <strong>streaming en tiempo real</strong> con Kinesis Firehose: cada predicción llega a S3 en menos de 60 segundos.</p>
          </div>
          <div className="req">
            <span className="req-tag">Variedad</span>
            <p>Integración de fuentes <strong>heterogéneas</strong>: dataset clínico (BCSC), datos epidemiológicos oficiales (GLOBOCAN, Cuenta de Alto Costo, SIVIGILA).</p>
          </div>
          <div className="req">
            <span className="req-tag">Veracidad</span>
            <p>Validación con Pydantic, citación explícita de fuentes oficiales, descarga de datos disponible para auditoría por el usuario.</p>
          </div>
          <div className="req">
            <span className="req-tag">Valor</span>
            <p>Aplicación práctica con impacto educativo: evaluación personalizada, plan de cuidado, guía de autoexamen y panorama del país en una sola herramienta.</p>
          </div>
        </div>
      </Section>

      <footer className="proj-footer">
        <p>
          Este documento describe el proyecto HealthAI Breast BDI desarrollado como trabajo
          académico. Es una herramienta educativa y no reemplaza el diagnóstico médico profesional.
        </p>
        <p className="soft">
          Universidad de San Buenaventura · Ingeniería de Sistemas · 2026
        </p>
      </footer>
    </div>
  )
}
