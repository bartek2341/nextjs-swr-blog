import requestIp from "request-ip";

const requiredIp = function (req, res, next) {
  const ip = requestIp.getClientIp(req);
  if (!ip) return res.status(401).end();
  req.ip = ip;
  next();
};

export default requiredIp;
