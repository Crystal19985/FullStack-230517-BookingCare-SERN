import docterService from '../services/doctorService';
/*==========================================================================================*/



/*==========================================================================================*/
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

let saveInforDoctor = async (req, res) => {
    try {
        let respon = await docterService.saveInforDoctorService(req.body);
        return res.status(200).json(respon);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            msg: 'Error from server'
        })
    }
}

let getInforDoctorById = async (req, res) => {
    try {
        let responInfo = await docterService.getInforDoctorByIdService(req.query.id);
        return res.status(200).json(responInfo);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            msg: 'Error from server'
        })
    }
}

let bulkCreateSchedule = async (req, res) => {
    try {
        let responInfo = await docterService.bulkCreateScheduleService(req.body);
        return res.status(200).json(responInfo);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            msg: 'Error from server'
        })
    }
}

let getScheduleDrByDate = async (req, res) => {
    try {
        let responInfo = await docterService.getScheduleDrByDateService(req.query.docterId, req.query.date);
        return res.status(200).json(responInfo);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            msg: 'Error from server'
        })
    }
}
/*==========================================================================================*/



/*==========================================================================================*/
module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors: getAllDoctors,
    saveInforDoctor: saveInforDoctor,
    getInforDoctorById: getInforDoctorById,
    bulkCreateSchedule, getScheduleDrByDate

}