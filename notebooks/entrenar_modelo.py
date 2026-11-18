# Replica de notebooks 01_exploracion + 03_modelo (mismos parametros), para regenerar modelo_riesgo.pkl
# Correr desde la raiz del repo, con los 3 CSV de BCSC en data/raw/. RandomForest dio AUC 0,894 (18-nov-2026).
import pandas as pd, joblib, time
from pathlib import Path
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import roc_auc_score
t=time.time()
files = sorted(Path('data/raw').glob('bcsc_risk_factors_summarized*.csv'))
df = pd.concat([pd.read_csv(f) for f in files], ignore_index=True)
df = df[df['breast_cancer_history'].isin([0, 1])].copy()
FEATURES = ['age_group_5_years','race_eth','first_degree_hx','age_menarche','age_first_birth',
            'BIRADS_breast_density','current_hrt','menopaus','bmi_group','biophx']
X = df[FEATURES].values; y = df['breast_cancer_history'].values; w = df['count'].values
print('Filas', len(df), 'mamografias', int(w.sum()), flush=True)
X_tr, X_te, y_tr, y_te, w_tr, w_te = train_test_split(X, y, w, test_size=0.2, random_state=42, stratify=y)
lr = LogisticRegression(max_iter=2000, class_weight='balanced').fit(X_tr, y_tr, sample_weight=w_tr)
print('AUC LogReg', roc_auc_score(y_te, lr.predict_proba(X_te)[:,1], sample_weight=w_te), flush=True)
rf = RandomForestClassifier(n_estimators=200, max_depth=12, n_jobs=2, class_weight='balanced', random_state=42)
rf.fit(X_tr, y_tr, sample_weight=w_tr)
print('AUC RandomForest', roc_auc_score(y_te, rf.predict_proba(X_te)[:,1], sample_weight=w_te), flush=True)
rf.n_jobs = 1
joblib.dump(rf, 'backend/models/modelo_riesgo.pkl', compress=3)
print('listo', round(time.time()-t), 's', flush=True)
