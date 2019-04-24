function generateQuiz(questions, quizContainer, resultsContainer, submitButton, nextButton){

	function showQuestion(numQuestion, questions, quizContainer) {
		// we'll need a place to store the output and the answer choices
		var output = [];
		var answers = [];

		// for each available answer to this question...
		for(letter in questions[numQuestion].answers){		
			// ...add an html radio button
			answers.push(
				'<label>'
					+ '<input type="radio" name="question'+numQuestion+'" value="'+letter+'">'
					+ questions[numQuestion].answers[letter]
				+ '</label></br>'
			);
		}

		// add this question and its answers to the output
		output.push(
			'<div class="question">' + questions[numQuestion].question + '</div>'
			+ '<div class="answers">' + answers.join('') + '</div>'
		);

		// finally combine our output list into one string of html and put it on the page
		quizContainer.innerHTML = output.join('');
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
		resultsContainer.innerHTML = 'You got ' + correctAnswers + ' out of ' + questions.length + ' answers right.';
	}

	// functions to update the progress bar

	// add progress to the progress bar
	function addProgress() {
	    //increase myBarWidth by 100/questionsNumber
	    myBar.innerHTML = '<center style="color:white">'+noQuestion+'/'+numberQuestions+'</center>';
	    myBarWidth += 100 / numberQuestions;
	    // make sure that width of the progress bar won't be more than 100% & fix for questionsNumber that are not dividers of 100
	    if (myBarWidth > 100) {
	        myBarWidth = 100;
	    }
	    // update the width #myBar by changing the css
	    document.getElementById("myBar").style.width = myBarWidth + "%";
	}

	// deduct progress
	function deductProgress() {
	    //decrease myBarWidth by 100/questionsNumber
	    myBarWidth -= 100 / myQuestions.length;
	    // make sure that width of the progress bar won't be more than 0% & fix for questionsNumber that are not dividers of 100
	    if (myBarWidth < 0) {
	        myBarWidth = 0;
	    }
	    // update the width #myBar by changing the css
	    document.getElementById("myBar").style.width = myBarWidth + "%";
	}

	var noQuestion = 0;
	var correctAnswers = 0;
	var numberQuestions = questions.length;
	var myBarWidth = 0;
	myBar.innerHTML = '<center style="color:white">'+noQuestion+'/'+numberQuestions+'</center>';


	// show the questions
	showQuestion(noQuestion, questions, quizContainer);
	nextButton.style.visibility = "hidden"; 

	submitButton.onclick = function() {
		showResult(noQuestion, questions, quizContainer, resultsContainer, correctAnswers);
		submitButton.style.visibility = "hidden";
		// condition for end of the quiz
		if (noQuestion >= questions.length - 1) {
			showEndResult(questions, correctAnswers, resultsContainer);
			nextButton.style.visibility = "hidden"; 
		}
		else {
			nextButton.style.visibility = "visible";
		}
		noQuestion++;
		addProgress();
	}

	nextButton.onclick = function() {
		showQuestion(noQuestion, questions, quizContainer);
		submitButton.style.visibility = "visible"; 
		nextButton.style.visibility = "hidden"; 
	}
}

var myQuestions = [
	{
		question: "What is the real name of Doctor Eggman?",
		answers: {
			a: 'Machigero',
			b: 'Robotnik',
			c: 'Machinarium'
		},
		correctAnswer: 'b'
	},
	{
		question: "What character was the first Sonic's sidekick?",
		answers: {
			a: 'Knuckles',
			b: 'Amy',
			c: 'Tails'
		},
		correctAnswer: 'c'
	},
	{
		question: "In what game does Shadow appear for the first time?",
		answers: {
			a: 'Sonic Adventure',
			b: 'Sonic Adventure 2',
			c: 'Sonic Heroes'
		},
		correctAnswer: 'b'
	}
];

var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');
var nextButton = document.getElementById('next');
var questionProgress = document.getElementById('questionProgress');

generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton, nextButton, questionProgress);