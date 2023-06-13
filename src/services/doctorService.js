import db from '../models/index';

let getTopDoctorHomeService = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit: limitInput,
                where: { roleId: 'R2' },
                order: [['id', 'DESC']],
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
                ],
                raw: true,
                nest: true,
            })

            resolve({
                errCode: 0,
                data: users,
            })
        } catch (error) {
            reject(error);
        }
    })
}

let getAllDoctorsService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                where: { roleId: 'R2' },
                attributes: {
                    exclude: ['password', 'image']
                },
            });
            resolve({
                errCode: 0,
                data: doctors
            })
        } catch (error) {
            reject(error);
        }
    })
}

let saveInforDoctorService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.doctorId || !data.contentHTML
                || !data.contentMarkdown || !data.action) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing input parameters'
                })
            }
            else {
                if (data.action === 'CREATE') {
                    await db.Markdown.create({
                        contentHTML: data.contentHTML,
                        contentMarkdown: data.contentMarkdown,
                        description: data.description,
                        doctorId: data.doctorId
                    })
                    resolve({
                        errCode: 0,
                        errMessage: 'Create infor doctor is successed'
                    })
                }
                else if (data.action === 'EDIT') {
                    let doctorMarkdown = await db.Markdown.findOne({
                        where: { doctorId: data.doctorId },
                        raw: false
                    })

                    if (doctorMarkdown) {
                        doctorMarkdown.contentHTML = data.contentHTML;
                        doctorMarkdown.contentMarkdown = data.contentMarkdown;
                        doctorMarkdown.description = data.description;
                        await doctorMarkdown.save();
                        resolve({
                            errCode: 0,
                            errMessage: 'Change infor doctor is successed'
                        })
                    }
                }

            }
        } catch (error) {
            reject(error);
        }
    })
}

let getInforDoctorByIdService = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing input parameters'
                })
            }
            else {
                let doctorInfor = await db.User.findOne({
                    where: { id: inputId },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        {
                            model: db.Markdown, attributes: [
                                'contentHTML',
                                'contentMarkdown',
                                'description',
                            ]
                        },
                        { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    ],
                    raw: false,
                    nest: true,
                })


                if (doctorInfor && doctorInfor.image) {
                    doctorInfor.image = new Buffer(doctorInfor.image, 'base64').toString('binary');
                }
                if (!doctorInfor) {
                    doctorInfor = {};
                }

                resolve({
                    errCode: 0,
                    data: doctorInfor
                })
            }

        } catch (error) {
            reject(error);
        }
    })
}






module.exports = {
    getTopDoctorHomeService: getTopDoctorHomeService,
    getAllDoctorsService: getAllDoctorsService,
    saveInforDoctorService: saveInforDoctorService,
    getInforDoctorByIdService: getInforDoctorByIdService,
};