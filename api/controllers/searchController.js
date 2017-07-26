'use strict';

exports.search = function(req, res, Entity) {

    let query = {},
        searchTerm = req.params.term;

    if (searchTerm) {
        //This type of search only look for full words.
        query = { $text: { $search: searchTerm }};
    }

    Entity.find(query, function(err, entity) {
        if (err) {
            res.send(err);
        }
        res.json(entity);
    });

    //IF result empty might want to do something like
    // query =  { $or:
    //     [
    //         { name: {'$regex': term } },
    //         { description: {'$regex': term } }
    //     ]
    // };

};