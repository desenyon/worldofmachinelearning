'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/CodeBlock';
import Card from '@/components/Card';
import { useXP } from '@/context/XPContext';

interface FormData {
  datasetName: string;
  datasetLink: string;
  datasetDescription: string;
  problemType: string;
  targetColumn: string;
  edaHighlights: string;
  preprocessingSteps: string;
  modelsTried: string;
  metric: string;
  metricValue: string;
  validationMethod: string;
  nextSteps: string;
  githubLink: string;
  notebookLink: string;
}

const initialFormData: FormData = {
  datasetName: '',
  datasetLink: '',
  datasetDescription: '',
  problemType: 'classification',
  targetColumn: '',
  edaHighlights: '',
  preprocessingSteps: '',
  modelsTried: '',
  metric: '',
  metricValue: '',
  validationMethod: '',
  nextSteps: '',
  githubLink: '',
  notebookLink: '',
};

export default function SubmitPage() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generateJSON = () => {
    return JSON.stringify(
      {
        submission: {
          dataset: {
            name: formData.datasetName,
            link: formData.datasetLink,
            description: formData.datasetDescription,
          },
          problem: {
            type: formData.problemType,
            target: formData.targetColumn,
          },
          analysis: {
            eda_highlights: formData.edaHighlights,
            preprocessing: formData.preprocessingSteps,
          },
          modeling: {
            models_tried: formData.modelsTried,
            metric: formData.metric,
            metric_value: formData.metricValue,
            validation_method: formData.validationMethod,
          },
          reflection: {
            next_steps: formData.nextSteps,
          },
          links: {
            github: formData.githubLink,
            notebook: formData.notebookLink,
          },
          submitted_at: new Date().toISOString(),
        },
      },
      null,
      2
    );
  };

  const generateMarkdown = () => {
    return `# Project Submission: ${formData.datasetName || '[Dataset Name]'}

## Dataset
- **Name**: ${formData.datasetName || '[Dataset Name]'}
- **Link**: ${formData.datasetLink || '[Dataset Link]'}
- **Description**: ${formData.datasetDescription || '[Brief description of the dataset]'}

## Problem Definition
- **Type**: ${formData.problemType}
- **Target Column**: ${formData.targetColumn || '[Target variable]'}

## EDA Highlights
${formData.edaHighlights || '[Key findings from exploratory data analysis]'}

## Preprocessing Steps
${formData.preprocessingSteps || '[Data cleaning and feature engineering steps]'}

## Models Tried
${formData.modelsTried || '[List of models experimented with]'}

## Results
- **Metric**: ${formData.metric || '[Evaluation metric]'}
- **Value**: ${formData.metricValue || '[Metric value]'}
- **Validation Method**: ${formData.validationMethod || '[How you validated]'}

## What I Would Try Next
${formData.nextSteps || '[Future improvements and experiments]'}

## Links
- GitHub: ${formData.githubLink || '[Repository link]'}
- Notebook: ${formData.notebookLink || '[Colab/Notebook link]'}

---
*Submitted via World of ML - Hack Club*
`;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-[#ec3750] text-white text-xs font-bold px-3 py-1 rounded-full">
              SUBMIT
            </span>
            <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              +10 XP
            </span>
          </div>
          <h1 className="text-slate-300 max-w-2xl ">Submit Your Project</h1>
          <p className="text-slate-300 max-w-2xl">
            Submit as many projects as you want. Each uses a different dataset.
            We reward learning, reproducibility, and clear documentation over raw metric scores.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Guidelines */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 mb-8 -mt-6 shadow-lg">
          <h2 className="font-bold text-slate-900 mb-4">Submission Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-bold text-green-600 mb-2">Required</h3>
              <ul className="text-sm text-slate-600 space-y-2">
                <li className="flex items-center gap-2"><span className="text-green-500">-</span> Different dataset than the tutorial (Titanic)</li>
                <li className="flex items-center gap-2"><span className="text-green-500">-</span> Working code (notebook or script)</li>
                <li className="flex items-center gap-2"><span className="text-green-500">-</span> Clear documentation of your process</li>
                <li className="flex items-center gap-2"><span className="text-green-500">-</span> Honest reporting of results</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-amber-600 mb-2">Bonus Points</h3>
              <ul className="text-sm text-slate-600 space-y-2">
                <li className="flex items-center gap-2"><span className="text-amber-500">-</span> Creative feature engineering</li>
                <li className="flex items-center gap-2"><span className="text-amber-500">-</span> Thoughtful error analysis</li>
                <li className="flex items-center gap-2"><span className="text-amber-500">-</span> Clear visualizations</li>
                <li className="flex items-center gap-2"><span className="text-amber-500">-</span> Reproducible random seeds</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Form */}
        <form className="space-y-6">
        {/* Dataset Section */}
        <Card padding="none">
          <div className="panel-header">
            <span className="mono-label">Dataset Information</span>
          </div>
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="datasetName" className="block text-sm font-medium text-slate-700 mb-1">
                  Dataset Name *
                </label>
                <input
                  type="text"
                  id="datasetName"
                  name="datasetName"
                  value={formData.datasetName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm bg-lab-surface border border-lab-border rounded-card focus:outline-none focus:border-accent"
                  placeholder="e.g., Heart Disease UCI"
                />
              </div>
              <div>
                <label htmlFor="datasetLink" className="block text-sm font-medium text-slate-700 mb-1">
                  Dataset Link *
                </label>
                <input
                  type="url"
                  id="datasetLink"
                  name="datasetLink"
                  value={formData.datasetLink}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm bg-lab-surface border border-lab-border rounded-card focus:outline-none focus:border-accent"
                  placeholder="https://kaggle.com/datasets/..."
                />
              </div>
            </div>
            <div>
              <label htmlFor="datasetDescription" className="block text-sm font-medium text-slate-700 mb-1">
                Brief Description
              </label>
              <textarea
                id="datasetDescription"
                name="datasetDescription"
                value={formData.datasetDescription}
                onChange={handleChange}
                rows={2}
                className="w-full px-3 py-2 text-sm bg-lab-surface border border-lab-border rounded-card focus:outline-none focus:border-accent resize-none"
                placeholder="What is this dataset about? How many rows/columns?"
              />
            </div>
          </div>
        </Card>

        {/* Problem Definition */}
        <Card padding="none">
          <div className="panel-header">
            <span className="mono-label">Problem Definition</span>
          </div>
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="problemType" className="block text-sm font-medium text-slate-700 mb-1">
                  Problem Type *
                </label>
                <select
                  id="problemType"
                  name="problemType"
                  value={formData.problemType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm bg-lab-surface border border-lab-border rounded-card focus:outline-none focus:border-accent"
                >
                  <option value="classification">Binary Classification</option>
                  <option value="multiclass">Multi-class Classification</option>
                  <option value="regression">Regression</option>
                  <option value="nlp">NLP / Text Classification</option>
                  <option value="vision">Computer Vision</option>
                  <option value="timeseries">Time Series</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="targetColumn" className="block text-sm font-medium text-slate-700 mb-1">
                  Target Column *
                </label>
                <input
                  type="text"
                  id="targetColumn"
                  name="targetColumn"
                  value={formData.targetColumn}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm bg-lab-surface border border-lab-border rounded-card focus:outline-none focus:border-accent"
                  placeholder="e.g., target, label, price"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Analysis */}
        <Card padding="none">
          <div className="panel-header">
            <span className="mono-label">Analysis & Preprocessing</span>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <label htmlFor="edaHighlights" className="block text-sm font-medium text-slate-700 mb-1">
                EDA Highlights *
              </label>
              <textarea
                id="edaHighlights"
                name="edaHighlights"
                value={formData.edaHighlights}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 text-sm bg-lab-surface border border-lab-border rounded-card focus:outline-none focus:border-accent resize-none"
                placeholder="Key findings from your exploratory analysis. What did you learn about the data?"
              />
            </div>
            <div>
              <label htmlFor="preprocessingSteps" className="block text-sm font-medium text-slate-700 mb-1">
                Preprocessing Steps *
              </label>
              <textarea
                id="preprocessingSteps"
                name="preprocessingSteps"
                value={formData.preprocessingSteps}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 text-sm bg-lab-surface border border-lab-border rounded-card focus:outline-none focus:border-accent resize-none"
                placeholder="How did you handle missing values? What encoding did you use? Any feature engineering?"
              />
            </div>
          </div>
        </Card>

        {/* Modeling */}
        <Card padding="none">
          <div className="panel-header">
            <span className="mono-label">Modeling & Results</span>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <label htmlFor="modelsTried" className="block text-sm font-medium text-slate-700 mb-1">
                Models Tried *
              </label>
              <textarea
                id="modelsTried"
                name="modelsTried"
                value={formData.modelsTried}
                onChange={handleChange}
                rows={2}
                className="w-full px-3 py-2 text-sm bg-lab-surface border border-lab-border rounded-card focus:outline-none focus:border-accent resize-none"
                placeholder="List the models you experimented with (e.g., Logistic Regression, Random Forest, XGBoost)"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="metric" className="block text-sm font-medium text-slate-700 mb-1">
                  Primary Metric *
                </label>
                <input
                  type="text"
                  id="metric"
                  name="metric"
                  value={formData.metric}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm bg-lab-surface border border-lab-border rounded-card focus:outline-none focus:border-accent"
                  placeholder="e.g., Accuracy, F1, RMSE"
                />
              </div>
              <div>
                <label htmlFor="metricValue" className="block text-sm font-medium text-slate-700 mb-1">
                  Metric Value *
                </label>
                <input
                  type="text"
                  id="metricValue"
                  name="metricValue"
                  value={formData.metricValue}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm bg-lab-surface border border-lab-border rounded-card focus:outline-none focus:border-accent"
                  placeholder="e.g., 0.85 or 85%"
                />
              </div>
              <div>
                <label htmlFor="validationMethod" className="block text-sm font-medium text-slate-700 mb-1">
                  Validation Method *
                </label>
                <input
                  type="text"
                  id="validationMethod"
                  name="validationMethod"
                  value={formData.validationMethod}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm bg-lab-surface border border-lab-border rounded-card focus:outline-none focus:border-accent"
                  placeholder="e.g., 80/20 split, 5-fold CV"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Reflection */}
        <Card padding="none">
          <div className="panel-header">
            <span className="mono-label">Reflection</span>
          </div>
          <div className="p-4">
            <label htmlFor="nextSteps" className="block text-sm font-medium text-slate-700 mb-1">
              What Would You Try Next? *
            </label>
            <textarea
              id="nextSteps"
              name="nextSteps"
              value={formData.nextSteps}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 text-sm bg-lab-surface border border-lab-border rounded-card focus:outline-none focus:border-accent resize-none"
              placeholder="If you had more time, what would you improve? What didn't work that you'd try differently?"
            />
          </div>
        </Card>

        {/* Links */}
        <Card padding="none">
          <div className="panel-header">
            <span className="mono-label">Project Links</span>
          </div>
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="githubLink" className="block text-sm font-medium text-slate-700 mb-1">
                  GitHub Repository
                </label>
                <input
                  type="url"
                  id="githubLink"
                  name="githubLink"
                  value={formData.githubLink}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm bg-lab-surface border border-lab-border rounded-card focus:outline-none focus:border-accent"
                  placeholder="https://github.com/..."
                />
              </div>
              <div>
                <label htmlFor="notebookLink" className="block text-sm font-medium text-slate-700 mb-1">
                  Notebook Link (Colab/Kaggle)
                </label>
                <input
                  type="url"
                  id="notebookLink"
                  name="notebookLink"
                  value={formData.notebookLink}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm bg-lab-surface border border-lab-border rounded-card focus:outline-none focus:border-accent"
                  placeholder="https://colab.research.google.com/..."
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <motion.button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="flex-1 px-4 py-3 bg-lab-surface border border-lab-border text-slate-700 font-medium rounded-card hover:border-slate-300 transition-colors"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            {showPreview ? 'Hide Preview' : 'Preview Submission'}
          </motion.button>
          <motion.button
            type="button"
            className="flex-1 px-4 py-3 bg-accent text-white font-medium rounded-card hover:bg-accent-dark transition-colors"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => {
              navigator.clipboard.writeText(generateJSON());
              alert('JSON copied to clipboard! Submit this to your instructor or the Hack Club Slack.');
            }}
          >
            Copy JSON & Submit
          </motion.button>
        </div>
      </form>

      {/* Preview */}
      {showPreview && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-8 space-y-4"
        >
          <h2 className="font-semibold text-slate-900">Preview</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-slate-700 mb-2">JSON Output</h3>
              <CodeBlock code={generateJSON()} language="json" filename="submission.json" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-700 mb-2">Markdown Output</h3>
              <div className="bg-slate-900 rounded-card p-4 overflow-auto max-h-96">
                <pre className="text-sm text-slate-100 whitespace-pre-wrap font-mono">
                  {generateMarkdown()}
                </pre>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Submission Template */}
      <Card padding="md" className="mt-8">
        <h2 className="font-semibold text-slate-900 mb-3">Alternative: Markdown Template</h2>
        <p className="text-sm text-slate-600 mb-4">
          You can also submit by copying this template and filling it out in a README or document:
        </p>
        <CodeBlock
          code={`# Project Submission: [Dataset Name]

## Dataset
- **Name**: [Dataset name]
- **Link**: [Kaggle/UCI/etc. link]
- **Description**: [Brief description]

## Problem Definition
- **Type**: [Classification/Regression/etc.]
- **Target Column**: [Target variable name]

## EDA Highlights
[Your key findings from exploratory analysis]

## Preprocessing Steps
[How you cleaned and prepared the data]

## Models Tried
[List of models you experimented with]

## Results
- **Metric**: [Evaluation metric used]
- **Value**: [Your best score]
- **Validation Method**: [How you validated]

## What I Would Try Next
[Future improvements]

## Links
- GitHub: [Repository URL]
- Notebook: [Colab/Kaggle URL]`}
          language="markdown"
          filename="SUBMISSION_TEMPLATE.md"
        />
      </Card>
    </div>
    </div>
  );
}
