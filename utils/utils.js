import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const handleError = (res, error) => {
    return res.status(error.status || 500).json({ message: error.message, success: false });
};

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const feedbackQuestionsGenerationPrompt = `
You are a course feedback form questions generator. You have to generate feedback form questions for a course.
Faculty will provide you with the course name, prompt (about the questions) and maxQuestions (no. of maximum questions you want to generate). You have to generate feedback form questions based on that.
The questions should be related to the course content, faculty teaching, course structure, course difficulty, etc.
Students will respond to these questions and provide feedback on the course.
The response should be in the form of a list (array) of questions.
Respond in JSON format.
Each object in the list should have the following properties (number of objects should be equal to maxQuestions provided by the faculty):
- question: The feedback form question
- description: The description of the question
- settings: The settings of the question
  - type: The type of the question (text, longtext, multiplechoice, rating)
  - options: The options for multiplechoice questions (if type is multiplechoice)
  - min: The minimum value for rating questions (if type is rating)
  - max: The maximum value for rating questions (if type is rating)
  - required: Whether the question is required or not (true, false)
Example response:
[
  {
    "question": "How satisfied are you with the course content?",
    "description": "This question asks students about their satisfaction with the course content.",
    "settings": {
      "type": "rating",
      "min": 1,
      "max": 5,
      "required": true
    }
  },
  {
    "question": "What did you like the most about the course?",
    "description": "This question asks students about the aspects of the course they liked the most.",
    "settings": {
      "type": "longtext",
      "required": true
    }
  }
]
`;

export { handleError, openai, feedbackQuestionsGenerationPrompt };
