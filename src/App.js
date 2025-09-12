import React, { useState, useEffect } from 'react';
import { Play, Code, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import './App.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

function App() {
  const [algorithms, setAlgorithms] = useState([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
  const [inputData, setInputData] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAlgorithms();
  }, []);

  const fetchAlgorithms = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/algorithms`);
      const data = await response.json();
      setAlgorithms(data.algorithms);
    } catch (err) {
      setError('Failed to fetch algorithms');
    }
  };

  const runAlgorithm = async () => {
    if (!selectedAlgorithm || !inputData.trim()) {
      setError('Please select an algorithm and provide input data');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      let payload;
      
      if (selectedAlgorithm.id === 3) { // Binary Search
        const lines = inputData.trim().split('\n');
        if (lines.length < 2) {
          throw new Error('For Binary Search, provide array on first line and target on second line');
        }
        payload = {
          algorithmId: selectedAlgorithm.id,
          input: {
            array: lines[0].split(',').map(x => parseInt(x.trim())),
            target: parseInt(lines[1].trim())
          }
        };
      } else {
        payload = {
          algorithmId: selectedAlgorithm.id,
          input: inputData.split(',').map(x => parseInt(x.trim()))
        };
      }

      const response = await fetch(`${API_BASE_URL}/api/run-algorithm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to run algorithm');
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Sorting': return 'bg-blue-100 text-blue-800';
      case 'Search': return 'bg-purple-100 text-purple-800';
      case 'Graph': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            <Code className="inline-block mr-3 text-blue-600" />
            AlgoTest
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Test and visualize algorithms with real-time execution and performance metrics
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Algorithm Selection */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Select Algorithm
            </h2>
            
            <div className="space-y-4">
              {algorithms.map((algorithm) => (
                <div
                  key={algorithm.id}
                  className={`algorithm-card p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedAlgorithm?.id === algorithm.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedAlgorithm(algorithm)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {algorithm.name}
                    </h3>
                    <div className="flex gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(algorithm.category)}`}>
                        {algorithm.category}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(algorithm.difficulty)}`}>
                        {algorithm.difficulty}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {algorithm.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Input and Execution */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Input & Execution
            </h2>

            {selectedAlgorithm && (
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  Selected: {selectedAlgorithm.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {selectedAlgorithm.description}
                </p>
              </div>
            )}

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Input Data
                {selectedAlgorithm?.id === 3 && (
                  <span className="text-xs text-gray-500 ml-2">
                    (Array on first line, target on second line)
                  </span>
                )}
              </label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="4"
                placeholder={
                  selectedAlgorithm?.id === 3
                    ? "1,2,3,4,5,6,7,8,9,10\n5"
                    : "5,2,8,1,9,3,7,4,6"
                }
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
              />
            </div>

            <button
              onClick={runAlgorithm}
              disabled={loading || !selectedAlgorithm || !inputData.trim()}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Running...
                </>
              ) : (
                <>
                  <Play className="h-5 w-5" />
                  Run Algorithm
                </>
              )}
            </button>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <span className="text-red-700">{error}</span>
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6 result-animation">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-500" />
              Execution Results
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Algorithm</h3>
                  <p className="text-gray-600">{selectedAlgorithm?.name}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Input</h3>
                  <p className="text-gray-600 font-mono bg-gray-100 p-2 rounded">
                    {Array.isArray(result.input) ? result.input.join(', ') : JSON.stringify(result.input)}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Output</h3>
                  <p className="text-gray-600 font-mono bg-gray-100 p-2 rounded">
                    {Array.isArray(result.result) ? result.result.join(', ') : JSON.stringify(result.result)}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">Execution Time</h3>
                    <p className="text-gray-600">{result.executionTime}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Timestamp</h3>
                  <p className="text-gray-600 text-sm">
                    {new Date(result.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
