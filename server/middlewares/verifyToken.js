const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  let token = req.headers.authorization;
  console.log("token ", token);

  try {
    if (!token) {
      res.send({
        status: 404,
        message: "Token not found",
      });
    }

    if (token.split(" ")[0] === "Barear") {
      token = token.split(" ")[1];
    }
    const result = jwt.verify(token, process.env.JWT_SECRET);
    console.log(result);

    // if(result){

    // }
    if (result._id) {
      console.log("result id ", result._id);
      next();
    }

    // res.send({
    //     status: 200,
    //     message: result._id
    // })
  } catch (e) {
    console.log(e);
    res.send({
      status: 500,
      message: e.message,
    });
  }
};

module.exports = verifyToken;
