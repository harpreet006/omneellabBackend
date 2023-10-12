const WarehouseMHInfra = require("./MHInfra.model");

const getWarehouseMHInfrabyId = async (req, res) => {
  try {
    const { id } = req.params;

    const MHInfra = await WarehouseMHInfra.findOne({
      where: { warehouseId: id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.status(200).json({
      statusCode: 200,
      data: {
        mhInfraInfo: MHInfra,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ statusCode: 401, message: error.message });
  }
};

const updateMHInfra = async (req, res) => {
  try {
    let body = req.body;

    if (!body) {
      throw new Error("Invalid values");
    }

    body.warehouseId = body.warehouse;

    await WarehouseMHInfra.upsert(body);

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
  getWarehouseMHInfrabyId,
  updateMHInfra,
};
