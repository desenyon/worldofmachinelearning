'use client';

import CodeBlock from '@/components/CodeBlock';

export default function EncodingLesson() {
  return (
    <div className="space-y-8">
      <p className="text-lg text-slate-700 leading-relaxed">
        Machine learning algorithms speak one language: numbers. They can't understand "male" or "female"
        directly. We need to convert categorical data into numerical format. This process is called
        <strong> encoding</strong>.
      </p>

      {/* Theory: Types of categorical data */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Theory: Types of Categorical Data</h2>
        <div className="bg-slate-900 text-white rounded-xl p-6">
          <p className="text-slate-300 mb-4">
            Not all categorical data is the same. The type determines how we encode it:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-800 rounded-lg p-4">
              <h3 className="font-bold text-white mb-2">Binary Categories</h3>
              <p className="text-slate-400 text-sm">
                Only two possible values. Like male/female, yes/no, true/false.
                Simple to encode: just use 0 and 1.
              </p>
              <p className="text-[#ec3750] text-sm mt-2">
                Example: Sex column
              </p>
            </div>
            <div className="bg-slate-800 rounded-lg p-4">
              <h3 className="font-bold text-white mb-2">Multi-class Categories</h3>
              <p className="text-slate-400 text-sm">
                Three or more values with no inherent order. Like colors (red, blue, green)
                or ports (C, Q, S). Use one-hot encoding.
              </p>
              <p className="text-[#ec3750] text-sm mt-2">
                Example: Embarked column
              </p>
            </div>
          </div>
          <p className="text-slate-400 text-sm mt-4">
            Note: Pclass (1, 2, 3) looks categorical but it's actually <strong className="text-white">ordinal</strong>,
            meaning the numbers have meaning. 1st class is better than 2nd class. We can keep it as numbers.
          </p>
        </div>
      </section>

      {/* Binary encoding */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Encoding Binary Categories: Sex</h2>
        <p className="text-slate-700 mb-4">
          The Sex column has two values: "male" and "female". We'll convert these to 1 and 0.
        </p>

        <CodeBlock
          code={`import pandas as pd

df = pd.read_csv('train.csv')
# (Assume we already cleaned missing values)

# Before encoding
print("Before encoding:")
print(df['Sex'].head())
# 0      male
# 1    female
# 2    female
# 3    female
# 4      male

# Convert Sex using .map()
# map() replaces values according to a dictionary
df['Sex'] = df['Sex'].map({'male': 1, 'female': 0})

# After encoding
print("\\nAfter encoding:")
print(df['Sex'].head())
# 0    1
# 1    0
# 2    0
# 3    0
# 4    1`}
          language="python"
          filename="encode_sex.py"
        />

        <div className="bg-[#ec3750]/5 border border-[#ec3750]/20 rounded-xl p-5 mt-4">
          <h3 className="font-bold text-slate-900 mb-2">Why this order?</h3>
          <p className="text-slate-600 text-sm">
            We chose male=1, female=0 arbitrarily. The model doesn't care which is which.
            You could flip it and get the same results. Just be consistent.
          </p>
        </div>
      </section>

      {/* One-hot encoding */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">One-Hot Encoding: Embarked</h2>
        <p className="text-slate-700 mb-4">
          Embarked has three values: C (Cherbourg), Q (Queenstown), S (Southampton).
          We can't just use 0, 1, 2 because that implies an order (2 greater than 1).
          Instead, we create a separate binary column for each category.
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-4">
          <h3 className="font-bold text-slate-900 mb-3">How One-Hot Encoding Works</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-300">
                  <th className="text-left py-2 px-3">Original</th>
                  <th className="text-center py-2 px-3">Embarked_C</th>
                  <th className="text-center py-2 px-3">Embarked_Q</th>
                  <th className="text-center py-2 px-3">Embarked_S</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200">
                  <td className="py-2 px-3 font-mono">S</td>
                  <td className="py-2 px-3 text-center">0</td>
                  <td className="py-2 px-3 text-center">0</td>
                  <td className="py-2 px-3 text-center font-bold text-[#ec3750]">1</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-2 px-3 font-mono">C</td>
                  <td className="py-2 px-3 text-center font-bold text-[#ec3750]">1</td>
                  <td className="py-2 px-3 text-center">0</td>
                  <td className="py-2 px-3 text-center">0</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-mono">Q</td>
                  <td className="py-2 px-3 text-center">0</td>
                  <td className="py-2 px-3 text-center font-bold text-[#ec3750]">1</td>
                  <td className="py-2 px-3 text-center">0</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-slate-500 text-xs mt-3">
            Each row has exactly one "1" indicating which port the passenger embarked from.
          </p>
        </div>

        <CodeBlock
          code={`# One-hot encode Embarked using pandas get_dummies()
# prefix='Embarked' adds 'Embarked_' before each new column name
embarked_dummies = pd.get_dummies(df['Embarked'], prefix='Embarked')

print("New columns created:")
print(embarked_dummies.head())
#    Embarked_C  Embarked_Q  Embarked_S
# 0       False       False        True
# 1        True       False       False
# 2       False       False        True
# ...

# Add new columns to our DataFrame
df = pd.concat([df, embarked_dummies], axis=1)

# Remove the original Embarked column (we don't need it anymore)
df = df.drop('Embarked', axis=1)

print("\\nFinal columns:")
print(df.columns.tolist())`}
          language="python"
          filename="encode_embarked.py"
        />
      </section>

      {/* Separating X and y */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Separating Features and Target</h2>
        <p className="text-slate-700 mb-4">
          In machine learning, we follow a naming convention:
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-[#ec3750]/5 border border-[#ec3750]/20 rounded-xl p-5">
            <h3 className="font-bold text-[#ec3750] text-lg mb-2">X = Features</h3>
            <p className="text-slate-600 text-sm">
              The input data used to make predictions. All columns except what we're predicting.
              Also called "independent variables" or "predictors".
            </p>
          </div>
          <div className="bg-[#ec3750]/5 border border-[#ec3750]/20 rounded-xl p-5">
            <h3 className="font-bold text-[#ec3750] text-lg mb-2">y = Target</h3>
            <p className="text-slate-600 text-sm">
              What we're trying to predict (Survived). Also called "dependent variable", "label",
              or "outcome".
            </p>
          </div>
        </div>

        <CodeBlock
          code={`# Separate features (X) from target (y)
# We use .drop() to create X with everything EXCEPT Survived
X = df.drop('Survived', axis=1)

# y is just the Survived column
y = df['Survived']

# Check our work
print(f"Features shape: {X.shape}")  # (891, 9) - 891 passengers, 9 features
print(f"Target shape: {y.shape}")    # (891,) - 891 survival values

print(f"\\nFeature columns: {X.columns.tolist()}")
# ['Pclass', 'Sex', 'Age', 'SibSp', 'Parch', 'Fare', 
#  'Embarked_C', 'Embarked_Q', 'Embarked_S']`}
          language="python"
          filename="separate_xy.py"
        />
      </section>

      {/* Final preprocessing script */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Complete Preprocessing Script</h2>
        <p className="text-slate-700 mb-4">
          Here's everything we've done so far in one complete script:
        </p>

        <CodeBlock
          code={`# preprocess.py - Complete data preprocessing for Titanic

import pandas as pd

# Load data
df = pd.read_csv('train.csv')
print(f"Loaded {len(df)} passengers")

# --- Handle missing values ---
df['Age'] = df['Age'].fillna(df['Age'].median())
df['Embarked'] = df['Embarked'].fillna('S')
df = df.drop(['Cabin', 'PassengerId', 'Name', 'Ticket'], axis=1)

# --- Encode categorical variables ---
df['Sex'] = df['Sex'].map({'male': 1, 'female': 0})
embarked_dummies = pd.get_dummies(df['Embarked'], prefix='Embarked')
df = pd.concat([df, embarked_dummies], axis=1)
df = df.drop('Embarked', axis=1)

# --- Separate features and target ---
X = df.drop('Survived', axis=1)
y = df['Survived']

print(f"Features: {X.shape[1]} columns")
print(f"Ready for machine learning!")`}
          language="python"
          filename="preprocess.py"
        />
      </section>

      {/* Success */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 mt-8">
        <h3 className="font-bold text-green-900 mb-2">Data Encoded!</h3>
        <p className="text-green-800">
          Your data is now fully numerical and ready for machine learning. All text has been
          converted to numbers. Next, we'll split our data to properly train and test our model.
        </p>
      </div>
    </div>
  );
}
