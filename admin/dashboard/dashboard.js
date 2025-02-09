import { collection, db, doc, getDocs } from "../../firebase.js";

const authCheck = () => {
  try {
    const currentUser = JSON.parse(localStorage.getItem("Current_User"));

    if (!currentUser) {
      window.location.replace("../../index.html");
    }

    if (currentUser.role !== "Admin") {
      window.location.replace("../../user/dashboard/dashboard.html");
    }
  } catch (error) {
    console.error("Error parsing current user:", error);
  }
};

window.addEventListener("load", authCheck);

const handleLogout = () => {
  localStorage.removeItem("Current_User");
};

const table = document.getElementById("tableContainer");

const getScoreListing = async () => {
    tableContainer.innerHTML = "";
  try {
    const querySnapshot = await getDocs(collection(db, "scores"));
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      console.log(data);
      let percentage = (data.score / data.totalQues) * 100;
      tableContainer.innerHTML += `<tr>
                    <td>
                      <p class="fw-bold mb-1">${data.userName}</p>
                    </td>
                    <td>${data.quizTitle}</td>
                    <td>
                      ${data.wrongAns}
                    </td>
                    <td>
                      ${data.totalQues}
                    </td>
                    <td>${data.score}</td>
                    <td>
                      ${percentage.toFixed(1)}%
                    </td>
                  </tr>`;
    });
  } catch (error) {
    alert(error.message);
  }
};

getScoreListing();

window.authCheck = authCheck;
window.handleLogout = handleLogout;
window.getScoreListing = getScoreListing;
