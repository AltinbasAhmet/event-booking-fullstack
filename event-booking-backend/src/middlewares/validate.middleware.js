module.exports = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: error.errors,
    });
  }
};