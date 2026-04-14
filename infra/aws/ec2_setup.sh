#!/usr/bin/env bash
# Setup EC2 Ubuntu 22.04 con Java, Apache Spark y JupyterLab + PySpark
set -euo pipefail

SPARK_VERSION="3.5.3"
HADOOP_VERSION="3"
SPARK_PKG="spark-${SPARK_VERSION}-bin-hadoop${HADOOP_VERSION}"

echo ">>> Actualizando sistema"
sudo apt-get update -y && sudo apt-get upgrade -y
sudo apt-get install -y default-jdk python3 python3-pip python3-venv unzip awscli

echo ">>> Instalando Spark ${SPARK_VERSION}"
cd /opt
sudo curl -fsSL "https://archive.apache.org/dist/spark/spark-${SPARK_VERSION}/${SPARK_PKG}.tgz" -o spark.tgz
sudo tar -xzf spark.tgz && sudo rm spark.tgz
sudo ln -sfn "/opt/${SPARK_PKG}" /opt/spark

cat <<'EOF' | sudo tee /etc/profile.d/spark.sh
export SPARK_HOME=/opt/spark
export PATH=$PATH:$SPARK_HOME/bin:$SPARK_HOME/sbin
export PYSPARK_PYTHON=python3
EOF

source /etc/profile.d/spark.sh

echo ">>> Instalando Jupyter + PySpark"
python3 -m venv ~/pyenv
source ~/pyenv/bin/activate
pip install --upgrade pip
pip install jupyterlab pyspark==${SPARK_VERSION} pandas pyarrow boto3 scikit-learn matplotlib seaborn

echo ">>> Configurando Jupyter como servicio"
TOKEN=$(python3 -c "import secrets;print(secrets.token_hex(16))")

mkdir -p ~/notebooks
cat <<EOF | sudo tee /etc/systemd/system/jupyter.service
[Unit]
Description=JupyterLab
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/home/ubuntu/notebooks
Environment="PATH=/home/ubuntu/pyenv/bin:/usr/bin"
Environment="SPARK_HOME=/opt/spark"
ExecStart=/home/ubuntu/pyenv/bin/jupyter lab --ip=0.0.0.0 --port=8888 --no-browser --ServerApp.token=${TOKEN}
Restart=on-failure

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable --now jupyter

echo ""
echo "=========================================="
echo " Jupyter listo en http://<IP-PUBLICA>:8888"
echo " Token: ${TOKEN}"
echo "=========================================="
