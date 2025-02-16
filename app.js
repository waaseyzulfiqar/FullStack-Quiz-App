import {
  auth,
  db,
  doc,
  getDoc,
  signInWithEmailAndPassword,
} from "./firebase.js";

const handleFormSubmit = async () => {

  document.querySelector('.login-button').disabled = true
  try {
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");

    const data = await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    console.log(data);

    const uid = data.user.uid;
    // get data
    const docRef = doc(db, "Users", uid);
    const docSnap = await getDoc(docRef);

    let userData;

    if (docSnap.exists()) {
      console.log("DocSnap data:", docSnap.data());

      userData = {
        ...docSnap.data(),
        uid,
      };

      localStorage.setItem("Current_User", JSON.stringify(userData));
      
    } else {
      
      console.log("No such document!");
    }
    
    if(userData.role === 'Admin'){
      await Swal.fire({
        position: "center",
        icon: "success",
        title: "Successfully Loggedin! As Admin",
        showConfirmButton: false,
        timer: 1500
      });
      window.location.replace('./admin/dashboard/dashboard.html')

    }else{
      await Swal.fire({
        position: "center",
        icon: "success",
        title: "Successfully Loggedin! As User",
        showConfirmButton: false,
        timer: 1500
      });
      window.location.replace('./user/dashboard/dashboard.html')
    }
    // console.log('userData =>', userData);

  } catch (error) {
    alert(error.message);
    location.reload();
  }
};

window.handleFormSubmit = handleFormSubmit;