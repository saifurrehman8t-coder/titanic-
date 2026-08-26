import { QuizQuestion } from '../types';

export const TITANIC_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Where was RMS Titanic constructed?",
    options: [
      "Liverpool, England",
      "Belfast, Northern Ireland",
      "Glasgow, Scotland",
      "Southampton, England"
    ],
    correctAnswer: 1,
    explanation: "Titanic was built by Harland & Wolff shipyard in Belfast between 1909 and 1911 under Yard No. 401."
  },
  {
    id: 2,
    question: "Who was the chief naval architect who designed Titanic?",
    options: [
      "J. Bruce Ismay",
      "Captain Edward Smith",
      "Thomas Andrews",
      "Lord Pirrie"
    ],
    correctAnswer: 2,
    explanation: "Thomas Andrews was the managing director and head of drafting at Harland & Wolff who oversaw Titanic's design."
  },
  {
    id: 3,
    question: "How many lifeboats did Titanic carry on her maiden voyage?",
    options: [
      "48 lifeboats",
      "32 lifeboats",
      "20 lifeboats",
      "12 lifeboats"
    ],
    correctAnswer: 2,
    explanation: "Titanic carried 20 lifeboats total (14 standard wooden lifeboats, 2 emergency cutters, and 4 collapsible boats), enough for 1,178 people out of 2,224 on board."
  },
  {
    id: 4,
    question: "What rescue ship arrived at 4:00 AM on April 15, 1912, to save survivors?",
    options: [
      "RMS Carpathia",
      "SS Californian",
      "RMS Olympic",
      "SS Mount Temple"
    ],
    correctAnswer: 0,
    explanation: "Cunard liner RMS Carpathia, commanded by Captain Arthur Rostron, sped through ice fields at 17.5 knots to rescue 705 survivors."
  },
  {
    id: 5,
    question: "In what year was Titanic's ocean floor wreck discovered by Dr. Robert Ballard?",
    options: [
      "1972",
      "1985",
      "1997",
      "2001"
    ],
    correctAnswer: 1,
    explanation: "Dr. Robert Ballard and his joint US-French team discovered Titanic's wreck on September 1, 1985, at a depth of 12,500 feet."
  }
];
