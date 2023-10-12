const jwt = require("jsonwebtoken");

//models
const Warehouse = require("./warehouse.model");
const Category = require("../../category/category.model");
const Type = require("../../type/type.model");

// initial creation of the warehouse
const createWarehouse = async (req, res) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decodedToken.userId;

    const warehouseData = req.body;

    const { warehouseName, category, type } = req.body;
    if (!warehouseName || !category || !type) {
      throw new Error("Invalid values");
    }

    // check if warehouse with this name already exists or not
    const check = await Warehouse.findOne({ where: { warehouseName } });
    if (check) throw new Error("Warehouse name is already taken");

    let queryData = {
      ...warehouseData,
      categoryId: warehouseData.category,
      typeId: warehouseData.type,
      creatorUserId: userId,
    };

    // create new warehouse in the database
    const newWarehouse = await Warehouse.create(queryData);

    // creat object to send only selective fields in the response
    const responseData = {
      id: newWarehouse.id,
      category: newWarehouse.categoryId,
      type: newWarehouse.typeId,
      warehouseName: newWarehouse.warehouseName,
      vendorStatus: newWarehouse.vendorStatus,
    };

    res.status(200).json({
      statusCode: 200,
      message: "Warehouse Created Successfully",
      data: responseData,
    });
  } catch (error) {
    console.error(error);
    res
      .status(401)
      .json({ statusCode: 401, error: error.message, message: error.message });
  }
};

// update the basic details of the wareohuse -> name, category, type -> first form
const updateWarehouse = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedData = req.body;

    const { warehouseName, category, type } = req.body;
    if (!warehouseName || !category || !type) {
      throw new Error("Invalid values");
    }

    let queryData = {
      ...updatedData,
      categoryId: updatedData.category,
      typeId: updatedData.type,
    };

    const [updatedCount] = await Warehouse.update(queryData, {
      where: { id },
    });

    if (updatedCount === 0) {
      throw new Error("Warehouse not found");
    }

    res
      .status(200)
      .json({ statusCode: 200, message: "Warehouse updated Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 401, message: error.message });
  }
};

// get the basic details of of the warehouse
const getWarehouseData = async (req, res) => {
  try {
    const { id } = req.params;

    let warehouse = await Warehouse.findByPk(id, {
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: Category,
          attributes: ["id", "categoryName"],
          as: "category",
        },
        { model: Type, attributes: ["id", "type"], as: "type" },
      ],
    });

    if (!warehouse) {
      throw new Error("Warehouse not found");
    }

    res.status(200).json({
      statusCode: 200,
      data: warehouse,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ statusCode: 401, message: err.message, error: err.message });
  }
};

module.exports = {
  createWarehouse,
  updateWarehouse,
  getWarehouseData,
};
