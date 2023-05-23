import bcrypt from 'bcryptjs';
import db from '../models';

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
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

            resolve('Create a new user is success !!!');
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

let getAllUsers = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                raw: true
            });
            resolve(users);
        } catch (error) {
            reject(error);
        }
    })
}

let getUserById = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true,
            })
            resolve(user);

        } catch (error) {
            reject(error);
        }
    });
}

let updateUserById = async (userData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userData.id },
            });
            if (user) {
                user.firstName = userData.firstName;
                user.lastName = userData.lastName;
                user.address = userData.address;

                await user.save();
                resolve(user);
            }
            else
                resolve(user);

        } catch (error) {
            reject(error)
        }
    })
}


module.exports = {
    createNewUser: createNewUser,
    getAllUsers: getAllUsers,
    getUserById: getUserById,
    updateUserById: updateUserById,
}