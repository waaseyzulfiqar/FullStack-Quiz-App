// {
//     title :"JS QUIZ CHAP#1 to CHAP#20",
//     category :"Javascript",
//     question : [
//         {
//             question : "html Stand for",
//             options : ["1" , "2" , "3" , "4"],
//             correctAns : "1",
//         },
//         {
//             question : "CSS Stand for",
//             options : ["1" , "2" , "3" , "4"],
//             correctAns : "1",
//         }
//     ],
// }


// authcheck

const authAdminCheck = () => {
  const user = JSON.parse(localStorage.getItem("Current_User"))

  // console.log("authCheck", user)

  if (user === null) {
      window.location.replace('../../index.html')
  }

  if (user.role !== "Admin") {
      window.location.replace("../../user/dashboard/dashboard.html")
      return
  }
}

authAdminCheck()


// code starts here 

import { addDoc, collection, db } from "../../firebase.js";

const title = document.querySelector("#title");
const time = document.querySelector("#minutes");
const category = document.querySelector("#category");

const questions = [];

const handleCreateQuiz = async () => {
  try {
    const finalObj = {
      title: title.value,
      time: time.value,
      category: category.value,
      queArr: questions,
      isActive: false,
    };

    console.log("finalObj ", finalObj);

    const res = await addDoc(collection(db, "Quizzes"), finalObj);
    await Swal.fire({
      position: "center",
      icon: "success",
      title: "Quiz Created Successfully!",
      showConfirmButton: false,
      timer: 1500
    });

  } catch (error) {
    alert(error.message);
    console.log(error.message);
  }
};

const handleAddNewQuestion = () => {
  const question = document.querySelector("#question");
  const option1 = document.querySelector("#option1");
  const option2 = document.querySelector("#option2");
  const option3 = document.querySelector("#option3");
  const option4 = document.querySelector("#option4");
  const correctAns = document.querySelector("#correctAns");

  const quizObj = {
    question: question.value,
    options: [option1.value, option2.value, option3.value, option4.value],
    correctAns: correctAns.value,
  };

  questions.push(quizObj);

  question.value = "";
  option1.value = "";
  option2.value = "";
  option3.value = "";
  option4.value = "";
  correctAns.value = "";

  console.log("quizObj ", quizObj);
  console.log("questions ", questions);
};

const handleLogout = () =>{
  localStorage.removeItem('Current_User')
}

window.handleCreateQuiz = handleCreateQuiz;
window.handleAddNewQuestion = handleAddNewQuestion;
window.handleLogout = handleLogout;
window.authAdminCheck = authAdminCheck;