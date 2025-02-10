const authUserCheck = () => {
  const user = JSON.parse(localStorage.getItem("Current_User"))

  console.log("authCheck", user)

  if (user === null) {
      window.location.replace('../../index.html')
  }

  if (user.role !== "user") {
      window.location.replace("../../admin/dashbaord/dashboard.html")
      return
  }
}

authUserCheck()

// code starts here 

import { collection, db, getDocs, query, where } from "../../firebase.js";

const mainContent = document.getElementById("main-content");
const loader = document.getElementById("loader");
const tableRow = document.getElementById("tableRow");

const scoreListing = async () => {
  tableRow.innerHTML = "";
  loader.classList.remove('d-none')
  try {
    const user = JSON.parse(localStorage.getItem("Current_User"));

    const q = query(collection(db, "scores"), where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      let percentage = (data.score / data.totalQues) * 100
      tableRow.innerHTML += `<tr>
                                <td>${data.quizTitle}</td>
                                <td>${data.score}</td>
                                <td>${data.wrongAns}</td>
                                <td>${percentage}%</td>
                                <td>${percentage >= 60 ? `<span class="status-badge status-pass">Passed</span>` : `<span class="status-badge status-fail">Failed</span>`}</td>
                            </tr>`;
    });
  } catch (error) {
    alert(error.message);
  }finally{
    loader.classList.add('d-none')
  }
};

scoreListing();

const handleLogout = () => {
  localStorage.removeItem('Current_User')
  window.location.href = '../../index.html'
}
window.scoreListing = scoreListing;
window.handleLogout = handleLogout;
window.authUserCheck = authUserCheck