const Order = require("../models/order");
const OrderHasProducts = require("../models/order_has_products");
module.exports = {
  async create(req, res, next) {
    try {
      let order = req.body;
      order.status = "PAGADO";
      const data = await Order.create(order);
     

      //percorrendo todos produtos selecioandos no pedido

      for (const product of order.products) {
        await OrderHasProducts.create(data.id, product.id, product.quantity);
      }

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
