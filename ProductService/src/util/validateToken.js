const fetch = require("node-fetch");

const validateToken = async (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    res.send("Token not provided");
  } else {
    try {
      const result = await callSellerAPI(token);
      if (result.status === 200) {
        req.data = result.data;
        next();
      } else if (result.status === 403) {
        res.status(403).send("Invlaid token");
      }
    } catch (err) {
      res.status(403).send("Token virtification failed");
    }
  }
};

const callSellerAPI = (token) => {
  return new Promise((resolve, reject) => {
    try {
      fetch("http://localhost:5004/api/sellerauth/validatetoken", {
        method: "post",
        headers: { "Content-Type": "application/json", token: token },
      })
        .then((res) => res.json())
        .then((json) => resolve(json));
    } catch (err) {
      reject("something went wrong");
    }
  });
};

module.exports = validateToken;
