'use client';

import CodeBlock from '@/components/CodeBlock';

export default function ImprovingLesson() {
  return (
    <div className="space-y-8">
      <p className="text-lg text-slate-700 leading-relaxed">
        80% accuracy is a solid start, but can we do better? In this lesson, we'll explore
        different algorithms and techniques to improve our predictions. This process of
        trying different approaches is a core part of the ML workflow.
      </p>

      {/* Theory: No Free Lunch */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Theory: The No Free Lunch Theorem</h2>
        <div className="bg-slate-900 text-white rounded-xl p-6">
          <p className="text-slate-300 mb-4">
            There's a famous theorem in ML: <strong className="text-white">no single algorithm is best for all problems</strong>.
            Logistic Regression works well for some datasets but poorly for others.
          </p>
          <p className="text-slate-400 text-sm">
            This is why we try multiple algorithms. The "best" algorithm depends on your specific data's
            structure, size, and the patterns within it.
          </p>
        </div>
      </section>

      {/* Random Forest */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Try Random Forest</h2>
        <p className="text-slate-700 mb-4">
          Random Forest is a powerful "ensemble" method that combines many decision trees:
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-4">
          <h3 className="font-bold text-slate-900 mb-3">How Random Forest Works</h3>
          <ol className="space-y-2 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <span className="bg-[#ec3750] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0">1</span>
              Creates many decision trees (default: 100)
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-[#ec3750] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0">2</span>
              Each tree trains on a random subset of data
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-[#ec3750] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0">3</span>
              Each tree considers only random features at each split
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-[#ec3750] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0">4</span>
              Final prediction = majority vote across all trees
            </li>
          </ol>
          <p className="text-slate-500 text-xs mt-3">
            This randomness helps prevent overfitting and makes the model more robust.
          </p>
        </div>

        <CodeBlock
          code={`from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Create and train Random Forest
rf_model = RandomForestClassifier(
    n_estimators=100,    # Number of trees
    random_state=42      # For reproducibility
)
rf_model.fit(X_train, y_train)

# Evaluate
rf_pred = rf_model.predict(X_test)
rf_accuracy = accuracy_score(y_test, rf_pred)
print(f"Random Forest Accuracy: {rf_accuracy:.2%}")
# You might get 80-83%`}
          language="python"
          filename="random_forest.py"
        />
      </section>

      {/* Compare models */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Comparing Multiple Models</h2>
        <p className="text-slate-700 mb-4">
          Let's try several algorithms and compare them:
        </p>

        <CodeBlock
          code={`from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier

# Dictionary of models to try
models = {
    'Logistic Regression': LogisticRegression(max_iter=1000),
    'Random Forest': RandomForestClassifier(n_estimators=100, random_state=42),
    'Gradient Boosting': GradientBoostingClassifier(random_state=42),
    'SVM': SVC(random_state=42),
    'K-Nearest Neighbors': KNeighborsClassifier()
}

# Train and evaluate each
print("Model Comparison:")
print("-" * 40)
results = {}

for name, model in models.items():
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    results[name] = accuracy
    print(f"{name:25s}: {accuracy:.2%}")

# Find the best
best_model = max(results, key=results.get)
print(f"\\nBest model: {best_model} ({results[best_model]:.2%})")`}
          language="python"
          filename="compare_models.py"
        />

        <div className="bg-slate-100 rounded-xl p-4 mt-4 font-mono text-sm">
          <pre>{`Model Comparison:
----------------------------------------
Logistic Regression      : 79.89%
Random Forest            : 81.56%
Gradient Boosting        : 82.12%
SVM                      : 80.45%
K-Nearest Neighbors      : 78.21%

Best model: Gradient Boosting (82.12%)`}</pre>
        </div>
      </section>

      {/* Feature Importance */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Understanding Feature Importance</h2>
        <p className="text-slate-700 mb-4">
          Random Forest and tree-based models can tell us which features matter most:
        </p>

        <CodeBlock
          code={`import pandas as pd

# Get feature importance from Random Forest
importance = pd.DataFrame({
    'feature': X_train.columns,
    'importance': rf_model.feature_importances_
}).sort_values('importance', ascending=False)

print("Feature Importance:")
print(importance.to_string(index=False))

# Output (typically):
# feature      importance
# Sex              0.28
# Fare             0.26
# Age              0.24
# Pclass           0.10
# ...`}
          language="python"
          filename="feature_importance.py"
        />

        <div className="bg-[#ec3750]/5 border border-[#ec3750]/20 rounded-xl p-5 mt-4">
          <h3 className="font-bold text-slate-900 mb-2">What This Tells Us</h3>
          <p className="text-slate-600 text-sm">
            Sex, Fare, and Age are the most important predictors. This aligns with our EDA:
            women survived more, higher fares meant better class, and children were prioritized.
            The model learned the same patterns we discovered manually!
          </p>
        </div>
      </section>

      {/* Other ways to improve */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Other Ways to Improve</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h3 className="font-bold text-slate-900 mb-2">Feature Engineering</h3>
            <p className="text-slate-600 text-sm">
              Create new features from existing ones. For example, combine SibSp and Parch
              into "FamilySize", or extract titles from names.
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h3 className="font-bold text-slate-900 mb-2">Hyperparameter Tuning</h3>
            <p className="text-slate-600 text-sm">
              Adjust model settings (like n_estimators for Random Forest) to find
              the optimal configuration.
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h3 className="font-bold text-slate-900 mb-2">Cross-Validation</h3>
            <p className="text-slate-600 text-sm">
              Instead of one train/test split, use multiple splits to get a more
              reliable accuracy estimate.
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h3 className="font-bold text-slate-900 mb-2">Ensemble Methods</h3>
            <p className="text-slate-600 text-sm">
              Combine predictions from multiple models. The wisdom of crowds often
              beats any single model.
            </p>
          </div>
        </div>
      </section>

      {/* Summary */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 mt-8">
        <h3 className="font-bold text-green-900 mb-3">What You've Learned</h3>
        <ul className="text-green-800 space-y-1 list-disc list-inside">
          <li>Load and explore data with pandas</li>
          <li>Handle missing values strategically</li>
          <li>Encode categorical variables (binary and one-hot)</li>
          <li>Split data properly with stratification</li>
          <li>Train and evaluate multiple models</li>
          <li>Compare algorithms and interpret results</li>
          <li>Understand feature importance</li>
        </ul>
        <p className="text-green-800 mt-4">
          You now have a complete ML workflow that you can apply to any dataset!
        </p>
      </div>
    </div>
  );
}
