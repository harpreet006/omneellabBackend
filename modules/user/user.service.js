const User = require("./user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// utils
const { checkRole, generateRandomOTP } = require("../../utils");

const verifyOTP = async (req, res) => {
  try {
    const { otp, phone, roleId = 3 } = req.body;

    if (!phone || !otp || !roleId) {
      throw new Error("Invalid Values");
    }

    if (!checkRole(roleId)) throw new Error("Invalid Role");

    // Find the user by phone and check if the OTP matches
    const user = await User.findOne({
      where: { phone, roleId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (user.isOtpVerified) {
      res.status(200).json({
        statusCode: 200,
        message: "User already Verfied",
      });
    }

    if (user.otp != otp) {
      throw new Error("Invalid OTP. Please try again");
    }

    if (user.otp == otp) {
      user.update({ isOtpVerified: true, otp: null });

      res.status(200).json({
        statusCode: 200,
        message: "OTP Verified Successfully!",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(401).json({
      statusCode: 401,
      message: error.message,
      error: error.message,
    });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const userId = decodedToken.userId;

    // Retrieve user details from your database based on the user ID
    const userDetails = await User.findByPk(userId, {
      attributes: [
        "firstName",
        "lastName",
        "phone",
        "pinCode",
        "district",
        "state",
        "city",
        "area",
        "email",
        "companyName",
        "countryCode",
        "roleId",
      ],
    });

    if (userDetails) {
      res.status(200).json({ statusCode: 200, data: userDetails });
    } else throw new Error("No details found");
  } catch (error) {
    console.error(error);
    res
      .status(401)
      .json({ statusCode: 401, message: error.message, error: error.message });
  }
};

const updateMobileNumber = async (req, res) => {
  try {
    const { phone, newPhone, roleId = 3 } = req.body;

    if (!phone || !newPhone) throw new Error("Invalid Values");

    if (!checkRole(roleId)) throw new Error("Invalid Role");

    const currentUser = await User.findOne({
      where: { phone: phone, roleId: roleId, isOtpVerified: false },
    });

    if (!currentUser) throw new Error("User not found");

    // checking if the new phone number is already linked to another user / vendor
    const checkNewPhoneNumber = await User.findOne({
      where: {
        phone: newPhone,
        roleId,
      },
    });

    if (checkNewPhoneNumber) {
      throw new Error(
        `${
          roleId == 3 ? "Vendor" : "User"
        } with this phone number already exists`
      );
    }

    // generate a new OTP
    const otp = generateRandomOTP();

    // send new otp to new phone number

    await currentUser.update({ phone: newPhone, otp });

    res.status(200).json({
      statusCode: 200,
      message: `OTP has been sent to ${newPhone}`,
    });
  } catch (error) {
    res.status(401).json({
      statusCode: 401,
      error: error.message,
      message: error.message,
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { phone, roleId } = req.body;

    if (!phone || !roleId) throw new Error("Invalid values");
    if (!checkRole(roleId)) throw new Error("Invalid Role");

    const user = await User.findOne({
      where: { phone, roleId },
    });

    if (!user)
      throw new Error(
        `No ${
          roleId == 3 ? "vendor" : "user"
        } found registered with this mobile number`
      );

    // if user is present, send otp to the registered mobile number

    let otp = generateRandomOTP();
    await user.update({ passwordChangeCode: otp });

    res.status(200).json({
      statusCode: 200,
      message: "Reset password OTP has been sent to your phone",
    });
  } catch (error) {
    res.status(401).json({
      statusCode: 401,
      message: error.message,
      error: error.message,
    });
  }
};

const passwordchange = async (req, res) => {
  try {
    const { newPassword, resetpasswordOTP } = req.body;

    if (!newPassword) throw new Error("Please enter password");

    if (!resetpasswordOTP) throw new Error("Invalid OTP");

    const currentUser = await User.findOne({
      where: { passwordChangeCode: resetpasswordOTP, isOtpVerified: true },
    });

    if (!currentUser) throw new Error("Invalid OTP");

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await currentUser.update({
      password: hashedPassword,
      passwordChangeCode: null,
      isOtpVerified: true,
    });

    res.status(200).json({
      statusCode: 200,
      message: "Password changed Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      statusCode: 401,
      message: error.message,
      error: error.message,
    });
  }
};

module.exports = {
  verifyOTP,
  getUserProfile,
  updateMobileNumber,
  forgotPassword,
  passwordchange,
};
