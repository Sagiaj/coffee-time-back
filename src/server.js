"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var express_1 = __importDefault(require("express"));
var app_dependencies_1 = __importDefault(require("../config/app-dependencies"));
var express_socket_io_1 = __importDefault(require("express-socket.io"));
var routes = __importStar(require("./routes"));
var database_1 = __importDefault(require("../config/database"));
// db.sync();
database_1.default.authenticate()
    .then(function () { console.log('database connected'); })
    .catch(function (err) { console.log("err in db:", err); });
// Initialize environment variables & app
var app = express_1.default();
// Initialize all app configurations and dependencies
app_dependencies_1.default(app);
// Coffee time front API routes
app.use('/auth', routes.Auth);
app.use('/api', routes.Api);
// Initialize socket
var server = express_socket_io_1.default.init(app);
express_socket_io_1.default.on('connection', function (socket) {
    console.log("received a socket connection! id: " + socket.id);
    socket.emit('connected', { id: socket.id });
});
// Start server on SERVER_PORT
server.listen(process.env.SERVER_PORT, function () {
    console.log("Server listening on port " + process.env.SERVER_PORT);
});
