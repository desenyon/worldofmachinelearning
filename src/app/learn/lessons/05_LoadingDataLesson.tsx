'use client';

import CodeBlock from '@/components/CodeBlock';

export default function LoadingDataLesson() {
  return (
    <div className="space-y-8">
      <p className="text-lg text-slate-700 leading-relaxed">
        Now that you understand the Titanic dataset, let's load it into Python. We'll use pandas,
        which is the go-to library for working with tabular data. Think of pandas as Excel on steroids.
      </p>

      {/* Theory: What is a DataFrame */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Theory: The DataFrame</h2>
        <div className="bg-slate-900 text-white rounded-xl p-6">
          <p className="text-slate-300 mb-4">
            A <strong className="text-white">DataFrame</strong> is pandas' core data structure. It's a 2D table where:
          </p>
          <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
            <li><strong className="text-white">Columns</strong> are your features (like Age, Sex, Pclass)</li>
            <li><strong className="text-white">Rows</strong> are your observations (individual passengers)</li>
            <li><strong className="text-white">Index</strong> is the row labels (usually 0, 1, 2, etc.)</li>
          </ul>
          <p className="text-slate-400 text-sm mt-4">
            When we call <code className="text-[#ec3750]">pd.read_csv()</code>, pandas reads the file and constructs
            a DataFrame automatically.
          </p>
        </div>
      </section>

      {/* Load the data */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Loading the Data</h2>
        <p className="text-slate-700 mb-4">
          Make sure <code className="bg-slate-100 px-1.5 py-0.5 rounded">train.csv</code> is in your project folder.
          Create a new file called <code className="bg-slate-100 px-1.5 py-0.5 rounded">load_data.py</code>:
        </p>

        <CodeBlock
          code={`# load_data.py - Loading and first look at the Titanic dataset

import pandas as pd

# Load the CSV file into a DataFrame
# pd.read_csv() reads the file and creates a DataFrame
df = pd.read_csv('train.csv')

# Let's see what we got!
print("First 5 rows of the dataset:")
print(df.head())
print()

# Check the shape: (rows, columns)
print(f"Dataset shape: {df.shape}")
print(f"This means {df.shape[0]} passengers and {df.shape[1]} columns of information")`}
          language="python"
          filename="load_data.py"
        />
      </section>

      {/* Understanding the output */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Understanding the Output</h2>
        <p className="text-slate-700 mb-4">
          When you run this script, <code>df.head()</code> shows you the first 5 rows. Here's what you'll see:
        </p>
        
        <div className="bg-slate-900 text-green-400 rounded-xl p-4 font-mono text-xs overflow-x-auto">
          <pre>{`   PassengerId  Survived  Pclass                            Name     Sex   Age  SibSp  Parch    Ticket     Fare Cabin Embarked
0            1         0       3         Braund, Mr. Owen Harris    male  22.0      1      0  A/5 21171   7.2500   NaN        S
1            2         1       1  Cumings, Mrs. John Bradley...  female  38.0      1      0    PC 17599  71.2833   C85        C
2            3         1       3       Heikkinen, Miss. Laina...  female  26.0      0      0  STON/O2...   7.9250   NaN        S
3            4         1       1  Futrelle, Mrs. Jacques Hea...  female  35.0      1      0    113803  53.1000  C123        S
4            5         0       3      Allen, Mr. William Henry    male  35.0      0      0    373450   8.0500   NaN        S`}</pre>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <div className="bg-[#ec3750]/5 border border-[#ec3750]/20 rounded-xl p-5">
            <h3 className="font-bold text-slate-900 mb-2">The leftmost numbers (0, 1, 2...)</h3>
            <p className="text-slate-600 text-sm">
              That's the <strong>index</strong>. pandas automatically numbers rows starting from 0.
              You can use these to select specific rows later.
            </p>
          </div>
          <div className="bg-[#ec3750]/5 border border-[#ec3750]/20 rounded-xl p-5">
            <h3 className="font-bold text-slate-900 mb-2">NaN values</h3>
            <p className="text-slate-600 text-sm">
              <code>NaN</code> means "Not a Number" and indicates missing data. Notice how Cabin has NaN
              for passengers 0, 2, and 4. We'll deal with missing data later.
            </p>
          </div>
        </div>
      </section>

      {/* Essential inspection commands */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Essential Inspection Commands</h2>
        <p className="text-slate-700 mb-4">
          Add these to your script to learn more about the data:
        </p>

        <CodeBlock
          code={`# Get detailed info about each column
# This shows data types and non-null counts
print("\\nDataset Info:")
print(df.info())

# Statistical summary of numerical columns
# Shows count, mean, std, min, 25%, 50%, 75%, max
print("\\nStatistical Summary:")
print(df.describe())

# Check how many values are missing in each column
print("\\nMissing Values per Column:")
print(df.isnull().sum())

# See the column names as a list
print("\\nColumn names:")
print(df.columns.tolist())`}
          language="python"
        />
      </section>

      {/* Breaking down the commands */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Breaking Down Each Command</h2>
        
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <code className="font-mono font-bold text-[#ec3750]">df.info()</code>
            <p className="text-slate-700 text-sm mt-2">
              Shows you the data type of each column (int64, float64, object) and how many non-null values there are.
              This is your go-to for finding missing data.
            </p>
            <p className="text-slate-500 text-xs mt-2">
              <strong>Data types:</strong> int64 = integers, float64 = decimals, object = text/strings
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <code className="font-mono font-bold text-[#ec3750]">df.describe()</code>
            <p className="text-slate-700 text-sm mt-2">
              Calculates statistics for numerical columns only. You'll see:
            </p>
            <ul className="text-slate-600 text-sm mt-2 space-y-1 list-disc list-inside ml-2">
              <li><strong>count:</strong> how many non-null values</li>
              <li><strong>mean:</strong> average value</li>
              <li><strong>std:</strong> standard deviation (how spread out the values are)</li>
              <li><strong>min/max:</strong> smallest and largest values</li>
              <li><strong>25%/50%/75%:</strong> percentiles (quartiles)</li>
            </ul>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <code className="font-mono font-bold text-[#ec3750]">df.isnull().sum()</code>
            <p className="text-slate-700 text-sm mt-2">
              This is a chain of operations:
            </p>
            <ul className="text-slate-600 text-sm mt-2 space-y-1 list-decimal list-inside ml-2">
              <li><code>df.isnull()</code> creates a True/False table (True where data is missing)</li>
              <li><code>.sum()</code> counts the True values in each column</li>
            </ul>
            <p className="text-slate-500 text-xs mt-2">
              Result: how many missing values per column
            </p>
          </div>
        </div>
      </section>

      {/* What you'll discover */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
        <h3 className="font-bold text-amber-900 mb-3">What You Will Discover</h3>
        <p className="text-amber-800 text-sm mb-3">
          Running these commands reveals important facts about our data:
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4">
            <div className="text-2xl font-bold text-amber-700 font-mono">177</div>
            <div className="text-sm text-amber-800">Missing Age values</div>
            <div className="text-xs text-amber-600 mt-1">~20% of passengers</div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="text-2xl font-bold text-amber-700 font-mono">687</div>
            <div className="text-sm text-amber-800">Missing Cabin values</div>
            <div className="text-xs text-amber-600 mt-1">~77% missing!</div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="text-2xl font-bold text-amber-700 font-mono">2</div>
            <div className="text-sm text-amber-800">Missing Embarked values</div>
            <div className="text-xs text-amber-600 mt-1">Easily fixable</div>
          </div>
        </div>
        <p className="text-amber-800 text-sm mt-4">
          Don't worry. We'll learn strategies to handle missing data in the Data Preprocessing module.
        </p>
      </div>

      {/* Selecting data */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Quick Preview: Selecting Data</h2>
        <p className="text-slate-700 mb-4">
          Here are some ways to access specific parts of your DataFrame. We'll use these a lot:
        </p>

        <CodeBlock
          code={`# Select a single column (returns a Series)
ages = df['Age']
print(f"Average age: {ages.mean():.1f}")

# Select multiple columns (returns a DataFrame)
subset = df[['Name', 'Sex', 'Age', 'Survived']]
print(subset.head())

# Select rows by index
first_passenger = df.iloc[0]  # First row
print(first_passenger)

# Select rows by condition (boolean indexing)
survivors = df[df['Survived'] == 1]
print(f"Number of survivors: {len(survivors)}")`}
          language="python"
        />
      </section>

      {/* Success */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 mt-8">
        <h3 className="font-bold text-green-900 mb-2">Data loaded!</h3>
        <p className="text-green-800">
          You can now load CSV files, inspect DataFrames, and identify missing values.
          In the next lesson, we'll dig deeper into the data and look for patterns that
          might help predict survival.
        </p>
      </div>
    </div>
  );
}
