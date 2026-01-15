'use client';

export default function NewDatasetsLesson() {
  return (
    <div className="space-y-8">
      <p className="text-lg text-slate-700 leading-relaxed">
        You've mastered the ML workflow on the Titanic dataset. Now it's time to apply your
        skills to new challenges! Each dataset you work on reinforces your learning and exposes
        you to different problem types.
      </p>

      {/* The workflow */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Your ML Workflow (To Apply Anywhere)</h2>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#ec3750] text-white rounded-full flex items-center justify-center font-bold mx-auto mb-2">1</div>
              <p className="text-sm font-bold text-slate-900">Explore</p>
              <p className="text-xs text-slate-500">Load, understand, visualize</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#ec3750] text-white rounded-full flex items-center justify-center font-bold mx-auto mb-2">2</div>
              <p className="text-sm font-bold text-slate-900">Clean</p>
              <p className="text-xs text-slate-500">Missing values, encoding</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#ec3750] text-white rounded-full flex items-center justify-center font-bold mx-auto mb-2">3</div>
              <p className="text-sm font-bold text-slate-900">Model</p>
              <p className="text-xs text-slate-500">Train, predict, evaluate</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#ec3750] text-white rounded-full flex items-center justify-center font-bold mx-auto mb-2">4</div>
              <p className="text-sm font-bold text-slate-900">Iterate</p>
              <p className="text-xs text-slate-500">Try more models, improve</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended datasets */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Recommended Datasets</h2>
        <p className="text-slate-700 mb-4">
          Start with these well-documented datasets. Each teaches you something new:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="https://www.kaggle.com/datasets/uciml/iris"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border border-slate-200 rounded-xl p-5 hover:border-[#ec3750] hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between">
              <h4 className="font-bold text-slate-900">Iris Dataset</h4>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Beginner</span>
            </div>
            <p className="text-sm text-slate-600 mt-2">Classify flower species by measurements.</p>
            <p className="text-xs text-slate-400 mt-2">
              <strong>What you'll learn:</strong> Multi-class classification (3 species instead of 2)
            </p>
          </a>

          <a
            href="https://www.kaggle.com/c/house-prices-advanced-regression-techniques"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border border-slate-200 rounded-xl p-5 hover:border-[#ec3750] hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between">
              <h4 className="font-bold text-slate-900">House Prices</h4>
              <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded">Intermediate</span>
            </div>
            <p className="text-sm text-slate-600 mt-2">Predict house sale prices.</p>
            <p className="text-xs text-slate-400 mt-2">
              <strong>What you'll learn:</strong> Regression (predicting numbers, not categories)
            </p>
          </a>

          <a
            href="https://www.kaggle.com/datasets/uciml/breast-cancer-wisconsin-data"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border border-slate-200 rounded-xl p-5 hover:border-[#ec3750] hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between">
              <h4 className="font-bold text-slate-900">Breast Cancer</h4>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Beginner</span>
            </div>
            <p className="text-sm text-slate-600 mt-2">Classify tumors as malignant or benign.</p>
            <p className="text-xs text-slate-400 mt-2">
              <strong>What you'll learn:</strong> Medical ML, precision/recall tradeoffs
            </p>
          </a>

          <a
            href="https://www.kaggle.com/datasets/lakshmi25npathi/imdb-dataset-of-50k-movie-reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border border-slate-200 rounded-xl p-5 hover:border-[#ec3750] hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between">
              <h4 className="font-bold text-slate-900">IMDB Reviews</h4>
              <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded">Intermediate</span>
            </div>
            <p className="text-sm text-slate-600 mt-2">Classify movie reviews as positive/negative.</p>
            <p className="text-xs text-slate-400 mt-2">
              <strong>What you'll learn:</strong> Natural Language Processing (NLP), text data
            </p>
          </a>

          <a
            href="https://www.kaggle.com/datasets/uciml/default-of-credit-card-clients-dataset"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border border-slate-200 rounded-xl p-5 hover:border-[#ec3750] hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between">
              <h4 className="font-bold text-slate-900">Credit Card Default</h4>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Beginner</span>
            </div>
            <p className="text-sm text-slate-600 mt-2">Predict if a customer will default on payment.</p>
            <p className="text-xs text-slate-400 mt-2">
              <strong>What you'll learn:</strong> Imbalanced data, financial ML
            </p>
          </a>

          <a
            href="https://www.kaggle.com/c/digit-recognizer"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border border-slate-200 rounded-xl p-5 hover:border-[#ec3750] hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between">
              <h4 className="font-bold text-slate-900">MNIST Digits</h4>
              <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded">Intermediate</span>
            </div>
            <p className="text-sm text-slate-600 mt-2">Recognize handwritten digits (0-9).</p>
            <p className="text-xs text-slate-400 mt-2">
              <strong>What you'll learn:</strong> Image data, high-dimensional features
            </p>
          </a>
        </div>
      </section>

      {/* Tips for new datasets */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Tips for Tackling New Datasets</h2>
        <div className="space-y-3">
          <div className="bg-[#ec3750]/5 border border-[#ec3750]/20 rounded-xl p-4">
            <h3 className="font-bold text-slate-900 mb-1">Always start with EDA</h3>
            <p className="text-slate-600 text-sm">
              Before any modeling, understand your data. Check shapes, types, missing values, and distributions.
            </p>
          </div>
          <div className="bg-[#ec3750]/5 border border-[#ec3750]/20 rounded-xl p-4">
            <h3 className="font-bold text-slate-900 mb-1">Read the documentation</h3>
            <p className="text-slate-600 text-sm">
              Kaggle datasets come with descriptions. Read them! Understanding what each column means helps you make better decisions.
            </p>
          </div>
          <div className="bg-[#ec3750]/5 border border-[#ec3750]/20 rounded-xl p-4">
            <h3 className="font-bold text-slate-900 mb-1">Start simple, then improve</h3>
            <p className="text-slate-600 text-sm">
              Get a basic model working first. Then iterate. Don't try to build the perfect model on day one.
            </p>
          </div>
          <div className="bg-[#ec3750]/5 border border-[#ec3750]/20 rounded-xl p-4">
            <h3 className="font-bold text-slate-900 mb-1">Learn from others</h3>
            <p className="text-slate-600 text-sm">
              Kaggle has "notebooks" from other users. After trying yourself, look at top solutions to learn new techniques.
            </p>
          </div>
        </div>
      </section>

      {/* Browse Kaggle */}
      <div className="bg-slate-900 text-white rounded-xl p-6">
        <h3 className="font-bold text-lg mb-2">Explore More on Kaggle</h3>
        <p className="text-slate-300 mb-4">
          Kaggle has thousands of datasets across every domain: healthcare, finance, sports, environment, and more.
          Find one that interests you!
        </p>
        <a
          href="https://www.kaggle.com/datasets"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#ec3750] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#d63047] transition-colors"
        >
          Browse Kaggle Datasets
        </a>
      </div>

      {/* Success */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 mt-8">
        <h3 className="font-bold text-green-900 mb-2">Ready to Explore!</h3>
        <p className="text-green-800">
          Pick a dataset that interests you and apply your new skills. Each project you complete
          deepens your understanding and builds your portfolio. You've got this!
        </p>
      </div>
    </div>
  );
}
