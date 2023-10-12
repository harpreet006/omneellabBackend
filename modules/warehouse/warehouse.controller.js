const express = require("express");
const router = express.Router();

const WarehouseService = require("./newWarehouse/newWarehouse.services");
const WarehouseContactService = require("./warehouseContact/warehouseContact.services");
const StorageSpaceService = require("./storageSpace/storageSpace.services");
const ItInfra = require("./ItAndOfficeInfra/ITInfra.service");
const MHInfra = require("./MHInfra/MHInfra.service");
const Security = require("./SafetySecurity/security.service");
const Permits = require("./Permits/permits.service");
const materialType = require("./MaterialType/materialType.service");
const Form80 = require("./Form80/form80.services");

const GetWarehouse = require("./getWarehouse/getWarehouse.services");

/* ----- New Warehouse ----- */
router.post("/warehouses", WarehouseService.createWarehouse);

router.get(
  "/warehouses/:id/type/warehouse/usertype/vendor",
  WarehouseService.getWarehouseData
);

router.put("/warehouses/:id", WarehouseService.updateWarehouse);

/* ----- Warehouse Contact ----- */
router.get(
  "/warehouses/:id/type/warehouseContactDetails/usertype/vendor",
  WarehouseContactService.getWarehouseContactById
);

router.put(
  "/warehousecontactdetail",
  WarehouseContactService.updateContactDetails
);

/* ----- Storage Space ----- */

router.get(
  "/warehouses/:id/type/storageSpace/usertype/vendor",
  StorageSpaceService.getWarehouseStorageSpacebyId
);

router.put("/storagespace", StorageSpaceService.updateStorageSpace);

/* ----- IT and Office Infra ----- */

router.get(
  "/warehouses/:id/type/itInfrAndOfficeSpace/usertype/vendor",
  ItInfra.getWarehouseItAndOfficeInfrabyId
);

router.put("/itinfraofficespace", ItInfra.updateItAndOfficeInfra);

/* ----- MH Infra ----- */

router.get(
  "/warehouses/:id/type/mhInfra/usertype/vendor",
  MHInfra.getWarehouseMHInfrabyId
);

router.put("/mhinfra", MHInfra.updateMHInfra);

/* ----- Safety Security Form ----- */

router.get(
  "/warehouses/:id/type/safetyAndSecurity/usertype/vendor",
  Security.getWarehouseSecuritybyId
);

router.put("/safetyandsecurity", Security.updateSecurity);

/* ----- Permits ----- */

router.get(
  "/warehouses/:id/type/buildingTradeRelatedPermit/usertype/vendor",
  Permits.getWarehousePermitsbyId
);

/* ----- Material Type ----- */

router.get(
  "/warehouses/:id/type/materialType/usertype/vendor",
  materialType.getWarehouseMaterialTypebyId
);

router.put("/materialtypes", materialType.updateMaterialType);

/* ----- Warehouse Photo ----- */

router.get(
  "/warehouses/:id/type/storageSpace/usertype/vendor",
  StorageSpaceService.getWarehouseStorageSpacebyId
);

/* ----- Form 80 ----- */

router.get(
  "/warehouses/:id/type/formEighty/usertype/vendor",
  Form80.getWarehouseForm80byId
);

/* ----- My warehouses ----- */

router.get("/warehouses/mywarehouse", GetWarehouse.getAllWarehouseByPage);

module.exports = router;
