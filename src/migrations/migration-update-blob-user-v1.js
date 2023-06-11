//Sequelize js , how do we change column type in migration
//https://stackoverflow.com/questions/62667269/sequelize-js-how-do-we-change-column-type-in-migration/62669213#62669213
module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('Users', 'image', {
                type: Sequelize.BLOB('long'),
                allowNull: true,
            })
        ])
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('Users', 'image', {
                type: Sequelize.STRING,
                allowNull: true,
            })
        ])
    }
};


//How to Add, Delete new Columns in Sequelize CLI
//https://stackoverflow.com/questions/46357533/how-to-add-delete-new-columns-in-sequelize-cli/46357631#46357631

// module.exports = {
//     up: (queryInterface, Sequelize) => {
//         return Promise.all([
//             queryInterface.addColumn(
//                 'tableName',
//                 'columnName1',
//                 {
//                     type: Sequelize.STRING
//                 }
//             ),
//             queryInterface.addColumn(
//                 'tableName',
//                 'columnName2',
//                 {
//                     type: Sequelize.STRING
//                 }
//             ),
//         ]);
//     },

//     down: (queryInterface, Sequelize) => {
//         return Promise.all([
//             queryInterface.removeColumn('tableName', 'columnName1'),
//             queryInterface.removeColumn('tableName', 'columnName2')
//         ]);
//     }
// };
