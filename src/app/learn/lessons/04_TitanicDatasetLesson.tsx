'use client';

export default function TitanicDatasetLesson() {
  return (
    <div className="space-y-8">
      <p className="text-lg text-slate-700 leading-relaxed">
        The Titanic dataset is one of the most famous beginner ML datasets. It contains real passenger
        information from the RMS Titanic, which sank on April 15, 1912. Our job: build a model that predicts
        who survived based on their characteristics.
      </p>

      {/* Why this dataset */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Why Start with Titanic?</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <h3 className="font-bold text-slate-900 mb-2">Perfect Size</h3>
            <p className="text-slate-600 text-sm">
              891 rows is small enough to understand completely, but large enough to train a real model.
              You won't need expensive hardware or long training times.
            </p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <h3 className="font-bold text-slate-900 mb-2">Real-World Messiness</h3>
            <p className="text-slate-600 text-sm">
              The data has missing values, mixed data types, and requires feature engineering.
              It teaches you to handle problems you'll face with any real dataset.
            </p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <h3 className="font-bold text-slate-900 mb-2">Intuitive Features</h3>
            <p className="text-slate-600 text-sm">
              You can reason about why certain features matter. "Women and children first" was a real
              policy, younger and richer passengers had better access to lifeboats.
            </p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <h3 className="font-bold text-slate-900 mb-2">Benchmark Available</h3>
            <p className="text-slate-600 text-sm">
              Thousands of people have worked on this dataset. You can compare your results to
              see how well you're doing (top scores are around 80% accuracy).
            </p>
          </div>
        </div>
      </section>

      {/* Download */}
      <div className="bg-[#ec3750]/5 border border-[#ec3750]/20 rounded-xl p-6">
        <h3 className="font-bold text-[#ec3750] mb-3">Download the Dataset</h3>
        <p className="text-slate-700 mb-4">
          Get the dataset from Kaggle. You'll need a free account.
        </p>
        <a
          href="https://www.kaggle.com/c/titanic/data"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#ec3750] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#d63047] transition-colors"
        >
          Download from Kaggle
        </a>
        <p className="text-sm text-slate-500 mt-4">
          Download <code className="bg-slate-200 px-1.5 py-0.5 rounded">train.csv</code> and put it in your project folder.
          We'll use this file for all our work.
        </p>
      </div>

      {/* Dataset stats */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Dataset at a Glance</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-[#ec3750] font-mono">891</div>
            <div className="text-sm text-slate-500">Passengers</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-[#ec3750] font-mono">12</div>
            <div className="text-sm text-slate-500">Columns</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-[#ec3750] font-mono">38%</div>
            <div className="text-sm text-slate-500">Survived</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-[#ec3750] font-mono">177</div>
            <div className="text-sm text-slate-500">Missing Ages</div>
          </div>
        </div>
      </section>

      {/* Column explanations */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Understanding Each Column</h2>
        <p className="text-slate-700 mb-4">
          Let's go through each column and understand what it means and why it might matter:
        </p>

        <div className="space-y-4">
          {/* Target Variable */}
          <div className="bg-[#ec3750]/10 border-2 border-[#ec3750] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#ec3750] text-white text-xs font-bold px-2 py-1 rounded">TARGET</span>
              <code className="font-mono font-bold text-slate-900">Survived</code>
            </div>
            <p className="text-slate-700 text-sm mb-2">
              <strong>Values:</strong> 0 = did not survive, 1 = survived
            </p>
            <p className="text-slate-600 text-sm">
              This is what we're trying to predict. In ML terms, this is our <strong>target variable</strong> or <strong>label</strong>.
              Everything else is used to predict this.
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <code className="font-mono font-bold text-[#ec3750]">Pclass</code>
              <p className="text-slate-700 text-sm mt-2">
                <strong>Ticket class:</strong> 1 = First, 2 = Second, 3 = Third
              </p>
              <p className="text-slate-500 text-xs mt-2">
                <em>Why it matters:</em> First class passengers had cabins closer to the deck and better access to lifeboats.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <code className="font-mono font-bold text-[#ec3750]">Sex</code>
              <p className="text-slate-700 text-sm mt-2">
                <strong>Gender:</strong> male or female
              </p>
              <p className="text-slate-500 text-xs mt-2">
                <em>Why it matters:</em> "Women and children first" was the evacuation policy. This is likely the strongest predictor.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <code className="font-mono font-bold text-[#ec3750]">Age</code>
              <p className="text-slate-700 text-sm mt-2">
                <strong>Age in years</strong> (177 values are missing)
              </p>
              <p className="text-slate-500 text-xs mt-2">
                <em>Why it matters:</em> Children were prioritized. We'll need to handle the missing values somehow.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <code className="font-mono font-bold text-[#ec3750]">SibSp</code>
              <p className="text-slate-700 text-sm mt-2">
                <strong>Siblings/Spouses aboard</strong>
              </p>
              <p className="text-slate-500 text-xs mt-2">
                <em>Why it matters:</em> Traveling with family might affect survival, people may have stayed together.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <code className="font-mono font-bold text-[#ec3750]">Parch</code>
              <p className="text-slate-700 text-sm mt-2">
                <strong>Parents/Children aboard</strong>
              </p>
              <p className="text-slate-500 text-xs mt-2">
                <em>Why it matters:</em> Similar to SibSp, families may have different survival patterns.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <code className="font-mono font-bold text-[#ec3750]">Fare</code>
              <p className="text-slate-700 text-sm mt-2">
                <strong>Ticket price in pounds</strong>
              </p>
              <p className="text-slate-500 text-xs mt-2">
                <em>Why it matters:</em> Higher fares correlate with better cabins and class. Related to Pclass but more granular.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <code className="font-mono font-bold text-[#ec3750]">Embarked</code>
              <p className="text-slate-700 text-sm mt-2">
                <strong>Port of embarkation:</strong> C = Cherbourg, Q = Queenstown, S = Southampton
              </p>
              <p className="text-slate-500 text-xs mt-2">
                <em>Why it matters:</em> Different ports had different passenger demographics.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
              <code className="font-mono text-slate-400">Name, Ticket, Cabin</code>
              <p className="text-slate-500 text-sm mt-2">
                We'll mostly ignore these for our first model, but advanced techniques can extract useful info from them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Theory: Classification */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Theory: Classification Problems</h2>
        <div className="bg-slate-900 text-white rounded-xl p-6">
          <p className="text-slate-300 mb-4">
            The Titanic problem is a <strong className="text-white">binary classification</strong> task.
            We're predicting one of two classes: survived (1) or not (0).
          </p>
          <p className="text-slate-300 mb-4">
            Other classification problems include:
          </p>
          <ul className="list-disc list-inside text-slate-300 space-y-1 ml-4">
            <li>Email spam detection (spam or not spam)</li>
            <li>Disease diagnosis (has disease or doesn't)</li>
            <li>Credit approval (approve or deny)</li>
            <li>Image classification (cat, dog, or bird, this is multi-class)</li>
          </ul>
          <p className="text-slate-400 text-sm mt-4">
            Later in the course, we'll discuss how classification differs from regression (predicting continuous values like house prices).
          </p>
        </div>
      </section>

      {/* Next steps */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 mt-8">
        <h3 className="font-bold text-green-900 mb-2">Dataset acquired!</h3>
        <p className="text-green-800">
          You now understand what we're working with. In the next lesson, we'll load this CSV file
          into Python and start exploring the data with pandas.
        </p>
      </div>
    </div>
  );
}
