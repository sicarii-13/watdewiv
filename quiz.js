(function() {
  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");
  const myQuestions = [
  {
    question: "Wie mag er getapt worden bij de sleepwet?",
    answers: {
      a: "De verdachte.",
      b: "Het gezin waarin de verdacht woont.",
      c: "De hele wijk waarin de verdacht woont."
    },
    correctAnswer: "c"
  },
  {
    question: "Wat mag er getapt/gehacked worden door de AIVD?",
    answers: {
      a: "Smart TV's, Computers, Consoles, Smartphones & tablets.",
      b: "Pacemakers, Koffiezet apparaten & TV's",
      c: "Apparaten mogen niet gehacked worden door de AIVD"
    },
    correctAnswer: "a"
  },
  {
    question: "Welke data mag de AIVD verzamelen?",
    answers: {
      a: "Inhoud van gesprekken.",
      b: "Foto's & Metadata.",
      c: "Er is geen duidelijk kader in de wet.",
      },
    correctAnswer: "c"
  }
  {
    question: "Hoe lang moet deze data bewaard worden?",
    answers: {
      a: "6 maanden.",
      b: "3 jaar.",
      c: "10 jaar",
      },
    correctAnswer: "b"
  }
];
  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();
