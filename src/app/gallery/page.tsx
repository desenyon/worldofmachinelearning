'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '@/components/Card';
import Badge from '@/components/Badge';

type ProjectCategory = 'all' | 'classification' | 'regression' | 'vision' | 'nlp' | 'timeseries';
type SortOption = 'newest' | 'metric' | 'creative';

interface Project {
  id: string;
  title: string;
  author: string;
  dataset: string;
  datasetLink: string;
  category: ProjectCategory;
  target: string;
  modelType: string;
  metric: string;
  metricValue: number;
  lessons: string[];
  date: string;
  tags: string[];
}

const projects: Project[] = [
  {
    id: '1',
    title: 'Predicting Diabetes Onset',
    author: 'Sarah K.',
    dataset: 'Pima Indians Diabetes',
    datasetLink: 'https://kaggle.com/datasets/uciml/pima-indians-diabetes-database',
    category: 'classification',
    target: 'Outcome (0/1)',
    modelType: 'Random Forest + XGBoost',
    metric: 'F1 Score',
    metricValue: 0.78,
    lessons: [
      'Class imbalance required SMOTE oversampling',
      'Feature engineering with BMI categories improved recall by 8%'
    ],
    date: '2026-01-10',
    tags: ['healthcare', 'binary-classification', 'feature-engineering'],
  },
  {
    id: '2',
    title: 'House Price Regression',
    author: 'Marcus T.',
    dataset: 'Ames Housing',
    datasetLink: 'https://kaggle.com/c/house-prices-advanced-regression-techniques',
    category: 'regression',
    target: 'SalePrice',
    modelType: 'Gradient Boosting',
    metric: 'RMSE',
    metricValue: 24500,
    lessons: [
      'Log-transforming the target reduced skewness significantly',
      'Neighborhood feature was the strongest predictor'
    ],
    date: '2026-01-08',
    tags: ['real-estate', 'regression', 'log-transform'],
  },
  {
    id: '3',
    title: 'MNIST Digit Classifier',
    author: 'Emma L.',
    dataset: 'MNIST Handwritten Digits',
    datasetLink: 'https://kaggle.com/c/digit-recognizer',
    category: 'vision',
    target: 'Digit (0-9)',
    modelType: 'CNN (Convolutional Neural Network)',
    metric: 'Accuracy',
    metricValue: 0.992,
    lessons: [
      'Data augmentation (rotation, shift) prevented overfitting',
      'Batch normalization accelerated training significantly'
    ],
    date: '2026-01-05',
    tags: ['computer-vision', 'deep-learning', 'cnn'],
  },
  {
    id: '4',
    title: 'Sentiment Analysis on Reviews',
    author: 'Alex P.',
    dataset: 'Amazon Product Reviews',
    datasetLink: 'https://kaggle.com/datasets/bittlingmayer/amazonreviews',
    category: 'nlp',
    target: 'Positive/Negative',
    modelType: 'TF-IDF + Logistic Regression',
    metric: 'Accuracy',
    metricValue: 0.89,
    lessons: [
      'Simple TF-IDF baseline beat more complex approaches initially',
      'Removing stopwords hurt performance surprisingly'
    ],
    date: '2026-01-03',
    tags: ['nlp', 'sentiment', 'text-classification'],
  },
  {
    id: '5',
    title: 'Stock Price Movement',
    author: 'Jordan M.',
    dataset: 'S&P 500 Historical Data',
    datasetLink: 'https://kaggle.com/datasets/camnugent/sandp500',
    category: 'timeseries',
    target: 'Price Direction',
    modelType: 'LSTM',
    metric: 'Accuracy',
    metricValue: 0.56,
    lessons: [
      'Time series requires careful train/test split (no shuffle!)',
      'Market prediction is very hard - random baseline was 50%'
    ],
    date: '2025-12-28',
    tags: ['finance', 'time-series', 'lstm'],
  },
  {
    id: '6',
    title: 'Customer Churn Prediction',
    author: 'Lily W.',
    dataset: 'Telco Customer Churn',
    datasetLink: 'https://kaggle.com/datasets/blastchar/telco-customer-churn',
    category: 'classification',
    target: 'Churn (Yes/No)',
    modelType: 'XGBoost',
    metric: 'AUC-ROC',
    metricValue: 0.85,
    lessons: [
      'Contract type and tenure were the most predictive features',
      'Cost-sensitive learning improved business value'
    ],
    date: '2025-12-25',
    tags: ['business', 'churn', 'imbalanced-data'],
  },
  {
    id: '7',
    title: 'Wine Quality Prediction',
    author: 'David R.',
    dataset: 'Wine Quality Dataset',
    datasetLink: 'https://kaggle.com/datasets/uciml/red-wine-quality-cortez-et-al-2009',
    category: 'regression',
    target: 'Quality Score (3-9)',
    modelType: 'Random Forest Regressor',
    metric: 'MAE',
    metricValue: 0.42,
    lessons: [
      'Treated as regression despite ordinal target',
      'Alcohol content was the strongest predictor'
    ],
    date: '2025-12-20',
    tags: ['regression', 'ordinal', 'feature-importance'],
  },
  {
    id: '8',
    title: 'Fashion Item Classifier',
    author: 'Nina C.',
    dataset: 'Fashion MNIST',
    datasetLink: 'https://kaggle.com/datasets/zalando-research/fashionmnist',
    category: 'vision',
    target: 'Clothing Type (10 classes)',
    modelType: 'CNN',
    metric: 'Accuracy',
    metricValue: 0.93,
    lessons: [
      'Dropout layers essential for generalization',
      'Shirts and T-shirts were often confused'
    ],
    date: '2025-12-15',
    tags: ['computer-vision', 'multi-class', 'fashion'],
  },
];

const categories: { value: ProjectCategory; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'classification', label: 'Classification' },
  { value: 'regression', label: 'Regression' },
  { value: 'vision', label: 'Vision' },
  { value: 'nlp', label: 'NLP' },
  { value: 'timeseries', label: 'Time Series' },
];

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'metric', label: 'Best Metric' },
  { value: 'creative', label: 'Most Creative' },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  const filteredProjects = projects
    .filter(p => activeCategory === 'all' || p.category === activeCategory)
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      if (sortBy === 'metric') {
        return b.metricValue - a.metricValue;
      }
      // Creative - just shuffle based on lessons length
      return b.lessons.join('').length - a.lessons.join('').length;
    });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="mono-label">Project Gallery</span>
          <Badge variant="accent">{projects.length} Projects</Badge>
        </div>
        <h1 className="text-2xl font-semibold text-slate-900 mb-2">
          Student Submissions
        </h1>
        <p className="text-slate-600 max-w-2xl">
          Explore projects built by other students. Each project uses a different dataset
          and demonstrates the ML workflow you learned.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Category Chips */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`
                px-3 py-1.5 text-sm font-medium rounded-full transition-colors
                ${activeCategory === cat.value
                  ? 'bg-accent text-white'
                  : 'bg-lab-surface border border-lab-border text-slate-600 hover:border-slate-300'
                }
              `}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2 sm:ml-auto">
          <span className="text-sm text-slate-500">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-3 py-1.5 text-sm bg-lab-surface border border-lab-border rounded-card focus:outline-none focus:border-accent"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-slate-500 mb-4">
        Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
      </p>

      {/* Projects Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500">No projects found in this category.</p>
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const categoryColors: Record<ProjectCategory, string> = {
    all: 'bg-slate-100 text-slate-700',
    classification: 'bg-blue-100 text-blue-700',
    regression: 'bg-emerald-100 text-emerald-700',
    vision: 'bg-amber-100 text-amber-700',
    nlp: 'bg-rose-100 text-rose-700',
    timeseries: 'bg-cyan-100 text-cyan-700',
  };

  return (
    <Card variant="interactive" padding="none" className="h-full">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${categoryColors[project.category]}`}>
              {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
            </span>
            <h3 className="font-semibold text-slate-900 mt-2">{project.title}</h3>
            <p className="text-sm text-slate-500">by {project.author}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-mono font-semibold text-accent">
              {project.metric === 'RMSE' || project.metric === 'MAE'
                ? project.metricValue.toLocaleString()
                : (project.metricValue * 100).toFixed(1) + '%'
              }
            </div>
            <div className="text-xs text-slate-500">{project.metric}</div>
          </div>
        </div>

        {/* Dataset */}
        <div className="mb-3 p-2 bg-lab-surface-alt rounded border border-lab-border-light">
          <span className="mono-label">Dataset</span>
          <p className="text-sm text-slate-700 mt-1">
            <a
              href={project.datasetLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              {project.dataset}
            </a>
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Target: <code className="bg-slate-200 px-1 rounded">{project.target}</code>
          </p>
        </div>

        {/* Model */}
        <div className="mb-3">
          <span className="mono-label">Model</span>
          <p className="text-sm text-slate-700 mt-1">{project.modelType}</p>
        </div>

        {/* Lessons Learned */}
        <div>
          <span className="mono-label">Key Lessons</span>
          <ul className="mt-2 space-y-1">
            {project.lessons.map((lesson, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                <span className="text-accent mt-0.5">→</span>
                <span>{lesson}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tags */}
        <div className="mt-4 pt-3 border-t border-lab-border-light flex flex-wrap gap-1">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs bg-slate-100 text-slate-600 rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Date */}
        <div className="mt-3 text-xs text-slate-400 font-mono">
          {new Date(project.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </div>
      </div>
    </Card>
  );
}
