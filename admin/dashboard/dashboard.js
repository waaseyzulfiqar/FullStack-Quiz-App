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

import { collection, db, doc, getDocs } from "../../firebase.js";


const handleLogout = () => {
  localStorage.removeItem("Current_User");
};

const table = document.getElementById("tableContainer");
const loader = document.getElementById("loader");

const getScoreListing = async () => {
    tableContainer.innerHTML = "";
    loader.classList.remove('d-none')
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
  }finally{
    loader.classList.add('d-none')
  }
};

getScoreListing();

window.authAdminCheck = authAdminCheck;
window.handleLogout = handleLogout;
window.getScoreListing = getScoreListing;