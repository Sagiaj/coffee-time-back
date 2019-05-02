const domainsWhiteList = ["http://localhost:8080"];

const corsConfig = {
    origin: (origin: string, callback: any): any => {
        if (domainsWhiteList.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error(`Error on domain "${origin}": Not allowed b y CORS`));
        }
    }
};

export default corsConfig;