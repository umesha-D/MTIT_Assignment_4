const Buyer = require("../model/buyer");
const validateBuyer = async (buyer) => {
    const { userName, password, email, address, phoneNumber } = buyer;
    const { houseNo, streetName, city } = address;

    //validating if all fields are filled
    if(!userName || !password
        || !email || !houseNo || !streetName || !city || !phoneNumber) {
            return 0;
        }
    //checking for existing user
    const user = await Buyer.findOne({ email });
    if (user) {
        return 1;
    } else {
        return buyer;
    }
}

module.exports.validateBuyer = validateBuyer;