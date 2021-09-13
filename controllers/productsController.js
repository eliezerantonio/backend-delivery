const Product = require("../models/product");

const storage = require("../utils/cloud_storage");
const asyncForeach = require("../utils/async_foreach");

module.exports = {
  async create(req, res, next) {
    let product = JSON.parse(req.body.product);

    const files = req.files;
    let inserts = 0;
    if (files.length === 0) {
      return res.status(501).json({
        message: "Erro ao cadstrar produto, sem imagem",
        success: false,
      });
    } else {
      try {
        const data = await Product.create(product);

        product.id = data.id;

        const start = async () => {
          await asyncForeach(files, async (file) => {
            const pathImage = `image_${Date.now()}`;
            const url = await storage(file, pathImage);
            if (url !== undefined && url !== null) {
              if (inserts === 0) {
                //image 1
                product.image1 = url;
              } else if (inserts === 1) {
                product.image2 = url;
              } else if (inserts === 2) {
                product.image3 = url;
              }
            }
            await Product.update(product);
            inserts = inserts + 1;

            if (inserts == files.length) {
              res.status(201).json({
                success: true,
                message: "Product cadastrado com sucesso",
              });
            }
          });
          start();
        };
      } catch (error) {
        console.log(`Error ${error}`);

        res.status(501).json({
          message: "Erro ao cadstrar produto,${error}",
          success: false,
        });
      }
    }
  },
};
