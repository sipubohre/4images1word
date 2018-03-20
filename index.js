var express = require('express');
var useragent = require('express-useragent');
var childProcess = require('child_process');
var lodash = require('lodash');
var path = require('path');
var urlencode = require('urlencode');
var phantomjs = require('phantomjs-prebuilt');

var app = express();

app.use(useragent.express());

//serving static folder
app.use('/bundle', express.static(path.join(__dirname, '/bundle')));
app.use('/client/app/css', express.static(path.join(__dirname, '/client/app/css')));
app.use('/client/app/js', express.static(path.join(__dirname, '/client/app/js')));
app.use('/client/app/css/images', express.static(path.join(__dirname, '/client/app/css/images')));


app.get('/*', function (req, res, next) {
    var agent = req.useragent.source;
    //checking bot here. If it is a bot then render via phantom
    if ((lodash.includes(agent, 'Google') || lodash.includes(agent, 'facebookexternalhit') || lodash.includes(agent, 'Facebot')) && req.useragent.isPhantomJS === false) {
        //sent request to render via phantom
        return renderHtmlPhantom(req, res, next);
    } else {
        //sent request to render at cient browser
        return next();
    }
});


//default serving index.html file
app.get('/*', function (req, res, next) {
    res.sendFile(path.join(__dirname, 'index.html'));
});



app.listen(3000, function () {
    console.log('application is listening on  port 3000');
});

// phantom task here we are rendering a page using phantom js browser. url has
// been set by BOT;
function renderHtmlPhantom(req, res, next) {
    var url = 'http://localhost:3000' + urlencode.decode(req.url, 'gbk');
    console.log('-----BOT REQUEST URL----', url);

    var agent = req.useragent.source;

    //requesting phantom instance for redering the web page
    phantomInstance(url, function (err, result) {
        if (err) {
            res
                .status(404)
                .send('Internal server error');
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.write(result);
            res.end();
        }
    });
}

// creating a phantom instance using phantom script file. more information can
// be found on phantomjs official page
function phantomInstance(url, callback) {
    var binPath = phantomjs.path;
    var childArgs = [
        path.join(__dirname, 'phantom-script.js'),
        '--disk-cache=false',
        '--load-images=false',
        url
    ]
    childProcess.execFile(binPath, childArgs, {
        maxBuffer: 500 * 1024
    }, function (err, stdout, stderr) {
        if (err) {
            return callback(err);
        }
        return callback(null, stdout);
    });
}
