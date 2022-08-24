import jwt from "jsonwebtoken";

const config = process.env;

const verifyToken = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

  try {
    const decoded = jwt.verify(token, config.JWTPRIVATEKEY);
    req.user = decoded;
    console.log('decoded : ', decoded);
    console.log('decoded : ');
    req.body.owner = decoded._id
    console.log('req.body : ', req.body);
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

export default verifyToken;
