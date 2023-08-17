const express   	 = require ( 'express' )
const app       	 = express ().disable ( 'x-powered-by' )
const path      	 = require ( 'path' )
const fs        	 = require ( 'fs' )
const https     	 = require ( 'https' )
const helmet     	 = require ( 'helmet' )
const rateLimit 	 = require("express-rate-limit")
const csurf          = require('csurf');
const cookieParser   = require('cookie-parser');
const publicdir 	 = path.join ( __dirname, 'public' )
const port      	 = require('./env.json').PORT

//prevent csrf

app.use(cookieParser());

let csrfMiddleware = csurf({ cookie: true });
app.use(csrfMiddleware);

// //HELMET Protection
app.use(
	helmet({
	  	contentSecurityPolicy	: { 
			directives	: {
				defaultSrc		: ["'self'"],
				frameAncestors	: ["'none'"]
			}
	   	},
		hsts					: {
			maxAge: 86400
		}
	})
);

//Rate limit for application
app.use(
	rateLimit({
		windowMs: 10 * 1000, // 10 seconds
		max: 100000, //1000 requests
		message: "You exceeded 100,000 requests in 10 seconds limit!",
		headers: true,
		keyGenerator: (req, res) => {
		  return req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress; //req.clientIp // IP address from requestIp.mw(), as opposed to req.ip
	  	}
	})
);


// //HTTPS REDIRECTION
// app.use ((req, res, next) => {
// 	if (req.secure) {
// 			// request was via https, so do no special handling
// 			next();
// 	} else {
// 			// request was via http, so redirect to https
// 			res.redirect('https://' + req.headers.host + req.url);
// 	}
// });

//prevent mime sniffing and enable click jack protection
app.use((request, response, next) => {
	response.set('X-Content-Type-Options', 'nosniff');
	response.set('X-Frame-Options', 'SAMEORIGIN');
	response.set('Content-Security-Policy', "frame-ancestors 'none'");
         
	next();
	
})


//CSRF Endpoint
// app.all('/ussd_router/csrf', csrfMiddleware, (req, res) => {
// 	res.send(`CSRF endpoint. csrfToken: ${req.csrfToken()}`)
// })

app.get('/auth/login', csrfMiddleware, (req, res, next) => {
	res.cookie('XSRF-TOKEN', req.csrfToken(), {path: "/", httpOnly: true, secure: true})
	res.cookie('_csrf', req.csrfToken(), {path: "/", httpOnly: true, secure: true})
	next()
})

// documents, images, files
// app.get('/templates/bulk-upload-template.xlsx', (req, res, next) => {
// 	res.download(path.join ( __dirname, '/templates/bulk-upload-template.xlsx'));
// })

//ADD HTML extension to URL
app.use( ( req, res, next ) => {
	if ( !req.path.includes ('.') && req.path !== '/') {
		console.log ({ path : req.path })
		req.url +='.html'		
	}
	next()
})
app.use   ( express.static ( publicdir ) )

//ROUTE NOT FOUND
app.all('/*', (req, res, next) => {
	req.url ='/404.html'
	next()
})
app.use   ( express.static ( publicdir ) )


app.listen( port, () => console.log ( `app is listening on port ${port}` ) )

// //https server
// https.createServer({
//     key : fs.readFileSync ( path.join ( __dirname, './ssl/wildcard_fcb_co_ke.key') ),
// 	cert: fs.readFileSync ( path.join ( __dirname, './ssl/wildcard_fcb_co_ke.crt' ) ),
// 	ca: fs.readFileSync ( path.join ( __dirname, './ssl/DigiCertCA.crt' ) ),
// 	secureOptions: require('constants').SSL_OP_NO_TLSv1,
//   requestCert: true,
//   rejectUnauthorized: true,
//   maxCachedSessions: 0
// }, app)
// .listen ( port, () => console.log ( 'iKonnect listening on port %d', port ) )