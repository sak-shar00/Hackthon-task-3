// Test current API response structure
import axios from 'axios';

const API_URL = "https://api.paraheights.com/edzy-api/hackathon/task/quizDetails";

const testAPI = async () => {
  try {
    console.log("Testing current API call...");
    
    const res = await axios.post(API_URL, {
      examSubjectName: "Class 10 - English",
      numberOfQuestions: 5,
    });
    
    console.log("Current API Response structure:");
    console.log("res.data:", JSON.stringify(res.data, null, 2));
    console.log("res.data.data:", JSON.stringify(res.data.data, null, 2));
    
    if (res.data.data && res.data.data.questions && res.data.data.questions.length > 0) {
      console.log("First question structure:");
      console.log("Question:", res.data.data.questions[0]);
      console.log("questionInfo:", res.data.data.questions[0].questionInfo);
    }
    
  } catch (error) {
    console.error("API Error:", error.message);
    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", JSON.stringify(error.response.data, null, 2));
    }
  }
};

testAPI();
