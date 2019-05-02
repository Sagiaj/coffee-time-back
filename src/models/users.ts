import Sequelize from 'sequelize';
import db from '../../config/database';

const Users = db.define('users', {
    id: {
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    username: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    }
});

export default Users;
