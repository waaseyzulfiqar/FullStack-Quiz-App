const authCheck = () => {
    try {
        const currentUser = JSON.parse(localStorage.getItem('Current_User'));

        if (!currentUser) {
            window.location.replace('../../index.html');
        }

        if(currentUser.role !== 'Admin'){
            window.location.replace('../../user/dashboard/dashboard.html')
        }
    } catch (error) {
        console.error('Error parsing current user:', error);
    }
};


window.addEventListener("load", authCheck)


const handleLogout = () =>{
    localStorage.removeItem('Current_User')
}

window.authCheck = authCheck;
window.handleLogout = handleLogout;