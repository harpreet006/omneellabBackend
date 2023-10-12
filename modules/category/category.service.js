const Category = require("./category.model");

const createNewCategory = async (req, res) => {
  const { categoryName, categoryImage } = req.body;

  try {
    if (!categoryName) throw new Error("Please enter category name");

    // check if a category with the name already exists or not
    const checkExisting = await Category.findOne({
      attributes: ["id"],
      where: { categoryName },
    });

    if (checkExisting) {
      throw new Error("A category with this name already exists");
    }

    const newCategory = await Category.create({ categoryName, categoryImage });

    res.status(200).json({
      statusCode: 200,
      message: "Created Successfully",
      data: newCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ statusCode: 401, message: error.message });
  }
};

const getCategoryList = async (req, res) => {
  try {
    let categories = await Category.findAll();

    //send back all the categories in the response
    // it will be [] in case no category is present in the db
    res.status(200).json({ statusCode: 200, data: categories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createNewCategory, getCategoryList };
