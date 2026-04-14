# Infraestructura AWS — HealthAI Breast BDI

Guía paso a paso para montar el lado AWS del proyecto.

## Arquitectura

```
[Frontend] → [API FastAPI] ──┐
                             ↓
                   [Kinesis Firehose] → [S3 raw/predictions]
                                            ↓
                                  [EC2 Ubuntu + Spark + Jupyter]
                                            ↓
                                  [modelo_riesgo.pkl reentrenado]
                                            ↓
                                       [S3 models]
```

Región sugerida: **us-east-1** (más barata y mejor cobertura de servicios).

---

## 1. Crear bucket S3

**Nombre:** `healthai-breast-bdi-data` (debe ser globalmente único — si está tomado, agrega un sufijo)

Por consola (Console AWS → S3 → Create bucket):
- Region: `us-east-1`
- Block all public access: ✅ activado (privado)
- Versioning: opcional
- Encryption: SSE-S3 (default)

Crear estas "carpetas" (prefijos) dentro del bucket:
- `raw/predictions/` — formularios crudos enviados desde el frontend (Firehose escribe acá)
- `clean/` — datasets limpios (subir el `bcsc_clean.parquet`)
- `models/` — versiones del modelo entrenado

Por CLI:
```bash
aws s3api create-bucket --bucket healthai-breast-bdi-data --region us-east-1
aws s3api put-public-access-block --bucket healthai-breast-bdi-data \
  --public-access-block-configuration "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"

# Crear prefijos
aws s3api put-object --bucket healthai-breast-bdi-data --key raw/predictions/
aws s3api put-object --bucket healthai-breast-bdi-data --key clean/
aws s3api put-object --bucket healthai-breast-bdi-data --key models/

# Subir dataset limpio (después de correr notebook 01)
aws s3 cp ../../data/clean/bcsc_clean.parquet s3://healthai-breast-bdi-data/clean/
```

---

## 2. IAM — Rol y usuario

### 2.1 Usuario para la API (acceso programático)

Console → IAM → Users → Create user `healthai-api`
- Access type: Access key (programmatic)
- Permissions: attach policy inline con el contenido de `iam-api-policy.json`
- Guarda `AccessKeyId` y `SecretAccessKey` → van en el `.env`

### 2.2 Rol para EC2

Console → IAM → Roles → Create role
- Trusted entity: AWS service → EC2
- Permissions: `AmazonS3FullAccess` (para el bucket del proyecto), `AmazonKinesisFirehoseReadOnlyAccess`
- Nombre: `healthai-ec2-role`

---

## 3. Kinesis Data Firehose

Console → Amazon Kinesis → Data Firehose → Create delivery stream
- Source: **Direct PUT**
- Destination: **Amazon S3**
- Stream name: `healthai-stream`
- S3 bucket: `healthai-breast-bdi-data`
- S3 prefix: `raw/predictions/`
- S3 error prefix: `raw/errors/`
- Buffer size: 1 MB · Buffer interval: 60 s (mínimos para que aparezcan los datos rápido en desarrollo)
- Compression: GZIP

Probar el envío:
```bash
aws firehose put-record --delivery-stream-name healthai-stream \
  --record '{"Data":"{\"test\":\"hola\"}\n"}'
```

A los 60 s deberías ver un objeto en `s3://healthai-breast-bdi-data/raw/predictions/YYYY/MM/DD/HH/`.

---

## 4. EC2 — Apache Spark + Jupyter

### 4.1 Crear instancia

Console → EC2 → Launch instance
- Name: `healthai-spark`
- AMI: **Ubuntu Server 22.04 LTS** (64-bit x86)
- Tipo: **t3.medium** mínimo (Spark necesita RAM; t2.micro no aguanta)
- Key pair: crear nueva → descargar `healthai-key.pem`
- Security group: abrir
  - 22 (SSH) desde tu IP
  - 8888 (Jupyter) desde tu IP
  - 4040 (Spark UI) desde tu IP
- IAM instance profile: `healthai-ec2-role` (creado en 2.2)
- Storage: 30 GB gp3

### 4.2 Conexión y setup

```bash
chmod 400 healthai-key.pem
ssh -i healthai-key.pem ubuntu@<IP-PUBLICA>
```

Luego en la instancia:
```bash
curl -sSL https://raw.githubusercontent.com/<tu-usuario>/bigdata-sanbuenaventura/main/infra/aws/ec2_setup.sh | bash
```

(O sube el `ec2_setup.sh` con `scp` y ejecútalo.)

Acceso a Jupyter: `http://<IP-PUBLICA>:8888` (token impreso al final del setup).

---

## 5. Variables de entorno para el backend

Copia tu `.env` (en la raíz del proyecto):
```
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=<de healthai-api>
AWS_SECRET_ACCESS_KEY=<de healthai-api>
KINESIS_STREAM=healthai-stream
S3_BUCKET=healthai-breast-bdi-data
```

El backend automáticamente enviará cada predicción a Firehose (ver `backend/app/kinesis_logger.py`). Si las credenciales faltan, simplemente loguea un warning y sigue funcionando.

---

## 6. Costos estimados (us-east-1, demo/desarrollo)

| Recurso | Costo aprox / mes |
|---|---|
| S3 (10 GB + requests) | < $1 |
| Kinesis Firehose (bajo volumen) | < $5 |
| EC2 t3.medium (8h/día) | ~$10 |
| Tráfico de salida | < $2 |
| **Total** | **~$15–20/mes** |

Apaga la EC2 cuando no la uses (`aws ec2 stop-instances --instance-ids <id>`) — no se cobra cómputo cuando está parada, solo el storage del volumen (~$3/mes).
