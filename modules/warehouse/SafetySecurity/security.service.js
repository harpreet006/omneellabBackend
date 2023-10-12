const WarehouseSecurity = require("./security.model");

const getWarehouseSecuritybyId = async (req, res) => {
  try {
    const { id } = req.params;

    const security = await WarehouseSecurity.findOne({
      where: { warehouseId: id },
    });

    res
      .status(200)
      .json({ statusCode: 200, data: { safetyAndSecurityInfo: security } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, message: error.message });
  }
};

const updateSecurity = async (req, res) => {
  try {
    let body = req.body;

    if (!body) {
      throw new Error("Invalid values");
    }

    body.warehouseId = body?.warehouse;

    await WarehouseSecurity.upsert(body);

    res.status(200).json({
      statusCode: 200,
      message: "updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ statusCode: 401, message: error.message });
  }
};

module.exports = {
  getWarehouseSecuritybyId,
  updateSecurity,
};
