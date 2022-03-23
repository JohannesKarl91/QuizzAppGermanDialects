let questions = [
    {
        "question": "Wovon spricht ein Pfälzer, wenn er Grumbeere kaufen möchte?",
        "answer_1": "Erdbeere",
        "answer_2": "Äpfel",
        "answer_3": "Kartoffeln",
        "answer_4": "Traube",
        "correct_answer": 3
    },
    {
        "question": "Was meint ein Bayer, wenn er von einer Radschn?",
        "answer_1": "Eine Person, die eine Ratsche benutzt",
        "answer_2": "Einen Radfahrer",
        "answer_3": "Rasenmäher",
        "answer_4": "Klatschtante",
        "correct_answer": 4
    },
    {
        "question": "Wenn sich der Badner über d’Schnoog aufregt. Was könnte das sein?",
        "answer_1": "Stechmücke",
        "answer_2": "Schnecke",
        "answer_3": "Schnee",
        "answer_4": "Schnurbart",
        "correct_answer": 1
    },
    {
        "question": "Welche Tätigkeit führt ein/e Sachse/Sächsin aus, wenn vom didschen gesprochen wird?",
        "answer_1": "gegen etwas prallen",
        "answer_2": "etwas eintunken",
        "answer_3": "als DJ eine Platte auflegen",
        "answer_4": "Eine gepflegte Dusche einnehmen",
        "correct_answer": 1
    },
    {
        "question": "Was bestellt ein/e Berliner/in, wenn ein Brühpulla bestellt wird?",
        "answer_1": "Döner",
        "answer_2": "Gulaschsuppe",
        "answer_3": "Currywurst mit Brötchen",
        "answer_4": "Bockwurst mit Senf und Brot",
        "correct_answer": 4
    },
    {
        "question": "Was bedeutet das Wort Fisematente im Saarland?",
        "answer_1": "Besonders fiese Person",
        "answer_2": "Schwierigkeit",
        "answer_3": "Schmutzige Füße",
        "answer_4": "Gemeine Tante",
        "correct_answer": 1
    },
    {
        "question": "Was mein ein Ostfriese, wenn er sagt: Bitte gib mir mal die Funzel?",
        "answer_1": "Feuerzeug",
        "answer_2": "Kerze",
        "answer_3": "Tachenlampe",
        "answer_4": "Kehrbesen",
        "correct_answer": 3
    }
];


let currentQuestion = 0;
let correctAnswerCounter = 0;
let AUDIO_SUCCESS = new Audio('audio/success_sound.mp3')
let AUDIO_FAIL = new Audio('audio/fail_sound.mp3')


function init() {
    document.getElementById('questionLength').innerHTML = questions.length;
    document.getElementById('endScreenLength').innerHTML = questions.length;

    showQuestion();
}

function showQuestion() {

    //Show endscreen, when value > then array.length
    if (currentQuestion >= questions.length) {
        document.getElementById('endScreen').style = '';
        document.getElementById('questionScreen').style = 'display: none';
        document.getElementById('endScreenCorrectAnswers').innerHTML = correctAnswerCounter;
        document.getElementById('card-img-top').src = 'img/win2.jpg';
    }

    //Show (next) question, when value < then array.length
    else {
        let question = questions[currentQuestion];
        showCurrentQuestionNo();
        document.getElementById('questionText').innerHTML = question['question'];
        document.getElementById('answer_1').innerHTML = question['answer_1'];
        document.getElementById('answer_2').innerHTML = question['answer_2'];
        document.getElementById('answer_3').innerHTML = question['answer_3'];
        document.getElementById('answer_4').innerHTML = question['answer_4'];


        let progressPercent = (currentQuestion + 1) / questions.length;
        progressPercent = Math.round(progressPercent * 100);
        console.log(progressPercent);
        document.getElementById('progressPercentage1').innerHTML = `${progressPercent} %`;
        document.getElementById('progressPercentage1').style = `width: ${progressPercent}%`;
        document.getElementById('progressPercentage2').innerHTML = `${progressPercent} %`;
        document.getElementById('progressPercentage2').style = `width: ${progressPercent}%`;

        showCurrentQuestionNo();
    }
}


function answer(selection) {
    let question = questions[currentQuestion];
    let correctAnswer = question['correct_answer'];
    let selectionQuestionNumber = selection.slice(-1);
    let idOfCorrectAnswer = 'answer_' + correctAnswer.toString();

    if (selectionQuestionNumber == correctAnswer) {
        document.getElementById(selection).parentNode.classList.add('bg-success'); //.parentNode, da der übergeordnete Container grüngefärbt werden soll.
        AUDIO_SUCCESS.play();
        correctAnswerCounter++;
    }

    else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfCorrectAnswer).parentNode.classList.add('bg-success');
        AUDIO_FAIL.play();
    }

    document.getElementById('btnNext').disabled = false;
}


function nextQuestion() {
    currentQuestion++;
    document.getElementById('btnNext').disabled = true;

    cleanAnswers();
    showQuestion();
}


function cleanAnswers() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger', 'bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger', 'bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger', 'bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger', 'bg-success');
}


function showCurrentQuestionNo() {
    document.getElementById('currentQuestionNo').innerHTML = currentQuestion + 1;
}

function restartGame() {
    document.getElementById('endScreen').style = 'display: none';
    document.getElementById('questionScreen').style = '';
    currentQuestion = 0;
    correctAnswerCounter = 0;

    showQuestion();
}