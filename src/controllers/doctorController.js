import docterService from '../services/doctorService';

let getTopDoctorHome = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;

    try {
        let response = await docterService.getTopDoctorHomeService(+limit);

        return res.status(200).json(response);

    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            msg: 'Error from server'
        })
    }
}

let getAllDoctors = async (req, res) => {
    try {
        let allDoctors = await docterService.getAllDoctorsService();

        return res.status(200).json(allDoctors);

    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            msg: 'Error from server'
        })
    }
}

let createInforDoctor = async (req, res) => {
    try {
        let respon = await docterService.createInforDoctorService(req.body);
        return res.status(200).json(respon);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            msg: 'Error from server'
        })
    }
}




module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors: getAllDoctors,
    createInforDoctor: createInforDoctor,

}