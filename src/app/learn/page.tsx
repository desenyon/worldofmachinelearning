'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Badge from '@/components/Badge';
import { useXP } from '@/context/XPContext';
import {
  WhatIsMLLesson,
  SetupPythonLesson,
  FirstScriptLesson,
  TitanicDatasetLesson,
  LoadingDataLesson,
  ExploringDataLesson,
  MissingValuesLesson,
  EncodingLesson,
  TrainTestSplitLesson,
  FirstModelLesson,
  EvaluatingLesson,
  ImprovingLesson,
  NewDatasetsLesson,
  SubmittingLesson,
} from './lessons';

// All lessons organized by module
const curriculum = [
  {
    module: 1,
    title: 'Getting Started',
    description: 'Set up your environment and understand what ML is',
    lessons: [
      { id: 'what-is-ml', title: 'What is Machine Learning?', duration: '5 min' },
      { id: 'setup-python', title: 'Setting Up Python', duration: '10 min' },
      { id: 'first-script', title: 'Your First Python Script', duration: '10 min' },
    ],
  },
  {
    module: 2,
    title: 'Working with Data',
    description: 'Load, explore, and understand your dataset',
    lessons: [
      { id: 'titanic-dataset', title: 'The Titanic Dataset', duration: '10 min' },
      { id: 'loading-data', title: 'Loading Data with Pandas', duration: '15 min' },
      { id: 'exploring-data', title: 'Exploring Your Data (EDA)', duration: '20 min' },
    ],
  },
  {
    module: 3,
    title: 'Preparing Data',
    description: 'Clean and transform data for machine learning',
    lessons: [
      { id: 'missing-values', title: 'Handling Missing Values', duration: '15 min' },
      { id: 'encoding', title: 'Encoding Categories', duration: '15 min' },
      { id: 'train-test-split', title: 'Train/Test Split', duration: '10 min' },
    ],
  },
  {
    module: 4,
    title: 'Building Models',
    description: 'Train and evaluate your first ML model',
    lessons: [
      { id: 'first-model', title: 'Training Your First Model', duration: '15 min' },
      { id: 'evaluating', title: 'Evaluating Performance', duration: '15 min' },
      { id: 'improving', title: 'Improving Your Model', duration: '20 min' },
    ],
  },
  {
    module: 5,
    title: 'Next Steps',
    description: 'Apply your skills to new projects',
    lessons: [
      { id: 'new-datasets', title: 'Finding New Datasets', duration: '10 min' },
      { id: 'submitting', title: 'Submitting Your Project', duration: '10 min' },
    ],
  },
];

// Flatten lessons for easy lookup
const allLessons = curriculum.flatMap((m) =>
  m.lessons.map((l) => ({ ...l, module: m.module, moduleTitle: m.title }))
);

export default function LearnPage() {
  const [activeLesson, setActiveLesson] = useState('what-is-ml');
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { addTutorialXP, completedTutorials, totalXP } = useXP();

  // Load completed lessons from XP context
  useEffect(() => {
    const lessonIds = completedTutorials.filter((t) => t.startsWith('learn-'));
    setCompletedLessons(lessonIds.map((t) => t.replace('learn-', '')));
  }, [completedTutorials]);

  const markComplete = () => {
    if (!completedLessons.includes(activeLesson)) {
      setCompletedLessons((prev) => [...prev, activeLesson]);
      addTutorialXP(`learn-${activeLesson}`);
    }
  };

  const currentLessonIndex = allLessons.findIndex((l) => l.id === activeLesson);
  const currentLesson = allLessons[currentLessonIndex];
  const nextLesson = allLessons[currentLessonIndex + 1];
  const prevLesson = allLessons[currentLessonIndex - 1];

  const progress = Math.round((completedLessons.length / allLessons.length) * 100);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed left-0 top-14 bottom-0 w-72 bg-white border-r border-slate-200 overflow-y-auto transition-transform z-30 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* XP Display */}
          <div className="p-4 bg-slate-50 border-b border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Your Progress</span>
              <Link href="/store" className="text-[#ec3750] text-xs font-bold hover:underline">
                Store
              </Link>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-[#ec3750]">{totalXP}</span>
              <span className="text-slate-500 text-sm">XP</span>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#ec3750] transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-xs text-slate-500 font-mono">{progress}%</span>
            </div>
          </div>

          {/* Curriculum */}
          <nav className="p-4">
            {curriculum.map((module) => (
              <div key={module.module} className="mb-5">
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="w-5 h-5 rounded-full bg-[#ec3750] text-white text-xs font-bold flex items-center justify-center">
                    {module.module}
                  </span>
                  <span className="font-bold text-slate-900 text-sm">{module.title}</span>
                </div>
                <div className="ml-7 border-l-2 border-slate-100 pl-3 space-y-0.5">
                  {module.lessons.map((lesson) => {
                    const isActive = activeLesson === lesson.id;
                    const isComplete = completedLessons.includes(lesson.id);
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => setActiveLesson(lesson.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center justify-between ${
                          isActive
                            ? 'bg-[#ec3750] text-white font-medium'
                            : isComplete
                            ? 'text-slate-600 hover:bg-slate-100'
                            : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
                        }`}
                      >
                        <span className="truncate">{lesson.title}</span>
                        {isComplete && !isActive && (
                          <svg className="w-4 h-4 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </aside>

        {/* Toggle Sidebar Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`fixed top-20 z-40 bg-white border border-slate-200 rounded-r-lg p-2 shadow-md hover:bg-slate-50 transition-all ${
            sidebarOpen ? 'left-72' : 'left-0'
          }`}
        >
          <svg
            className={`w-4 h-4 text-slate-600 transition-transform ${sidebarOpen ? '' : 'rotate-180'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Main Content */}
        <main className={`flex-1 transition-all ${sidebarOpen ? 'ml-72' : 'ml-0'}`}>
          <div className="max-w-4xl mx-auto px-6 py-8 pt-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLesson}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                {/* Lesson Header */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                    <span className="font-mono">Module {currentLesson?.module}</span>
                    <span>/</span>
                    <span>{currentLesson?.moduleTitle}</span>
                  </div>
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">{currentLesson?.title}</h1>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span>{currentLesson?.duration} read</span>
                    {completedLessons.includes(activeLesson) && (
                      <Badge variant="success">Completed</Badge>
                    )}
                  </div>
                </div>

                {/* Lesson Content */}
                <div className="prose prose-slate max-w-none">
                  <LessonContent lessonId={activeLesson} />
                </div>

                {/* Completion & Navigation */}
                <div className="mt-12 pt-8 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    {prevLesson ? (
                      <button
                        onClick={() => setActiveLesson(prevLesson.id)}
                        className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="text-sm">{prevLesson.title}</span>
                      </button>
                    ) : (
                      <div />
                    )}

                    <button
                      onClick={markComplete}
                      disabled={completedLessons.includes(activeLesson)}
                      className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                        completedLessons.includes(activeLesson)
                          ? 'bg-green-100 text-green-700 cursor-default'
                          : 'bg-[#ec3750] text-white hover:bg-[#d63047] shadow-lg hover:shadow-xl'
                      }`}
                    >
                      {completedLessons.includes(activeLesson)
                        ? 'Completed (+1 XP)'
                        : 'Mark Complete (+1 XP)'}
                    </button>

                    {nextLesson ? (
                      <button
                        onClick={() => setActiveLesson(nextLesson.id)}
                        className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
                      >
                        <span className="text-sm">{nextLesson.title}</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    ) : (
                      <Link
                        href="/submit"
                        className="flex items-center gap-2 text-[#ec3750] hover:underline font-medium"
                      >
                        Submit Your Project
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}

// Lesson Content Components
function LessonContent({ lessonId }: { lessonId: string }) {
  switch (lessonId) {
    case 'what-is-ml':
      return <WhatIsMLLesson />;
    case 'setup-python':
      return <SetupPythonLesson />;
    case 'first-script':
      return <FirstScriptLesson />;
    case 'titanic-dataset':
      return <TitanicDatasetLesson />;
    case 'loading-data':
      return <LoadingDataLesson />;
    case 'exploring-data':
      return <ExploringDataLesson />;
    case 'missing-values':
      return <MissingValuesLesson />;
    case 'encoding':
      return <EncodingLesson />;
    case 'train-test-split':
      return <TrainTestSplitLesson />;
    case 'first-model':
      return <FirstModelLesson />;
    case 'evaluating':
      return <EvaluatingLesson />;
    case 'improving':
      return <ImprovingLesson />;
    case 'new-datasets':
      return <NewDatasetsLesson />;
    case 'submitting':
      return <SubmittingLesson />;
    default:
      return <div>Lesson not found</div>;
  }
}


