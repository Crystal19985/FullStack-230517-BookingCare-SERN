import db from '../models/index'
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

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
                        userData.errMessage = 'OK';
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

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    },
                    raw: true,
                })
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    },
                    raw: true,
                })
            }

            resolve(users);
        } catch (error) {
            reject(error);
        }
    })
}

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            //Check isMailExist
            if (checkUserMail) {
                resolve({
                    errCode: 1,
                    errMessage: 'Email is already exist. Pls choose another email',
                });
                return;
            }

            let hashPW = await hashPWByBcrypt(data.password);
            await db.User.create({
                email: data.email,
                password: hashPW,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender === 1 ? true : false,
                //image: data.email,
                roleId: data.roleId,
                //positionId: data.email, 
            })

            resolve({
                errCode: 0,
                errMessage: 'OK',
            });

        } catch (error) {
            reject(error);
        }
    })
}

let hashPWByBcrypt = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPW = await bcrypt.hashSync(password, salt);
            resolve(hashPW);
        } catch (error) {
            reject(error);
        }
    })
}

let editUser = (userData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!userData.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing input parameters'
                })
            }
            let user = await db.User.findOne({
                where: { id: userData.id },
                raw: false
            });
            if (user) {
                user.firstName = userData.firstName;
                user.lastName = userData.lastName;
                user.address = userData.address;

                await user.save();
                resolve({
                    errCode: 0,
                    errMessage: 'Update User is successed !!!'
                });
            }
            else {
                resolve({
                    errCode: 1,
                    errMessage: 'User is not found '
                });
            }
        } catch (error) {
            reject(error)
        }
    })
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({ where: { id: userId } });

            if (!user)
                resolve({
                    errCode: 2,
                    errMessage: 'User is not found '
                });

            await db.User.destroy({
                where: { id: userId },
            })
            // await user.destroy(); // Khong dung duoec, do query dung raw : true --> data user tra ra khong phai database

            resolve({
                errCode: 0,
                errMessage: 'Delete User is sucessed !!!'
            });
        } catch (error) {
            reject(error);
        }
    })
}
module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    editUser: editUser,
    deleteUser: deleteUser,
}