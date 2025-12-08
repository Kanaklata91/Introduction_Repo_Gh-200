const QuizApp = require('../index');
const Quiz = require('../src/Quiz');

// Mock readline
jest.mock('readline', () => ({
  createInterface: jest.fn(() => ({
    question: jest.fn(),
    close: jest.fn()
  }))
}));

describe('QuizApp', () => {
  let consoleLogSpy;
  
  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  describe('constructor', () => {
    test('should create a QuizApp instance with a quiz', () => {
      const app = new QuizApp();
      expect(app.quiz).toBeInstanceOf(Quiz);
      expect(app.rl).toBeDefined();
    });
  });

  describe('start', () => {
    test('should display welcome message', () => {
      const app = new QuizApp();
      app.askQuestion = jest.fn(); // Mock to prevent actual question asking
      
      app.start();
      
      expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Welcome to the Node.js Quiz!'));
      expect(app.askQuestion).toHaveBeenCalled();
    });
  });

  describe('handleAnswer', () => {
    test('should handle valid answer', () => {
      const app = new QuizApp();
      app.askQuestion = jest.fn();
      
      app.handleAnswer('2');
      
      expect(app.quiz.currentQuestionIndex).toBe(1);
      expect(app.askQuestion).toHaveBeenCalled();
    });

    test('should handle invalid answer', () => {
      const app = new QuizApp();
      app.askQuestion = jest.fn();
      
      app.handleAnswer('invalid');
      
      expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Invalid input'));
      expect(app.quiz.currentQuestionIndex).toBe(0);
      expect(app.askQuestion).toHaveBeenCalled();
    });

    test('should handle out of range answer', () => {
      const app = new QuizApp();
      app.askQuestion = jest.fn();
      
      app.handleAnswer('10');
      
      expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Invalid input'));
      expect(app.quiz.currentQuestionIndex).toBe(0);
    });
  });

  describe('showResults', () => {
    test('should display perfect score message', () => {
      const app = new QuizApp();
      app.quiz.score = 5;
      app.quiz.currentQuestionIndex = 5;
      
      app.showResults();
      
      expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Quiz Complete!'));
      expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('100%'));
      expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Perfect score'));
    });

    test('should display good score message for 80%+', () => {
      const app = new QuizApp();
      app.quiz.score = 4;
      app.quiz.currentQuestionIndex = 5;
      
      app.showResults();
      
      expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Great job'));
    });

    test('should display encouragement for lower scores', () => {
      const app = new QuizApp();
      app.quiz.score = 2;
      app.quiz.currentQuestionIndex = 5;
      
      app.showResults();
      
      expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Keep practicing'));
    });
  });
});
