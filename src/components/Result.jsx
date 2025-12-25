const Result = ({ score, total, wrong, restart }) => (
  <div className="bg-white p-8 rounded-xl shadow-xl text-center max-w-md">
    <h2 className="text-3xl font-bold mb-4">Quiz Completed 🎉</h2>
    <p className="mb-2">Score: {score} / {total}</p>
    <p className="mb-6">Wrong Attempts: {wrong}</p>

    <button
      onClick={restart}
      className="bg-indigo-600 text-white px-6 py-2 rounded"
    >
      Reattempt Quiz
    </button>
  </div>
);

export default Result;