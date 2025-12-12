# Health-Replicant — AI BioTwin (Submission-ready)

## Problem
Create a minimal, reproducible ML pipeline that demonstrates a health-score prediction for the AI BioTwin concept using synthetic data. This repository originally contained a TypeScript web app; added here are reproducible notebooks and submission artifacts to satisfy the submission checklist.

## Dataset
No real dataset was included. This submission uses a synthetic dataset generated in `notebooks/01_health_model.ipynb`. The notebook documents data generation steps and how to replace the synthetic data with a real dataset.

## Design & Approach
- Data generation: synthetic dataset (age, sleep_hours, steps, resting_hr, stress_level) + target health_score (0-1).
- Model: RandomForestRegressor (baseline) trained with fixed random seed for reproducibility.
- Outputs: trained model saved to `models/model.joblib`, evaluation metrics (MAE, RMSE, R2), and simple diagnostics plots.

## Assumptions
- Data is numeric and reasonably scaled.
- Missing values are handled via median imputation in the notebook.
- Synthetic dataset is a stand-in — replace with real dataset following notebook instructions.

## Reproducibility (Python)
```bash
python -m venv .venv
source .venv/bin/activate   # or .venv\Scripts\activate on Windows
pip install -r requirements.txt
jupyter lab                 # open notebooks
```
Run `notebooks/01_health_model.ipynb` to reproduce training, evaluation, and saved model.

## Repo structure
```
Health-Replicant/               # original web app
notebooks/
  01_health_model.ipynb        # synthetic data -> train -> eval -> save model
models/
  model.joblib                 # saved model (created by running notebook)
requirements.txt
README.md
evaluation_notes.md
commit_history.txt
chat_logs/                     # placeholder for chat logs (if provided)
```

## Evaluation summary
See `evaluation_notes.md` for metrics, tests, guardrails and limitations.

## Commit history & AI chat logs
- `commit_history.txt` contains the repo's git log (if available).
- Place exported AI chat logs into `chat_logs/` (not provided).
