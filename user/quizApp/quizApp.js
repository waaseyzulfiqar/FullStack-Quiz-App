import { addDoc, collection, db, doc, getDoc } from "../../firebase.js";

let quizQuestions = [];

// code starts here

let showQuestion = document.querySelector("#question");
let showOptions = document.querySelector("#showOptions");
let questionCount = document.querySelector("#questionCount");
let showTime = document.querySelector("#timer");
let progressBar = document.querySelector(".progress-bar");
let nextBtn = document.querySelector("#nextBtn");
let loader = document.querySelector("#loader");
var modal = document.getElementById("quizResultModal");

let progressPercentage = 10;

let currentIndex = 0;
let seconds = 60;
let minutes;
let timerInterval;
let score = 0;
let correctAns = 0;
let quizTitle = ''

const id = sessionStorage.getItem("quizId");

const getQuestions = async () => {
  try {
    // console.log(id);

    if (id === null) {
      window.location.replace("../dashboard/dashboard.html");
      return;
    }
    const docSnap = await getDoc(doc(db, "Quizzes", id));
    minutes = docSnap.data().time;
    quizTitle = docSnap.data().title
    console.log(docSnap.data());
    return docSnap.data().queArr;
  } catch (error) {
    alert(error.message);
  }
};

loader.style.display = "block";

getQuestions().then((res) => {
  // console.log("res -> ", res);

  quizQuestions = res;

  loader.style.display = "none";

  render();
  startTimer();
});

const stopTimer = () => {
  clearInterval(timerInterval);
};

const startTimer = () => {
  timerInterval = setInterval(() => {
    seconds--;
    // console.log("seconds --> ", seconds);
    if (seconds == 0) {
      minutes--;
      seconds = 60;
    }

    if (minutes == 0) {
      seconds = 0;
      stopTimer();

      showQuizResult();
    }

    showTime.innerHTML = `${
      minutes < 10 ? "0" + minutes + " min " : minutes + " min"
    }`;
  }, 1000);
};

const render = () => {
  showQuestion.innerHTML = "";
  showOptions.innerHTML = "";

  if (currentIndex != quizQuestions.length) {
    showQuestion.innerText = `${currentIndex + 1}. ${
      quizQuestions[currentIndex].question
    }`;

    let optionsArray = quizQuestions[currentIndex].options;

    for (let i = 0; i < optionsArray.length; i++) {
      const optionElement = document.createElement('li');
      optionElement.className = 'cursor-pointer mt-3 border border-2 fw-medium rounded p-2';
      optionElement.innerText = optionsArray[i];
      showOptions.appendChild(optionElement);
    }

    questionCount.innerHTML = `<span class="fw-bold">${currentIndex + 1} of ${
      quizQuestions.length
    }</span> Questions`;
    nextBtn.disabled = true;
  } else {
    showQuizResult();
  }
};

const goToNextQuestion = () => {
  currentIndex += 1;

  const totalQuestions = quizQuestions.length; // Total number of questions
  const progressIncrement = 100 / totalQuestions; // Calculate progress increment

  progressPercentage += progressIncrement;
  progressBar.style.width = `${progressPercentage}%`;

  render();
};
// ...

let selectedOption = null;

showOptions.addEventListener("click", (event) => {
  // Ensure the clicked element is an option
  if (event.target.tagName === "LI") {
    // Remove the 'bg-primary' class from all options
    const allOptions = showOptions.querySelectorAll("li");
    allOptions.forEach((option) => {
      option.classList.remove("bg-success-subtle", "border-success");
    });

    // Add the 'bg-primary' and 'text-white' classes to the clicked option
    event.target.classList.add(
      "bg-success-subtle",
      "border-success",
      "cursor-pointer"
    );

    // Store the selected option
    selectedOption = event.target.textContent;

    nextBtn.disabled = false;
  }
});

nextBtn.addEventListener("click", () => {
  if (selectedOption !== null) {
    // Compare the selected option to the correct answer
    if (selectedOption === quizQuestions[currentIndex].correctAns) {
      score++;
      correctAns++;
    }
    // console.log(score);

    // Reset the selected option
    selectedOption = null;

    // Go to the next question
    goToNextQuestion();
  }
});

// show result
const showQuizResult = async () => {
  loader.style.display = 'block'
  try {

    // saving data to database

    const user = JSON.parse(localStorage.getItem("Current_User"))
    const scoreObj = {
        totalQues: quizQuestions.length,
        score: score,
        wrongAns: quizQuestions.length - score,
        quizId: sessionStorage.getItem("quizId"),
        userId: user.uid,
        userName: `${user.first_name} ${user.last_name}`,
        quizTitle: quizTitle
    }
    console.log("scoreObj", scoreObj)
    const response = await addDoc(collection(db, "scores"), scoreObj)
    console.log("response score", response)


    // rendering result

    document.getElementById("quiz").classList.add("d-none");
    document.body.style.background = "blur";
    modal.classList.remove("d-none");
    modal.style.display = "block";
    modal.style.backgroundColor = "white";
    modal.style.padding = "20px";
    modal.style.zIndex = "99";

    const percentage = (score / quizQuestions.length) * 100 

    document.getElementById("result").innerText = `${score}/${
      quizQuestions.length
    } = ${percentage.toFixed(1)}%`;
    document.getElementById("resultImg").src =
      correctAns > quizQuestions.length - score
        ? "../../assets/smiling-face.png"
        : "../../assets/sad.png";
    document.getElementById(
      "correctAns"
    ).innerHTML = `<i class="fa-solid fa-circle-check" style="color:rgb(17, 132, 65);"></i> Correct Answers: ${correctAns}`;
    document.getElementById(
      "wrongAns"
    ).innerHTML = `<i class="fa-solid fa-circle-xmark" style="color: #b72a2a;"></i> Wrong Answers: ${quizQuestions.length - score}`;


  } catch (error) {

    console.log(error.message);
  }finally{
    loader.style.display = 'none'
  }
};

window.stopTimer = stopTimer;
window.startTimer = startTimer;
window.goToNextQuestion = goToNextQuestion;
window.showQuizResult = showQuizResult;
