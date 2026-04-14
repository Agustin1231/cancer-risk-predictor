"""
Esquemas Pydantic. Las opciones de cada campo siguen la codificación
del BCSC Risk Factor Dataset (ver docs/modelo.md).
"""
from typing import List, Literal
from pydantic import BaseModel, Field


class FactoresRiesgo(BaseModel):
    age_group_5_years: int = Field(..., ge=1, le=13, description="1=18-29 ... 13=>=85")
    race_eth: int = Field(..., ge=1, le=9)
    first_degree_hx: Literal[0, 1, 9]
    age_menarche: Literal[0, 1, 2, 9]
    age_first_birth: Literal[0, 1, 2, 3, 4, 9]
    BIRADS_breast_density: Literal[1, 2, 3, 4, 9]
    current_hrt: Literal[0, 1, 9]
    menopaus: Literal[1, 2, 3, 9]
    bmi_group: Literal[1, 2, 3, 4, 9]
    biophx: Literal[0, 1, 9]


class RespuestaPrediccion(BaseModel):
    nivel_riesgo: Literal["Bajo", "Medio", "Alto"]
    probabilidad: float
    recomendaciones: List[str]
    aviso: str
