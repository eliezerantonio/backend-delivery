const User = require("../models/user");

module.exports = {
  async getAll(req, res, next) {
    try {
      const data = await User.getAll();

      return res.status(200).json(data);
    } catch (error) {
      console.log(`Errror: ${error}`);
      return res
        .status(501)
        .json({ success: false, message: "Erro ao buscar usuarios" });
    }
  },

  async register(req, res, next) {
    try {
      const user = req.body;
      console.log(user);
      const data = await User.create(user);
      return res.status(201).json({
        success: true,
        message: "Registro realizado com sucesso",
        data: data.id,
      });
    } catch (error) {
      console.log(`Error: ${error}`);
      return res
        .status(501)
        .json({ success: false, message: "Erro fazer o registro" });
    }
  },
};
