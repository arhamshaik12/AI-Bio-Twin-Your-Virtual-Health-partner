# Evaluation Notes — Health-Replicant (Notebook synthetic model)

## Task
Regression: predict a continuous health_score in range [0,1].

## Primary metrics
- MAE (Mean Absolute Error)
- RMSE (Root Mean Squared Error)
- R² score

## Baselines
- Mean predictor
- RandomForestRegressor (implemented as baseline)

## Test split & procedure
- Train/test split: 80/20 stratified by binned health_score (not strictly necessary for synthetic data)
- Random seed fixed (SEED=42) for reproducibility

## Sanity checks
- Check for label leakage (none in synthetic dataset)
- Train/test overlap: ensured by split

## Stress tests
- Missing features: median imputation applied
- Out-of-range input: clamp numeric inputs and return warnings
- Adversarial input: non-numeric input results in error

## Guardrails & limitations
- Synthetic data reflects simple correlations; model will not generalize to real-world health data.
- No privacy concerns in synthetic dataset, but real data must follow HIPAA/GDPR rules as applicable.
- Use confidence intervals or prediction intervals in production.

## How to run evaluation
Open `notebooks/01_health_model.ipynb` and execute cells. The notebook saves model to `models/model.joblib` and prints evaluation metrics.
