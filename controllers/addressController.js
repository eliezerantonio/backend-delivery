const Address = require("../models/address");

module.exports = {
  async create(req, res, next) {
    try {
      const address = req.body;

      const data = await Address.create(address);
       console.log(`endereco id ${data.id}`);
      return res.status(201).json({
        success: true,
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
  async findByUser(req, res, next) {
    try {
      const id_user = req.params.id_user;
      const data = await Address.findByUser(id_user);
      console.log(`Address ${JSON.stringify(data)}`);

      return res.status(200).json(data);
    } catch (error) {
      console.log(`Error ${error}`);
      return res.status(501).json({
        message: "Erro ao buscar enderecos",
        error: error,
        success: false,
      });
    }
  },
};
