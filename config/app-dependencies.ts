import compression from 'compression';
import bodyParser from 'body-parser';
import cors from 'cors';
import corsConfig from './cors';

const bindAppConfig = (app: any) => {
    app.use(cors(corsConfig));
    app.use(compression());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
}

export default bindAppConfig;
