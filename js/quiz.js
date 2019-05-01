function generateQuiz(questions, quizContainer, resultsContainer, submitButton, nextButton){

	function showQuestion(numQuestion, questions, quizContainer) {
		// we'll need a place to store the output and the answer choices
		var output = [];
		var answers = [];

		// for each available answer to this question...
		for(letter in questions[numQuestion].answers){		
			// ...add an html radio button
			answers.push(
				'</br>'
					+ '<input type="radio" id="'+questions[numQuestion].answers[letter]+'" name="question'+numQuestion+'" value="'+letter+'">'
					+ '<label for="'+questions[numQuestion].answers[letter]+'">'+questions[numQuestion].answers[letter] + '</label>'
				+ '</br>'
			);
		}

		// add this question and its answers to the output
		output.push(
			'<div class="question">' + (numQuestion+1) + ' - ' + questions[numQuestion].question + '</div>'
			+ '<div class="answers">' + answers.join('') + '</div>'
		);

		// finally combine our output list into one string of html and put it on the page
		quizContainer.innerHTML = output.join('');
		resultsContainer.innerHTML = "Current score: " + correctAnswers + " out of " + questions.length + ".";
	}

	function showResult(numQuestion, questions, quizContainer, resultsContainer) {
		// gather answer containers from our quiz
		var answerContainers = quizContainer.querySelectorAll('.answers');
		// keep track of user's answers
		var userAnswer = '';
		// find selected answer
		userAnswer = (answerContainers[0].querySelector('input[name=question'+numQuestion+']:checked')||{}).value;
		
		// if answer is correct
		if(userAnswer===questions[numQuestion].correctAnswer){
			// add to the number of correct answers
			correctAnswers++;
			// color the answers green
			answerContainers[0].style.color = 'lightgreen';
		}
		// if answer is wrong or blank
		else{
			// color the answers red
			answerContainers[0].style.color = 'red';
		}
	}

	function showEndResult(questions, correctAnswers, resultsContainer) {
		// show number of correct answers out of total
		resultsContainer.innerHTML = 'The End! You got ' + correctAnswers + ' out of ' + questions.length + ' answers right.';
		tryAgainButton.style.display = "";
	}

	// reset all numbers and start the quiz again
	function reset() {
		noQuestion = 0;
		correctAnswers = 0;
		myBarWidth = 0;
		showQuestion(noQuestion, questions, quizContainer);
		resultsContainer.innerHTML = "";
		resetProgress();
	}

	// functions to update the progress bar

	// add progress to the progress bar
	function addProgress() {
	    //increase myBarWidth by 100/questionsNumber
	    myBarWidth += 100 / numberQuestions;
	    // make sure that width of the progress bar won't be more than 100% & fix for questionsNumber that are not dividers of 100
	    if (myBarWidth > 100) {
	        myBarWidth = 100;
	    }
	    // update the width #myBar by changing the css
	    document.getElementById("myBar").style.width = myBarWidth + "%";
	}

	// deduct progress
	function resetProgress() {
	    myBarWidth = 0;
	    document.getElementById("myBar").style.width = myBarWidth + "%";
	}

	var noQuestion = 0;
	var correctAnswers = 0;
	var numberQuestions = questions.length;
	var myBarWidth = 0;


	// show the questions
	showQuestion(noQuestion, questions, quizContainer);
	nextButton.style.display = "none"; 
	tryAgainButton.style.display = "none";

	submitButton.onclick = function() {
		showResult(noQuestion, questions, quizContainer, resultsContainer, correctAnswers);
		submitButton.style.display = "none";
		// condition for end of the quiz
		if (noQuestion >= questions.length - 1) {
			showEndResult(questions, correctAnswers, resultsContainer);
			nextButton.style.display = "none"; 
		}
		else {
			nextButton.style.display = "";
		}
		noQuestion++;
		addProgress();
	}

	nextButton.onclick = function() {
		showQuestion(noQuestion, questions, quizContainer);
		submitButton.style.display = ""; 
		nextButton.style.display = "none"; 
	}

	tryAgainButton.onclick = function() {
		reset();
		submitButton.style.display = "";
		tryAgainButton.style.display = "none";
	}
}

var myQuestions = [
	{
		question: "Which of the following languages is not Object Oriented?",
		answers: {
			a: 'Java',
			b: 'C++',
			c: 'Haskell'
		},
		correctAnswer: 'c'
	},
	{
		question: "What is the time complexity of the Quicksort algorithm?",
		answers: {
			a: 'O(nLogn)',
			b: 'O(n^2)',
			c: 'O(Logn)'
		},
		correctAnswer: 'a'
	},
	{
		question: "Which of these languages is statically typed?",
		answers: {
			a: 'Python',
			b: 'JavaScript',
			c: 'Java'
		},
		correctAnswer: 'c'
	}
];

var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');
var nextButton = document.getElementById('next');
var tryAgainButton = document.getElementById('tryagain')
var questionProgress = document.getElementById('questionProgress');

generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton, nextButton, questionProgress);