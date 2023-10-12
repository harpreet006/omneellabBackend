const bcrypt = require("bcrypt");
const User = require("../user/user.model");
const jwt = require("jsonwebtoken");

//utils
const {
  checkRole,
  checkPhoneNumber,
  generateRandomOTP,
} = require("../../utils");

async function sendOTPViaSMS(phone, otp) {
  try {
    // Send OTP message using Twilio
    await twilio.messages.create({
      to: phone,
      from: twilioConfig.phoneNumber,
      body: `Your OTP for registration is: ${otp}`,
    });
  } catch (error) {
    throw error;
  }
}

const signUp = async (req, res) => {
  try {
    // Destructure user data from the request body
    const {
      firstName,
      lastName,
      phone,
      pinCode,
      district,
      state,
      city,
      area,
      email,
      password,
      companyName,
      countryCode,
      referredCode,
      isTermAndCondition,
      userType,
      roleId,
    } = req.body;

    // body validations
    if (!firstName || !lastName)
      throw new Error("Please enter your first and last name");
    if (!phone || !countryCode)
      throw new Error("Please enter phone Number and country code");
    if (!pinCode) throw new Error("Please enter pincode");
    if (!email) throw new Error("Please enter email");
    if (!companyName) throw new Error("Please enter company name");
    if (!isTermAndCondition)
      throw new Error("Please accept terms and conditions");

    // if (!checkPhoneNumber(phone)) throw new Error("Invalid Phone Number");

    // Check user role
    if (checkRole(roleId) == false) {
      throw new error("invald user Role");
    }

    // check if a user with this phone already exists
    let registerUserExists = await User.findOne({
      where: { phone: phone, roleId: roleId },
    });

    if (registerUserExists) {
      throw new Error(
        `${
          roleId == 3 ? "Vendor" : "User"
        } with this phone number already exists`
      );
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = generateRandomOTP();

    const newUser = await User.create({
      firstName,
      lastName,
      phone,
      pinCode,
      district,
      state,
      city,
      area,
      email,
      password: hashedPassword,
      companyName,
      countryCode,
      referredCode,
      isTermAndCondition,
      userType: roleId,
      roleId,
      otp,
      isOtpVerified: false,
    });

    res.status(200).json({
      statusCode: 200,
      data: newUser,
    });
  } catch (error) {
    res.status(401).json({
      statusCode: 401,
      error: error?.message || error?.errors[0]?.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { username, password, roleId } = req.body;

    if (username.trim() == "" || password.trim() == "") {
      throw new Error("Please enter phone number and password");
    }

    if (!checkRole(roleId)) {
      throw new Error("Invalid Role Id");
    }

    const user = await User.findOne({
      where: { phone: username, roleId: roleId, isOtpVerified: true },
    });

    if (!user) {
      throw new Error("This phone number does not exist, please sign up"); // User not found
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    // if wrong password
    if (!isPasswordValid) throw new Error("Invalid username or Password");

    // if password is valid, create a JWT access token
    const accessToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "12h",
      }
    );

    res.status(200).json({
      statusCode: 200,
      message: "Login successful",
      data: {
        userData: { userType: user.userType, roleId: user.roleId },
        token: accessToken,
      },
    });
  } catch (error) {
    res.status(401).json({
      statusCode: 401,
      message: error.message,
      error: error.message,
    });
  }
};

const resendOTP = async (req, res) => {
  const { phone, roleId } = req.body;

  try {
    if (!phone || !roleId) {
      throw new Error("Invalid Values");
    }

    if (!checkRole(roleId)) throw new Error("Invalid Role");

    const existingUser = await User.findOne({
      where: { phone: phone, roleId: roleId, isOtpVerified: false },
    });

    // Check if the user exists based on the phone number
    if (!existingUser) {
      throw new Error("User not Found");
    }

    // Generate a new OTP
    const otp = generateRandomOTP();

    // Update the user's OTP in the database
    await existingUser.update({ otp });

    // Send the new OTP via SMS
    // await sendOTPViaSMS(phone, otp);

    return res.status(200).json({
      statusCode: 200,
      message: "OTP resent successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({
      statusCode: 401,
      error: error.message,
      message: error.message,
    });
  }
};

module.exports = {
  signUp,
  login,
  resendOTP,
  // Add other service functions as needed
};
