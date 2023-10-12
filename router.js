const express = require("express");
const router = express.Router();

//middleware
const verifyToken = require("./middleware/verifyToken");

// Import module-specific routers
const authRouter = require("./modules/auth/auth.controller");
const userRouter = require("./modules/user/user.controller");
const warehouseRouter = require("./modules/warehouse/warehouse.controller");
const Testimonial = require("./modules/testimonials/testimonial.controller");
const category = require("./modules/category/category.controller");
const warehouseType = require("./modules/type/type.controller");
const Services = require("./modules/services/services.controller");

// Mount module-specific routers
router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/testimonial", Testimonial);
router.use("/category",verifyToken, category);
router.use("/warehousetype", warehouseType);
router.use("/services", Services);

// warehouse addition by vendor
router.use("/", verifyToken, warehouseRouter);

module.exports = router;
