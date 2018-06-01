const getIp = req => {
  var ipAddress = req.headers[`x-forwarded-for`];
  if (ipAddress){
    var list = ipAddress.split(`,`);
    ipAddress = list[0];
  } else {
    ipAddress = req.connection.remoteAddress;
  }
  return ipAddress;
}

module.exports = getIp;