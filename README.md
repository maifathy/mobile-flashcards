# Mobile-FlashCards project

- It is a simple react native project to handle daily quizzes.
- Decks are the main category to be created by users, each deck can contain any number
  of questions.
- Questions are declared per deck, each question has its specific answer.
- User can add decks, question and take multiple quizzes everyday.
- Daily notification to notify the user to take a quiz is implemented, also the notification time is
  updated after each quiz the user take.
- The project is tested on Android only.

## How to use

- Install packages with `yarn` or `npm install`.
  - If you have native iOS code run `npx pod-install`
- Run `yarn start` to start the bundler.

## File Structure
mobile-flshcards
├── App.js
├── app.json
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── assests
│   ├── favicon.png
│   ├── icon.png
│   └── splash.png
├── components
│   ├── Decks.js
│   ├── DeckView.js
│   ├── NewCard.js
│   ├── NewDeck.js
│   ├── Question.js
│   ├── Quiz.js
│   └── RootNavigation.js
└── utils
    ├── api.js
    └── helpers.js

## Data
There are two types of objects stored in our database:

* Decks
  - The main categories save in the application and the user can access to start new quiz
* Questions
  - The items displayed for each quiz, it is about question and answer related.

Example:
  `{
      React: {
        title: 'React',
        questions: [
          {
            question: 'What is React?',
            answer: 'A library for managing user interfaces'
          },
          {
            question: 'Where do you make Ajax requests in React?',
            answer: 'The componentDidMount lifecycle event'
          }
        ]
      }
  }`
