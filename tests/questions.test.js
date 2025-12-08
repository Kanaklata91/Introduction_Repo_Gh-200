const quizQuestions = require('../data/questions');

describe('Quiz Questions Data', () => {
  test('should have questions array', () => {
    expect(Array.isArray(quizQuestions)).toBe(true);
    expect(quizQuestions.length).toBeGreaterThan(0);
  });

  test('each question should have required properties', () => {
    quizQuestions.forEach((question, index) => {
      expect(question).toHaveProperty('question');
      expect(question).toHaveProperty('options');
      expect(question).toHaveProperty('correctAnswer');
      
      expect(typeof question.question).toBe('string');
      expect(Array.isArray(question.options)).toBe(true);
      expect(typeof question.correctAnswer).toBe('number');
      
      // Question text should not be empty
      expect(question.question.length).toBeGreaterThan(0);
      
      // Should have options
      expect(question.options.length).toBeGreaterThan(0);
      
      // Correct answer should be valid index
      expect(question.correctAnswer).toBeGreaterThanOrEqual(0);
      expect(question.correctAnswer).toBeLessThan(question.options.length);
    });
  });

  test('should have at least 4 options per question', () => {
    quizQuestions.forEach((question) => {
      expect(question.options.length).toBeGreaterThanOrEqual(4);
    });
  });

  test('all options should be non-empty strings', () => {
    quizQuestions.forEach((question) => {
      question.options.forEach((option) => {
        expect(typeof option).toBe('string');
        expect(option.length).toBeGreaterThan(0);
      });
    });
  });
});
