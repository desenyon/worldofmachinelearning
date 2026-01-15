'use client';

export default function WhatIsMLLesson() {
  return (
    <div className="space-y-8">
      {/* Introduction */}
      <p className="text-lg text-slate-700 leading-relaxed">
        Welcome to the World of ML (machine learning!). I am sure, by now, everyone has heard the term "machine learning" thrown around, but what does it actually mean? In this lesson, 
        we'll break down the basics of machine learning and what we are going to be learning in this program!
      </p>

      {/* Section 1: The Big Idea */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">The Big Idea</h2>
        <p className="text-slate-700 mb-4">
          Traditional programming works like this: you write explicit rules that tell the computer exactly what to do.
          If you want to detect spam emails, you might write rules like "if the email contains 'FREE MONEY', mark it as spam."
        </p>
        <p className="text-slate-700 mb-4">
          The problem? Spammers are clever. They'll write "FR33 M0N3Y" instead, and your rule fails.
          You could add more rules, but you'll always be playing catch-up against people who will try to make it better.
        </p>
        
        <div className="bg-slate-900 text-white rounded-xl p-6 my-6">
          <h3 style={{ color: "white" }}>Machine Learning flips this around:</h3>
          <p className="text-slate-300">
            Instead of writing rules, you give the computer thousands of examples of spam and non-spam emails.
            The algorithm figures out the patterns on its own. It might discover that spam emails tend to have
            certain word combinations, come from certain domains, or have unusual formatting, even patterns
            you never thought of.
          </p>
        </div>
      </section>

      {/* Section 2: How Learning Works */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">How Does a Computer "Learn"?</h2>
        <p className="text-slate-700 mb-4">
          When we say a computer "learns," we mean it adjusts its internal parameters to get better at a task.
          Think of it like tuning a radio, but with millions of tiny knobs.
        </p>
        
        <div className="bg-[#ec3750]/5 border border-[#ec3750]/20 rounded-xl p-6 my-6">
          <h3 className="font-bold text-slate-900 mb-3">Here's the process:</h3>
          <ol className="space-y-3 text-slate-700">
            <li className="flex gap-3">
              <span className="font-bold text-[#ec3750] shrink-0">1.</span>
              <span><strong>Start with random guesses</strong> - The model begins knowing nothing</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-[#ec3750] shrink-0">2.</span>
              <span><strong>Make predictions</strong> - Given some input data, it guesses an output</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-[#ec3750] shrink-0">3.</span>
              <span><strong>Check the answer</strong> - Compare the guess to the real answer</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-[#ec3750] shrink-0">4.</span>
              <span><strong>Adjust</strong> - Tweak the internal parameters to be a little less wrong</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-[#ec3750] shrink-0">5.</span>
              <span><strong>Repeat</strong> - Do this thousands or millions of times</span>
            </li>
          </ol>
        </div>

        <p className="text-slate-700">
          After enough iterations, the model gets good at making predictions on data it has never seen before.
          That's the power of machine learning.
        </p>
      </section>

      {/* Section 3: Types of ML */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Types of Machine Learning</h2>
        <p className="text-slate-700 mb-6">
          There are three main types. In this course, we'll focus on the first one:
        </p>

        <div className="grid gap-4">
          <div className="bg-[#ec3750]/5 border-2 border-[#ec3750] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#ec3750] text-white text-xs font-bold px-2 py-1 rounded">THIS COURSE</span>
              <h3 className="font-bold text-slate-900">Supervised Learning</h3>
            </div>
            <p className="text-slate-700 text-sm">
              You have labeled data, meaning you know the right answers. You train the model on examples
              where you know the outcome, then it predicts on new data. Examples: predicting house prices,
              classifying emails as spam, diagnosing diseases.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <h3 className="font-bold text-slate-900 mb-2">Unsupervised Learning</h3>
            <p className="text-slate-600 text-sm">
              You have data but no labels. The algorithm finds hidden patterns or groupings on its own.
              Examples: customer segmentation, anomaly detection, recommendation systems.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <h3 className="font-bold text-slate-900 mb-2">Reinforcement Learning</h3>
            <p className="text-slate-600 text-sm">
              An agent learns by trial and error, receiving rewards or penalties.
              Examples: game-playing AI, robotics, self-driving cars.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: What You'll Build */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">What You Will Build</h2>
        <p className="text-slate-700 mb-4">
          In this course, you will build a <strong>classification model</strong> that predicts whether
          a passenger survived the Titanic disaster. This is supervised learning because we have historical
          data with known outcomes (survived or not).
        </p>

        <div className="bg-white border border-slate-200 rounded-xl p-6 my-6">
          <h3 className="font-bold text-slate-900 mb-4">The ML Workflow You Will Learn:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { step: '1', title: 'Get Data', desc: 'Download from Kaggle' },
              { step: '2', title: 'Explore', desc: 'Understand patterns' },
              { step: '3', title: 'Clean', desc: 'Fix missing values' },
              { step: '4', title: 'Prepare', desc: 'Convert to numbers' },
              { step: '5', title: 'Split', desc: 'Train vs test sets' },
              { step: '6', title: 'Train', desc: 'Fit the model' },
              { step: '7', title: 'Evaluate', desc: 'Measure accuracy' },
              { step: '8', title: 'Improve', desc: 'Try better approaches' },
            ].map((item) => (
              <div key={item.step} className="text-center p-3 bg-slate-50 rounded-lg">
                <div className="w-8 h-8 bg-[#ec3750] text-white rounded-full flex items-center justify-center font-bold mx-auto mb-2">
                  {item.step}
                </div>
                <div className="font-semibold text-slate-900 text-sm">{item.title}</div>
                <div className="text-xs text-slate-500">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Key Terminology */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Key Terms to Know</h2>
        <p className="text-slate-700 mb-4">
          You will hear these terms throughout the course. Bookmark this section for reference:
        </p>

        <div className="space-y-3">
          {[
            { term: 'Model', def: 'The algorithm that learns patterns from data and makes predictions' },
            { term: 'Features', def: 'The input variables (columns) used to make predictions. Example: age, gender, ticket class' },
            { term: 'Target', def: 'What you are trying to predict. For us: whether someone survived' },
            { term: 'Training', def: 'The process of feeding data to a model so it can learn patterns' },
            { term: 'Prediction', def: 'The model\'s guess for new, unseen data' },
            { term: 'Accuracy', def: 'The percentage of correct predictions' },
          ].map((item) => (
            <div key={item.term} className="flex gap-4 p-4 bg-slate-50 rounded-lg">
              <span className="font-mono font-bold text-[#ec3750] shrink-0 w-24">{item.term}</span>
              <span className="text-slate-700">{item.def}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <div className="bg-slate-900 text-white rounded-xl p-6 mt-8">
        <h3 style={{ color: "white" }}>Ready to start coding?</h3>
        <p className="text-slate-300">
          Click "Mark Complete" below, then move to the next lesson where we will set up Python
          and install the libraries you need.
        </p>
      </div>
    </div>
  );
}
