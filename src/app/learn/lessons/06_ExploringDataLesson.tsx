'use client';

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, CartesianGrid, XAxis, YAxis } from 'recharts';
import CodeBlock from '@/components/CodeBlock';

const survivalData = [
  { name: 'Survived', count: 342, fill: '#10b981' },
  { name: 'Did Not Survive', count: 549, fill: '#64748b' },
];

const ageDistribution = [
  { range: '0-10', count: 62 },
  { range: '10-20', count: 102 },
  { range: '20-30', count: 220 },
  { range: '30-40', count: 167 },
  { range: '40-50', count: 89 },
  { range: '50-60', count: 48 },
  { range: '60-70', count: 19 },
  { range: '70-80', count: 7 },
];

export default function ExploringDataLesson() {
  return (
    <div className="space-y-8">
      <p className="text-lg text-slate-700 leading-relaxed">
        Before building a model, we need to understand our data deeply. This process is called
        <strong> Exploratory Data Analysis (EDA)</strong>. EDA helps us find patterns, spot problems,
        and form hypotheses about what features might predict survival.
      </p>

      {/* Theory: Why EDA matters */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Theory: Why EDA Matters</h2>
        <div className="bg-slate-900 text-white rounded-xl p-6">
          <p className="text-slate-300 mb-4">
            Jumping straight to model building without understanding your data is a recipe for disaster.
            EDA helps you:
          </p>
          <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
            <li><strong className="text-white">Find data quality issues</strong> - missing values, outliers, duplicates</li>
            <li><strong className="text-white">Understand distributions</strong> - is age normally distributed? Are classes balanced?</li>
            <li><strong className="text-white">Discover relationships</strong> - which features correlate with survival?</li>
            <li><strong className="text-white">Generate hypotheses</strong> - "women survived more" becomes a testable idea</li>
          </ul>
          <p className="text-slate-400 text-sm mt-4">
            Professional data scientists spend 60-80% of their time on data understanding and preparation.
          </p>
        </div>
      </section>

      {/* Survival Distribution */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Overall Survival Rate</h2>
        <p className="text-slate-600 mb-4">
          First, let's see the basic survival breakdown. More passengers died (549) than survived (342).
        </p>

        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={survivalData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
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
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mt-4">
          <h3 className="font-bold text-amber-900 mb-2">Class Imbalance</h3>
          <p className="text-amber-800 text-sm">
            When one class significantly outnumbers the other, we call this an <strong>imbalanced dataset</strong>.
            Here, 62% died vs 38% survived. This matters because a naive model could just predict "did not survive"
            for everyone and still be 62% accurate! We'll discuss how to handle this later.
          </p>
        </div>
      </section>

      {/* EDA Code */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">EDA with Code</h2>
        <p className="text-slate-700 mb-4">
          Let's write code to analyze survival patterns by different features:
        </p>

        <CodeBlock
          code={`# eda.py - Exploratory Data Analysis for Titanic

import pandas as pd

df = pd.read_csv('train.csv')

# Overall survival rate
print("=== Overall Survival ===")
print(f"Survived: {df['Survived'].sum()} ({df['Survived'].mean()*100:.1f}%)")
print(f"Died: {(df['Survived'] == 0).sum()} ({(1-df['Survived'].mean())*100:.1f}%)")

# Survival by Sex
# groupby() groups rows by a column, then we compute statistics
print("\\n=== Survival by Sex ===")
sex_survival = df.groupby('Sex')['Survived'].mean()
print(sex_survival)
# female: 0.74 (74% survived)
# male: 0.19 (19% survived)

# Survival by Class
print("\\n=== Survival by Passenger Class ===")
class_survival = df.groupby('Pclass')['Survived'].mean()
print(class_survival)
# 1st class: 63% survived
# 2nd class: 47% survived  
# 3rd class: 24% survived

# Survival by both Sex AND Class
print("\\n=== Survival by Sex and Class ===")
print(df.groupby(['Sex', 'Pclass'])['Survived'].mean())`}
          language="python"
          filename="eda.py"
        />
      </section>

      {/* Understanding groupby */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Understanding groupby()</h2>
        <p className="text-slate-700 mb-4">
          The <code>groupby()</code> function is one of pandas' most powerful tools. Here's how it works:
        </p>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-center">
            <div className="text-4xl mb-2">1</div>
            <h3 className="font-bold text-slate-900 mb-2">Split</h3>
            <p className="text-slate-600 text-sm">
              Divide data into groups based on column values (male vs female)
            </p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-center">
            <div className="text-4xl mb-2">2</div>
            <h3 className="font-bold text-slate-900 mb-2">Apply</h3>
            <p className="text-slate-600 text-sm">
              Calculate something for each group (like mean survival)
            </p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-center">
            <div className="text-4xl mb-2">3</div>
            <h3 className="font-bold text-slate-900 mb-2">Combine</h3>
            <p className="text-slate-600 text-sm">
              Put results back together into one output
            </p>
          </div>
        </div>

        <CodeBlock
          code={`# More groupby examples
# Count passengers in each class
print(df.groupby('Pclass').size())

# Multiple statistics at once
print(df.groupby('Sex')['Age'].agg(['mean', 'min', 'max']))

# Cross-tabulation: count combinations
print(pd.crosstab(df['Sex'], df['Survived']))`}
          language="python"
        />
      </section>

      {/* Age Distribution */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Age Distribution</h2>
        <p className="text-slate-600 mb-4">
          Understanding how ages are distributed helps us decide how to handle missing age values.
        </p>

        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ageDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="range" tick={{ fontSize: 12 }} stroke="#64748b" />
                <YAxis tick={{ fontSize: 12 }} stroke="#64748b" />
                <Tooltip />
                <Bar dataKey="count" fill="#ec3750" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <p className="text-slate-600 text-sm mt-4">
          Most passengers were between 20-40 years old. The distribution is roughly normal with a slight right skew
          (more young people than old).
        </p>
      </section>

      {/* Key Findings */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Key EDA Findings</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-[#ec3750]/5 border border-[#ec3750]/20 rounded-xl p-5">
            <h3 className="font-bold text-[#ec3750] mb-2">Sex is the strongest predictor</h3>
            <p className="text-slate-600 text-sm">
              74% of women survived vs only 19% of men. "Women and children first" was real.
            </p>
          </div>
          <div className="bg-[#ec3750]/5 border border-[#ec3750]/20 rounded-xl p-5">
            <h3 className="font-bold text-[#ec3750] mb-2">Class matters a lot</h3>
            <p className="text-slate-600 text-sm">
              63% of 1st class survived vs 24% of 3rd class. Wealth meant better cabin location and lifeboat access.
            </p>
          </div>
          <div className="bg-[#ec3750]/5 border border-[#ec3750]/20 rounded-xl p-5">
            <h3 className="font-bold text-[#ec3750] mb-2">Age distribution is skewed</h3>
            <p className="text-slate-600 text-sm">
              Most passengers were 20-40 years old. Children had higher survival rates overall.
            </p>
          </div>
          <div className="bg-[#ec3750]/5 border border-[#ec3750]/20 rounded-xl p-5">
            <h3 className="font-bold text-[#ec3750] mb-2">Lots of missing data</h3>
            <p className="text-slate-600 text-sm">
              Age (20% missing), Cabin (77% missing), Embarked (2 missing). We'll address this next.
            </p>
          </div>
        </div>
      </section>

      {/* Success */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 mt-8">
        <h3 className="font-bold text-green-900 mb-2">EDA Complete!</h3>
        <p className="text-green-800">
          You now understand your data: what patterns exist, which features matter, and what problems
          need fixing. In the next lesson, we'll tackle those missing values.
        </p>
      </div>
    </div>
  );
}
