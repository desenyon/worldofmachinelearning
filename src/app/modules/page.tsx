'use client';

import { motion } from 'framer-motion';
import Collapsible from '@/components/Collapsible';
import Badge from '@/components/Badge';
import StatusIndicator from '@/components/StatusIndicator';
import ProgressBar from '@/components/ProgressBar';

const modules = [
  {
    id: 1,
    title: 'Problem Framing',
    overview: 'Before writing any code, you need to clearly define what problem you are solving. This module teaches you how to translate a real-world question into a machine learning task.',
    keyConcepts: [
      'Supervised vs unsupervised learning',
      'Classification vs regression',
      'Defining the target variable',
      'Understanding what features are available',
    ],
    whatYouBuild: 'A problem statement document for your chosen dataset that clearly articulates the prediction target, available features, and success criteria.',
    checkpoint: 'Write a 3-sentence problem statement: What are you predicting? Why does it matter? What data do you have?',
    commonMistakes: [
      'Trying to predict something that is not in your data',
      'Not understanding the difference between classification and regression',
      'Choosing a target variable that leaks information from the future',
    ],
    timeEstimate: '30 minutes',
    status: 'complete' as const,
    track: {
      beginner: 'Focus on understanding the Titanic dataset columns and target variable (Survived).',
      advanced: 'Think about alternative framings: could you predict ticket price instead? What would change?',
    },
  },
  {
    id: 2,
    title: 'Exploratory Data Analysis (EDA)',
    overview: 'EDA is the process of examining your data to understand its structure, find patterns, and identify potential issues before building any model. This is arguably the most important step.',
    keyConcepts: [
      'Summary statistics (mean, median, mode, std)',
      'Data types (numerical vs categorical)',
      'Distribution visualization (histograms, box plots)',
      'Correlation analysis',
      'Identifying missing values and outliers',
    ],
    whatYouBuild: 'A set of visualizations and summary statistics that tell the story of your data, including at least 3 insights you discovered.',
    checkpoint: 'Create histograms for numerical features and bar charts for categorical features. Note 3 surprising findings.',
    commonMistakes: [
      'Skipping EDA and jumping straight to modeling',
      'Not looking at the relationship between features and target',
      'Ignoring data quality issues like missing values',
      'Not documenting your findings',
    ],
    timeEstimate: '45 minutes',
    status: 'complete' as const,
    track: {
      beginner: 'Use pandas describe() and basic matplotlib/seaborn plots.',
      advanced: 'Create a correlation heatmap and analyze feature interactions.',
    },
  },
  {
    id: 3,
    title: 'Data Preprocessing',
    overview: 'Raw data is rarely ready for machine learning. This module covers techniques to clean, transform, and prepare your data for modeling.',
    keyConcepts: [
      'Handling missing values (imputation strategies)',
      'Encoding categorical variables (one-hot, label encoding)',
      'Feature scaling (standardization, normalization)',
      'Feature selection and engineering',
    ],
    whatYouBuild: 'A preprocessing pipeline that transforms raw data into model-ready features.',
    checkpoint: 'Handle all missing values and encode all categorical features. Document your choices.',
    commonMistakes: [
      'Filling missing values with information from the test set (data leakage!)',
      'Using label encoding for unordered categories',
      'Not scaling features when using distance-based algorithms',
      'Creating features that use future information',
    ],
    timeEstimate: '40 minutes',
    status: 'active' as const,
    track: {
      beginner: 'Fill missing Age with median, drop Cabin column, use one-hot encoding for Sex and Embarked.',
      advanced: 'Use sklearn pipelines and create new features like FamilySize = SibSp + Parch + 1.',
    },
  },
  {
    id: 4,
    title: 'Train/Validation Split',
    overview: 'To honestly evaluate your model, you need to test it on data it has never seen. This module explains how to properly split your data and avoid common pitfalls.',
    keyConcepts: [
      'Why we need separate train and test sets',
      'Train/validation/test split ratios',
      'Random splitting vs stratified splitting',
      'Cross-validation techniques',
      'Data leakage and how to prevent it',
    ],
    whatYouBuild: 'A proper data split with code that ensures no leakage between sets.',
    checkpoint: 'Split data 80/20 using stratified sampling. Verify that class proportions are similar in both sets.',
    commonMistakes: [
      'Fitting scalers or imputers on the full dataset before splitting',
      'Not using stratification for imbalanced classification',
      'Using test data to tune hyperparameters',
      'Accidentally including target-related info in features',
    ],
    timeEstimate: '25 minutes',
    status: 'pending' as const,
    track: {
      beginner: 'Use train_test_split from sklearn with stratify parameter.',
      advanced: 'Implement k-fold cross-validation and understand its benefits.',
    },
  },
  {
    id: 5,
    title: 'Baseline Model',
    overview: 'Every machine learning project should start with a simple baseline model. This gives you a reference point to measure improvements against.',
    keyConcepts: [
      'What makes a good baseline',
      'Logistic Regression for classification',
      'Decision Trees for interpretability',
      'Model fitting and prediction',
      'Evaluation metrics (accuracy, precision, recall, F1)',
    ],
    whatYouBuild: 'A working Logistic Regression model with documented performance metrics.',
    checkpoint: 'Train a Logistic Regression model and report accuracy on the validation set.',
    commonMistakes: [
      'Using a complex model before trying simple ones',
      'Evaluating on training data instead of validation',
      'Using accuracy as the only metric for imbalanced problems',
      'Not establishing a baseline before trying to improve',
    ],
    timeEstimate: '35 minutes',
    status: 'pending' as const,
    track: {
      beginner: 'Train LogisticRegression with default parameters and calculate accuracy.',
      advanced: 'Compare multiple metrics and create a confusion matrix.',
    },
  },
  {
    id: 6,
    title: 'Model Iteration & Improvement',
    overview: 'Once you have a baseline, the real work begins. This module teaches systematic approaches to improving your model.',
    keyConcepts: [
      'Hyperparameter tuning (grid search, random search)',
      'Trying different algorithms (Random Forest, XGBoost)',
      'Feature engineering based on EDA insights',
      'Ensemble methods',
      'When to stop iterating',
    ],
    whatYouBuild: 'An improved model that beats your baseline with documented experiments.',
    checkpoint: 'Train at least one more model type (Random Forest) and compare results to baseline.',
    commonMistakes: [
      'Tuning hyperparameters on the test set',
      'Not keeping track of experiments',
      'Over-engineering features without validation',
      'Chasing small improvements instead of shipping',
    ],
    timeEstimate: '50 minutes',
    status: 'pending' as const,
    track: {
      beginner: 'Try RandomForestClassifier and compare accuracy to Logistic Regression.',
      advanced: 'Use GridSearchCV to tune hyperparameters and document your experiment log.',
    },
  },
  {
    id: 7,
    title: 'Documentation & Reproducibility',
    overview: 'A model is only useful if others (including future you) can understand and reproduce it. This module covers best practices for documenting ML work.',
    keyConcepts: [
      'Writing clear READMEs',
      'Code organization and comments',
      'Recording random seeds for reproducibility',
      'Saving and loading models',
      'Creating a project writeup',
    ],
    whatYouBuild: 'A complete project writeup following the submission template.',
    checkpoint: 'Fill out the submission template with all required sections.',
    commonMistakes: [
      'Not setting random seeds',
      'Hardcoding file paths',
      'Not explaining preprocessing choices',
      'Missing requirements.txt or environment file',
    ],
    timeEstimate: '30 minutes',
    status: 'pending' as const,
    track: {
      beginner: 'Focus on clearly explaining what you did and why.',
      advanced: 'Add experiment tracking and model versioning.',
    },
  },
  {
    id: 8,
    title: 'Next Steps: Your Own Dataset',
    overview: 'You have completed the guided tutorial! Now it is time to apply what you learned to a new dataset of your choice.',
    keyConcepts: [
      'Finding good datasets on Kaggle',
      'Assessing dataset quality and difficulty',
      'Adapting your workflow to new problems',
      'Knowing when to ask for help',
    ],
    whatYouBuild: 'A complete ML project on a dataset you choose, ready for submission.',
    checkpoint: 'Complete and submit at least one project using a different dataset.',
    commonMistakes: [
      'Choosing a dataset that is too complex for your skill level',
      'Not checking data quality before committing',
      'Copying code without understanding it',
      'Giving up too early on challenging datasets',
    ],
    timeEstimate: 'Variable (2-10+ hours)',
    status: 'pending' as const,
    track: {
      beginner: 'Pick from our recommended beginner datasets: House Prices, Iris, or Diabetes.',
      advanced: 'Try NLP (sentiment analysis) or computer vision (MNIST, Fashion-MNIST).',
    },
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export default function ModulesPage() {
  const completedCount = modules.filter(m => m.status === 'complete').length;
  const progress = (completedCount / modules.length) * 100;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="mono-label">Curriculum</span>
          <Badge variant="accent">{modules.length} Modules</Badge>
        </div>
        <h1 className="text-2xl font-semibold text-slate-900 mb-2">
          Learning Modules
        </h1>
        <p className="text-slate-600 max-w-2xl">
          Work through these modules in order. Each builds on the previous one.
          Complete the checkpoints to solidify your understanding.
        </p>
        
        {/* Progress */}
        <div className="mt-4 p-4 bg-lab-surface border border-lab-border rounded-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">Overall Progress</span>
            <span className="text-sm font-mono text-accent">
              {completedCount}/{modules.length} modules
            </span>
          </div>
          <ProgressBar value={progress} showLabel />
        </div>
      </div>

      {/* Modules List */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {modules.map((module, index) => (
          <motion.div key={module.id} variants={itemVariants}>
            <Collapsible
              defaultOpen={module.status === 'active'}
              header={
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-card bg-lab-surface-alt border border-lab-border-light font-mono text-sm text-slate-500">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-slate-900">{module.title}</h3>
                      <StatusIndicator status={module.status} />
                    </div>
                    <p className="text-sm text-slate-600 line-clamp-1">
                      {module.overview}
                    </p>
                  </div>
                  <div className="text-xs text-slate-500 font-mono">
                    {module.timeEstimate}
                  </div>
                </div>
              }
            >
              <div className="space-y-6">
                {/* Overview */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-2">Overview</h4>
                  <p className="text-sm text-slate-700">{module.overview}</p>
                </div>

                {/* Key Concepts */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-2">Key Concepts</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {module.keyConcepts.map((concept, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                        <span className="text-accent mt-0.5">→</span>
                        {concept}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What You Build */}
                <div className="p-4 bg-accent-subtle rounded-card border border-accent-muted">
                  <h4 className="text-sm font-semibold text-accent-dark mb-2">What You Will Build</h4>
                  <p className="text-sm text-slate-700">{module.whatYouBuild}</p>
                </div>

                {/* Checkpoint */}
                <div className="p-4 bg-lab-surface-alt rounded-card border border-lab-border">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="mono-label">Checkpoint</span>
                  </div>
                  <p className="text-sm text-slate-700">{module.checkpoint}</p>
                </div>

                {/* Tracks */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-lab-surface border border-lab-border rounded-card">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="success">Beginner Track</Badge>
                    </div>
                    <p className="text-sm text-slate-700">{module.track.beginner}</p>
                  </div>
                  <div className="p-4 bg-lab-surface border border-lab-border rounded-card">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="warning">Advanced Track</Badge>
                    </div>
                    <p className="text-sm text-slate-700">{module.track.advanced}</p>
                  </div>
                </div>

                {/* Common Mistakes */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-2">Common Mistakes to Avoid</h4>
                  <ul className="space-y-2">
                    {module.commonMistakes.map((mistake, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                        <span className="text-amber-500 mt-0.5">⚠</span>
                        {mistake}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Collapsible>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
