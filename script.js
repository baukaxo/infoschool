const questions = [
    {
        question: "Что означает HTML?",
        answers: [
            "Язык разметки гипертекста",
            "Язык программирования",
            "Операционная система"
        ],
        correct: 0
    },
    {
        question: "Какой язык программирования мы используем для работы с Python?",
        answers: [
            "HTML",
            "Python",
            "CSS"
        ],
        correct: 1
    },
    {
        question: "Что такое искусственный интеллект?",
        answers: [
            "Компьютерная мышь",
            "Вид монитора",
            "Технология выполнения интеллектуальных задач компьютером"
        ],
        correct: 2
    },
    {
        question: "Какой пароль считается более надёжным?",
        answers: [
            "123456",
            "qwerty",
            "Kz!2026_School#"
        ],
        correct: 2
    },
    {
        question: "Для чего используется CSS?",
        answers: [
            "Для оформления веб-страниц",
            "Для создания паролей",
            "Для хранения файлов"
        ],
        correct: 0
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

function showQuestion() {
    const q = questions[currentQuestion];

    document.getElementById("question").textContent =
        `Вопрос ${currentQuestion + 1} из ${questions.length}: ${q.question}`;

    const answersBlock = document.getElementById("answers");
    answersBlock.innerHTML = "";

    q.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.onclick = () => checkAnswer(index);
        answersBlock.appendChild(button);
    });

    document.getElementById("result").textContent = "";
    document.getElementById("nextBtn").style.display = "none";

    answered = false;
}

function checkAnswer(selected) {
    if (answered) return;

    answered = true;

    const q = questions[currentQuestion];
    const buttons = document.querySelectorAll("#answers button");

    if (selected === q.correct) {
        score++;
        document.getElementById("result").textContent =
            "✅ Правильно! Молодец!";
    } else {
        document.getElementById("result").textContent =
            "❌ Неверно. Попробуй запомнить правильный ответ.";
    }

    buttons.forEach((button, index) => {
        button.disabled = true;

        if (index === q.correct) {
            button.style.borderColor = "#35d399";
        }

        if (index === selected && selected !== q.correct) {
            button.style.borderColor = "#ff6464";
        }
    });

    const nextBtn = document.getElementById("nextBtn");
    nextBtn.style.display = "inline-block";

    if (currentQuestion === questions.length - 1) {
        nextBtn.textContent = "Посмотреть результат";
    } else {
        nextBtn.textContent = "Следующий вопрос →";
    }
}

function nextQuestion() {
    if (!answered) return;

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.querySelector(".quiz-box").innerHTML = `
        <h2>🎉 Тест завершён!</h2>
        <p style="font-size: 24px; margin: 25px;">
            Твой результат: <strong>${score} из ${questions.length}</strong>
        </p>
        <p>
            ${score === questions.length
                ? "Отличный результат! Ты настоящий эксперт! 🏆"
                : "Продолжай учиться! У тебя всё получится! 🚀"}
        </p>
        <button class="next-btn" style="display:inline-block; margin-top:25px;"
            onclick="restartQuiz()">
            Пройти ещё раз
        </button>
    `;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    showQuestion();
}

showQuestion();
