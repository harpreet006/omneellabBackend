const WarehouseMaterialType = require("./materialType.model");

const getWarehouseMaterialTypebyId = async (req, res) => {
  try {
    const { id } = req.params;

    const MaterialType = await WarehouseMaterialType.findOne({
      where: { warehouseId: id },
    });

    res.status(200).json({ statusCode: 200, data: MaterialType });
  } catch (error) {
    console.log(error);
    res.status(401).json({ statusCode: 401, message: error.message });
  }
};

const updateMaterialType = async (req, res) => {
  try {
    const body = req.body;

    body.warehouseId = body?.warehouse;

    if (!body?.warehouse) throw new Error("Invalid warehouse");

    body.chemicalsWet = body.chemicals[1]?.active == "" ? false : true;
    body.chemicalsDry = body.chemicals[0]?.active == "" ? false : true;

    await WarehouseMaterialType.upsert(body);

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
  getWarehouseMaterialTypebyId,
  updateMaterialType,
};
