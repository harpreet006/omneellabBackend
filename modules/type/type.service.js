const TypeModel = require("./type.model");

const createNewType = async (req, res) => {
  const { type, typeImage } = req.body;

  try {
    const newtype = await TypeModel.create({ type, typeImage });
    res.status(201).json({ statusCode: 201, data: { newtype } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: error.message });
  }
};

const getTypeList = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    // Fetch data from the database with pagination
    const types = await TypeModel.findAll({
      limit: Number(limit),
      offset: Number(offset),
    });

    res.status(200).json({ statusCode: 200, data: types });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createNewType, getTypeList };
