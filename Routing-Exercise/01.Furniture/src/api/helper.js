function getUserData() {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    return userData;
}
function setUserData(userData){
    return sessionStorage.setItem('userData', JSON.stringify(userData));
}
export {
    getUserData,
    setUserData
}