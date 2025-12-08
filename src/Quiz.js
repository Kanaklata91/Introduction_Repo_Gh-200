/**
 * Quiz class for managing quiz questions and user responses
 */
class Quiz {
  /**
   * Create a new Quiz instance
   * @param {Array} questions - Array of question objects with format: 
   *   { question: string, options: string[], correctAnswer: number }
   */
  constructor(questions = []) {
    this.questions = questions;
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.userAnswers = [];
  }

  /**
   * Get the current question
   * @returns {Object|null} Current question object or null if quiz is complete
   */
  getCurrentQuestion() {
    if (this.currentQuestionIndex >= this.questions.length) {
      return null;
    }
    return this.questions[this.currentQuestionIndex];
  }

  /**
   * Submit an answer for the current question
   * @param {number} answerIndex - Index of the selected answer
   * @returns {boolean} True if answer is correct, false otherwise
   */
  submitAnswer(answerIndex) {
    const currentQuestion = this.getCurrentQuestion();
    
    if (!currentQuestion) {
      throw new Error('No question available');
    }

    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      this.score++;
    }

    this.userAnswers.push({
      questionIndex: this.currentQuestionIndex,
      answer: answerIndex,
      isCorrect
    });

    this.currentQuestionIndex++;
    
    return isCorrect;
  }

  /**
   * Check if the quiz is complete
   * @returns {boolean} True if all questions have been answered
   */
  isComplete() {
    return this.currentQuestionIndex >= this.questions.length;
  }

  /**
   * Get the final score
   * @returns {Object} Score object with correct answers, total questions, and percentage
   */
  getScore() {
    return {
      correct: this.score,
      total: this.questions.length,
      percentage: this.questions.length > 0 
        ? Math.round((this.score / this.questions.length) * 100) 
        : 0
    };
  }

  /**
   * Reset the quiz to start over
   */
  reset() {
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.userAnswers = [];
  }

  /**
   * Get total number of questions
   * @returns {number} Total number of questions
   */
  getTotalQuestions() {
    return this.questions.length;
  }
}

module.exports = Quiz;
