'use client';

import CodeBlock from '@/components/CodeBlock';

export default function FirstScriptLesson() {
  return (
    <div className="space-y-8">
      <p className="text-lg text-slate-700 leading-relaxed">
        Before diving into machine learning, let's make sure you're comfortable with Python basics.
        We'll write a simple script that tests your setup and introduces key concepts you'll use throughout this course.
      </p>

      {/* Python Basics */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Python Basics You Need to Know</h2>
        <p className="text-slate-700 mb-4">
          If you've never written Python before, here's a 2-minute crash course:
        </p>

        <div className="space-y-4">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <h3 className="font-bold text-slate-900 mb-3">Variables</h3>
            <p className="text-slate-600 text-sm mb-3">
              Variables store data. You don't need to declare types, Python figures it out.
            </p>
            <CodeBlock
              code={`name = "Alice"      # This is a string (text)
age = 25            # This is an integer (whole number)
height = 5.7        # This is a float (decimal number)
is_student = True   # This is a boolean (True/False)`}
              language="python"
              showLineNumbers={false}
            />
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <h3 className="font-bold text-slate-900 mb-3">Print and f-strings</h3>
            <p className="text-slate-600 text-sm mb-3">
              <code>print()</code> outputs text. f-strings (starting with <code>f"..."</code>) let you embed variables.
            </p>
            <CodeBlock
              code={`name = "Alice"
age = 25
print(f"Hello, {name}! You are {age} years old.")`}
              language="python"
              showLineNumbers={false}
            />
            <div className="mt-2 p-2 bg-slate-900 text-green-400 rounded font-mono text-sm">
              Hello, Alice! You are 25 years old.
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <h3 className="font-bold text-slate-900 mb-3">Comments</h3>
            <p className="text-slate-600 text-sm mb-3">
              Lines starting with <code>#</code> are comments. Python ignores them. Use them to explain your code.
            </p>
            <CodeBlock
              code={`# This is a comment - Python ignores it
x = 10  # You can also put comments at the end of lines`}
              language="python"
              showLineNumbers={false}
            />
          </div>
        </div>
      </section>

      {/* Create the script */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Create Your First Script</h2>
        <p className="text-slate-700 mb-4">
          Create a new file called <code className="bg-slate-100 px-1.5 py-0.5 rounded">hello_ml.py</code> in your project folder.
          You can use any text editor (VS Code, Sublime Text, even Notepad).
        </p>
        <p className="text-slate-700 mb-4">
          Copy this code into the file:
        </p>

        <CodeBlock
          code={`# hello_ml.py - Your first ML setup test
# This script verifies your Python environment is ready for machine learning

# Part 1: Basic Python
print("=" * 50)
print("PART 1: Testing Basic Python")
print("=" * 50)

name = "World of ML"
print(f"Hello, {name}!")

# Some math
x = 10
y = 3
print(f"Math test: {x} + {y} = {x + y}")
print(f"Math test: {x} * {y} = {x * y}")
print(f"Math test: {x} / {y} = {x / y:.2f}")  # .2f means 2 decimal places

# Part 2: Testing our ML libraries
print("\\n" + "=" * 50)
print("PART 2: Testing ML Libraries")
print("=" * 50)

# Import libraries (this is how you load external code)
import pandas as pd    # 'as pd' creates a shorthand alias
import numpy as np
import sklearn
import matplotlib

# Print versions to confirm everything loaded
print(f"pandas version:      {pd.__version__}")
print(f"numpy version:       {np.__version__}")
print(f"scikit-learn version: {sklearn.__version__}")
print(f"matplotlib version:  {matplotlib.__version__}")

# Part 3: Quick pandas demo
print("\\n" + "=" * 50)
print("PART 3: Quick Pandas Demo")
print("=" * 50)

# Create a tiny dataset (like a mini spreadsheet)
data = {
    'Name': ['Alice', 'Bob', 'Charlie'],
    'Age': [25, 30, 35],
    'Score': [85.5, 92.0, 78.5]
}

# Convert to a DataFrame (pandas' main data structure)
df = pd.DataFrame(data)
print("Here's a tiny DataFrame:")
print(df)
print(f"\\nAverage age: {df['Age'].mean()}")
print(f"Highest score: {df['Score'].max()}")

print("\\n" + "=" * 50)
print("SUCCESS! Your environment is ready for ML!")
print("=" * 50)`}
          language="python"
          filename="hello_ml.py"
        />
      </section>

      {/* Run it */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Run Your Script</h2>
        <p className="text-slate-700 mb-4">
          Open your terminal, navigate to the folder containing your file, and run:
        </p>

        <CodeBlock
          code="python hello_ml.py"
          language="bash"
          filename="terminal"
          showLineNumbers={false}
        />

        <div className="mt-4">
          <p className="text-slate-700 mb-2">You should see output like this:</p>
          <div className="bg-slate-900 text-green-400 rounded-xl p-4 font-mono text-sm overflow-x-auto">
            <pre>{`==================================================
PART 1: Testing Basic Python
==================================================
Hello, World of ML!
Math test: 10 + 3 = 13
Math test: 10 * 3 = 30
Math test: 10 / 3 = 3.33

==================================================
PART 2: Testing ML Libraries
==================================================
pandas version:      2.1.0
numpy version:       1.24.0
scikit-learn version: 1.3.0
matplotlib version:  3.7.0

==================================================
PART 3: Quick Pandas Demo
==================================================
Here's a tiny DataFrame:
      Name  Age  Score
0    Alice   25   85.5
1      Bob   30   92.0
2  Charlie   35   78.5

Average age: 30.0
Highest score: 92.0

==================================================
SUCCESS! Your environment is ready for ML!
==================================================`}</pre>
          </div>
        </div>
      </section>

      {/* Understanding the code */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Understanding What We Just Did</h2>
        
        <div className="space-y-4">
          <div className="bg-[#ec3750]/5 border border-[#ec3750]/20 rounded-xl p-5">
            <h3 className="font-bold text-slate-900 mb-2">import pandas as pd</h3>
            <p className="text-slate-700 text-sm">
              This loads the pandas library and gives it the nickname "pd". It's a convention that everyone uses.
              When you see <code>pd.something</code> in code, that's pandas being used.
            </p>
          </div>

          <div className="bg-[#ec3750]/5 border border-[#ec3750]/20 rounded-xl p-5">
            <h3 className="font-bold text-slate-900 mb-2">pd.DataFrame(data)</h3>
            <p className="text-slate-700 text-sm">
              A DataFrame is pandas' main data structure. Think of it as a table or spreadsheet in Python.
              It has rows and columns, and you can filter, sort, and transform it easily.
              This is what you'll use to work with the Titanic dataset.
            </p>
          </div>

          <div className="bg-[#ec3750]/5 border border-[#ec3750]/20 rounded-xl p-5">
            <h3 className="font-bold text-slate-900 mb-2">df['Age'].mean()</h3>
            <p className="text-slate-700 text-sm">
              <code>df['Age']</code> selects the "Age" column. <code>.mean()</code> calculates the average.
              Pandas has tons of these built-in functions: <code>.sum()</code>, <code>.min()</code>, <code>.max()</code>, <code>.count()</code>, etc.
            </p>
          </div>
        </div>
      </section>

      {/* Success */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 mt-8">
        <h3 className="font-bold text-green-900 mb-2">Congratulations!</h3>
        <p className="text-green-800">
          You just ran your first Python script with ML libraries. You created a DataFrame and calculated statistics.
          These are the exact same operations you'll do with real datasets. In the next module, we'll start working
          with the actual Titanic data!
        </p>
      </div>
    </div>
  );
}
