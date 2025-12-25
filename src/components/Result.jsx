const Result = ({ score, total, wrong, restart, statistics }) => {
  const accuracy = total > 0 ? ((score / total) * 100).toFixed(1) : 0;
  const totalAttempts = statistics?.totalAttempts || (score + wrong);
  const efficiency = totalAttempts > 0 ? ((score / totalAttempts) * 100).toFixed(1) : 0;
  
  // Calculate performance level
  const getPerformanceLevel = () => {
    if (accuracy >= 90) return { level: "Excellent", color: "text-green-600", emoji: "🏆" };
    if (accuracy >= 80) return { level: "Very Good", color: "text-blue-600", emoji: "🥈" };
    if (accuracy >= 70) return { level: "Good", color: "text-yellow-600", emoji: "🥉" };
    if (accuracy >= 60) return { level: "Fair", color: "text-orange-600", emoji: "📚" };
    return { level: "Needs Improvement", color: "text-red-600", emoji: "💪" };
  };

  const performance = getPerformanceLevel();

  return (
    <div className="bg-white p-8 rounded-xl shadow-xl max-w-2xl w-full">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-2">Quiz Completed! 🎉</h2>
        <div className={`text-2xl font-semibold ${performance.color}`}>
          {performance.emoji} {performance.level}
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
          <h3 className="text-lg font-semibold text-green-800 mb-2">Final Score</h3>
          <div className="text-3xl font-bold text-green-700">{score}</div>
          <div className="text-green-600">out of {total} questions</div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Accuracy</h3>
          <div className="text-3xl font-bold text-blue-700">{accuracy}%</div>
          <div className="text-blue-600">correct answers</div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg border border-red-200">
          <h3 className="text-lg font-semibold text-red-800 mb-2">Wrong Attempts</h3>
          <div className="text-3xl font-bold text-red-700">{wrong}</div>
          <div className="text-red-600">incorrect tries</div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
          <h3 className="text-lg font-semibold text-purple-800 mb-2">Efficiency</h3>
          <div className="text-3xl font-bold text-purple-700">{efficiency}%</div>
          <div className="text-purple-600">attempt-to-success ratio</div>
        </div>
      </div>

      {/* Detailed Statistics */}
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Detailed Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="font-semibold text-gray-700">Total Attempts</div>
            <div className="text-xl font-bold text-gray-900">{totalAttempts}</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-gray-700">Questions Attempted</div>
            <div className="text-xl font-bold text-gray-900">{total}</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-gray-700">Success Rate</div>
            <div className="text-xl font-bold text-gray-900">{accuracy}%</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-gray-700">Performance</div>
            <div className={`text-xl font-bold ${performance.color}`}>{performance.level}</div>
          </div>
        </div>
      </div>

      {/* Performance Tips */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h4 className="font-semibold text-blue-800 mb-2">💡 Performance Insights</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          {accuracy >= 90 && <li>🎯 Excellent work! You've mastered this topic.</li>}
          {accuracy >= 80 && accuracy < 90 && <li>👍 Great job! A little more practice will make you perfect.</li>}
          {accuracy >= 70 && accuracy < 80 && <li>📖 Good effort! Review the incorrect answers to improve.</li>}
          {accuracy >= 60 && accuracy < 70 && <li>📚 Fair performance. Consider reviewing the subject material.</li>}
          {accuracy < 60 && <li>💪 Keep practicing! Focus on understanding the concepts better.</li>}
          
          {wrong > total * 0.3 && <li>⏰ Work on time management - don't rush through questions.</li>}
          {efficiency < 70 && <li>🎯 Try to think carefully before selecting answers to reduce wrong attempts.</li>}
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={restart}
          className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
        >
          🔄 Reattempt Quiz
        </button>
        
        <button
          onClick={() => window.location.reload()}
          className="bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
        >
          🏠 Back to Home
        </button>
      </div>

      {/* Progress Visualization */}
      <div className="mt-8">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Performance Visualization</h4>
        <div className="flex h-8 rounded-lg overflow-hidden">
          <div 
            className="bg-green-500 flex items-center justify-center text-white text-xs font-semibold"
            style={{ width: `${accuracy}%` }}
          >
            {accuracy >= 20 && `${accuracy}%`}
          </div>
          <div 
            className="bg-red-500 flex items-center justify-center text-white text-xs font-semibold"
            style={{ width: `${100 - accuracy}%` }}
          >
            {100 - accuracy >= 20 && `${100 - accuracy}%`}
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-600 mt-1">
          <span>Correct ({score})</span>
          <span>Incorrect ({wrong})</span>
        </div>
      </div>
    </div>
  );
};

export default Result;