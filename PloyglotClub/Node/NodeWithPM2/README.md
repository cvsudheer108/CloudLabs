"# AWS "

## Demo : Deploy a Node Server with Process Monitor <br/>
<li>File : server.js <br/>
<li>To provide PM2 support, just change the scripts section in package.json : set server.js as entry point with pm2 support: "main": "server.js",<br/>
  "scripts": {
    "start": "node ./node_modules/pm2/bin/pm2 start ./server.js --name hello_aws --log ../logs/app.log ",
    "stop": "node ./node_modules/pm2/bin/pm2 stop hello_aws",
<li>Run : npm start<br/>
