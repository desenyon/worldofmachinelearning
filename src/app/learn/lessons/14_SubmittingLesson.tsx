'use client';

import Link from 'next/link';

export default function SubmittingLesson() {
  return (
    <div className="space-y-8">
      <p className="text-lg text-slate-700 leading-relaxed">
        You've completed the World of Machine Learning curriculum! Now it's time to apply what
        you've learned to a new dataset and share your work. Each submission earns you 10 XP!
      </p>

      {/* What makes a good submission */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">What Makes a Good Submission</h2>
        <p className="text-slate-700 mb-4">
          A great ML project isn't just about code. It's about telling a story with your data.
          Include these elements:
        </p>

        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <span className="bg-[#ec3750] text-white font-bold w-8 h-8 rounded-full flex items-center justify-center shrink-0">1</span>
              <div>
                <h3 className="font-bold text-slate-900">The Problem</h3>
                <p className="text-slate-600 text-sm">
                  What dataset did you use? What are you trying to predict and why does it matter?
                  Include a link to where you got the data.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <span className="bg-[#ec3750] text-white font-bold w-8 h-8 rounded-full flex items-center justify-center shrink-0">2</span>
              <div>
                <h3 className="font-bold text-slate-900">Data Exploration</h3>
                <p className="text-slate-600 text-sm">
                  What did you discover during EDA? Any interesting patterns? How did you handle
                  missing values and why?
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <span className="bg-[#ec3750] text-white font-bold w-8 h-8 rounded-full flex items-center justify-center shrink-0">3</span>
              <div>
                <h3 className="font-bold text-slate-900">Your Approach</h3>
                <p className="text-slate-600 text-sm">
                  What preprocessing steps did you take? What features did you use?
                  Did you engineer any new features?
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <span className="bg-[#ec3750] text-white font-bold w-8 h-8 rounded-full flex items-center justify-center shrink-0">4</span>
              <div>
                <h3 className="font-bold text-slate-900">Results</h3>
                <p className="text-slate-600 text-sm">
                  What models did you try? What accuracy/metrics did you achieve?
                  Which model performed best?
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <span className="bg-[#ec3750] text-white font-bold w-8 h-8 rounded-full flex items-center justify-center shrink-0">5</span>
              <div>
                <h3 className="font-bold text-slate-900">What You Learned</h3>
                <p className="text-slate-600 text-sm">
                  What was challenging? What would you do differently next time?
                  What new techniques did you discover?
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Submission format */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Submission Format</h2>
        <p className="text-slate-700 mb-4">
          You can submit your project in any of these formats:
        </p>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-center">
            <div className="text-3xl mb-2">📓</div>
            <h3 className="font-bold text-slate-900">Jupyter Notebook</h3>
            <p className="text-slate-500 text-sm mt-2">
              Code + explanations in one file. Upload to GitHub or Kaggle.
            </p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-center">
            <div className="text-3xl mb-2">🔗</div>
            <h3 className="font-bold text-slate-900">GitHub Repository</h3>
            <p className="text-slate-500 text-sm mt-2">
              Organized project with README. Shows professionalism.
            </p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-center">
            <div className="text-3xl mb-2">📝</div>
            <h3 className="font-bold text-slate-900">Blog Post</h3>
            <p className="text-slate-500 text-sm mt-2">
              Write about your journey. Great for your portfolio!
            </p>
          </div>
        </div>
      </section>

      {/* Example structure */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Example Project Structure</h2>
        <div className="bg-slate-900 text-slate-300 rounded-xl p-5 font-mono text-sm">
          <pre>{`my-ml-project/
  README.md           # Project description
  data/
    raw/              # Original dataset
    processed/        # Cleaned data
  notebooks/
    01_exploration.ipynb
    02_preprocessing.ipynb
    03_modeling.ipynb
  src/
    preprocess.py     # Reusable functions
    train.py          # Model training script
  requirements.txt    # Python dependencies`}</pre>
        </div>
      </section>

      {/* Congratulations */}
      <div className="bg-gradient-to-br from-[#ec3750] to-[#d63047] text-white rounded-xl p-8 mt-8">
        <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
        <p className="text-white/90 mb-4">
          You've completed the World of Machine Learning curriculum. You now understand:
        </p>
        <ul className="space-y-2 mb-6">
          <li className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            How to explore and understand datasets
          </li>
          <li className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            How to preprocess data for machine learning
          </li>
          <li className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            How to train and evaluate ML models
          </li>
          <li className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            How to compare different algorithms
          </li>
        </ul>
        <p className="text-white/90 mb-6">
          This is just the beginning. Keep building, keep learning, and keep pushing your skills!
        </p>
        <Link
          href="/submit"
          className="inline-block bg-white text-[#ec3750] px-8 py-3 rounded-lg font-bold hover:bg-slate-100 transition-colors"
        >
          Submit Your Project (+10 XP)
        </Link>
      </div>
    </div>
  );
}
