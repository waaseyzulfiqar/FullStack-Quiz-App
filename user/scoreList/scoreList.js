import { collection, db, getDocs, query, where } from "../../firebase.js";

const tableRow = document.getElementById("tableRow");

const scoreListing = async () => {
  tableRow.innerHTML = "";
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
                                <td>20 Feb 2024</td>
                                <td>${percentage >= 60 ? `<span class="status-badge status-pass">Passed</span>` : `<span class="status-badge status-fail">Failed</span>`}</td>
                            </tr>`;
    });
  } catch (error) {
    alert(error.message);
  }
};

scoreListing();
window.scoreListing = scoreListing;
