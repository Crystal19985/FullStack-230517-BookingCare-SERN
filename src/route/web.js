import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";

let router = express.Router();

let initWebRouters = (app) => {
    router.get('/', homeController.getHomePage)
    router.get('/crud', homeController.getCRUD)
    router.get('/get-crud', homeController.displayGetCRUD)
    router.get('/edit-crud', homeController.getEditCRUD)

    router.post('/post-crud', homeController.postCRUD)
    router.post('/put-crud', homeController.postEditCRUD);

    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.handleGetAllUsers);
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);

    // ALLCODE
    router.get('/api/get-allcode', userController.getAllCode);

    //DOCTOR
    router.get('/api/top-doctor-home', doctorController.getTopDoctorHome);
    router.get('/api/get-all-doctors', doctorController.getAllDoctors);
    router.get('/api/get-infor-doctor-by-id', doctorController.getInforDoctorById);
    router.post('/api/save-infor-doctor', doctorController.saveInforDoctor);

    return app.use('/', router);
}

module.exports = initWebRouters;