const bcrypt = require("bcrypt");
const loginModel = require("../model/model");
const jwt = require("jsonwebtoken");

class Login {

  static login = async (req, res, next) => {

    try {
      const { email, password } = req.body;
      const user = await loginModel.findOne({ email });
      if (user) {
        const match = await bcrypt.compare(password, user.password);

        if (match) {

          const token = jwt.sign(
            { name: user.name, id: user.id },
            process.env.JWT_KEY,
            { expiresIn: "30d" }
          );
          res.cookie("t_user", token);
          return res.json({
            message: true,
            user,
            token,
          });
        }
      } else {
        return res.status(200).json({
          message: false,
          err: 'False login/password'
        });
      }
    } catch (err) {
      return res.status(401).json({ message: err.mesage });
    }
  };

  static register = async (req, res, next) => {

    const { email, password, name } = req.body;

    try {
      if (!(await loginModel.findOne({ email }))) {
        bcrypt.genSalt(parseInt(10), function (err, salt) {
          if (err) {
            throw err;
          } else {
            bcrypt.hash(password, salt, async (err, hash) => {
              if (err) {
                throw err;
              } else {
                const data = new loginModel({ name, email, password: hash });
                await data.save();
                return res.json({ status: true });
              }
            });
          }
        });
      } else {
        return res.json({ status: false, message: 'this email already exists ' });
      }
    } catch (e) {
      return res.status(401).json({ message: e.message });
    }
  };

  static logout = async (req, res) => {
    try {
      res.clearCookie('t_user')
      return res.status(200).json({ status: 'successful' })
    } catch (e) {
      return res.status(520).json({ err: e.message })
    }
  }

}

module.exports = Login;
