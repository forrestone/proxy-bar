var http = require("http"),
  httpProxy = require("http-proxy"),
  proxyRulesManager = require("./proxyRulesmanager"),
  {getFile, setFile} = require("./dataMock")

const configServer = /configureMockServer/;

const PRM = new proxyRulesManager();

var proxy = httpProxy.createProxyServer({});

proxy.on("proxyReq", function(proxyReq, req, res, options) {
  console.log(req.url);
  if(req.headers.savetofile)
  proxyReq.setHeader('accept-encoding', 'application/json');

  proxyReq.path = req.url;
});

proxy.on("proxyRes",(proxyRes, req, res) =>{
  const position = req.headers.savetofile || false;
  if (!position)
  return;

  let body = new Buffer('');

  proxyRes.on("data", chunk => {
    body = Buffer.concat([body, chunk]);
  });

  proxyRes.on("end", () => {
    body = body.toString();
    setFile(body, position)
  })
})

proxy.on('error', function (err, req, res) {
  res.writeHead(500, {
    'Content-Type': 'text/plain'
  });
  res.end(err.message);
});


var server = http.createServer(function(req, res) {

  if (configServer.test(req.url)) {
    let body = "";

    req.on("data", chunk => {
      body += chunk.toString();
    });

    req.on("end", () => {
      switch (req.method) {
        case "POST":
          PRM.setProxyRule(JSON.parse(body));
          break;
        case "DELETE":
            PRM.deleteProxyRule(JSON.parse(body));
          break;
        case 'PURGE' :
            PRM.resetProxyRule()  
      }

      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(PRM.getRules));
      res.end();
    });

    return;
  }

  var target = PRM.getProxyRules.match(req);
  if (target) {
    var obj = getFile(target);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(obj);
    res.end();
    return;
  }
  return proxy.web(req, res, {
    target: req.url
  });
});



console.log("listening on port 8888");
server.listen(8888);
