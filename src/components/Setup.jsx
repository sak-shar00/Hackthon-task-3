import { useState } from "react";

const subjects = [
  "Class 10 - English",
  "Class 10 - Mathematics",
  "Class 10 - Science",
  "Class 10 - Social Science",
];

const Setup = ({ onStart, isLoading = false }) => {
  const [subject, setSubject] = useState(subjects[0]);
  const [count, setCount] = useState(5);

  return (
    <div className="bg-white p-8 rounded-xl shadow-xl max-w-xl w-full">
      <h1 className="text-3xl font-bold mb-2 text-center">Quiz App</h1>
      <p className="text-center text-gray-600 mb-6">
        Select subject and number of questions to begin
      </p>

      <label className="font-medium">Subject</label>
      <select
        className="w-full border p-2 rounded mb-4"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      >
        {subjects.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>

      <label className="font-medium">Questions</label>
      <div className="flex gap-4 my-4">
        {[5, 10, 15].map((n) => (
          <button
            key={n}
            onClick={() => setCount(n)}
            className={`px-4 py-2 border rounded ${
              count === n ? "bg-indigo-600 text-white" : ""
            }`}
          >
            {n}
          </button>
        ))}
      </div>

      <button
        onClick={() => onStart(subject, count)}
        disabled={isLoading}
        className="w-full bg-indigo-600 text-white py-2 rounded disabled:bg-gray-400"
      >
        {isLoading ? "Loading..." : "Start Quiz"}
      </button>
    </div>
  );
};

export default Setup;