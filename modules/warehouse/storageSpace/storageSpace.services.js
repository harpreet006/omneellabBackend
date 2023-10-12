const WarehouseStorageSpace = require("./storageSpace.model");

const getWarehouseStorageSpacebyId = async (req, res) => {
  try {
    const { id } = req.params;

    const storage = await WarehouseStorageSpace.findOne({
      where: { warehouseId: id },
      attributes: {
        exclude: ["updatedAd", "createdAt"],
      },
    });

    if (!storage) {
      res.status(200).json({ statusCode: 200, data: [] });
      return;
    }

    res
      .status(200)
      .json({ statusCode: 200, data: { storageSpaceInfo: storage  } });
  } catch (error) {
    console.log(error);
    res.status(401).json({ statusCode: 401, message: error.message });
  }
};

const updateStorageSpace = async (req, res) => {
  try {
    let body = req.body;

    let id = body.warehouse;
    if (!id) throw new Error("Invalid id");

    body.warehouseId = id;

    await WarehouseStorageSpace.upsert(body);

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
  getWarehouseStorageSpacebyId,
  updateStorageSpace,
};
