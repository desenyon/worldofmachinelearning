'use client';

import CodeBlock from '@/components/CodeBlock';

export default function SetupPythonLesson() {
  return (
    <div className="space-y-8">
      <p className="text-lg text-slate-700 leading-relaxed">
        Python is the most popular language for machine learning, and for good reason.
        It has a simple syntax, a massive ecosystem of libraries, and a huge community.
        Let's get it set up on your computer.
      </p>

      {/* Why Python */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Why Python for ML?</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <h3 className="font-bold text-slate-900 mb-2">Simple Syntax</h3>
            <p className="text-sm text-slate-600">
              Python is a high level language. This means that it is easier to read
              and write. You can focus on the logic instead of syntax is what I am trying to say.
            </p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <h3 className="font-bold text-slate-900 mb-2">Amazing Libraries</h3>
            <p className="text-sm text-slate-600">
              pandas, numpy, scikit-learn, TensorFlow, PyTorch, all the major ML tools
              are Python-first. This is a massive help.
            </p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <h3 className="font-bold text-slate-900 mb-2">Huge Community</h3>
            <p className="text-sm text-slate-600">
              Every question you have has been asked before. Stack Overflow, tutorials,
              and documentation are abundant. Or now we have our own ML-based AI to do that for us!
            </p>
          </div>
        </div>
      </section>

      {/* Already have Python */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
        <h3 className="font-bold text-amber-900 mb-2">Already have Python 3.8+?</h3>
        <p className="text-amber-800 text-sm mb-3">
          Check your version by running <code className="bg-amber-100 px-1.5 py-0.5 rounded">python --version</code> in your terminal.
          If you see 3.8 or higher, skip to "Installing Libraries" below.
        </p>
        <p className="text-amber-700 text-xs">
          Note: On some systems, you may need to use <code className="bg-amber-100 px-1 rounded">python3</code> instead of <code className="bg-amber-100 px-1 rounded">python</code>.
        </p>
      </div>

      {/* Step 1 */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Step 1: Install Python</h2>
        
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🍎</span>
              <h3 className="font-bold text-slate-900">macOS</h3>
            </div>
            <p className="text-slate-700 text-sm mb-3">
              The easiest way is using Homebrew. If you don't have Homebrew, install it first from{' '}
              <a href="https://brew.sh" target="_blank" rel="noopener noreferrer" className="text-[#ec3750] hover:underline">brew.sh</a>.
            </p>
            <CodeBlock code="brew install python" language="bash" showLineNumbers={false} />
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🪟</span>
              <h3 className="font-bold text-slate-900">Windows</h3>
            </div>
            <p className="text-slate-700 text-sm mb-3">
              Download from{' '}
              <a href="https://python.org/downloads" target="_blank" rel="noopener noreferrer" className="text-[#ec3750] hover:underline">python.org/downloads</a>.
              Run the installer.
            </p>
            <div className="bg-[#ec3750]/5 border border-[#ec3750]/20 rounded-lg p-3">
              <p className="text-sm text-slate-700">
                <strong>IMPORTANT:</strong> Check the box that says "Add Python to PATH" at the bottom of the installer.
                This is crucial, don't skip it!
              </p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🐧</span>
              <h3 className="font-bold text-slate-900">Linux (Ubuntu/Debian)</h3>
            </div>
            <p className="text-slate-700 text-sm mb-3">
              Python usually comes pre-installed, but you may need to update it:
            </p>
            <CodeBlock code="sudo apt update && sudo apt install python3 python3-pip" language="bash" showLineNumbers={false} />
          </div>
        </div>
      </section>

      {/* Step 2 */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Step 2: Install ML Libraries</h2>
        <p className="text-slate-700 mb-4">
          Now we'll install the four essential libraries for this course. Open your terminal
          (Command Prompt on Windows, Terminal on Mac/Linux) and run:
        </p>

        <CodeBlock
          code="pip install pandas numpy scikit-learn matplotlib"
          language="bash"
          filename="terminal"
          showLineNumbers={false}
        />

        <div className="mt-6 space-y-3">
          <h3 className="font-bold text-slate-900">What each library does:</h3>
          
          {[
            { name: 'pandas', desc: 'Data manipulation and analysis. Think of it as Excel on steroids. You will use it to load CSV files, filter data, handle missing values, and transform columns.' },
            { name: 'numpy', desc: 'Numerical computing. It provides fast array operations that pandas and scikit-learn depend on. You rarely use it directly, but everything depends on it.' },
            { name: 'scikit-learn', desc: 'Machine learning algorithms. This is where the magic happens. It has dozens of algorithms for classification, regression, clustering, and more.' },
            { name: 'matplotlib', desc: 'Data visualization. Creating charts and graphs to understand your data. We will use it to visualize patterns and model performance.' },
          ].map((lib) => (
            <div key={lib.name} className="flex gap-4 p-4 bg-slate-50 rounded-lg">
              <code className="font-mono font-bold text-[#ec3750] shrink-0 w-28">{lib.name}</code>
              <span className="text-slate-700 text-sm">{lib.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Step 3 */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Step 3: Verify Everything Works</h2>
        <p className="text-slate-700 mb-4">
          Let's make sure everything installed correctly. Run this command:
        </p>

        <CodeBlock
          code={`python -c "import pandas; import numpy; import sklearn; import matplotlib; print('All libraries installed successfully!')"`}
          language="bash"
          filename="terminal"
          showLineNumbers={false}
        />

        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
          <p className="text-green-800 text-sm">
            <strong>Expected output:</strong> "All libraries installed successfully!"
          </p>
          <p className="text-green-700 text-xs mt-2">
            If you see an error, the most common fix is to use <code className="bg-green-100 px-1 rounded">pip3</code> instead of <code className="bg-green-100 px-1 rounded">pip</code>,
            or <code className="bg-green-100 px-1 rounded">python3</code> instead of <code className="bg-green-100 px-1 rounded">python</code>.
          </p>
        </div>
      </section>

      {/* Troubleshooting */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Common Issues</h2>
        <div className="space-y-3">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <h3 className="font-bold text-slate-900 text-sm mb-1">"python not found"</h3>
            <p className="text-slate-600 text-sm">Try <code>python3</code> instead of <code>python</code>. On Mac/Linux, Python 3 is often the <code>python3</code> command.</p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <h3 className="font-bold text-slate-900 text-sm mb-1">"pip not found"</h3>
            <p className="text-slate-600 text-sm">Try <code>pip3</code> instead of <code>pip</code>, or <code>python -m pip install ...</code></p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <h3 className="font-bold text-slate-900 text-sm mb-1">Permission denied</h3>
            <p className="text-slate-600 text-sm">Add <code>--user</code> to your pip command: <code>pip install --user pandas numpy ...</code></p>
          </div>
        </div>
      </section>

      {/* Next */}
      <div className="bg-slate-900 text-white rounded-xl p-6 mt-8">
        <h3 style={{ color: "white" }}>Environment ready!</h3>
        <p className="text-slate-300">
          Great job! You now have Python and all the libraries installed. In the next lesson,
          we will write our first Python script to make sure everything is working together.
        </p>
      </div>
    </div>
  );
}
