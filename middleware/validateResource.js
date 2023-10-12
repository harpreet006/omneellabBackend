const validateResource = (resourceSchema) => async (req, res, next) => {
  const resource = req.body;
  try {
    // throws an error if not valid
    await resourceSchema.validate(resource);
    next();
  } catch (e) {
    console.error(e);
    res.status(401).json({ error: e.errors.join(", ") });
  }
};

export default validateResource;
