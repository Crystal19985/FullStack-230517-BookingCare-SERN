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
            message: 'Missing input parameters',
        })
    }

    let userData = await userService.handleUserLogin(email, password);

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {},
    })
}

let handleGetAllUsers = async (req, res) => {
    let id = req.query.id;// ALL --> Get All users, id --> Get a user

    if (!id) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing input parameters',
            users: {}
        })
    }

    let users = await userService.getAllUsers(id);

    return res.status(200).json({
        errCode: 0,
        message: 'OK',
        users
    })

}

let handleCreateNewUser = async (req, res) => {
    //Truoc khi query can phai validate req.body : Missing params?
    let message = await userService.createNewUser(req.body);

    return res.status(200).json({
        message: message,
    })
}

let handleEditUser = async (req, res) => {
    //Truoc khi query can phai validate req.body : Missing params?
    if (!req.body)
        return res.status(200).json({
            errCode: 1,
            message: 'Missing input parameters'
        })

    let message = await userService.editUser(req.body);

    return res.status(200).json({
        message: message,
    })
}

let handleDeleteUser = async (req, res) => {
    //Truoc khi query can phai validate req.body : Missing params?
    if (!req.body.id)
        return res.status(200).json({
            errCode: 1,
            message: 'Missing input parameters'
        })

    let message = await userService.deleteUser(req.body.id);

    return res.status(200).json({
        errCode: 0,
        message: message
    })
}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
}