const WarehouseIInfra = require("./ITInfra.model");
const WarehouseOfficeInfra = require("./Office.model");

const getWarehouseItAndOfficeInfrabyId = async (req, res) => {
  try {
    const { id } = req.params;

    const infra = await WarehouseIInfra.findOne({
      where: { warehouseId: id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    const office = await WarehouseOfficeInfra.findOne({
      where: { warehouseId: id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.status(200).json({
      statusCode: 200,
      data: {
        itInfraAndOfficeSpaceInfo: { itInfra: infra, officeSpace: office },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ statusCode: 401, message: error.message });
  }
};

const updateItAndOfficeInfra = async (req, res) => {
  try {
    let { itInfra, officeSpace, warehouse } = req.body;

    if (!itInfra && !officeSpace && !warehouse)
      throw new Error("invalid values");

    itInfra.warehouseId = warehouse;
    officeSpace.warehouseId = warehouse;

    await WarehouseIInfra.upsert(itInfra);
    await WarehouseOfficeInfra.upsert(officeSpace);

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
  getWarehouseItAndOfficeInfrabyId,
  updateItAndOfficeInfra,
};
