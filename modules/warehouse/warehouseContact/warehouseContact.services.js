const WarehouseContact = require("./warehouseContact.model");
const WarehouseAddress = require("./warehouseAddress.model");

const getWarehouseContactById = async (req, res) => {
  try {
    const { id } = req.params;

    const contacts = await WarehouseContact.findAll({
      where: { warehouseId: id },
      attributes: {
        exclude: ["updatedAt", "createdAt"],
      },
    });

    const address = await WarehouseAddress.findOne({
      where: { warehouseId: id },
      attributes: {
        exclude: ["updatedAt", "createdAt"],
      },
    });

    res.status(200).json({
      statusCode: 200,
      data: {
        warehouseContactDetailInfo: { address, contactInfo: contacts },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, message: error.message });
  }
};

const updateContactDetails = async (req, res) => {
  try {
    const { companyName, warehouse, address, contactInfo } = req.body;

    if (!companyName || !warehouse || !address || !contactInfo)
      throw new Error("Invalid Values");

    address.warehouseId = warehouse;

    const [contact1, contact2] = contactInfo;

    contact1.warehouseId = warehouse;
    contact2.warehouseId = warehouse;

    await WarehouseAddress.upsert(address);
    await WarehouseContact.upsert(contact1);
    await WarehouseContact.upsert(contact2);

    res.status(200).json({
      statusCode: 200,
      message: "updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      statusCode: 500,
      error: error.message,
      message: error.message,
    });
  }
};

module.exports = {
  getWarehouseContactById,
  updateContactDetails,
};
