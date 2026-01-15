'use client';

import CodeBlock from '@/components/CodeBlock';

export default function TrainTestSplitLesson() {
  return (
    <div className="space-y-8">
      <p className="text-lg text-slate-700 leading-relaxed">
        Before training a model, we need to split our data into two parts: one for training and
        one for testing. This is crucial for knowing if our model actually works on new data.
      </p>

      {/* Theory: Why Split */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Theory: Why We Split Data</h2>
        <div className="bg-slate-900 text-white rounded-xl p-6">
          <p className="text-slate-300 mb-4">
            Imagine a student who memorizes every answer in a practice test, then takes the exact same test
            for their exam. They'd get 100%, but have they really learned anything?
          </p>
          <p className="text-slate-300 mb-4">
            The same problem happens with ML models. If we test on the same data we trained on, we're just
            measuring memorization, not learning. This is called <strong className="text-white">overfitting</strong>.
          </p>
          <div className="bg-slate-800 rounded-lg p-4 mt-4">
            <h3 className="font-bold text-white mb-2">The solution: Hold-out validation</h3>
            <p className="text-slate-400 text-sm">
              We hide some data from the model during training. Then we test on that hidden data to see
              how well the model generalizes to new, unseen examples.
            </p>
          </div>
        </div>
      </section>

      {/* Visual explanation */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">How Train-Test Split Works</h2>
        
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-full bg-slate-300 rounded-lg h-8 flex items-center justify-center text-sm font-mono">
                891 passengers (full dataset)
              </div>
            </div>
            <div className="text-center text-slate-500 text-2xl">↓ is split into ↓</div>
            <div className="flex gap-4">
              <div className="w-4/5 bg-[#ec3750] text-white rounded-lg h-12 flex items-center justify-center text-sm font-bold">
                712 for Training (80%)
              </div>
              <div className="w-1/5 bg-slate-700 text-white rounded-lg h-12 flex items-center justify-center text-sm font-bold">
                179 for Testing (20%)
              </div>
            </div>
          </div>
          <p className="text-slate-600 text-sm mt-4">
            The model learns patterns from the training data, then we check its predictions on the test data.
          </p>
        </div>
      </section>

      {/* The code */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Implementing the Split</h2>
        <p className="text-slate-700 mb-4">
          Scikit-learn provides a convenient function for this:
        </p>

        <CodeBlock
          code={`from sklearn.model_selection import train_test_split

# Split data: 80% training, 20% testing
# X = features, y = target
X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,       # 20% goes to test set
    random_state=42,     # Makes the split reproducible
    stratify=y           # Keeps same survival ratio in both sets
)

# Check the results
print(f"Training set: {X_train.shape[0]} samples")
print(f"Test set: {X_test.shape[0]} samples")

# Verify stratification worked
print(f"\\nSurvival rate in training: {y_train.mean():.2%}")
print(f"Survival rate in test: {y_test.mean():.2%}")
# Both should be close to 38%`}
          language="python"
          filename="split_data.py"
        />
      </section>

      {/* Understanding parameters */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Understanding the Parameters</h2>
        
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <code className="font-mono font-bold text-[#ec3750]">test_size=0.2</code>
            <p className="text-slate-700 text-sm mt-2">
              The fraction of data to put in the test set. Common choices are 0.2 (20%) or 0.25 (25%).
              With 891 samples, 20% gives us 179 test samples, which is enough for reliable evaluation.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <code className="font-mono font-bold text-[#ec3750]">random_state=42</code>
            <p className="text-slate-700 text-sm mt-2">
              A seed for the random number generator. Without this, you'd get a different split every time
              you run the code. Setting a random_state makes your results reproducible.
            </p>
            <p className="text-slate-500 text-xs mt-2">
              42 is a common choice (it's a Hitchhiker's Guide reference), but any number works.
            </p>
          </div>

          <div className="bg-[#ec3750]/5 border-2 border-[#ec3750] rounded-xl p-5">
            <code className="font-mono font-bold text-[#ec3750]">stratify=y</code>
            <p className="text-slate-700 text-sm mt-2">
              This is important! It ensures both train and test sets have the same proportion of survivors.
              Without stratification, random chance might give you a test set with 50% survivors even though
              the overall rate is 38%.
            </p>
            <p className="text-slate-500 text-xs mt-2">
              Stratification is especially important for imbalanced datasets like ours.
            </p>
          </div>
        </div>
      </section>

      {/* What we get */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">What We Get</h2>
        <p className="text-slate-700 mb-4">
          The function returns four variables:
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <h3 className="font-bold text-slate-900 mb-2">Training Data</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <code className="text-[#ec3750]">X_train</code>
                <span className="text-slate-600">Features to learn from</span>
              </div>
              <div className="flex justify-between">
                <code className="text-[#ec3750]">y_train</code>
                <span className="text-slate-600">Correct answers for training</span>
              </div>
            </div>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <h3 className="font-bold text-slate-900 mb-2">Testing Data</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <code className="text-[#ec3750]">X_test</code>
                <span className="text-slate-600">Features to predict on</span>
              </div>
              <div className="flex justify-between">
                <code className="text-[#ec3750]">y_test</code>
                <span className="text-slate-600">Correct answers (to check our predictions)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common mistake */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
        <h3 className="font-bold text-amber-900 mb-2">Common Mistake: Data Leakage</h3>
        <p className="text-amber-800 text-sm mb-3">
          Never use test data for any decisions during training. This includes:
        </p>
        <ul className="text-amber-800 text-sm list-disc list-inside space-y-1 ml-2">
          <li>Filling missing values using statistics from the full dataset (use train only)</li>
          <li>Scaling features using min/max from the full dataset</li>
          <li>Selecting features based on correlations with the full target</li>
        </ul>
        <p className="text-amber-700 text-xs mt-3">
          For this beginner tutorial, we kept things simple. In production, you'd be more careful about this.
        </p>
      </div>

      {/* Success */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 mt-8">
        <h3 className="font-bold text-green-900 mb-2">Data Split Complete!</h3>
        <p className="text-green-800">
          You now have separate training and test sets. The model will learn from X_train/y_train,
          and we'll evaluate its performance on X_test/y_test. Time to train our first model!
        </p>
      </div>
    </div>
  );
}
