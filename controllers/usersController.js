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
};
