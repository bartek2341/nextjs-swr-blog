import requestIp from "request-ip";

const setIp = function (req, res, next) {
  const ip = requestIp.getClientIp(req);
  req.ip = ip;
  next();
};

export default setIp;
