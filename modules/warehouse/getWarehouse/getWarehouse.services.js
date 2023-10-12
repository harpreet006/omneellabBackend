const jwt = require("jsonwebtoken");

const Warehouse = require("../newWarehouse/warehouse.model");
const Category = require("../../category/category.model");
const Type = require("../../type/type.model");

// fetch all the in progress warehouses for a user -> does not included rejected wwarehouses
const getAllWarehouseByPage = async (req, res) => {
  const { page = 1, limit = 50 } = req.query;

  const token = req.header("Authorization").replace("Bearer ", "");
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const userId = decodedToken.userId;

  try {
    const warehouses = await Warehouse.findAll({
      offset: (page - 1) * limit,
      limit: parseInt(limit),
      include: [
        { model: Category, as: "category" },
        { model: Type, as: "type" },
      ],
      attributes: ["warehouseName", "vendorStatus", "adminStatus", "id"],
      where: {
        creatorUserId: userId,
      },
    });

    warehouses.forEach((el) => {
      el.category = el.warehouseCategory;
      el.type = el.warehouseType;

      delete el.warehouseCategory;
      delete el.warehouseType;
    });

    res.status(200).json({
      statusCode: 200,
      data: warehouses,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      statusCode: 500,
      error: err.message,
    });
  }
};

module.exports = { getAllWarehouseByPage };
