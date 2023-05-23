import db from '../models/index'
import bcrypt from 'bcryptjs';

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};

            let isExist = await checkUserMail(email);
            if (isExist) {
                // User already
                // Compare PW
                let user = await db.User.findOne({
                    attributes: ['email', 'password', 'roleId'], //
                    where: { email: email },
                    raw: true,
                })

                if (user) {
                    // Load hash from your password DB.
                    let comparePW = bcrypt.compareSync(password, user.password);
                    if (comparePW) {
                        userData.errCode = 0;
                        userData.message = 'OK';
                        delete user.password;
                        userData.user = user;
                    }
                    else {
                        //return error
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong PW';
                    }
                }

                else {
                    //return error
                    userData.errCode = 2;
                    userData.errMessage = 'User is not Exist';
                }

            }
            else {
                //return error
                userData.errCode = 2;
                userData.errMessage = 'Email is not Exist';
            }

            resolve(userData);
        } catch (error) {
            reject(error)
        }
    })
}

let checkUserMail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail },
                raw: true,
            })

            if (user) {
                resolve(true);
            }
            else {
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
}