'use client';

import CodeBlock from '@/components/CodeBlock';

export default function EvaluatingLesson() {
  return (
    <div className="space-y-8">
      <p className="text-lg text-slate-700 leading-relaxed">
        How do we know if our model is actually good? We need proper evaluation metrics.
        Just looking at raw predictions isn't enough. We need numbers that tell us exactly
        how well the model performs.
      </p>

      {/* Theory: Why accuracy isn't everything */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Theory: Beyond Accuracy</h2>
        <div className="bg-slate-900 text-white rounded-xl p-6">
          <p className="text-slate-300 mb-4">
            <strong className="text-white">Accuracy</strong> (% correct) is intuitive but can be misleading.
            Consider a disease that affects 1% of people. A model that always predicts "no disease" would be
            99% accurate but completely useless.
          </p>
          <p className="text-slate-400 text-sm">
            For the Titanic dataset (38% survived), a model predicting "everyone died" would be 62% accurate.
            We need metrics that account for both types of predictions.
          </p>
        </div>
      </section>

      {/* Basic accuracy */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Calculating Accuracy</h2>
        <p className="text-slate-700 mb-4">
          Let's start with the simplest metric:
        </p>

        <CodeBlock
          code={`from sklearn.metrics import accuracy_score

# Compare predictions to actual values
accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy:.2%}")

# What this means:
# If accuracy is 80%, the model correctly predicted 80% of passengers
# You should get around 79-81% with Logistic Regression`}
          language="python"
          filename="evaluate.py"
        />
      </section>

      {/* Confusion Matrix */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">The Confusion Matrix</h2>
        <p className="text-slate-700 mb-4">
          A confusion matrix shows you exactly where the model is right and wrong:
        </p>

        <CodeBlock
          code={`from sklearn.metrics import confusion_matrix

cm = confusion_matrix(y_test, y_pred)
print("Confusion Matrix:")
print(cm)

# Output will look like:
# [[97  13]     <- Row 1: Actual = Died
#  [24  45]]    <- Row 2: Actual = Survived

# Reading it:
# 97 = Correctly predicted died (True Negatives)
# 13 = Predicted survived but actually died (False Positives)
# 24 = Predicted died but actually survived (False Negatives)
# 45 = Correctly predicted survived (True Positives)`}
          language="python"
          filename="confusion_matrix.py"
        />

        <div className="mt-6 bg-slate-50 border border-slate-200 rounded-xl p-6">
          <h3 className="font-bold text-slate-900 mb-4 text-center">Understanding the Confusion Matrix</h3>
          <div className="grid grid-cols-3 gap-2 text-center text-sm max-w-md mx-auto">
            <div></div>
            <div className="font-bold text-slate-700">Predicted: Died</div>
            <div className="font-bold text-slate-700">Predicted: Survived</div>
            
            <div className="font-bold text-slate-700 text-right pr-2">Actual: Died</div>
            <div className="bg-green-100 border border-green-300 rounded p-3">
              <div className="font-bold text-green-800">97</div>
              <div className="text-xs text-green-600">True Negative</div>
            </div>
            <div className="bg-red-100 border border-red-300 rounded p-3">
              <div className="font-bold text-red-800">13</div>
              <div className="text-xs text-red-600">False Positive</div>
            </div>
            
            <div className="font-bold text-slate-700 text-right pr-2">Actual: Survived</div>
            <div className="bg-red-100 border border-red-300 rounded p-3">
              <div className="font-bold text-red-800">24</div>
              <div className="text-xs text-red-600">False Negative</div>
            </div>
            <div className="bg-green-100 border border-green-300 rounded p-3">
              <div className="font-bold text-green-800">45</div>
              <div className="text-xs text-green-600">True Positive</div>
            </div>
          </div>
        </div>
      </section>

      {/* Precision, Recall, F1 */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Precision, Recall, and F1 Score</h2>
        <p className="text-slate-700 mb-4">
          These metrics give you a more nuanced view of model performance:
        </p>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h3 className="font-bold text-[#ec3750] mb-2">Precision</h3>
            <p className="text-slate-600 text-sm mb-2">
              Of all passengers we predicted would survive, what % actually did?
            </p>
            <div className="bg-slate-100 rounded p-2 text-center font-mono text-xs">
              TP / (TP + FP)
            </div>
            <p className="text-slate-500 text-xs mt-2">
              High precision = few false alarms
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h3 className="font-bold text-[#ec3750] mb-2">Recall</h3>
            <p className="text-slate-600 text-sm mb-2">
              Of all passengers who actually survived, what % did we find?
            </p>
            <div className="bg-slate-100 rounded p-2 text-center font-mono text-xs">
              TP / (TP + FN)
            </div>
            <p className="text-slate-500 text-xs mt-2">
              High recall = don't miss survivors
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h3 className="font-bold text-[#ec3750] mb-2">F1 Score</h3>
            <p className="text-slate-600 text-sm mb-2">
              Harmonic mean of precision and recall. Balances both.
            </p>
            <div className="bg-slate-100 rounded p-2 text-center font-mono text-xs">
              2 * (P * R) / (P + R)
            </div>
            <p className="text-slate-500 text-xs mt-2">
              Good overall metric
            </p>
          </div>
        </div>

        <CodeBlock
          code={`from sklearn.metrics import classification_report

# Get a complete report with all metrics
print(classification_report(y_test, y_pred, target_names=['Died', 'Survived']))

# Output:
#               precision    recall  f1-score   support
#         Died       0.80      0.88      0.84       110
#     Survived       0.78      0.65      0.71        69
#     accuracy                           0.79       179
#    macro avg       0.79      0.77      0.77       179
# weighted avg       0.79      0.79      0.79       179`}
          language="python"
          filename="classification_report.py"
        />
      </section>

      {/* Results summary */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Interpreting Our Results</h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-xl p-5">
            <div className="text-3xl font-bold text-green-700 font-mono">~80%</div>
            <div className="text-sm text-green-600 font-bold">Accuracy</div>
            <p className="text-green-700 text-sm mt-2">
              4 out of 5 predictions are correct. Good for a first model!
            </p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <div className="text-3xl font-bold text-amber-700 font-mono">~65%</div>
            <div className="text-sm text-amber-600 font-bold">Recall (Survived)</div>
            <p className="text-amber-700 text-sm mt-2">
              We're missing some survivors. The model is slightly biased toward predicting death.
            </p>
          </div>
        </div>

        <p className="text-slate-600 text-sm mt-4">
          Our model is decent but not perfect. It's better at predicting deaths than survivals.
          This makes sense since there were more deaths in the training data.
        </p>
      </section>

      {/* Success */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 mt-8">
        <h3 className="font-bold text-green-900 mb-2">Model Evaluated!</h3>
        <p className="text-green-800">
          You now know how to properly evaluate a classification model using accuracy, confusion matrices,
          precision, recall, and F1 score. In the next lesson, we'll try to improve our results.
        </p>
      </div>
    </div>
  );
}
