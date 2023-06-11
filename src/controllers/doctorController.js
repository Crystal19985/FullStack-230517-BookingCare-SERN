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

module.exports = {
    getTopDoctorHome: getTopDoctorHome,
}