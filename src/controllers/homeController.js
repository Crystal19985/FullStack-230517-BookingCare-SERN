import db from '../models/index'
import CRUDService from '../services/CRUDService';

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll()
        return res.render('homePage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (error) {
        console.log(error);
    }
}

let getCRUD = (req, res) => {

    return res.render('crud.ejs');
}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUsers();
    console.log(data);
    return res.render('displayCRUD.ejs', { users: data });
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let dataUser = await CRUDService.getUserById(userId)
        if (dataUser)
            return res.render('editCRUD.ejs', { user: dataUser });
        else
            return res.send('User ID is not found');
    }
    else {
        return res.send('User ID is not found');
    }
}

let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    return res.send(message);
}

let postEditCRUD = async (req, res) => {
    let data = req.body;
    console.log('>>> Controller check data :', data);
    await CRUDService.updateUserById(data);

    return res.redirect('/get-crud');
}

module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    postEditCRUD: postEditCRUD,
}