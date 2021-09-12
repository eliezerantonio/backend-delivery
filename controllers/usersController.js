const User = require("../models/user");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const Role = require("../models/role");
const storage = require("../utils/cloud_storage");
const { findByUserId } = require("../models/user");

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
  async findByUserId(req, res, next) {
    try {
      const id = req.params.id;
      const data = await User.findByUserId(id);

      return res.status(200).json(data);
    } catch (error) {
      console.log(`Errror: ${error}`);
      return res
        .status(501)
        .json({ success: false, message: "Erro ao buscar usuario" });
    }
  },

  async register(req, res, next) {
    try {
      const user = req.body;

      const data = await User.create(user);

      await Role.create(data.id, 1); ///regra default

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
            expiresIn: 60 * 2,
          }
        );

        const data = {
          id: myUser.id,
          name: myUser.name,
          lastname: myUser.lastname,
          email: myUser.email,
          image: myUser.image,
          phone: myUser.phone,
          session_token: `JWT ${token}`,
          roles: myUser.roles,
        };
        await User.updateToken(myUser.id, `JWT ${token}`);
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
  async registerWithImage(req, res, next) {
    try {
      const user = JSON.parse(req.body.user);

      const files = req.files;
      if (files.length > 0) {
        const pathImage = `image_${Date.now()}`; //nome do arquivo a armazenar
        const url = await storage(files[0], pathImage);
        if (url != null && url != undefined) {
          user.image = url;
        }
      }

      const data = await User.create(user);

      await Role.create(data.id, 1); ///regra default

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
  async update(req, res, next) {
    try {
      const user = JSON.parse(req.body.user);

      const files = req.files;
      if (files.length > 0) {
        const pathImage = `image_${Date.now()}`; //nome do arquivo a armazenar
        const url = await storage(files[0], pathImage);
        if (url != null && url != undefined) {
          user.image = url;
        }
      }

      await User.update(user);

      return res.status(201).json({
        success: true,
        message: "Atualizacao feita com sucesso",
      });
    } catch (error) {
      console.log(`Error: ${error}`);
      return res
        .status(501)
        .json({ success: false, message: "Erro fazer ao atualizar" });
    }
  },

  async logout(req, res, next) {
    try {
      
    } catch (error) {
      console.log("Error: ${error}");
      return res
        .status(501)
        .json({
          success: false,
          message: "Erro ao fazer logout",
          error: error,
        });
    }
  },
};
