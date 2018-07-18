const express = require('express');
const bodyParser = require('body-parser');
const helmet = require("helmet");
const compress = require("compression");
const debug = require('debug');
const route = require('./routes/index').router;
const cors = require("cors");

/* eslint-disable */

const app = express();

app.use(compress());
app.use(helmet());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.set('port', process.env.PORT || 3000);

/**Common middleware can be implemented at later phase*/
app.use((req,res,next)=>{
    'use strict';
    next();
});

app.options('*', cors());

/**Setting the Base path for DAC OB */
app.use('/api/',route);


const server = app.listen(app.get('port'), () => {
    'use strict';
    debug('Express server listening on port ' + server.address().port);
});

app.use((req,res,next)=> {
    'use strict';
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error handler
app.use((err,req,res)=> {
    // Set locals, only providing error in development
    'use strict';
    res.locals.message = err.message;
    /* eslint-disable */
    res.locals.error = req.app.get('env') === 'development' ? 
      err :
      {};

    // Render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports={app};