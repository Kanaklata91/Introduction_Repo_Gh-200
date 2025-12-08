const readline = require('readline');
const Quiz = require('./src/Quiz');
const quizQuestions = require('./data/questions');

/**
 * Main quiz application
 */
class QuizApp {
  constructor() {
    this.quiz = new Quiz(quizQuestions);
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  /**
   * Start the quiz application
   */
  start() {
    console.log('\n=================================');
    console.log('Welcome to the Node.js Quiz!');
    console.log('=================================\n');
    console.log(`Total Questions: ${this.quiz.getTotalQuestions()}\n`);
    
    this.askQuestion();
  }

  /**
   * Ask the current question
   */
  askQuestion() {
    const question = this.quiz.getCurrentQuestion();
    
    if (!question) {
      this.showResults();
      return;
    }

    console.log(`\nQuestion ${this.quiz.currentQuestionIndex + 1}/${this.quiz.getTotalQuestions()}`);
    console.log(`${question.question}\n`);
    
    question.options.forEach((option, index) => {
      console.log(`${index + 1}. ${option}`);
    });

    this.rl.question('\nYour answer (1-4): ', (answer) => {
      this.handleAnswer(answer);
    });
  }

  /**
   * Handle user's answer
   * @param {string} answer - User's input
   */
  handleAnswer(answer) {
    const answerIndex = parseInt(answer) - 1;
    
    if (isNaN(answerIndex) || answerIndex < 0 || answerIndex > 3) {
      console.log('\nInvalid input! Please enter a number between 1 and 4.');
      this.askQuestion();
      return;
    }

    const isCorrect = this.quiz.submitAnswer(answerIndex);
    
    if (isCorrect) {
      console.log('✓ Correct!');
    } else {
      const currentQ = this.quiz.questions[this.quiz.currentQuestionIndex - 1];
      console.log(`✗ Incorrect. The correct answer was: ${currentQ.options[currentQ.correctAnswer]}`);
    }

    this.askQuestion();
  }

  /**
   * Show final results
   */
  showResults() {
    const score = this.quiz.getScore();
    
    console.log('\n=================================');
    console.log('Quiz Complete!');
    console.log('=================================\n');
    console.log(`Your Score: ${score.correct}/${score.total}`);
    console.log(`Percentage: ${score.percentage}%\n`);

    if (score.percentage === 100) {
      console.log('Perfect score! Excellent work! 🎉');
    } else if (score.percentage >= 80) {
      console.log('Great job! 👍');
    } else if (score.percentage >= 60) {
      console.log('Good effort! Keep learning! 📚');
    } else {
      console.log('Keep practicing! You\'ll get better! 💪');
    }

    this.rl.close();
  }
}

// Run the application if this file is executed directly
if (require.main === module) {
  const app = new QuizApp();
  app.start();
}

module.exports = QuizApp;
