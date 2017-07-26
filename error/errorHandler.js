'use strict';

function handleErrors(err, req, res) {

    // catch unauthorized
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('invalid token...');
    }

    //catch permission denied
    if (err.code === 'permission_denied') {
        res.status(401).send('insufficient permissions');
    }

    //else
    let error;

    if (err) {
        error = err;
    } else {
        error = new Error('Not Found');
        error.status = 404;
    }

    res.locals.message = error.message;
    res.locals.error = req.app.get('env') === 'development' ? error : {};
    res.status(error.status || 500);
    res.send({url: req.originalUrl + 'not found'})

}

module.exports = {
    handleErrors: handleErrors
};