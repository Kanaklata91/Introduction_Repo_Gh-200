# GH-200 Introduction Repo

A simple Node.js quiz application for learning and testing knowledge about Node.js and JavaScript that is in need of a GitHub Action Workflow

## Features

- Interactive command-line quiz interface
- Multiple choice questions
- Immediate feedback on answers
- Score tracking and percentage calculation
- Clear and simple code structure
- Comprehensive test suite

## Project Structure

```
.
├── data/
│   └── questions.js      # Quiz questions data
├── src/
│   └── Quiz.js          # Quiz class with core logic
├── tests/
│   ├── Quiz.test.js     # Unit tests for Quiz class
│   ├── QuizApp.test.js  # Tests for QuizApp
│   └── questions.test.js # Tests for questions data
├── index.js             # Main application entry point
└── package.json         # Project configuration
```

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

## Usage

To start the quiz application:

```bash
npm start
```

Follow the prompts to answer each question. Enter a number (1-4) for your answer choice.

## Testing

Run all tests:

```bash
npm test
```

Run tests in watch mode:

```bash
npm test:watch
```

Run tests with coverage:

```bash
npm test:coverage
```

## How It Works

1. The `Quiz` class manages quiz state, questions, and scoring
2. The `QuizApp` class handles user interaction through the command line
3. Questions are stored in a separate data file for easy management
4. Tests ensure reliability and correctness of the application

## Adding Questions

To add more questions, edit `data/questions.js` and add objects with this format:

```javascript
{
  question: 'Your question text?',
  options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
  correctAnswer: 0  // Index of the correct option (0-3)
}
```

## License

ISC

## Workflow Status 
[![CI](https://github.com/Kanaklata91/Introduction_Repo_Gh-200/actions/workflows/npm-publish_workflow_demo.yml/badge.svg)](https://github.com/Kanaklata91/Introduction_Repo_Gh-200/actions/workflows/npm-publish_workflow_demo.yml)
