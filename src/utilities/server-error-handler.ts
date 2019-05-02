const wrap = fn => (req, res, next) => fn(req, res, next).catch(err => {
    let errObject = {
        responseCode: 500,
        responseMessage: err
    };

    res.status(500).send(errObject);
});

export default wrap;
