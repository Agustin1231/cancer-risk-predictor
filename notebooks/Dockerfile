FROM python:3.11-slim

WORKDIR /work

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --no-cache-dir \
    jupyterlab==4.2.5 \
    pandas==2.2.3 numpy==2.1.2 pyarrow==17.0.0 \
    scikit-learn==1.5.2 joblib==1.4.2 \
    matplotlib==3.9.2 seaborn==0.13.2

EXPOSE 8888

CMD ["jupyter", "lab", "--ip=0.0.0.0", "--port=8888", "--no-browser", \
     "--ServerApp.token=", "--ServerApp.password=", \
     "--ServerApp.allow_origin=*"]
