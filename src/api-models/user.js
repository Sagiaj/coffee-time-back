"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = /** @class */ (function () {
    function User() {
        this.isLoggedIn = true;
        this.id = 0;
        this.username = '';
        this.email = '';
        this.password = '';
    }
    User.createFromDBObject = function (db_user_obj) {
        var user = new User();
        user.isLoggedIn = true;
        user.id = db_user_obj.id || 0;
        user.username = db_user_obj.username || '';
        user.email = db_user_obj.email || '';
        user.password = db_user_obj.password || '';
        return user;
    };
    return User;
}());
exports.default = User;
