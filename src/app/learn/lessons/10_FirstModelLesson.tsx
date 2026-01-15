'use client';

import CodeBlock from '@/components/CodeBlock';

export default function FirstModelLesson() {
  return (
    <div className="space-y-8">
      <p className="text-lg text-slate-700 leading-relaxed">
        This is the moment you've been building toward: training your first machine learning model!
        We'll use Logistic Regression, a classic algorithm that's perfect for binary classification
        problems like predicting survival.
      </p>

      {/* Theory: Logistic Regression */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Theory: What is Logistic Regression?</h2>
        <div className="bg-slate-900 text-white rounded-xl p-6">
          <p className="text-slate-300 mb-4">
            Despite its name, Logistic Regression is used for <strong className="text-white">classification</strong>,
            not regression. It predicts the probability that something belongs to a particular class.
          </p>
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-white">How it works:</h3>
              <ol className="list-decimal list-inside text-slate-400 text-sm mt-2 space-y-2">
                <li>It combines all features (age, sex, class, etc.) into a single number</li>
                <li>It passes this number through a "sigmoid" function that outputs 0-1</li>
                <li>If the output is greater than 0.5, predict "survived"; otherwise "died"</li>
              </ol>
            </div>
            <div className="bg-slate-800 rounded-lg p-4">
              <p className="text-slate-400 text-sm">
                <strong className="text-white">Example:</strong> The model might learn:
                <code className="block mt-2 text-[#ec3750]">
                  score = -2.3 + (0.8 if female) + (1.2 if 1st class) - (0.5 * age/10) + ...
                </code>
                Then convert this score to a probability between 0 and 1.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Logistic Regression first */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Why Start with Logistic Regression?</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <h3 className="font-bold text-slate-900 mb-2">Fast</h3>
            <p className="text-slate-600 text-sm">
              Trains in milliseconds. Great for quick experiments and iteration.
            </p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <h3 className="font-bold text-slate-900 mb-2">Interpretable</h3>
            <p className="text-slate-600 text-sm">
              You can see which features matter most by looking at the learned weights.
            </p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <h3 className="font-bold text-slate-900 mb-2">Solid Baseline</h3>
            <p className="text-slate-600 text-sm">
              Often performs surprisingly well. If a complex model can't beat it, something's wrong.
            </p>
          </div>
        </div>
      </section>

      {/* Training the model */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Training the Model</h2>
        <p className="text-slate-700 mb-4">
          Training in scikit-learn is remarkably simple. Two lines of code:
        </p>

        <CodeBlock
          code={`from sklearn.linear_model import LogisticRegression

# 1. Create the model
# max_iter=1000 gives the algorithm enough iterations to converge
model = LogisticRegression(max_iter=1000)

# 2. Train it on the training data
# fit() is where the actual learning happens
model.fit(X_train, y_train)

print("Model trained!")`}
          language="python"
          filename="train_model.py"
        />

        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <div className="bg-[#ec3750]/5 border border-[#ec3750]/20 rounded-xl p-5">
            <h3 className="font-bold text-slate-900 mb-2">LogisticRegression()</h3>
            <p className="text-slate-600 text-sm">
              Creates a new, untrained model. It doesn't know anything yet. It's like a blank brain.
            </p>
          </div>
          <div className="bg-[#ec3750]/5 border border-[#ec3750]/20 rounded-xl p-5">
            <h3 className="font-bold text-slate-900 mb-2">model.fit(X_train, y_train)</h3>
            <p className="text-slate-600 text-sm">
              This is where the magic happens. The model looks at all training examples and
              figures out patterns that predict survival.
            </p>
          </div>
        </div>
      </section>

      {/* What happens during fit */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">What Happens During fit()?</h2>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
          <p className="text-slate-700 mb-4">
            When you call <code>fit()</code>, the algorithm:
          </p>
          <ol className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="bg-[#ec3750] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0">1</span>
              <p className="text-slate-600 text-sm">
                Starts with random weights for each feature
              </p>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-[#ec3750] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0">2</span>
              <p className="text-slate-600 text-sm">
                Makes predictions on all training samples using current weights
              </p>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-[#ec3750] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0">3</span>
              <p className="text-slate-600 text-sm">
                Measures how wrong those predictions are (the "loss")
              </p>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-[#ec3750] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0">4</span>
              <p className="text-slate-600 text-sm">
                Adjusts weights to reduce errors (gradient descent)
              </p>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-[#ec3750] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0">5</span>
              <p className="text-slate-600 text-sm">
                Repeats steps 2-4 until predictions stop improving
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* Making predictions */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Making Predictions</h2>
        <p className="text-slate-700 mb-4">
          Once trained, the model can predict survival for new passengers:
        </p>

        <CodeBlock
          code={`# Use the trained model to predict on test data
y_pred = model.predict(X_test)

# See some predictions vs actual values
print("First 10 predictions:", list(y_pred[:10]))
print("Actual values:       ", list(y_test[:10].values))

# You can also get probability estimates
y_proba = model.predict_proba(X_test)
print("\\nSurvival probabilities for first 3 passengers:")
for i in range(3):
    print(f"  Passenger {i}: {y_proba[i][1]:.1%} chance of survival")`}
          language="python"
          filename="predict.py"
        />

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mt-4">
          <h3 className="font-bold text-amber-900 mb-2">predict() vs predict_proba()</h3>
          <p className="text-amber-800 text-sm">
            <code>predict()</code> gives you 0 or 1 (the final decision).
            <code>predict_proba()</code> gives you probabilities like [0.3, 0.7], meaning
            30% chance of death, 70% chance of survival.
          </p>
        </div>
      </section>

      {/* See what the model learned */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">What Did the Model Learn?</h2>
        <p className="text-slate-700 mb-4">
          We can look at the model's coefficients to see which features matter most:
        </p>

        <CodeBlock
          code={`# Get feature importance
feature_importance = pd.DataFrame({
    'feature': X_train.columns,
    'coefficient': model.coef_[0]
}).sort_values('coefficient', key=abs, ascending=False)

print("Feature coefficients (higher = more important):")
print(feature_importance)

# Positive = increases survival chance
# Negative = decreases survival chance`}
          language="python"
        />

        <p className="text-slate-600 text-sm mt-4">
          You'll likely see that Sex has the largest coefficient (being female strongly predicts survival),
          followed by Pclass. This matches our EDA findings.
        </p>
      </section>

      {/* Success */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 mt-8">
        <h3 className="font-bold text-green-900 mb-2">You Built Your First ML Model!</h3>
        <p className="text-green-800">
          Congratulations! You've trained a real machine learning model that can predict Titanic survival.
          In the next lesson, we'll evaluate exactly how well it performs using proper metrics.
        </p>
      </div>
    </div>
  );
}
