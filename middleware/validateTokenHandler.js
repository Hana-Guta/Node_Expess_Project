const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  const authHeader = req.headers.Authorization || req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ error: "User is not authorized" ,
        message : err.message , 
        stackTrace : err.stack});
        return;
      }
      // If the token is valid, you can access the user information in decoded
      req.user= decoded.user;
    //   console.log(decoded);
      next();
    });
  } else {
    res.status(401).json({ error: "No token provided" });
  }
});

module.exports = validateToken;
