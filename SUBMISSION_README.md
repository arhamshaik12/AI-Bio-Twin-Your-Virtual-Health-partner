# SUBMISSION_README — Health-Replicant (AI BioTwin)

A concise, judge-ready summary of the deliverables and execution steps.

## Overview
Health-Replicant is a minimal reproducible ML pipeline demonstrating a synthetic health‑score prediction model for the AI BioTwin concept. It augments the original TypeScript frontend with a functional ML notebook and submission artifacts.

## Key Deliverables
- `notebooks/01_health_model.ipynb` — synthetic dataset → train → evaluate → save model.
- `requirements.txt` — pinned dependencies.
- `README.md` — full documentation.
- `evaluation_notes.md` — metrics, tests, limitations.
- `commit_history.txt` — git history export.
- `chat_logs/` — placeholder.
- Original web app preserved in `Health-Replicant/`.

## Run Instructions
```
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
jupyter lab
```
Run `notebooks/01_health_model.ipynb`.

## Limitations
Synthetic data only, no real PHI, baseline model, limited robustness.

## Judge Focus
Reproducibility, model pipeline clarity, evaluation metrics, integration readiness.
