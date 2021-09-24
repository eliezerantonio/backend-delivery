const Address = require("../models/address");

module.exports = {
  async create(req, res, next) {
    try {
      const address = req.body;

        const data = await Address.create(address);
           return res.status(201).json({
             success: false,
             message: `Endereco criado com sucesso `,
             data: data.id,
           });
    } catch (error) {
      console.log(`Erroor ${error}`);

      return res.status(501).json({
        success: false,
        message: `Erro ao criar o endereco`,
        error: error,
      });
    }
  },
};
