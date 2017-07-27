'use strict';

exports.handleErrors = function(err, req, res, next) {

    // catch unauthorized
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ message: 'Provided invalid token.' });
        return;
    }

    //catch permission denied
    if (err.code === 'permission_denied') {
        res.status(401).json({ message: 'Insufficient permissions.' });
        return;
    }

    //else
    res.status(err.status || 500);
    res.json({ message: req.originalUrl + ' not found' });

};