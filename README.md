# HealthAI Breast BDI

Sistema web de predicción de riesgo de cáncer de mama con recomendaciones preventivas, basado en Big Data.

**Universidad de San Buenaventura · Ingeniería de Sistemas · 2026**

---

## Stack

| Capa | Tecnología |
|---|---|
| Datos | BCSC Risk Factor Dataset (~6.7M mamografías) |
| Procesamiento | Apache Spark, Pandas |
| Modelo | Scikit-learn (clasificación de riesgo) |
| Backend | FastAPI |
| Frontend | React + Vite |
| Dashboard | Power BI (datos epidemiológicos Colombia) |
| Cloud | AWS (S3, Kinesis Firehose, EC2 para Spark/Jupyter) |
| Despliegue | Docker + Coolify |

## Estructura

```
.
├── backend/          API FastAPI que sirve el modelo
├── frontend/         Aplicación React (formulario + resultados + dashboard)
├── notebooks/        Exploración, EDA y entrenamiento del modelo
├── data/raw/         Dataset BCSC sin procesar (no versionado)
├── data/clean/       Datos limpios listos para modelar
├── infra/            docker-compose y configuración Coolify
└── docs/             Arquitectura, modelo y API
```

## Dataset

**BCSC Risk Factor Dataset** — 1.5M filas agregadas que representan 6.7M mamografías de mujeres en EE.UU. (2005–2017).

Variables: edad, etnia, antecedentes familiares, edad de menarca, edad primer parto, densidad mamaria BI-RADS, terapia hormonal, menopausia, BMI, biopsia previa.

Descarga: https://www.bcsc-research.org/index.php/datasets/rf/risk-factor-dataset-download

## Ejecución local

```bash
docker-compose up --build
```

Backend en `http://localhost:8000`, frontend en `http://localhost:5173`.

---

> ⚠️ Esta herramienta es informativa y preventiva. No reemplaza el diagnóstico médico profesional.
