import axios from "axios";

const API_URL =
  "https://api.paraheights.com/edzy-api/hackathon/task/quizDetails";

export const fetchQuiz = async (subject, count) => {
  try {
    // Validate input parameters
    if (!subject || !count || count <= 0) {
      throw new Error("Invalid subject or question count");
    }

    const res = await axios.post(API_URL, {
      examSubjectName: subject,
      numberOfQuestions: count,
    });

    // Validate response structure
    if (!res.data) {
      throw new Error("API returned empty response");
    }

    // Check if data object exists (API wraps response in data property)
    if (!res.data.data) {
      throw new Error("API response missing data object");
    }

    // Check if questions array exists and is valid
    if (!res.data.data.questions) {
      throw new Error("API response missing questions data");
    }

    if (!Array.isArray(res.data.data.questions)) {
      throw new Error("Questions data is not an array");
    }

    if (res.data.data.questions.length === 0) {
      throw new Error("No questions available for the selected subject");
    }

    // Transform API response to expected format
    const transformedQuestions = res.data.data.questions.map(q => ({
      question: q.text,
      options: q.optionOrdering.map(opt => opt.text),
      correctAnswer: q.questionInfo?.option || "", // Map to correct option if available
      explanation: q.questionInfo?.solution || ""
    }));

    // Validate each question has required fields
    const invalidQuestion = transformedQuestions.find(
      (q) => !q.question || !q.options || !Array.isArray(q.options) || q.options.length === 0
    );

    if (invalidQuestion) {
      throw new Error("Invalid question format in API response");
    }

    return {
      questions: transformedQuestions,
    };
  } catch (error) {
    // Handle different types of errors
    if (error.response) {
      // API responded with error status
      const message = error.response.data?.message || `API Error: ${error.response.status}`;
      throw new Error(message);
    } else if (error.request) {
      // Network error
      throw new Error("Network error: Unable to connect to quiz service");
    } else {
      // Other errors (validation, etc.)
      throw error;
    }
  }
};
