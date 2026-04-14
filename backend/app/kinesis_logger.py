"""
Envía cada predicción a Kinesis Firehose para construir un data lake en S3
que después Spark consume para reentrenar / monitorear el modelo.

Si las credenciales AWS no están configuradas, no falla: solo loguea un warning.
Esto permite desarrollar local sin depender de AWS.
"""
import json
import logging
import os
from datetime import datetime, timezone

logger = logging.getLogger(__name__)

_client = None
_stream = os.getenv("KINESIS_STREAM", "")


def _get_client():
    global _client
    if _client is not None:
        return _client
    if not _stream or not os.getenv("AWS_ACCESS_KEY_ID"):
        return None
    try:
        import boto3
        _client = boto3.client("firehose", region_name=os.getenv("AWS_REGION", "us-east-1"))
        return _client
    except Exception as e:
        logger.warning("No se pudo inicializar Firehose: %s", e)
        return None


def log_prediction(factores: dict, resultado: dict) -> None:
    client = _get_client()
    if client is None:
        return
    record = {
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "factores": factores,
        "nivel_riesgo": resultado["nivel_riesgo"],
        "probabilidad": resultado["probabilidad"],
    }
    try:
        client.put_record(
            DeliveryStreamName=_stream,
            Record={"Data": (json.dumps(record) + "\n").encode("utf-8")},
        )
    except Exception as e:
        logger.warning("Fallo enviando a Firehose: %s", e)
