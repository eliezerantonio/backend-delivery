const Order = require("../models/order");

module.exports = {
  async create(req, res, next) {
    try {
      const order = req.body;
      const data = await Order.create(order);

      return res.status(201).json({
        success: true,
        message: "Pedido enviado com sucesso",
        data: data.id,
      });
    } catch (error) {
      console.log(`Error ${error}`);
      return res.status(501).json({
        success: false,
        message: "Erro ao enviar o pedido ",
        error: error,
      });
    }
  },
};
