"""
Carga el modelo entrenado y produce la predicción + recomendaciones.
Stub mientras no exista models/modelo_riesgo.pkl: devuelve respuesta dummy
para poder desarrollar el frontend en paralelo.
"""
from pathlib import Path
import joblib
import numpy as np

from app.schemas import FactoresRiesgo, RespuestaPrediccion

MODEL_PATH = Path(__file__).resolve().parent.parent / "models" / "modelo_riesgo.pkl"
AVISO = "Esta herramienta es informativa y preventiva. No reemplaza el diagnóstico médico profesional."

_modelo = None


def _cargar_modelo():
    global _modelo
    if _modelo is None and MODEL_PATH.exists():
        _modelo = joblib.load(MODEL_PATH)
    return _modelo


def _nivel_y_recomendaciones(prob: float):
    if prob < 0.10:
        return "Bajo", [
            "Mantén un estilo de vida saludable: actividad física regular y dieta balanceada.",
            "Realiza autoexamen mensual.",
            "Consulta con tu médico anualmente.",
        ]
    if prob < 0.25:
        return "Medio", [
            "Programa una mamografía de tamizaje según tu grupo de edad.",
            "Reduce factores modificables: peso saludable, evitar alcohol y tabaco.",
            "Comparte tus antecedentes familiares con tu médico.",
        ]
    return "Alto", [
        "Solicita una consulta con un especialista en mastología cuanto antes.",
        "Pregunta por estudios complementarios (ecografía o resonancia).",
        "Considera evaluación genética si hay antecedentes familiares fuertes.",
    ]


def predecir_riesgo(f: FactoresRiesgo) -> RespuestaPrediccion:
    modelo = _cargar_modelo()
    features = np.array([[
        f.age_group_5_years, f.race_eth, f.first_degree_hx,
        f.age_menarche, f.age_first_birth, f.BIRADS_breast_density,
        f.current_hrt, f.menopaus, f.bmi_group, f.biophx,
    ]])

    if modelo is None:
        # Stub: heurística simple mientras se entrena el modelo real
        prob = min(0.05 + 0.04 * f.age_group_5_years + 0.10 * f.first_degree_hx, 0.95)
    else:
        prob = float(modelo.predict_proba(features)[0, 1])

    nivel, recs = _nivel_y_recomendaciones(prob)
    return RespuestaPrediccion(
        nivel_riesgo=nivel,
        probabilidad=round(prob, 4),
        recomendaciones=recs,
        aviso=AVISO,
    )
