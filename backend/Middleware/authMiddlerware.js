const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    console.log(token);
    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(200).send({
          message: "Auth Fialed",
          success: false,
        });
      } else {
        console.log("Hloo");
        req.body.userId=decode.id;
        next();
      }
    });
  } catch (error) {
    console.log(error.message);
    res.status(401).send({
      message: "Auth Failed",
      success: false,
    });
  }
};