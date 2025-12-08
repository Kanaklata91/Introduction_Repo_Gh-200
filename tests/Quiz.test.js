const Quiz = require('../src/Quiz');

describe('Quiz', () => {
  const sampleQuestions = [
    {
      question: 'What is 2 + 2?',
      options: ['3', '4', '5', '6'],
      correctAnswer: 1
    },
    {
      question: 'What is the capital of France?',
      options: ['London', 'Berlin', 'Paris', 'Madrid'],
      correctAnswer: 2
    },
    {
      question: 'What is 10 / 2?',
      options: ['3', '4', '5', '6'],
      correctAnswer: 2
    }
  ];

  describe('constructor', () => {
    test('should create a quiz with questions', () => {
      const quiz = new Quiz(sampleQuestions);
      expect(quiz.questions).toEqual(sampleQuestions);
      expect(quiz.currentQuestionIndex).toBe(0);
      expect(quiz.score).toBe(0);
      expect(quiz.userAnswers).toEqual([]);
    });

    test('should create an empty quiz when no questions provided', () => {
      const quiz = new Quiz();
      expect(quiz.questions).toEqual([]);
      expect(quiz.getTotalQuestions()).toBe(0);
    });
  });

  describe('getCurrentQuestion', () => {
    test('should return the first question initially', () => {
      const quiz = new Quiz(sampleQuestions);
      const currentQuestion = quiz.getCurrentQuestion();
      expect(currentQuestion).toEqual(sampleQuestions[0]);
    });

    test('should return null when quiz is complete', () => {
      const quiz = new Quiz(sampleQuestions);
      quiz.currentQuestionIndex = sampleQuestions.length;
      expect(quiz.getCurrentQuestion()).toBeNull();
    });
  });

  describe('submitAnswer', () => {
    test('should increment score for correct answer', () => {
      const quiz = new Quiz(sampleQuestions);
      const isCorrect = quiz.submitAnswer(1); // Correct answer for first question
      expect(isCorrect).toBe(true);
      expect(quiz.score).toBe(1);
      expect(quiz.currentQuestionIndex).toBe(1);
    });

    test('should not increment score for incorrect answer', () => {
      const quiz = new Quiz(sampleQuestions);
      const isCorrect = quiz.submitAnswer(0); // Incorrect answer
      expect(isCorrect).toBe(false);
      expect(quiz.score).toBe(0);
      expect(quiz.currentQuestionIndex).toBe(1);
    });

    test('should store user answer in history', () => {
      const quiz = new Quiz(sampleQuestions);
      quiz.submitAnswer(1);
      expect(quiz.userAnswers).toHaveLength(1);
      expect(quiz.userAnswers[0]).toEqual({
        questionIndex: 0,
        answer: 1,
        isCorrect: true
      });
    });

    test('should throw error when no question available', () => {
      const quiz = new Quiz(sampleQuestions);
      quiz.currentQuestionIndex = sampleQuestions.length;
      expect(() => quiz.submitAnswer(0)).toThrow('No question available');
    });

    test('should allow answering multiple questions', () => {
      const quiz = new Quiz(sampleQuestions);
      quiz.submitAnswer(1); // Correct
      quiz.submitAnswer(2); // Correct
      quiz.submitAnswer(0); // Incorrect
      
      expect(quiz.score).toBe(2);
      expect(quiz.currentQuestionIndex).toBe(3);
      expect(quiz.userAnswers).toHaveLength(3);
    });
  });

  describe('isComplete', () => {
    test('should return false when quiz just started', () => {
      const quiz = new Quiz(sampleQuestions);
      expect(quiz.isComplete()).toBe(false);
    });

    test('should return true when all questions answered', () => {
      const quiz = new Quiz(sampleQuestions);
      sampleQuestions.forEach(() => quiz.submitAnswer(0));
      expect(quiz.isComplete()).toBe(true);
    });

    test('should return true for empty quiz', () => {
      const quiz = new Quiz([]);
      expect(quiz.isComplete()).toBe(true);
    });
  });

  describe('getScore', () => {
    test('should return correct score information', () => {
      const quiz = new Quiz(sampleQuestions);
      quiz.submitAnswer(1); // Correct
      quiz.submitAnswer(0); // Incorrect
      quiz.submitAnswer(2); // Correct
      
      const score = quiz.getScore();
      expect(score).toEqual({
        correct: 2,
        total: 3,
        percentage: 67
      });
    });

    test('should return 0% for all incorrect answers', () => {
      const quiz = new Quiz(sampleQuestions);
      sampleQuestions.forEach(() => quiz.submitAnswer(0)); // Answer 0 for all (all wrong)
      
      const score = quiz.getScore();
      expect(score.percentage).toBe(0);
      expect(score.correct).toBe(0);
    });

    test('should return 100% for all correct answers', () => {
      const quiz = new Quiz(sampleQuestions);
      quiz.submitAnswer(1); // Correct for Q1
      quiz.submitAnswer(2); // Correct for Q2
      quiz.submitAnswer(2); // Correct for Q3
      
      const score = quiz.getScore();
      expect(score.percentage).toBe(100);
      expect(score.correct).toBe(3);
    });

    test('should handle empty quiz', () => {
      const quiz = new Quiz([]);
      const score = quiz.getScore();
      expect(score).toEqual({
        correct: 0,
        total: 0,
        percentage: 0
      });
    });
  });

  describe('reset', () => {
    test('should reset quiz state', () => {
      const quiz = new Quiz(sampleQuestions);
      quiz.submitAnswer(1);
      quiz.submitAnswer(2);
      
      quiz.reset();
      
      expect(quiz.currentQuestionIndex).toBe(0);
      expect(quiz.score).toBe(0);
      expect(quiz.userAnswers).toEqual([]);
    });
  });

  describe('getTotalQuestions', () => {
    test('should return the correct number of questions', () => {
      const quiz = new Quiz(sampleQuestions);
      expect(quiz.getTotalQuestions()).toBe(3);
    });

    test('should return 0 for empty quiz', () => {
      const quiz = new Quiz([]);
      expect(quiz.getTotalQuestions()).toBe(0);
    });
  });
});
