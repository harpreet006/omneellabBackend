const checkRole = (role) => {
  return role == Number(1) || role == Number(2) || role == Number(3);
};

function generateRandomOTP() {
  // Generate a random 6-digit OTP (you can adjust the length)
  return Math.floor(1000 + Math.random() * 9000).toString();
}

const checkPhoneNumber = (number) => {};

module.exports = {
  checkRole,
  checkPhoneNumber,
  generateRandomOTP,
};
