const getServiceCategories = (req, res) => {
  res.status(200).json({
    statusCode: 200,
    message: "",
    data: [],
  });
};

module.exports = { getServiceCategories };
