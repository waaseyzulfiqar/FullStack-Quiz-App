import { collection, db, doc, getDocs, updateDoc } from "../../firebase.js";

const cardsDiv = document.getElementById("cards");
const loader = document.getElementById("loader");

const handleActiveInactive = async () => {
  loader.classList.remove("d-none");

  try {
    const querySnapshot = await getDocs(collection(db, "Quizzes"));
    cardsDiv.innerHTML = ""; // Clear previous content
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const data = doc.data();
      cardsDiv.innerHTML += `<div class="card">
          <h2 class="quiz-title">${data.title}</h2>
          <p class="quiz-description">${data.category}</p>
          <div class="actions">
          ${
            data.isActive == false
              ? `<button id=${doc.id} class="activate-button w-100" onclick="togglerFunc(this, true)">Active</button>`
              : `<button id=${doc.id} class="deactivate-button w-100" onclick="togglerFunc(this, false)">Inactive</button>`
          }
        </div>
      </div>`;
    });
  } catch (error) {
    console.error(error);
    alert(error.message);
  } finally {
    loader.classList.add("d-none");
  }
};
window.addEventListener("load", handleActiveInactive);

const togglerFunc = async (elem, isActive) => {
  const cardID = elem.id;

  const docRef = doc(db, "Quizzes", cardID);

  await updateDoc(docRef, {
    isActive,
  });

  handleActiveInactive();
};

window.togglerFunc = togglerFunc;
window.handleActiveInactive = handleActiveInactive;
