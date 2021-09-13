const Category = require("../models/category");

module.exports = {
  async create(req, res, next) {
    try {
      const category = req.body;
      console.log("Categoria enviada ", category);

      const data = await Category.create(category);

      return res.status(201).json({
        message: "Categoria criada com sucesso",
        success: true,
        data: data.id,
      });
    } catch (error) {
      console.log(`error: ${error}`);
      return res.status(501).json({
        success: false,
        message: "Erro ao criar categoria",
        error: error,
      });
    }
  },
};
