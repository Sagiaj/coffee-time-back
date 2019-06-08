import Sequelize, { Model } from 'sequelize';
import db from '../../config/database';

const Users = db.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
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
}, {
    sequelize: db,
    modelName: 'user'
});

const UsersBuddies = db.define('users_buddies', {
    userId: {        
        type: Sequelize.INTEGER
    },
    buddyId: {
        type: Sequelize.INTEGER
    }
}, {
    sequelize: db,
    modelName: 'usersBuddies'
});
Users.belongsToMany(Users, { as: 'Buddies', through: UsersBuddies, foreignKey: 'userId', otherKey: 'buddyId'});
module.exports = { Users, UsersBuddies };
