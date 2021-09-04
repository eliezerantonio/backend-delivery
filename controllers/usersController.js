const User = require("../models/user");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
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

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      //buscando usuarip
      const myUser = await User.findByEmail(email);
      //verificando se usuario existe

      console.log(myUser);
      if (!myUser) {
        return res
          .status(401)
          .json({ success: false, message: "Usuario nao encontrado" });
      }
      //comparando senha
      if (User.isPasswordMatched(password, myUser.password)) {
        //criar token dest usuariosc
        const token = jwt.sign(
          { id: myUser.id, email: myUser.email },
          keys.secretOrKey,
          {
            expiresIn: "1h",
          }
        );

        const data = {
          id: myUser.id,
          name: myUser.name,
          lastName: myUser.lastName,
          email: myUser.email,
          image: myUser.image,
          phone: myUser.phone,
          secretOrKey: `JWT ${token}`,
        };

        return res.status(201).json({ success: true, data: data });
      } else {
        return res
          .status(401)
          .json({ success: false, message: "Senha incorreta" });
      }
    } catch (error) {
      console.log(`Error" ${error}`);
      return res
        .status(501)
        .json({ success: false, message: "Erro ao fazer login", error: error });
    }
  },
};
