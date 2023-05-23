import userService from '../services/userService'

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    // Check email exist
    // Compare PW
    // return userInfo
    // access_token : JWT (json web token): co che bao mat
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            msessage: 'Missing input parameters',
        })
    }

    let userData = await userService.handleUserLogin(email, password);

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {},
    })

    return
}

module.exports = {
    handleLogin: handleLogin,
}