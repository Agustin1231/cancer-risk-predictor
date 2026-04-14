
# 🩺 HealthAI Breast BDI — Plan de Desarrollo

> Sistema web de predicción de riesgo de cáncer de mama con recomendaciones preventivas basado en Big Data.
> Universidad de San Buenaventura · Ingeniería de Sistemas · 2026

---

## Fase 0 — Preparación y entorno

- [ ] Crear repositorio en GitHub (`healthai-breast-bdi`)
- [ ] Definir estructura de carpetas del proyecto (`/frontend`, `/backend`, `/data`, `/infra`, `/notebooks`)
- [ ] Crear archivo `README.md` inicial con descripción del proyecto
- [ ] Configurar `.gitignore` para Python, Node y archivos de credenciales
- [ ] Crear cuenta en AWS (o verificar acceso existente)
- [ ] Instalar herramientas locales: Python 3.10+, pip, Node.js, AWS CLI, Git
- [ ] Configurar AWS CLI con credenciales (`aws configure`)

---

## Fase 1 — Datos

### 1.1 Búsqueda y recolección de datos

- [ ] Buscar dataset principal en [Kaggle — Breast Cancer Wisconsin](https://www.kaggle.com/datasets/uciml/breast-cancer-wisconsin-data)
- [ ] Buscar datos epidemiológicos locales en el [SIVIGILA / Datos Abiertos Colombia](https://www.datos.gov.co)
- [ ] Buscar datos del Instituto Nacional de Cancerología (Colombia)
- [ ] Descargar dataset de casos por localidad, año, grupo de edad y régimen de salud (para el dashboard)
- [ ] Verificar licencias de uso de cada fuente de datos

### 1.2 Exploración y limpieza

- [ ] Crear notebook `01_exploracion.ipynb` en Jupyter
- [ ] Cargar dataset con `pandas` y revisar forma, tipos y nulos
- [ ] Identificar columnas de factores de riesgo: edad, antecedentes familiares, hábitos de vida
- [ ] Eliminar duplicados y valores nulos
- [ ] Codificar variables categóricas (label encoding / one-hot)
- [ ] Normalizar/escalar variables numéricas
- [ ] Guardar dataset limpio como `data_clean.csv` o `data_clean.parquet`

### 1.3 Análisis exploratorio

- [ ] Crear notebook `02_eda.ipynb`
- [ ] Graficar distribución de la variable objetivo (riesgo bajo / medio / alto)
- [ ] Analizar correlación entre variables con heatmap
- [ ] Identificar variables más relevantes para el modelo
- [ ] Documentar hallazgos clave en el notebook

---

## Fase 2 — Modelo de predicción

- [ ] Crear notebook `03_modelo.ipynb`
- [ ] Dividir dataset en entrenamiento (80%) y prueba (20%)
- [ ] Entrenar modelo baseline: Regresión Logística o Random Forest
- [ ] Evaluar con métricas: accuracy, precision, recall, F1, AUC-ROC
- [ ] Optimizar hiperparámetros con `GridSearchCV` o `RandomizedSearchCV`
- [ ] Guardar modelo entrenado con `joblib` → `modelo_riesgo.pkl`
- [ ] Definir reglas de salida del modelo: niveles de riesgo (Bajo / Medio / Alto)
- [ ] Mapear cada nivel de riesgo a un conjunto de recomendaciones preventivas
- [ ] Documentar decisiones del modelo en `docs/modelo.md`

---

## Fase 3 — Backend (API REST)

- [ ] Crear entorno virtual de Python: `python -m venv venv`
- [ ] Instalar dependencias: `fastapi`, `uvicorn`, `scikit-learn`, `pandas`, `joblib`
- [ ] Crear archivo `main.py` con FastAPI
- [ ] Definir endpoint `POST /predict` que reciba los factores de riesgo y retorne nivel de riesgo + recomendaciones
- [ ] Cargar el modelo `modelo_riesgo.pkl` al iniciar la API
- [ ] Validar entradas con `pydantic`
- [ ] Crear endpoint `GET /health` para verificar estado del servicio
- [ ] Probar API localmente con Postman o `curl`
- [ ] Crear `requirements.txt` con `pip freeze > requirements.txt`
- [ ] Crear `Dockerfile` para contenerizar el backend

---

## Fase 4 — Frontend (aplicación web)

- [ ] Crear proyecto con React + Vite: `npm create vite@latest frontend`
- [ ] Instalar dependencias: `axios`, `react-router-dom`, `recharts` o `chart.js`
- [ ] Diseñar pantallas:
  - [ ] Pantalla de inicio / bienvenida
  - [ ] Formulario de factores de riesgo (edad, antecedentes, hábitos)
  - [ ] Pantalla de resultados con nivel de riesgo y recomendaciones
  - [ ] Dashboard con indicadores epidemiológicos
- [ ] Conectar formulario con el endpoint `POST /predict` del backend
- [ ] Visualizar resultado con gráfico de medidor (gauge) o tarjeta de riesgo
- [ ] Mostrar recomendaciones preventivas según el nivel de riesgo
- [ ] Mostrar aviso legal: "Esta herramienta no reemplaza un diagnóstico médico"
- [ ] Asegurar diseño responsivo (mobile-friendly)
- [ ] Crear `Dockerfile` para el frontend

---

## Fase 5 — Infraestructura en AWS

### 5.1 Instancia EC2

- [ ] Crear instancia EC2 (tipo `t2.micro` o `t3.small` para desarrollo)
- [ ] Seleccionar AMI: Ubuntu Server 22.04 LTS
- [ ] Configurar par de claves SSH y descargar `.pem`
- [ ] Configurar grupo de seguridad: abrir puertos 22 (SSH), 80 (HTTP), 443 (HTTPS), 8000 (API)
- [ ] Conectar por SSH: `ssh -i "clave.pem" ubuntu@<ip-publica>`
- [ ] Actualizar sistema: `sudo apt update && sudo apt upgrade -y`
- [ ] Instalar Docker y Docker Compose en la instancia

### 5.2 Amazon S3 — almacenamiento de datos

- [ ] Crear bucket S3 con nombre del proyecto (ej. `healthai-breast-bdi-data`)
- [ ] Configurar permisos del bucket (privado por defecto)
- [ ] Subir datasets limpios al bucket
- [ ] Configurar política de acceso para la instancia EC2 (IAM Role)

### 5.3 Amazon Kinesis Firehose — ingesta de datos

- [ ] Crear secuencia Firehose con origen `DirectPUT`
- [ ] Configurar destino: Amazon S3 (bucket creado en 5.2)
- [ ] Asignar nombre de la secuencia (ej. `healthai-stream`)
- [ ] Verificar creación exitosa (estado en verde en consola AWS)
- [ ] Probar envío de datos de prueba al stream

### 5.4 Apache Spark + Jupyter en EC2

- [ ] Instalar Java: `sudo apt install default-jdk -y`
- [ ] Descargar e instalar Apache Spark
- [ ] Instalar Python y pip: `sudo apt install python3 python3-pip -y`
- [ ] Instalar Jupyter Notebook: `pip install jupyter`
- [ ] Configurar Jupyter para acceso remoto (configurar contraseña y puerto)
- [ ] Verificar que Spark y Jupyter corren correctamente en la instancia

---

## Fase 6 — Despliegue en AWS

- [ ] Subir imagen Docker del backend a Amazon ECR o directamente a la instancia
- [ ] Subir imagen Docker del frontend
- [ ] Levantar servicios con `docker-compose up -d`
- [ ] Verificar que la API responde en `http://<ip-publica>:8000`
- [ ] Verificar que el frontend carga en `http://<ip-publica>:80`
- [ ] (Opcional) Configurar dominio personalizado con Route 53
- [ ] (Opcional) Configurar certificado SSL con Let's Encrypt (HTTPS)

---

## Fase 7 — Dashboard en Power BI

- [ ] Conectar Power BI Desktop al dataset epidemiológico (CSV o S3)
- [ ] Crear visualización: Total de casos por año (gráfico de líneas)
- [ ] Crear visualización: Evolución de casos por localidad (gráfico de áreas)
- [ ] Crear visualización: Distribución por grupo de edad
- [ ] Crear visualización: Casos por régimen de salud
- [ ] Publicar dashboard en Power BI Service
- [ ] Obtener enlace público del dashboard
- [ ] Incrustar enlace en la sección de analítica del frontend

---

## Fase 8 — Pruebas y validación

- [ ] Crear casos de prueba para el formulario (valores límite, campos vacíos)
- [ ] Probar el modelo con datos reales del dataset de prueba
- [ ] Validar que las recomendaciones corresponden correctamente al nivel de riesgo
- [ ] Probar la app en dispositivos móviles y distintos navegadores
- [ ] Verificar que el aviso legal aparece en todas las pantallas relevantes
- [ ] Revisar tiempos de respuesta del endpoint `/predict`

---

## Fase 9 — Documentación final

- [ ] Actualizar `README.md` con instrucciones de instalación y ejecución
- [ ] Documentar arquitectura del sistema en `docs/arquitectura.md`
- [ ] Documentar decisiones del modelo en `docs/modelo.md`
- [ ] Documentar endpoints del API en `docs/api.md`
- [ ] Redactar conclusiones del proyecto
- [ ] Preparar presentación final del proyecto

---

## Resumen de tecnologías

| Componente | Tecnología |
|---|---|
| Lenguaje principal | Python 3.10+ |
| Procesamiento de datos | Apache Spark, Pandas |
| Modelo ML | Scikit-learn |
| Entorno de análisis | Jupyter Notebook |
| API Backend | FastAPI |
| Frontend | React + Vite |
| Visualización | Recharts / Chart.js |
| Dashboard analítico | Power BI |
| Infraestructura cloud | AWS (EC2, S3, Kinesis) |
| Contenerización | Docker, Docker Compose |
| Control de versiones | Git + GitHub |

---

> ⚠️ **Aviso importante**: Esta aplicación tiene carácter informativo y preventivo. No reemplaza el diagnóstico médico profesional.
