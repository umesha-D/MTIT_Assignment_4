const Seller = require("../model/seller");

const validateSeller = async (seller) => {
  const { userName, password, email, address, phoneNumber } = seller;
  const { houseNo, streetName, city } = address;

  //validating if all fields are filled
  if (
    !userName ||
    !password ||
    !email ||
    !houseNo ||
    !streetName ||
    !city ||
    !phoneNumber
  ) {
    return 0;
  }

  //checking for existing user
  const user = await Seller.findOne({ email });
  if (user) {
    return 1;
  } else {
    return seller;
  }
};

module.exports.validateSeller = validateSeller;
