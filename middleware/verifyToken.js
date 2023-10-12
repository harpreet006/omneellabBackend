const jwt = require("jsonwebtoken");
const TOKEN_IS_NOT_VALID="Token is not valid";
function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ statusCode: 401, message: "Unauthorized" });
  }

  const jwtToken = token.replace("Bearer ", "");

  try {
    console.log("************",jwtToken);
    // return false    
   const verified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
   if(verified){
    next();    
   }
  } catch (error) {
     if (error instanceof jwt.TokenExpiredError) {
        console.log("Access token expired first section error", error.message);
        res.status(401).json({ statusCode: 401, message: TOKEN_IS_NOT_VALID });
        return false
     }  else if (error instanceof jwt.JsonWebTokenError) {
        console.log("An error was received validating the token", error.message);
        res.status(401).json({ statusCode: 401, message: TOKEN_IS_NOT_VALID });
        return false
     }else{
       console.log("error section error", error.message);
       res.status(401).json({ statusCode: 401, message: TOKEN_IS_NOT_VALID });
       return false
     }
  }
}

module.exports = verifyToken;
