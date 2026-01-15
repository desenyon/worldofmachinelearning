'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CodeBlock from '@/components/CodeBlock';
import Checkpoint from '@/components/Checkpoint';
import Badge from '@/components/Badge';
import { useXP } from '@/context/XPContext';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
} from 'recharts';

// Tutorial steps - no emojis
const steps = [
  { id: 'intro', title: '0. Introduction' },
  { id: 'dataset', title: '1. Dataset and Goal' },
  { id: 'eda', title: '2. Exploring Data' },
  { id: 'cleaning', title: '3. Data Cleaning' },
  { id: 'features', title: '4. Feature Engineering' },
  { id: 'split', title: '5. Train/Test Split' },
  { id: 'baseline', title: '6. First Model' },
  { id: 'metrics', title: '7. Metrics' },
  { id: 'improve', title: '8. Improvement' },
  { id: 'next', title: '9. Next Steps' },
];

// Mock data for charts
const survivalData = [
  { name: 'Survived', count: 342, fill: '#3d9ca8' },
  { name: 'Did Not Survive', count: 549, fill: '#94a3b8' },
];

const ageDistribution = [
  { range: '0-10', count: 64 },
  { range: '11-20', count: 117 },
  { range: '21-30', count: 218 },
  { range: '31-40', count: 167 },
  { range: '41-50', count: 118 },
  { range: '51-60', count: 69 },
  { range: '60+', count: 54 },
];

const survivalByClass = [
  { class: '1st Class', survived: 136, total: 216 },
  { class: '2nd Class', survived: 87, total: 184 },
  { class: '3rd Class', survived: 119, total: 491 },
];

const fareVsAge = [
  { age: 22, fare: 7.25 }, { age: 38, fare: 71.28 }, { age: 26, fare: 7.92 },
  { age: 35, fare: 53.1 }, { age: 35, fare: 8.05 }, { age: 54, fare: 51.86 },
  { age: 2, fare: 21.08 }, { age: 27, fare: 11.13 }, { age: 14, fare: 30.07 },
  { age: 4, fare: 16.7 }, { age: 58, fare: 26.55 }, { age: 20, fare: 8.05 },
  { age: 39, fare: 31.28 }, { age: 14, fare: 7.85 }, { age: 55, fare: 16 },
];

// Glossary terms
const glossary: Record<string, { term: string; definition: string }[]> = {
  intro: [
    { term: 'Machine Learning', definition: 'A subset of AI where systems learn patterns from data to make predictions.' },
    { term: 'Supervised Learning', definition: 'Training a model with labeled data (input-output pairs).' },
  ],
  dataset: [
    { term: 'Feature', definition: 'An input variable used to make predictions (e.g., Age, Fare).' },
    { term: 'Target', definition: 'The variable we are trying to predict (e.g., Survived).' },
    { term: 'Row/Sample', definition: 'One observation in the dataset (e.g., one passenger).' },
  ],
  eda: [
    { term: 'Distribution', definition: 'How values of a variable are spread across possible values.' },
    { term: 'Correlation', definition: 'A measure of how two variables move together.' },
    { term: 'Outlier', definition: 'A data point significantly different from others.' },
  ],
  cleaning: [
    { term: 'Missing Value', definition: 'A blank or null entry in the dataset.' },
    { term: 'Imputation', definition: 'Filling missing values with estimated values.' },
  ],
  features: [
    { term: 'One-Hot Encoding', definition: 'Converting categorical variables to binary columns.' },
    { term: 'Feature Engineering', definition: 'Creating new features from existing ones.' },
  ],
  split: [
    { term: 'Training Set', definition: 'Data used to train the model.' },
    { term: 'Validation Set', definition: 'Data used to evaluate and tune the model.' },
    { term: 'Data Leakage', definition: 'When information from outside the training set is used to create the model.' },
  ],
  baseline: [
    { term: 'Baseline Model', definition: 'A simple model to establish minimum performance.' },
    { term: 'Logistic Regression', definition: 'An algorithm for binary classification.' },
  ],
  metrics: [
    { term: 'Accuracy', definition: 'Percentage of correct predictions.' },
    { term: 'Precision', definition: 'Of predicted positives, how many are actually positive.' },
    { term: 'Recall', definition: 'Of actual positives, how many did we predict correctly.' },
  ],
  improve: [
    { term: 'Hyperparameter', definition: 'Settings that control the learning process.' },
    { term: 'Random Forest', definition: 'An ensemble of decision trees.' },
  ],
  next: [
    { term: 'Generalization', definition: 'How well a model performs on unseen data.' },
  ],
};

export default function StudioPage() {
  const [activeStep, setActiveStep] = useState('intro');
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const { addTutorialXP, completedTutorials } = useXP();

  // Load completed steps from XP context
  useEffect(() => {
    const tutorialSteps = completedTutorials.filter(t => t.startsWith('studio-'));
    setCompletedSteps(tutorialSteps.map(t => t.replace('studio-', '')));
  }, [completedTutorials]);

  const toggleComplete = (stepId: string) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps(prev => [...prev, stepId]);
      addTutorialXP(`studio-${stepId}`);
    }
  };

  const currentIndex = steps.findIndex(s => s.id === activeStep);
  const goNext = () => {
    if (currentIndex < steps.length - 1) {
      setActiveStep(steps[currentIndex + 1].id);
    }
  };
  const goPrev = () => {
    if (currentIndex > 0) {
      setActiveStep(steps[currentIndex - 1].id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <div className="grid grid-cols-12 gap-6">
        {/* Left Sidebar - Steps */}
        <aside className="col-span-12 lg:col-span-2">
          <div className="sticky top-20">
            <div className="mb-4">
              <span className="mono-label">Tutorial Steps</span>
            </div>
            <nav className="space-y-1">
              {steps.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`
                    w-full flex items-center gap-2 px-3 py-2 text-sm rounded-card transition-all text-left
                    ${activeStep === step.id 
                      ? 'bg-accent-subtle text-accent-dark border border-accent-muted' 
                      : 'hover:bg-lab-surface-alt text-slate-600 border border-transparent'
                    }
                  `}
                  aria-current={activeStep === step.id ? 'step' : undefined}
                >
                  <span className="flex-1 truncate">{step.title}</span>
                  {completedSteps.includes(step.id) && (
                    <span className="text-emerald-500 text-xs font-bold">+1</span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="col-span-12 lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeStep === 'intro' && <IntroSection />}
              {activeStep === 'dataset' && <DatasetSection />}
              {activeStep === 'eda' && <EDASection />}
              {activeStep === 'cleaning' && <CleaningSection />}
              {activeStep === 'features' && <FeaturesSection />}
              {activeStep === 'split' && <SplitSection />}
              {activeStep === 'baseline' && <BaselineSection />}
              {activeStep === 'metrics' && <MetricsSection />}
              {activeStep === 'improve' && <ImproveSection />}
              {activeStep === 'next' && <NextStepsSection />}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-lab-border">
            <button
              onClick={goPrev}
              disabled={currentIndex === 0}
              className={`
                flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-card transition-colors
                ${currentIndex === 0 
                  ? 'text-slate-300 cursor-not-allowed' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-lab-surface-alt'
                }
              `}
            >
              ← Previous
            </button>
            <button
              onClick={() => toggleComplete(activeStep)}
              disabled={completedSteps.includes(activeStep)}
              className={`
                px-4 py-2 text-sm font-medium rounded-card transition-colors
                ${completedSteps.includes(activeStep)
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-accent text-white hover:bg-accent-dark'
                }
              `}
            >
              {completedSteps.includes(activeStep) ? 'Completed (+1 XP)' : 'Mark Complete (+1 XP)'}
            </button>
            <button
              onClick={goNext}
              disabled={currentIndex === steps.length - 1}
              className={`
                flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-card transition-colors
                ${currentIndex === steps.length - 1
                  ? 'text-slate-300 cursor-not-allowed'
                  : 'bg-lab-surface-alt text-slate-600 hover:bg-slate-200'
                }
              `}
            >
              Next
            </button>
          </div>
        </main>

        {/* Right Sidebar - Glossary */}
        <aside className="col-span-12 lg:col-span-3">
          <div className="sticky top-20">
            <div className="bg-lab-surface border border-lab-border rounded-card">
              <div className="panel-header">
                <span className="mono-label">Glossary</span>
              </div>
              <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
                {(glossary[activeStep] || []).map((item, index) => (
                  <div key={index}>
                    <dt className="font-medium text-sm text-slate-900">{item.term}</dt>
                    <dd className="text-sm text-slate-600 mt-1">{item.definition}</dd>
                  </div>
                ))}
                {(!glossary[activeStep] || glossary[activeStep].length === 0) && (
                  <p className="text-sm text-slate-500 italic">No glossary terms for this section.</p>
                )}
              </div>
            </div>

            {/* Notes */}
            <div className="mt-4 bg-lab-surface border border-lab-border rounded-card">
              <div className="panel-header">
                <span className="mono-label">Notes</span>
              </div>
              <div className="p-4">
                <textarea
                  className="w-full h-32 text-sm bg-lab-surface-alt border border-lab-border-light rounded p-3 resize-none focus:outline-none focus:border-accent"
                  placeholder="Take notes as you learn..."
                />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

// Content Sections

function IntroSection() {
  return (
    <div className="space-y-6">
      <div>
        <Badge variant="accent">Introduction</Badge>
        <h1 className="text-2xl font-semibold text-slate-900 mt-2">Welcome to the ML Lab</h1>
      </div>
      
      <div className="prose prose-slate max-w-none">
        <p className="text-slate-700 leading-relaxed">
          This interactive tutorial will guide you through building your first machine learning model
          from scratch. We will use the famous <strong>Titanic dataset</strong> from Kaggle, a classic
          beginner-friendly dataset that teaches core ML concepts.
        </p>
        
        <p className="text-slate-700 leading-relaxed">
          By the end of this tutorial, you will understand:
        </p>
        
        <ul className="list-disc list-inside space-y-2 text-slate-700">
          <li>How to explore and understand your data (EDA)</li>
          <li>How to handle missing values and encode categorical features</li>
          <li>Why we split data into training and validation sets</li>
          <li>How to train a baseline model and measure its performance</li>
          <li>How to improve your model systematically</li>
        </ul>
      </div>

      <div className="p-4 bg-hackclub-red/5 border border-hackclub-red/20 rounded-card">
        <h3 className="font-semibold text-slate-900 mb-2">Before You Start</h3>
        <p className="text-sm text-slate-700 mb-3">
          Make sure you have Python installed with these libraries:
        </p>
        <CodeBlock
          code={`pip install pandas numpy scikit-learn matplotlib seaborn`}
          language="bash"
          filename="terminal"
        />
      </div>

      <Checkpoint title="Environment Setup" status="active">
        <p>Verify your setup by running Python and importing the required libraries:</p>
        <CodeBlock
          code={`import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
print("Setup complete!")`}
          language="python"
          filename="check_setup.py"
        />
      </Checkpoint>
    </div>
  );
}

function DatasetSection() {
  return (
    <div className="space-y-6">
      <div>
        <Badge variant="accent">Dataset and Goal</Badge>
        <h1 className="text-2xl font-semibold text-slate-900 mt-2">Understanding the Titanic Dataset</h1>
      </div>

      <p className="text-slate-700 leading-relaxed">
        The Titanic dataset contains information about passengers aboard the RMS Titanic.
        Our goal is to predict which passengers survived the disaster based on features
        like their age, sex, ticket class, and fare.
      </p>

      <div className="p-4 bg-accent-subtle border border-accent-muted rounded-card">
        <h3 className="font-semibold text-accent-dark mb-2">Get the Dataset from Kaggle</h3>
        <p className="text-sm text-slate-700 mb-2">
          Download the dataset from Kaggle (free account required):
        </p>
        <a 
          href="https://www.kaggle.com/c/titanic/data" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 bg-accent text-white rounded-card font-medium text-sm hover:bg-accent-dark transition-colors"
        >
          Download from Kaggle
        </a>
      </div>

      <div className="p-4 bg-lab-surface border border-lab-border rounded-card">
        <h3 className="font-semibold text-slate-900 mb-3">Dataset Overview</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-lab-surface-alt rounded-card">
            <div className="text-2xl font-mono font-semibold text-accent">891</div>
            <div className="text-xs text-slate-500">Passengers</div>
          </div>
          <div className="p-3 bg-lab-surface-alt rounded-card">
            <div className="text-2xl font-mono font-semibold text-accent">12</div>
            <div className="text-xs text-slate-500">Features</div>
          </div>
          <div className="p-3 bg-lab-surface-alt rounded-card">
            <div className="text-2xl font-mono font-semibold text-accent">38%</div>
            <div className="text-xs text-slate-500">Survived</div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-slate-900 mb-3">Loading the Data</h3>
        <CodeBlock
          code={`import pandas as pd

# Load the dataset (download from Kaggle first)
# https://www.kaggle.com/c/titanic/data
df = pd.read_csv('train.csv')

# First look at the data
print(df.shape)
print(df.head())
print(df.info())`}
          language="python"
          filename="load_data.py"
        />
      </div>

      <div>
        <h3 className="font-semibold text-slate-900 mb-3">Column Descriptions</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-lab-border">
                <th className="text-left py-2 px-3 font-medium text-slate-900">Column</th>
                <th className="text-left py-2 px-3 font-medium text-slate-900">Description</th>
                <th className="text-left py-2 px-3 font-medium text-slate-900">Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-lab-border-light">
              <tr><td className="py-2 px-3 font-mono text-xs">PassengerId</td><td className="py-2 px-3">Unique identifier</td><td className="py-2 px-3"><Badge>ID</Badge></td></tr>
              <tr><td className="py-2 px-3 font-mono text-xs">Survived</td><td className="py-2 px-3">0 = No, 1 = Yes</td><td className="py-2 px-3"><Badge variant="accent">Target</Badge></td></tr>
              <tr><td className="py-2 px-3 font-mono text-xs">Pclass</td><td className="py-2 px-3">Ticket class (1, 2, or 3)</td><td className="py-2 px-3"><Badge>Categorical</Badge></td></tr>
              <tr><td className="py-2 px-3 font-mono text-xs">Name</td><td className="py-2 px-3">Passenger name</td><td className="py-2 px-3"><Badge>Text</Badge></td></tr>
              <tr><td className="py-2 px-3 font-mono text-xs">Sex</td><td className="py-2 px-3">male or female</td><td className="py-2 px-3"><Badge>Categorical</Badge></td></tr>
              <tr><td className="py-2 px-3 font-mono text-xs">Age</td><td className="py-2 px-3">Age in years</td><td className="py-2 px-3"><Badge>Numerical</Badge></td></tr>
              <tr><td className="py-2 px-3 font-mono text-xs">SibSp</td><td className="py-2 px-3">Siblings/spouses aboard</td><td className="py-2 px-3"><Badge>Numerical</Badge></td></tr>
              <tr><td className="py-2 px-3 font-mono text-xs">Parch</td><td className="py-2 px-3">Parents/children aboard</td><td className="py-2 px-3"><Badge>Numerical</Badge></td></tr>
              <tr><td className="py-2 px-3 font-mono text-xs">Ticket</td><td className="py-2 px-3">Ticket number</td><td className="py-2 px-3"><Badge>Text</Badge></td></tr>
              <tr><td className="py-2 px-3 font-mono text-xs">Fare</td><td className="py-2 px-3">Passenger fare</td><td className="py-2 px-3"><Badge>Numerical</Badge></td></tr>
              <tr><td className="py-2 px-3 font-mono text-xs">Cabin</td><td className="py-2 px-3">Cabin number</td><td className="py-2 px-3"><Badge>Text</Badge></td></tr>
              <tr><td className="py-2 px-3 font-mono text-xs">Embarked</td><td className="py-2 px-3">Port of embarkation</td><td className="py-2 px-3"><Badge>Categorical</Badge></td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <Checkpoint title="Define the Problem" status="active">
        <p className="mb-2">Answer these questions:</p>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>What is the target variable? <span className="text-slate-500">(Survived)</span></li>
          <li>Is this classification or regression? <span className="text-slate-500">(Classification - binary)</span></li>
          <li>How many features might be useful? <span className="text-slate-500">(~7-8 after dropping IDs and text)</span></li>
        </ol>
      </Checkpoint>
    </div>
  );
}

function EDASection() {
  return (
    <div className="space-y-6">
      <div>
        <Badge variant="accent">Exploratory Data Analysis</Badge>
        <h1 className="text-2xl font-semibold text-slate-900 mt-2">Understanding Your Data</h1>
      </div>

      <p className="text-slate-700 leading-relaxed">
        <strong>EDA (Exploratory Data Analysis)</strong> is the process of examining your data 
        to understand its structure, find patterns, and identify potential issues. 
        This step is crucial. Never skip it!
      </p>

      <div>
        <h3 className="font-semibold text-slate-900 mb-3">Basic Statistics</h3>
        <CodeBlock
          code={`# Summary statistics for numerical columns
print(df.describe())

# Check for missing values
print(df.isnull().sum())

# Target distribution
print(df['Survived'].value_counts())`}
          language="python"
          filename="basic_stats.py"
        />
      </div>

      {/* Survival Distribution Chart */}
      <div className="p-4 bg-lab-surface border border-lab-border rounded-card">
        <h3 className="font-semibold text-slate-900 mb-4">Target Distribution</h3>
        <p className="text-sm text-slate-600 mb-4">
          The target variable is imbalanced. More passengers did not survive (62%) than survived (38%).
        </p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={survivalData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                dataKey="count"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {survivalData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-slate-500 text-center mt-2 italic">Example visualization (demo data)</p>
      </div>

      {/* Age Distribution Chart */}
      <div className="p-4 bg-lab-surface border border-lab-border rounded-card">
        <h3 className="font-semibold text-slate-900 mb-4">Age Distribution</h3>
        <p className="text-sm text-slate-600 mb-4">
          Most passengers were between 20-40 years old. Note: Age has ~177 missing values.
        </p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ageDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="range" tick={{ fontSize: 12 }} stroke="#64748b" />
              <YAxis tick={{ fontSize: 12 }} stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #dee2e6',
                  borderRadius: '6px'
                }}
              />
              <Bar dataKey="count" fill="#3d9ca8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-slate-500 text-center mt-2 italic">Example visualization (demo data)</p>
      </div>

      <div>
        <h3 className="font-semibold text-slate-900 mb-3">Creating Visualizations</h3>
        <CodeBlock
          code={`import matplotlib.pyplot as plt
import seaborn as sns

# Age distribution
plt.figure(figsize=(10, 4))
plt.subplot(1, 2, 1)
df['Age'].hist(bins=20, edgecolor='black')
plt.xlabel('Age')
plt.ylabel('Count')
plt.title('Age Distribution')

# Survival by class
plt.subplot(1, 2, 2)
df.groupby('Pclass')['Survived'].mean().plot(kind='bar')
plt.xlabel('Passenger Class')
plt.ylabel('Survival Rate')
plt.title('Survival Rate by Class')
plt.tight_layout()
plt.show()`}
          language="python"
          filename="visualizations.py"
        />
      </div>

      {/* Survival by Class Chart */}
      <div className="p-4 bg-lab-surface border border-lab-border rounded-card">
        <h3 className="font-semibold text-slate-900 mb-4">Survival by Passenger Class</h3>
        <p className="text-sm text-slate-600 mb-4">
          First class passengers had much higher survival rates. This is a strong predictor!
        </p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={survivalByClass}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="class" tick={{ fontSize: 12 }} stroke="#64748b" />
              <YAxis tick={{ fontSize: 12 }} stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #dee2e6',
                  borderRadius: '6px'
                }}
              />
              <Bar dataKey="survived" name="Survived" fill="#3d9ca8" radius={[4, 4, 0, 0]} />
              <Bar dataKey="total" name="Total" fill="#94a3b8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-slate-500 text-center mt-2 italic">Example visualization (demo data)</p>
      </div>

      <Checkpoint title="EDA Complete" status="active">
        <p>Document at least 3 insights from your EDA:</p>
        <ol className="list-decimal list-inside space-y-1 text-sm mt-2">
          <li>Target is imbalanced (38% survived)</li>
          <li>Age and Cabin have many missing values</li>
          <li>First class passengers survived more often</li>
        </ol>
      </Checkpoint>
    </div>
  );
}

function CleaningSection() {
  return (
    <div className="space-y-6">
      <div>
        <Badge variant="accent">Data Cleaning</Badge>
        <h1 className="text-2xl font-semibold text-slate-900 mt-2">Handling Missing Values</h1>
      </div>

      <p className="text-slate-700 leading-relaxed">
        Real-world data is messy. Before we can train a model, we need to handle missing values
        and decide what to do with columns that are not useful.
      </p>

      <div className="p-4 bg-amber-50 border border-amber-200 rounded-card">
        <h3 className="font-semibold text-amber-800 mb-2">⚠️ Missing Values in Titanic</h3>
        <ul className="text-sm text-amber-900 space-y-1">
          <li><code className="bg-amber-100 px-1 rounded">Age</code>: 177 missing (19.9%)</li>
          <li><code className="bg-amber-100 px-1 rounded">Cabin</code>: 687 missing (77.1%)</li>
          <li><code className="bg-amber-100 px-1 rounded">Embarked</code>: 2 missing (0.2%)</li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold text-slate-900 mb-3">Strategy for Missing Values</h3>
        <CodeBlock
          code={`# Check missing values
print(df.isnull().sum())

# Strategy:
# 1. Age: Fill with median (robust to outliers)
# 2. Cabin: Drop column (too many missing)
# 3. Embarked: Fill with mode (most common value)

# Fill Age with median
df['Age'].fillna(df['Age'].median(), inplace=True)

# Fill Embarked with mode
df['Embarked'].fillna(df['Embarked'].mode()[0], inplace=True)

# Drop Cabin column
df.drop('Cabin', axis=1, inplace=True)

# Verify no missing values
print(df.isnull().sum())`}
          language="python"
          filename="handle_missing.py"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-card">
          <h4 className="font-semibold text-emerald-800 mb-2">✓ Good Strategies</h4>
          <ul className="text-sm text-emerald-900 space-y-1">
            <li>• Median for numerical (robust to outliers)</li>
            <li>• Mode for categorical</li>
            <li>• Domain knowledge when available</li>
          </ul>
        </div>
        <div className="p-4 bg-red-50 border border-red-200 rounded-card">
          <h4 className="font-semibold text-red-800 mb-2">✗ Avoid</h4>
          <ul className="text-sm text-red-900 space-y-1">
            <li>• Using test set statistics (data leakage!)</li>
            <li>• Filling with arbitrary values like -1</li>
            <li>• Dropping rows without justification</li>
          </ul>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-slate-900 mb-3">Dropping Unnecessary Columns</h3>
        <CodeBlock
          code={`# Columns to drop:
# - PassengerId: Just an identifier
# - Name: Text, hard to use (advanced: could extract titles)
# - Ticket: Text, hard to use

df.drop(['PassengerId', 'Name', 'Ticket'], axis=1, inplace=True)

print(df.columns.tolist())
# ['Survived', 'Pclass', 'Sex', 'Age', 'SibSp', 'Parch', 'Fare', 'Embarked']`}
          language="python"
          filename="drop_columns.py"
        />
      </div>

      <Checkpoint title="Data Cleaning Complete" status="active">
        <p>Your cleaned dataframe should have:</p>
        <ul className="list-disc list-inside text-sm mt-2 space-y-1">
          <li>No missing values</li>
          <li>8 columns: Survived, Pclass, Sex, Age, SibSp, Parch, Fare, Embarked</li>
          <li>891 rows</li>
        </ul>
      </Checkpoint>
    </div>
  );
}

function FeaturesSection() {
  return (
    <div className="space-y-6">
      <div>
        <Badge variant="accent">Feature Engineering</Badge>
        <h1 className="text-2xl font-semibold text-slate-900 mt-2">Encoding Categorical Variables</h1>
      </div>

      <p className="text-slate-700 leading-relaxed">
        Machine learning models need numerical inputs. We must convert categorical variables 
        (like Sex and Embarked) into numbers. This process is called <strong>encoding</strong>.
      </p>

      <div>
        <h3 className="font-semibold text-slate-900 mb-3">One-Hot Encoding</h3>
        <p className="text-sm text-slate-600 mb-3">
          One-hot encoding creates a new binary column for each category. This is preferred 
          for unordered categories.
        </p>
        <CodeBlock
          code={`# One-hot encode categorical variables
df = pd.get_dummies(df, columns=['Sex', 'Embarked'], drop_first=True)

print(df.columns.tolist())
# ['Survived', 'Pclass', 'Age', 'SibSp', 'Parch', 'Fare', 
#  'Sex_male', 'Embarked_Q', 'Embarked_S']

print(df.head())`}
          language="python"
          filename="encoding.py"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-lab-border bg-lab-surface-alt">
              <th className="text-left py-2 px-3">Before</th>
              <th className="text-left py-2 px-3">After</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-lab-border-light">
            <tr>
              <td className="py-2 px-3 font-mono text-xs">Sex: male, female</td>
              <td className="py-2 px-3 font-mono text-xs">Sex_male: 1, 0</td>
            </tr>
            <tr>
              <td className="py-2 px-3 font-mono text-xs">Embarked: S, C, Q</td>
              <td className="py-2 px-3 font-mono text-xs">Embarked_Q: 0/1, Embarked_S: 0/1</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <h3 className="font-semibold text-slate-900 mb-3">Advanced: Creating New Features</h3>
        <CodeBlock
          code={`# Family size: total family members aboard
df['FamilySize'] = df['SibSp'] + df['Parch'] + 1

# Is alone: traveling solo
df['IsAlone'] = (df['FamilySize'] == 1).astype(int)

print(df[['SibSp', 'Parch', 'FamilySize', 'IsAlone']].head())`}
          language="python"
          filename="feature_engineering.py"
        />
      </div>

      <Checkpoint title="Features Ready" status="active">
        <p>Verify your features:</p>
        <CodeBlock
          code={`# Check final feature set
X = df.drop('Survived', axis=1)
y = df['Survived']

print(f"Features: {X.columns.tolist()}")
print(f"Shape: {X.shape}")
print(f"Target distribution: {y.value_counts().to_dict()}")`}
          language="python"
          filename="verify_features.py"
        />
      </Checkpoint>
    </div>
  );
}

function SplitSection() {
  return (
    <div className="space-y-6">
      <div>
        <Badge variant="accent">Train/Validation Split</Badge>
        <h1 className="text-2xl font-semibold text-slate-900 mt-2">Splitting Your Data</h1>
      </div>

      <p className="text-slate-700 leading-relaxed">
        To honestly evaluate your model, you must test it on data it has never seen during training.
        We split our data into a <strong>training set</strong> (to learn from) and a 
        <strong> validation set</strong> (to evaluate on).
      </p>

      <div className="p-4 bg-red-50 border border-red-200 rounded-card">
        <h3 className="font-semibold text-red-800 mb-2">Critical: Data Leakage</h3>
        <p className="text-sm text-red-900">
          Data leakage occurs when information from outside the training set influences the model.
          Common mistakes:
        </p>
        <ul className="list-disc list-inside text-sm text-red-900 mt-2 space-y-1">
          <li>Fitting scalers on the full dataset before splitting</li>
          <li>Using validation data to make preprocessing decisions</li>
          <li>Filling missing values with statistics from the full dataset</li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold text-slate-900 mb-3">Proper Split with Stratification</h3>
        <CodeBlock
          code={`from sklearn.model_selection import train_test_split

# Prepare features and target
X = df.drop('Survived', axis=1)
y = df['Survived']

# Split with stratification (maintains class proportions)
X_train, X_val, y_train, y_val = train_test_split(
    X, y, 
    test_size=0.2,        # 20% for validation
    random_state=42,       # For reproducibility
    stratify=y             # Maintain class balance
)

print(f"Training set: {X_train.shape[0]} samples")
print(f"Validation set: {X_val.shape[0]} samples")

# Verify stratification
print(f"Train survival rate: {y_train.mean():.3f}")
print(f"Val survival rate: {y_val.mean():.3f}")`}
          language="python"
          filename="train_test_split.py"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-lab-surface border border-lab-border rounded-card text-center">
          <div className="text-3xl font-mono font-semibold text-accent">712</div>
          <div className="text-sm text-slate-600">Training samples (80%)</div>
        </div>
        <div className="p-4 bg-lab-surface border border-lab-border rounded-card text-center">
          <div className="text-3xl font-mono font-semibold text-slate-400">179</div>
          <div className="text-sm text-slate-600">Validation samples (20%)</div>
        </div>
      </div>

      <Checkpoint title="Data Split Complete" status="active">
        <p>Verify your split:</p>
        <ul className="list-disc list-inside text-sm mt-2 space-y-1">
          <li>Training set has ~712 samples</li>
          <li>Validation set has ~179 samples</li>
          <li>Both sets have similar survival rates (~38%)</li>
        </ul>
      </Checkpoint>
    </div>
  );
}

function BaselineSection() {
  return (
    <div className="space-y-6">
      <div>
        <Badge variant="accent">Baseline Model</Badge>
        <h1 className="text-2xl font-semibold text-slate-900 mt-2">Training Your First Model</h1>
      </div>

      <p className="text-slate-700 leading-relaxed">
        Always start with a simple baseline model. This gives you a reference point to measure 
        improvements against. For binary classification, <strong>Logistic Regression</strong> is 
        an excellent baseline.
      </p>

      <div>
        <h3 className="font-semibold text-slate-900 mb-3">Training Logistic Regression</h3>
        <CodeBlock
          code={`from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

# Create and train the model
model = LogisticRegression(random_state=42, max_iter=1000)
model.fit(X_train, y_train)

# Make predictions
y_train_pred = model.predict(X_train)
y_val_pred = model.predict(X_val)

# Calculate accuracy
train_acc = accuracy_score(y_train, y_train_pred)
val_acc = accuracy_score(y_val, y_val_pred)

print(f"Training Accuracy: {train_acc:.4f}")
print(f"Validation Accuracy: {val_acc:.4f}")`}
          language="python"
          filename="baseline_model.py"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-lab-surface border border-lab-border rounded-card text-center">
          <div className="text-3xl font-mono font-semibold text-slate-600">80.2%</div>
          <div className="text-sm text-slate-600">Training Accuracy</div>
        </div>
        <div className="p-4 bg-accent-subtle border border-accent-muted rounded-card text-center">
          <div className="text-3xl font-mono font-semibold text-accent">79.3%</div>
          <div className="text-sm text-accent-dark">Validation Accuracy</div>
        </div>
      </div>

      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-card">
        <h3 className="font-semibold text-emerald-800 mb-2">✓ Good Sign!</h3>
        <p className="text-sm text-emerald-900">
          Training and validation accuracy are close, suggesting the model is not overfitting.
          ~79% accuracy is a solid baseline for Titanic.
        </p>
      </div>

      <Checkpoint title="Baseline Established" status="active">
        <p>Record your baseline results:</p>
        <ul className="list-disc list-inside text-sm mt-2 space-y-1">
          <li>Model: Logistic Regression</li>
          <li>Validation Accuracy: ~79%</li>
          <li>Any improvement must beat this!</li>
        </ul>
      </Checkpoint>
    </div>
  );
}

function MetricsSection() {
  return (
    <div className="space-y-6">
      <div>
        <Badge variant="accent">Evaluation Metrics</Badge>
        <h1 className="text-2xl font-semibold text-slate-900 mt-2">Beyond Accuracy</h1>
      </div>

      <p className="text-slate-700 leading-relaxed">
        Accuracy alone does not tell the full story. For imbalanced problems especially, 
        we need additional metrics to understand model performance.
      </p>

      <div>
        <h3 className="font-semibold text-slate-900 mb-3">Classification Report</h3>
        <CodeBlock
          code={`from sklearn.metrics import classification_report, confusion_matrix

# Full classification report
print(classification_report(y_val, y_val_pred))

# Confusion matrix
cm = confusion_matrix(y_val, y_val_pred)
print("Confusion Matrix:")
print(cm)`}
          language="python"
          filename="metrics.py"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-lab-surface border border-lab-border rounded-card">
          <h4 className="font-medium text-slate-900 mb-2">Precision</h4>
          <p className="text-sm text-slate-600">
            Of all passengers we predicted would survive, how many actually survived?
          </p>
          <div className="text-2xl font-mono font-semibold text-accent mt-2">76%</div>
        </div>
        <div className="p-4 bg-lab-surface border border-lab-border rounded-card">
          <h4 className="font-medium text-slate-900 mb-2">Recall</h4>
          <p className="text-sm text-slate-600">
            Of all passengers who actually survived, how many did we correctly identify?
          </p>
          <div className="text-2xl font-mono font-semibold text-accent mt-2">72%</div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-slate-900 mb-3">Confusion Matrix Visualization</h3>
        <CodeBlock
          code={`import seaborn as sns
import matplotlib.pyplot as plt

plt.figure(figsize=(6, 4))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues',
            xticklabels=['Did Not Survive', 'Survived'],
            yticklabels=['Did Not Survive', 'Survived'])
plt.xlabel('Predicted')
plt.ylabel('Actual')
plt.title('Confusion Matrix')
plt.show()`}
          language="python"
          filename="confusion_matrix.py"
        />
      </div>

      <Checkpoint title="Metrics Understood" status="active">
        <p>Key takeaways:</p>
        <ul className="list-disc list-inside text-sm mt-2 space-y-1">
          <li>Accuracy: Overall correctness (~79%)</li>
          <li>Precision: Minimize false positives</li>
          <li>Recall: Minimize false negatives</li>
          <li>F1-Score: Balance of precision and recall</li>
        </ul>
      </Checkpoint>
    </div>
  );
}

function ImproveSection() {
  return (
    <div className="space-y-6">
      <div>
        <Badge variant="accent">Model Improvement</Badge>
        <h1 className="text-2xl font-semibold text-slate-900 mt-2">Beating the Baseline</h1>
      </div>

      <p className="text-slate-700 leading-relaxed">
        Now that we have a baseline, let us try to improve. We will try a more powerful 
        algorithm: <strong>Random Forest</strong>.
      </p>

      <div>
        <h3 className="font-semibold text-slate-900 mb-3">Random Forest Classifier</h3>
        <CodeBlock
          code={`from sklearn.ensemble import RandomForestClassifier

# Train Random Forest
rf_model = RandomForestClassifier(
    n_estimators=100,
    random_state=42,
    max_depth=5  # Prevent overfitting
)
rf_model.fit(X_train, y_train)

# Evaluate
rf_train_pred = rf_model.predict(X_train)
rf_val_pred = rf_model.predict(X_val)

rf_train_acc = accuracy_score(y_train, rf_train_pred)
rf_val_acc = accuracy_score(y_val, rf_val_pred)

print(f"Random Forest Training Accuracy: {rf_train_acc:.4f}")
print(f"Random Forest Validation Accuracy: {rf_val_acc:.4f}")`}
          language="python"
          filename="random_forest.py"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-lab-surface border border-lab-border rounded-card text-center">
          <div className="text-sm text-slate-500 mb-1">Baseline (LR)</div>
          <div className="text-2xl font-mono font-semibold text-slate-600">79.3%</div>
        </div>
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-card text-center">
          <div className="text-sm text-emerald-600 mb-1">Random Forest</div>
          <div className="text-2xl font-mono font-semibold text-emerald-600">82.1%</div>
        </div>
        <div className="p-4 bg-accent-subtle border border-accent-muted rounded-card text-center">
          <div className="text-sm text-accent-dark mb-1">Improvement</div>
          <div className="text-2xl font-mono font-semibold text-accent">+2.8%</div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-slate-900 mb-3">Feature Importance</h3>
        <CodeBlock
          code={`# Check which features matter most
importance = pd.DataFrame({
    'feature': X_train.columns,
    'importance': rf_model.feature_importances_
}).sort_values('importance', ascending=False)

print(importance)`}
          language="python"
          filename="feature_importance.py"
        />
      </div>

      <div>
        <h3 className="font-semibold text-slate-900 mb-3">Hyperparameter Tuning (Advanced)</h3>
        <CodeBlock
          code={`from sklearn.model_selection import GridSearchCV

# Define parameter grid
param_grid = {
    'n_estimators': [50, 100, 200],
    'max_depth': [3, 5, 7],
    'min_samples_split': [2, 5, 10]
}

# Grid search with cross-validation
grid_search = GridSearchCV(
    RandomForestClassifier(random_state=42),
    param_grid,
    cv=5,
    scoring='accuracy'
)
grid_search.fit(X_train, y_train)

print(f"Best parameters: {grid_search.best_params_}")
print(f"Best CV score: {grid_search.best_score_:.4f}")`}
          language="python"
          filename="hyperparameter_tuning.py"
        />
      </div>

      <Checkpoint title="Model Improved" status="active">
        <p>Document your experiments:</p>
        <ul className="list-disc list-inside text-sm mt-2 space-y-1">
          <li>Logistic Regression: 79.3%</li>
          <li>Random Forest: 82.1% ✓ (new best)</li>
          <li>Most important features: Sex_male, Fare, Age</li>
        </ul>
      </Checkpoint>
    </div>
  );
}

function NextStepsSection() {
  return (
    <div className="space-y-6">
      <div>
        <Badge variant="success">Congratulations!</Badge>
        <h1 className="text-2xl font-semibold text-slate-900 mt-2">You Built Your First ML Model</h1>
      </div>

      <p className="text-slate-700 leading-relaxed">
        You have successfully completed the Titanic tutorial! You learned how to:
      </p>

      <ul className="list-disc list-inside space-y-2 text-slate-700">
        <li>Frame a machine learning problem</li>
        <li>Explore and understand data through EDA</li>
        <li>Handle missing values and encode features</li>
        <li>Properly split data to avoid leakage</li>
        <li>Train and evaluate baseline models</li>
        <li>Improve systematically using better algorithms</li>
      </ul>

      <div className="p-4 bg-hackclub-red/5 border border-hackclub-red/20 rounded-card">
        <h3 className="font-semibold text-hackclub-red mb-2">Your Challenge</h3>
        <p className="text-sm text-slate-700 mb-3">
          Now apply what you learned to a <strong>different dataset</strong>! 
          Submit as many projects as you want. Each uses a unique dataset.
        </p>
        <p className="text-sm text-slate-700">
          Check out the <a href="/submit" className="text-accent hover:underline">Submit page</a> for 
          the submission template and <a href="/gallery" className="text-accent hover:underline">Gallery</a> for 
          inspiration.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-slate-900 mb-3">Recommended Next Datasets</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-lab-surface border border-lab-border rounded-card">
            <Badge variant="success">Beginner</Badge>
            <h4 className="font-medium text-slate-900 mt-2">House Prices</h4>
            <p className="text-sm text-slate-600">Regression • Predict home sale prices</p>
          </div>
          <div className="p-4 bg-lab-surface border border-lab-border rounded-card">
            <Badge variant="success">Beginner</Badge>
            <h4 className="font-medium text-slate-900 mt-2">Iris</h4>
            <p className="text-sm text-slate-600">Classification • Classify flower species</p>
          </div>
          <div className="p-4 bg-lab-surface border border-lab-border rounded-card">
            <Badge variant="warning">Intermediate</Badge>
            <h4 className="font-medium text-slate-900 mt-2">Heart Disease</h4>
            <p className="text-sm text-slate-600">Classification • Predict heart disease</p>
          </div>
          <div className="p-4 bg-lab-surface border border-lab-border rounded-card">
            <Badge variant="warning">Intermediate</Badge>
            <h4 className="font-medium text-slate-900 mt-2">MNIST</h4>
            <p className="text-sm text-slate-600">Vision • Classify handwritten digits</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-slate-900 mb-3">Save Your Model</h3>
        <CodeBlock
          code={`import joblib

# Save the trained model
joblib.dump(rf_model, 'titanic_model.pkl')

# Load it later
loaded_model = joblib.load('titanic_model.pkl')

# Make predictions with loaded model
predictions = loaded_model.predict(X_val)
print(f"Loaded model accuracy: {accuracy_score(y_val, predictions):.4f}")`}
          language="python"
          filename="save_model.py"
        />
      </div>

      <Checkpoint title="Tutorial Complete!" status="complete">
        <p>You are ready to tackle your own dataset!</p>
        <ul className="list-disc list-inside text-sm mt-2 space-y-1">
          <li>Pick a dataset from Kaggle or our Dataset Ideas Bank</li>
          <li>Follow the same workflow you learned</li>
          <li>Submit your project for feedback</li>
        </ul>
      </Checkpoint>
    </div>
  );
}
