"""
HealthAI Breast BDI - API
Sirve el modelo de predicción de riesgo y entrega recomendaciones.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.schemas import FactoresRiesgo, RespuestaPrediccion
from app.predictor import predecir_riesgo
from app.kinesis_logger import log_prediction

app = FastAPI(
    title="HealthAI Breast BDI",
    description="API de predicción de riesgo de cáncer de mama",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # restringir en producción al dominio del frontend
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/predict", response_model=RespuestaPrediccion)
def predict(factores: FactoresRiesgo):
    resultado = predecir_riesgo(factores)
    log_prediction(factores.model_dump(), resultado.model_dump())
    return resultado
