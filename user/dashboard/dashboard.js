import { collection, db, getDocs } from "../../firebase.js";

const authCheck = () => {
  try {
    const currentUser = JSON.parse(localStorage.getItem("Current_User"));

    if (!currentUser) {
      window.location.replace("../../index.html");
    }
  } catch (error) {
    console.error("Error parsing current user:", error);
  }
};

authCheck();

const mainContent = document.getElementById("main-content");
const loader = document.getElementById("loader");

const getListing = async () => {
  loader.classList.remove("d-none");

  try {
    const querySnapshot = await getDocs(collection(db, "Quizzes"));
    let hasActiveQuiz = false;
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const data = doc.data();

      // console.log(data.isActive);

      if (data.isActive) {
        hasActiveQuiz = true
        mainContent.innerHTML += `<div class="quiz-card">
                <div class="quiz-icon">
                    <i class="fas fa-code"></i>
                </div>                
                <h5>${data.title}</h5>
                <p>${data.queArr.length} questions</p>
                <div class="success-rate">
                    <span>✅ Success rate: 70%</span>
                    <button class="btn btn-success btn-sm" onclick="startQuiz('${doc.id}')">▶</button>
                </div>
            </div>`;
      }

    });
    if(!hasActiveQuiz){
      mainContent.innerHTML += `<div class="vh-100 d-flex flex-column justify-content-center align-items-center">
      <img class="w-25 text-success" src='../../assets/empty-box.svg'/>
      <h3>No Active Quiz Available!</h3>
      <p>Contact Admin to Activate Your Quiz</p>
      </div>`;
    }
  } catch (error) {
    console.log(error.message);
    alert(error.message);
  } finally {
    loader.classList.add("d-none");
  }
};

getListing();

const startQuiz = (id) => {
  console.log(id);

  sessionStorage.setItem("quizId", id);
  window.location.assign("../quizApp/quizApp.html");
};

window.authCheck = authCheck;
window.getListing = getListing;
window.startQuiz = startQuiz;
