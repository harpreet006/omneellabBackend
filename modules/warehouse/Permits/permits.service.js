const WarehousePermits = require("./permits.model");

const getWarehousePermitsbyId = async (req, res) => {
  try {
    const { id } = req.params;

    const infra = await WarehousePermits.findAll({
      where: { warehouseId: id },
    });

    // if (!storage)
    //   throw new Error("No warehouse contact found for this warehouse");

    res.status(200).json({ statusCode: 200, data: infra });
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, message: error.message });
  }
};

const uploadFile = async (req, res) => {
  try {
    /*const { id } = req.params;

    const infra = await WarehousePermits.findAll({
      where: { warehouseId: id },
    });*/

    // if (!storage)
    //   throw new Error("No warehouse contact found for this warehouse");

    res.status(200).json({ statusCode: 200, data: [] });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ statusCode: 500, message: error.message });
  }
};




const updateStorageSpace = (req, res) => {};

module.exports = {
  getWarehousePermitsbyId,
  uploadFile,
  updateStorageSpace,
};
