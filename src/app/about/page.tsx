'use client';

import { motion } from 'framer-motion';
import Card, { CardHeader, CardContent } from '@/components/Card';
import Badge from '@/components/Badge';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const labRules = [
  {
    number: '01',
    title: 'Start with a Baseline',
    description: 'Always establish a simple baseline before trying complex approaches. You need a reference point to measure improvements against.',
  },
  {
    number: '02',
    title: 'Measure Honestly',
    description: 'Never evaluate on training data. Use proper train/validation splits. Report real metrics, not cherry-picked results.',
  },
  {
    number: '03',
    title: 'Ship Something Reproducible',
    description: 'Set random seeds, document your process, and ensure others can run your code and get the same results.',
  },
  {
    number: '04',
    title: 'Learn by Improving',
    description: 'Make incremental changes and track what works. Understanding why something improves is more valuable than the improvement itself.',
  },
];

const datasetCategories = [
  {
    category: 'Classification (Binary)',
    datasets: [
      { name: 'Heart Disease UCI', difficulty: 'Beginner', description: 'Predict heart disease presence', link: 'https://www.kaggle.com/datasets/redwankarimsony/heart-disease-data' },
      { name: 'Breast Cancer Wisconsin', difficulty: 'Beginner', description: 'Diagnose malignant vs benign', link: 'https://www.kaggle.com/datasets/uciml/breast-cancer-wisconsin-data' },
      { name: 'Bank Marketing', difficulty: 'Intermediate', description: 'Predict term deposit subscription', link: 'https://www.kaggle.com/datasets/henriqueyamahata/bank-marketing' },
      { name: 'Adult Income', difficulty: 'Intermediate', description: 'Predict income over 50K', link: 'https://www.kaggle.com/datasets/uciml/adult-census-income' },
    ],
  },
  {
    category: 'Classification (Multi-class)',
    datasets: [
      { name: 'Iris', difficulty: 'Beginner', description: 'Classify flower species (3 classes)', link: 'https://www.kaggle.com/datasets/uciml/iris' },
      { name: 'Wine', difficulty: 'Beginner', description: 'Classify wine cultivars (3 classes)', link: 'https://www.kaggle.com/datasets/brynja/wineuci' },
      { name: 'MNIST', difficulty: 'Intermediate', description: 'Handwritten digit recognition', link: 'https://www.kaggle.com/datasets/hojjatk/mnist-dataset' },
      { name: 'Fashion MNIST', difficulty: 'Intermediate', description: 'Clothing item classification', link: 'https://www.kaggle.com/datasets/zalando-research/fashionmnist' },
    ],
  },
  {
    category: 'Regression',
    datasets: [
      { name: 'Boston Housing', difficulty: 'Beginner', description: 'Predict median home values', link: 'https://www.kaggle.com/datasets/fedesoriano/the-boston-houseprice-data' },
      { name: 'Auto MPG', difficulty: 'Beginner', description: 'Predict fuel efficiency', link: 'https://www.kaggle.com/datasets/uciml/autompg-dataset' },
      { name: 'House Prices (Ames)', difficulty: 'Intermediate', description: 'Advanced house price prediction', link: 'https://www.kaggle.com/c/house-prices-advanced-regression-techniques' },
      { name: 'California Housing', difficulty: 'Intermediate', description: 'Predict housing prices', link: 'https://www.kaggle.com/datasets/camnugent/california-housing-prices' },
    ],
  },
  {
    category: 'NLP',
    datasets: [
      { name: 'IMDB Reviews', difficulty: 'Beginner', description: 'Movie review sentiment', link: 'https://www.kaggle.com/datasets/lakshmi25npathi/imdb-dataset-of-50k-movie-reviews' },
      { name: 'SMS Spam Collection', difficulty: 'Beginner', description: 'Spam vs ham classification', link: 'https://www.kaggle.com/datasets/uciml/sms-spam-collection-dataset' },
      { name: 'Amazon Reviews', difficulty: 'Intermediate', description: 'Product sentiment analysis', link: 'https://www.kaggle.com/datasets/bittlingmayer/amazonreviews' },
      { name: '20 Newsgroups', difficulty: 'Advanced', description: 'News article categorization', link: 'https://www.kaggle.com/datasets/crawford/20-newsgroups' },
    ],
  },
  {
    category: 'Time Series',
    datasets: [
      { name: 'Air Passengers', difficulty: 'Beginner', description: 'Monthly airline passenger forecasting', link: 'https://www.kaggle.com/datasets/ashfakyeafi/air-passenger-data-for-time-series-analysis' },
      { name: 'Daily Temperature', difficulty: 'Beginner', description: 'Temperature prediction', link: 'https://www.kaggle.com/datasets/sumanthvrao/daily-climate-time-series-data' },
      { name: 'Stock Market', difficulty: 'Advanced', description: 'Price movement prediction', link: 'https://www.kaggle.com/datasets/jacksoncrow/stock-market-dataset' },
      { name: 'Energy Consumption', difficulty: 'Intermediate', description: 'Power demand forecasting', link: 'https://www.kaggle.com/datasets/robikscube/hourly-energy-consumption' },
    ],
  },
];

const failureModes = [
  {
    name: 'Data Leakage',
    description: 'Using information from the test set during training or feature engineering.',
    detection: 'If validation accuracy is unrealistically high (>95% on a hard problem), suspect leakage.',
    prevention: 'Always split data BEFORE any preprocessing. Fit scalers only on training data.',
  },
  {
    name: 'Overfitting',
    description: 'Model memorizes training data but fails to generalize to new data.',
    detection: 'Large gap between training accuracy (high) and validation accuracy (low).',
    prevention: 'Use regularization, simpler models, or more training data. Early stopping helps.',
  },
  {
    name: 'Wrong Metric',
    description: 'Using accuracy for imbalanced problems or RMSE when MAE is more appropriate.',
    detection: 'High accuracy but model always predicts the majority class.',
    prevention: 'Choose metrics based on the problem. Use F1/AUC for imbalanced data.',
  },
  {
    name: 'Target Leakage',
    description: 'Including features that contain information about the target (directly or indirectly).',
    detection: 'Unusually high feature importance for suspicious columns.',
    prevention: 'Think about whether each feature would be available at prediction time.',
  },
  {
    name: 'Train/Test Contamination',
    description: 'Test data influences training through feature engineering or selection.',
    detection: 'Performance drops significantly on truly held-out data.',
    prevention: 'Use nested cross-validation. Keep a final test set completely untouched.',
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-12"
      >
        {/* Philosophy Section */}
        <motion.section variants={itemVariants}>
          <div className="flex items-center gap-2 mb-4">
            <span className="mono-label">Philosophy</span>
          </div>
          <h1 className="text-3xl font-semibold text-slate-900 mb-4">
            Build Real Projects. Document. Iterate. Share.
          </h1>
          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-slate-700 leading-relaxed">
              World of ML is a project-based program designed to teach machine learning through hands-on
              experience. We believe the best way to learn ML is to build real projects, make mistakes,
              understand why things work (or don&apos;t), and share your learnings with others.
            </p>
            <p className="text-slate-600">
              This program is not about achieving the highest leaderboard score. It&apos;s about developing
              a systematic approach to problem-solving, understanding the fundamentals deeply, and
              creating work you can be proud of and others can learn from.
            </p>
          </div>
        </motion.section>

        {/* Rules of the Lab */}
        <motion.section variants={itemVariants}>
          <div className="flex items-center gap-2 mb-6">
            <span className="mono-label">Core Principles</span>
          </div>
          <h2 className="text-2xl font-semibold text-slate-900 mb-6">Rules of the Lab</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {labRules.map((rule) => (
              <motion.div
                key={rule.number}
                className="p-5 bg-lab-surface border border-lab-border rounded-card hover:shadow-card-hover transition-shadow"
                whileHover={{ y: -2 }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <span className="font-mono text-lg font-bold text-accent">{rule.number}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">{rule.title}</h3>
                    <p className="text-sm text-slate-600">{rule.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Dataset Ideas Bank */}
        <motion.section variants={itemVariants}>
          <div className="flex items-center gap-2 mb-6">
            <span className="mono-label">Resources</span>
            <Badge variant="accent">Dataset Ideas Bank</Badge>
          </div>
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Find Your Next Dataset</h2>
          <p className="text-slate-600 mb-6">
            After completing the tutorial, pick a dataset that interests you. Start with beginner
            datasets if you&apos;re new, then progress to more challenging ones.
          </p>
          
          <div className="space-y-6">
            {datasetCategories.map((cat) => (
              <Card key={cat.category} padding="none">
                <div className="panel-header">
                  <span className="font-medium text-slate-900">{cat.category}</span>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {cat.datasets.map((dataset) => (
                      <a
                        key={dataset.name}
                        href={dataset.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 bg-lab-surface-alt rounded-card border border-lab-border-light hover:border-accent-muted hover:bg-accent-subtle transition-colors"
                      >
                        <div>
                          <p className="font-medium text-sm text-slate-900">{dataset.name}</p>
                          <p className="text-xs text-slate-500">{dataset.description}</p>
                        </div>
                        <Badge
                          variant={
                            dataset.difficulty === 'Beginner'
                              ? 'success'
                              : dataset.difficulty === 'Intermediate'
                              ? 'warning'
                              : 'default'
                          }
                        >
                          {dataset.difficulty}
                        </Badge>
                      </a>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-4 p-4 bg-accent-subtle rounded-card border border-accent-muted">
            <h3 className="font-semibold text-accent-dark mb-2">Tips for Choosing a Dataset</h3>
            <ul className="text-sm text-slate-700 space-y-1">
              <li>• <strong>Check the size:</strong> 1K-100K rows is ideal for learning</li>
              <li>• <strong>Look at documentation:</strong> Well-documented datasets are easier to work with</li>
              <li>• <strong>Consider your interests:</strong> You&apos;ll learn more if you care about the problem</li>
              <li>• <strong>Start simple:</strong> Master tabular data before moving to images/text</li>
            </ul>
          </div>
        </motion.section>

        {/* Common Failure Modes */}
        <motion.section variants={itemVariants}>
          <div className="flex items-center gap-2 mb-6">
            <span className="mono-label">Checklist</span>
            <Badge variant="warning">Common Failure Modes</Badge>
          </div>
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">What Can Go Wrong</h2>
          <p className="text-slate-600 mb-6">
            Learn to recognize and prevent these common mistakes. Before submitting, check that
            you haven&apos;t fallen into any of these traps.
          </p>

          <div className="space-y-4">
            {failureModes.map((mode, index) => (
              <Card key={index} padding="none">
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-amber-500 text-lg">⚠️</span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 mb-2">{mode.name}</h3>
                      <p className="text-sm text-slate-700 mb-3">{mode.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="p-3 bg-red-50 rounded-card">
                          <span className="text-xs font-medium text-red-700 block mb-1">How to Detect</span>
                          <p className="text-sm text-red-900">{mode.detection}</p>
                        </div>
                        <div className="p-3 bg-emerald-50 rounded-card">
                          <span className="text-xs font-medium text-emerald-700 block mb-1">How to Prevent</span>
                          <p className="text-sm text-emerald-900">{mode.prevention}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* Grading Rubric */}
        <motion.section variants={itemVariants}>
          <div className="flex items-center gap-2 mb-6">
            <span className="mono-label">Evaluation</span>
          </div>
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Grading Rubric</h2>
          <p className="text-slate-600 mb-6">
            We evaluate projects holistically, valuing learning and reproducibility over raw scores.
          </p>

          <Card padding="none">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-lab-border bg-lab-surface-alt">
                    <th className="text-left py-3 px-4 font-medium text-slate-900">Criterion</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-900">Weight</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-900">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-lab-border-light">
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-900">Problem Understanding</td>
                    <td className="py-3 px-4"><Badge variant="accent">20%</Badge></td>
                    <td className="py-3 px-4 text-slate-600">Clear problem framing, appropriate metric choice</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-900">EDA Quality</td>
                    <td className="py-3 px-4"><Badge variant="accent">20%</Badge></td>
                    <td className="py-3 px-4 text-slate-600">Thorough exploration, meaningful insights documented</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-900">Preprocessing</td>
                    <td className="py-3 px-4"><Badge variant="accent">15%</Badge></td>
                    <td className="py-3 px-4 text-slate-600">Sensible handling of missing values, encoding, no leakage</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-900">Model Development</td>
                    <td className="py-3 px-4"><Badge variant="accent">20%</Badge></td>
                    <td className="py-3 px-4 text-slate-600">Baseline established, systematic improvement attempts</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-900">Reproducibility</td>
                    <td className="py-3 px-4"><Badge variant="accent">15%</Badge></td>
                    <td className="py-3 px-4 text-slate-600">Code runs, random seeds set, clear documentation</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-900">Reflection</td>
                    <td className="py-3 px-4"><Badge variant="accent">10%</Badge></td>
                    <td className="py-3 px-4 text-slate-600">Honest assessment of results, thoughtful next steps</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          <div className="mt-4 p-4 bg-emerald-50 rounded-card border border-emerald-200">
            <p className="text-sm text-emerald-800">
              <strong>Note:</strong> Raw model performance (accuracy/RMSE/etc.) is <em>not</em> directly
              graded. We care about your process and learning, not whether you beat a leaderboard.
            </p>
          </div>
        </motion.section>

        {/* Hack Club */}
        <motion.section variants={itemVariants}>
          <Card padding="lg" className="bg-hackclub-red/5 border-hackclub-red/20">
            <div className="flex items-center gap-4 mb-4">
              <svg width="48" height="48" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="24" height="24" rx="4" className="fill-hackclub-red" />
                <path d="M8 10h4v8H8v-8zm8 0h4v8h-4v-8zm-4 4h4v4h-4v-4z" fill="white" />
              </svg>
              <div>
                <h2 className="text-xl font-semibold text-slate-900">About Hack Club</h2>
                <p className="text-slate-600">A global network of high school makers & coders</p>
              </div>
            </div>
            <p className="text-slate-700 mb-4">
              Hack Club is a nonprofit network of high school coding clubs and makers around the world.
              We support young people in building creative technical projects and learning by doing.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://hackclub.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-hackclub-red text-white text-sm font-medium rounded-card hover:bg-hackclub-darkRed transition-colors"
              >
                Visit Hack Club
              </a>
              <a
                href="https://hackclub.com/slack"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-lab-surface border border-lab-border text-slate-700 text-sm font-medium rounded-card hover:border-slate-300 transition-colors"
              >
                Join the Slack
              </a>
            </div>
          </Card>
        </motion.section>
      </motion.div>
    </div>
  );
}
