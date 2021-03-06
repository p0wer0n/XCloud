"use strict";

module.exports = function(app, services, auth){


    app.get('/seven/paperboy/index.php', function(req, res){
        res.send('{"server": "up", "news":[]}');
    });

    app.get('/seven/framework_version.php', function(req, res){
        res.send('{"server":"up","frameworks":[{"name":"firefox","version":"7.4.4"},{"name":"safari","version":"7.4.2"}]}');
    });

    app.get('/seven/get.php', function(req, res){
        var extension = req.query.extension === undefined ? null : req.query.extension;
        res.redirect('/dist/' + extension + '.json');
    });


    app.get('/xcloud/register', function(req, res){
        var username = req.query.username === undefined ? null : req.query.username;
        var password = req.query.password === undefined ? null : req.query.password;


        services.registerUser(username, password, function(err, success){
            if(err !== null){
                res.send(err);
            } else {
                res.send({"errors": "false"});
            }
        });
    });

    app.get('/xcloud/auth', function(req, res){

        var authorization = auth(req) === undefined ? {name: null, pass: null} : auth(req);

        var username = authorization.name;
        var password = authorization.pass;

        services.loginUser(username, password, function(err, success){
            if(err !== null || success === false){
                res.send(err);
            } else {
                res.send({"errors": "false"});
            }
        });
    });

    
    app.get('/xcloud/fetch', function(req, res){
        var authorization = auth(req) === undefined ? {name: null, pass: null} : auth(req);

        var username = authorization.name;
        var password = authorization.pass;
        
        services.fetchPreferences(username, password, function(err, data){
            if(err !== null){
                res.send(err);
            } else {
                res.send(data);
            }
        });
    });

    app.post('/xcloud/register', function(req, res){
        var username = req.body.username === undefined ? null : req.body.username;
        var password = req.body.password === undefined ? null : req.body.password;

        services.registerUser(username, password, function(err, success){
            if(err !== null){
                res.send(err);
            } else {
                res.send({"errors": "false"});
            }
        });
    });

    app.post('/upload', function(req, res){
        var authorization = auth(req) === undefined ? {name: null, pass: null} : auth(req);

        var username = authorization.name;
        var password = authorization.pass;

        var data = req.body.data === undefined || req.body.data === undefined ? null : req.body.data;

        services.storePreferences(username, password, data, function(err, success){
            if(err !== null || success === false){
                res.send(err);
            } else {
                res.send({"errors": "false"});
            }
        });
    });

    app.post('/xcloud/upload', function(req, res){
        var authorization = auth(req) === undefined ? {name: null, pass: null} : auth(req);

        var username = authorization.name;
        var password = authorization.pass;

        var data = req.body.data === undefined || req.body.data === undefined ? null : req.body.data;

        services.storePreferences(username, password, data, function(err, success){
            if(err !== null || success === false){
                res.send(err);
            } else {
                res.send({"errors": "false"});
            }
        });
    });
};
