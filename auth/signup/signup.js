import { auth, createUserWithEmailAndPassword, db, doc, setDoc } from "../../firebase.js";

const form = document.getElementById('signup-form')

const handleSignup = async () => {
    try {
        
        const firstName = document.getElementById('first-name');
        const lastName = document.getElementById('last-name');
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirm-password');
    
        if (!firstName.value || !lastName.value || !email.value || !password.value || !confirmPassword.value) {
            alert('Please fill the entire form!');
            return
        }

        if(password.value != confirmPassword.value){
            alert('Password and Confirm Password should be same!')
            return
        }
    
        const userData = {
            first_name: firstName.value,
            last_name: lastName.value,
            email: email.value,
            role: 'user' // Admin || user
        };

        console.log(email.value, password.value);
    
        // Auth
        const authenticatedData = await createUserWithEmailAndPassword(auth, email.value, password.value)
        console.log('Authenticated_Data', authenticatedData)

        // Firestore Database
        await setDoc(doc(db, "Users", authenticatedData.user.uid), userData);
        alert('Sign up Successfull!')
        window.location.replace('../../index.html')



    } catch (error) {

        console.log(error.message)
    }
}

window.handleSignup = handleSignup;