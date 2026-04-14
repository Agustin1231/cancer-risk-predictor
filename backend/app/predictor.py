"""
Carga el modelo entrenado y produce la predicción + recomendaciones personalizadas.
Stub mientras no exista models/modelo_riesgo.pkl: devuelve respuesta dummy
para poder desarrollar el frontend en paralelo.
"""
from pathlib import Path
import joblib
import numpy as np

from app.schemas import (
    FactoresRiesgo,
    RespuestaPrediccion,
    FactorDetalle,
    PlanTamizaje,
)

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


def _analizar_factores(f: FactoresRiesgo):
    detalles = []

    # Edad (no modificable)
    if f.age_group_5_years >= 8:
        detalles.append(FactorDetalle(
            clave="age_group_5_years", etiqueta="Edad",
            impacto="alto", modificable=False,
            mensaje="A partir de los 60 años el riesgo aumenta de forma notable.",
            tip="Asegurá tu mamografía de tamizaje cada 1-2 años sin excepción.",
        ))
    elif f.age_group_5_years >= 6:
        detalles.append(FactorDetalle(
            clave="age_group_5_years", etiqueta="Edad",
            impacto="moderado", modificable=False,
            mensaje="Entre los 50 y 59 el riesgo sube respecto a edades previas.",
            tip="Es la franja donde el tamizaje mamográfico tiene mayor beneficio.",
        ))
    else:
        detalles.append(FactorDetalle(
            clave="age_group_5_years", etiqueta="Edad",
            impacto="neutro", modificable=False,
            mensaje="Tu grupo de edad tiene un riesgo base menor.",
        ))

    # Antecedentes familiares
    if f.first_degree_hx == 1:
        detalles.append(FactorDetalle(
            clave="first_degree_hx", etiqueta="Antecedente familiar de primer grado",
            impacto="alto", modificable=False,
            mensaje="Tener madre, hermana o hija con cáncer de mama duplica o triplica el riesgo.",
            tip="Comentá este antecedente con tu médico; podría corresponder una evaluación genética.",
        ))

    # Densidad mamaria
    if f.BIRADS_breast_density in (3, 4):
        detalles.append(FactorDetalle(
            clave="BIRADS_breast_density", etiqueta="Densidad mamaria",
            impacto="moderado" if f.BIRADS_breast_density == 3 else "alto",
            modificable=False,
            mensaje="Una mama densa dificulta la lectura de la mamografía y se asocia a mayor riesgo.",
            tip="Preguntá si se recomienda ecografía complementaria además de la mamografía.",
        ))

    # IMC (modificable)
    if f.bmi_group == 4:
        detalles.append(FactorDetalle(
            clave="bmi_group", etiqueta="Índice de masa corporal",
            impacto="alto", modificable=True,
            mensaje="Un IMC ≥ 35 aumenta el riesgo, especialmente en la post-menopausia.",
            tip="Bajar 5-10% del peso actual con alimentación y actividad física baja el riesgo de forma medible.",
        ))
    elif f.bmi_group == 3:
        detalles.append(FactorDetalle(
            clave="bmi_group", etiqueta="Índice de masa corporal",
            impacto="moderado", modificable=True,
            mensaje="Obesidad grado I se asocia a riesgo incrementado tras la menopausia.",
            tip="150 minutos semanales de actividad moderada ayudan a controlar el peso y el riesgo.",
        ))

    # Terapia hormonal
    if f.current_hrt == 1:
        detalles.append(FactorDetalle(
            clave="current_hrt", etiqueta="Terapia hormonal de reemplazo",
            impacto="moderado", modificable=True,
            mensaje="El uso actual de THR combinada aumenta el riesgo mientras dure el tratamiento.",
            tip="Conversá con tu médico la dosis mínima eficaz y el tiempo más corto posible.",
        ))

    # Menarca temprana
    if f.age_menarche == 2:
        detalles.append(FactorDetalle(
            clave="age_menarche", etiqueta="Menarca temprana",
            impacto="moderado", modificable=False,
            mensaje="La primera menstruación antes de los 12 aumenta ligeramente el riesgo.",
        ))

    # Primer parto tardío / sin hijos
    if f.age_first_birth in (3, 4):
        detalles.append(FactorDetalle(
            clave="age_first_birth", etiqueta="Primer embarazo tardío o nuliparidad",
            impacto="moderado", modificable=False,
            mensaje="No haber tenido hijos o un primer parto después de los 30 se asocia a más riesgo.",
            tip="La lactancia prolongada, cuando aplica, reduce el riesgo.",
        ))

    # Biopsia previa
    if f.biophx == 1:
        detalles.append(FactorDetalle(
            clave="biophx", etiqueta="Biopsia mamaria previa",
            impacto="moderado", modificable=False,
            mensaje="Una biopsia previa indica hallazgos que justifican seguimiento más estrecho.",
            tip="Mantené copia del informe histológico para tu médico tratante.",
        ))

    # Factor protector: IMC normal + sin otros de alto impacto
    tiene_alto = any(d.impacto in ("alto", "moderado") for d in detalles)
    if f.bmi_group == 1 and not tiene_alto:
        detalles.append(FactorDetalle(
            clave="bmi_group", etiqueta="Peso saludable",
            impacto="protector", modificable=True,
            mensaje="Un IMC normal reduce el riesgo, sobre todo tras la menopausia.",
            tip="Mantener hábitos actuales: actividad regular y dieta balanceada.",
        ))

    return detalles


def _plan_tamizaje(f: FactoresRiesgo, nivel: str) -> PlanTamizaje:
    edad = f.age_group_5_years
    if edad < 4:  # < 40
        if nivel == "Alto" or f.first_degree_hx == 1:
            return PlanTamizaje(
                frecuencia="Evaluación especializada antes de los 40",
                proxima_accion="Consulta con mastología en los próximos 3 meses",
                detalle="Con antecedente familiar o riesgo alto puede indicarse mamografía o resonancia antes de los 40.",
            )
        return PlanTamizaje(
            frecuencia="Autoexamen mensual + examen clínico anual",
            proxima_accion="Agendá tu control ginecológico anual",
            detalle="En menores de 40 sin factores de alto riesgo el tamizaje con mamografía todavía no es rutinario.",
        )
    if edad <= 5:  # 40-49
        return PlanTamizaje(
            frecuencia="Mamografía cada 1-2 años",
            proxima_accion="Agendá tu próxima mamografía si no te hiciste una en el último año",
            detalle="A partir de los 40 se recomienda iniciar tamizaje mamográfico regular.",
        )
    if edad <= 10:  # 50-74
        return PlanTamizaje(
            frecuencia="Mamografía anual",
            proxima_accion="Confirmá que tu próxima mamografía esté agendada en los próximos 12 meses",
            detalle="Entre los 50 y 74 años es la franja con mayor beneficio del tamizaje anual.",
        )
    return PlanTamizaje(
        frecuencia="Según criterio médico",
        proxima_accion="Consultá con tu médico si conviene continuar el tamizaje",
        detalle="Después de los 75 la decisión se individualiza según estado de salud general.",
    )


def predecir_riesgo(f: FactoresRiesgo) -> RespuestaPrediccion:
    modelo = _cargar_modelo()
    features = np.array([[
        f.age_group_5_years, f.race_eth, f.first_degree_hx,
        f.age_menarche, f.age_first_birth, f.BIRADS_breast_density,
        f.current_hrt, f.menopaus, f.bmi_group, f.biophx,
    ]])

    if modelo is None:
        prob = min(0.05 + 0.04 * f.age_group_5_years + 0.10 * f.first_degree_hx, 0.95)
    else:
        prob = float(modelo.predict_proba(features)[0, 1])

    nivel, recs = _nivel_y_recomendaciones(prob)
    detalles = _analizar_factores(f)
    plan = _plan_tamizaje(f, nivel)

    return RespuestaPrediccion(
        nivel_riesgo=nivel,
        probabilidad=round(prob, 4),
        recomendaciones=recs,
        factores_detalle=detalles,
        plan_tamizaje=plan,
        aviso=AVISO,
    )
