'use client';

import CodeBlock from '@/components/CodeBlock';

export default function MissingValuesLesson() {
  return (
    <div className="space-y-8">
      <p className="text-lg text-slate-700 leading-relaxed">
        Real-world data is messy. The Titanic dataset has missing values in several columns.
        Before we can train a machine learning model, we need to decide what to do with these gaps.
        This is one of the most important skills in data science.
      </p>

      {/* Theory: Why missing values matter */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Theory: Types of Missing Data</h2>
        <div className="bg-slate-900 text-white rounded-xl p-6">
          <p className="text-slate-300 mb-4">
            Statisticians categorize missing data into three types. Understanding this helps you choose
            the right strategy:
          </p>
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-white">MCAR (Missing Completely at Random)</h3>
              <p className="text-slate-400 text-sm">
                The data is missing for no particular reason. Like if someone accidentally skipped a form field.
                Safe to drop or fill without introducing bias.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-white">MAR (Missing at Random)</h3>
              <p className="text-slate-400 text-sm">
                The missingness depends on other observed data. Maybe older passengers were less likely to report age.
                Needs careful handling based on related columns.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-white">MNAR (Missing Not at Random)</h3>
              <p className="text-slate-400 text-sm">
                The missingness depends on the missing value itself. Maybe people with low income didn't report income.
                Hardest to handle correctly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Check missing values */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Identifying Missing Values</h2>
        <p className="text-slate-700 mb-4">
          First, let's see exactly what we're dealing with:
        </p>

        <CodeBlock
          code={`import pandas as pd

df = pd.read_csv('train.csv')

# Count missing values in each column
print("Missing values per column:")
print(df.isnull().sum())
print()

# Show as percentages
print("Missing percentages:")
print((df.isnull().sum() / len(df) * 100).round(1))`}
          language="python"
          filename="check_missing.py"
        />

        <div className="mt-4 bg-slate-100 rounded-xl p-4 font-mono text-sm">
          <pre>{`Missing values per column:
PassengerId      0
Survived         0
Pclass           0
Name             0
Sex              0
Age            177
SibSp            0
Parch            0
Ticket           0
Fare             0
Cabin          687
Embarked         2`}</pre>
        </div>
      </section>

      {/* Strategies */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Strategies for Handling Missing Data</h2>
        <p className="text-slate-700 mb-4">
          There are several approaches. The right choice depends on how much data is missing and why:
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h3 className="font-bold text-slate-900 mb-2">1. Drop Rows</h3>
            <p className="text-slate-600 text-sm mb-2">
              Remove rows with missing values. Simple but loses data.
            </p>
            <code className="text-xs bg-slate-100 px-2 py-1 rounded">df.dropna()</code>
            <p className="text-slate-500 text-xs mt-2">
              Use when: Very few rows have missing data
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h3 className="font-bold text-slate-900 mb-2">2. Drop Columns</h3>
            <p className="text-slate-600 text-sm mb-2">
              Remove entire columns with too much missing data.
            </p>
            <code className="text-xs bg-slate-100 px-2 py-1 rounded">df.drop(['Cabin'], axis=1)</code>
            <p className="text-slate-500 text-xs mt-2">
              Use when: A column has more than 50% missing
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h3 className="font-bold text-slate-900 mb-2">3. Fill with Statistics</h3>
            <p className="text-slate-600 text-sm mb-2">
              Replace missing values with mean, median, or mode.
            </p>
            <code className="text-xs bg-slate-100 px-2 py-1 rounded">df['Age'].fillna(df['Age'].median())</code>
            <p className="text-slate-500 text-xs mt-2">
              Use when: Missing is random and you need to keep all rows
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h3 className="font-bold text-slate-900 mb-2">4. Fill with Domain Knowledge</h3>
            <p className="text-slate-600 text-sm mb-2">
              Use your understanding of the data to make smart fills.
            </p>
            <code className="text-xs bg-slate-100 px-2 py-1 rounded">df['Embarked'].fillna('S')</code>
            <p className="text-slate-500 text-xs mt-2">
              Use when: You know the likely value (S is most common port)
            </p>
          </div>
        </div>
      </section>

      {/* Our plan */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Strategy for Titanic Data</h2>
        
        <div className="space-y-4">
          <div className="bg-[#ec3750]/5 border border-[#ec3750]/20 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <span className="bg-[#ec3750] text-white text-xs font-bold px-2 py-1 rounded shrink-0">AGE</span>
              <div>
                <h3 className="font-bold text-slate-900">177 missing (20%)</h3>
                <p className="text-slate-600 text-sm mt-1">
                  <strong>Strategy:</strong> Fill with median (28 years). We use median instead of mean because
                  median is robust to outliers. If there's one 80-year-old, mean gets pulled up, but median stays stable.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#ec3750]/5 border border-[#ec3750]/20 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <span className="bg-slate-500 text-white text-xs font-bold px-2 py-1 rounded shrink-0">CABIN</span>
              <div>
                <h3 className="font-bold text-slate-900">687 missing (77%)</h3>
                <p className="text-slate-600 text-sm mt-1">
                  <strong>Strategy:</strong> Drop this column entirely. With 77% missing, any fill strategy would
                  introduce more noise than signal. The column is mostly useless.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#ec3750]/5 border border-[#ec3750]/20 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded shrink-0">EMBARKED</span>
              <div>
                <h3 className="font-bold text-slate-900">2 missing (0.2%)</h3>
                <p className="text-slate-600 text-sm mt-1">
                  <strong>Strategy:</strong> Fill with 'S' (Southampton). It's the most common embarkation port
                  (72% of passengers). With only 2 missing, this is a safe assumption.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Implementing Our Strategy</h2>

        <CodeBlock
          code={`import pandas as pd

df = pd.read_csv('train.csv')

# --- Handle missing values ---

# 1. Fill Age with median
# .median() calculates the middle value when sorted
median_age = df['Age'].median()
print(f"Filling missing ages with median: {median_age}")
df['Age'] = df['Age'].fillna(median_age)

# 2. Fill Embarked with most common value
most_common_embarked = df['Embarked'].mode()[0]  # mode() returns the most frequent value
print(f"Filling missing embarked with mode: {most_common_embarked}")
df['Embarked'] = df['Embarked'].fillna(most_common_embarked)

# 3. Drop columns we won't use
# - Cabin: too many missing values
# - PassengerId: just an ID, not predictive
# - Name: text data we won't use in this tutorial
# - Ticket: complex text data
columns_to_drop = ['Cabin', 'PassengerId', 'Name', 'Ticket']
df = df.drop(columns_to_drop, axis=1)

print(f"\\nDropped columns: {columns_to_drop}")

# --- Verify our work ---
print("\\n=== Verification ===")
print(f"Remaining columns: {df.columns.tolist()}")
print(f"\\nMissing values after cleaning:")
print(df.isnull().sum())
print(f"\\nDataset shape: {df.shape}")`}
          language="python"
          filename="clean_data.py"
        />
      </section>

      {/* Theory: Mean vs Median */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Theory: Mean vs Median</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h3 className="font-bold text-slate-900 mb-3">Mean (Average)</h3>
            <p className="text-slate-600 text-sm mb-3">
              Sum of all values divided by count. Affected by outliers.
            </p>
            <div className="bg-slate-100 rounded-lg p-3 font-mono text-sm">
              Ages: [22, 25, 26, 27, <span className="text-[#ec3750]">80</span>]<br/>
              Mean: (22+25+26+27+80)/5 = <span className="text-[#ec3750]">36</span>
            </div>
            <p className="text-slate-500 text-xs mt-2">
              The 80-year-old pulls the mean up significantly.
            </p>
          </div>

          <div className="bg-[#ec3750]/5 border-2 border-[#ec3750] rounded-xl p-5">
            <h3 className="font-bold text-slate-900 mb-3">Median (Middle Value)</h3>
            <p className="text-slate-600 text-sm mb-3">
              The middle value when sorted. Robust to outliers.
            </p>
            <div className="bg-white rounded-lg p-3 font-mono text-sm">
              Ages: [22, 25, <span className="text-[#ec3750]">26</span>, 27, 80]<br/>
              Median: <span className="text-[#ec3750]">26</span> (the middle one)
            </div>
            <p className="text-slate-500 text-xs mt-2">
              The 80-year-old doesn't affect the median at all.
            </p>
          </div>
        </div>

        <p className="text-slate-600 text-sm mt-4">
          For age, median (28) is more representative of a "typical" passenger than mean (29.7).
          The Titanic had some elderly passengers who would skew the mean upward.
        </p>
      </section>

      {/* Success */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 mt-8">
        <h3 className="font-bold text-green-900 mb-2">Data Cleaned!</h3>
        <p className="text-green-800">
          Your dataset now has no missing values and only the columns we'll use for prediction.
          Next, we'll tackle another problem: converting text columns to numbers.
        </p>
      </div>
    </div>
  );
}
