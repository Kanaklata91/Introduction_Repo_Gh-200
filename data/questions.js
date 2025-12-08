/**
 * Sample quiz questions about Node.js and JavaScript
 */
const quizQuestions = [
  {
    question: 'What does Node.js primarily use for handling asynchronous operations?',
    options: [
      'Threads',
      'Event Loop',
      'Processes',
      'Clusters'
    ],
    correctAnswer: 2
  },
  {
    question: 'Which keyword is used to declare a block-scoped variable in JavaScript?',
    options: [
      'var',
      'let',
      'const',
      'Both let and const'
    ],
    correctAnswer: 3
  },
  {
    question: 'What is the command to initialize a new Node.js project?',
    options: [
      'node init',
      'npm start',
      'npm init',
      'node new'
    ],
    correctAnswer: 2
  },
  {
    question: 'Which method is used to parse JSON strings in JavaScript?',
    options: [
      'JSON.stringify()',
      'JSON.parse()',
      'JSON.convert()',
      'JSON.decode()'
    ],
    correctAnswer: 1
  },
  {
    question: 'What is the purpose of package.json in a Node.js project?',
    options: [
      'To store user data',
      'To manage project dependencies and metadata',
      'To compile JavaScript code',
      'To run tests'
    ],
    correctAnswer: 1
  }
];

module.exports = quizQuestions;
