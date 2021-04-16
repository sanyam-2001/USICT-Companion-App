const authenticatePassword = (password) => {
    if (password.length < 6) {
        return false;
    }
    else return true;
}

const authenticateEmail = (mail) => {
    if (mail.indexOf("@") === -1) return false;
    else return true;
}

module.exports = { authenticateEmail, authenticatePassword }