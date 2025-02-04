const authCheck = () => {
    try {
        const currentUser = JSON.parse(localStorage.getItem('Current_User'));

        if (!currentUser) {
            window.location.replace('../../index.html');
        }
    } catch (error) {
        console.error('Error parsing current user:', error);
    }
};


authCheck()
// window.authCheck = authCheck;