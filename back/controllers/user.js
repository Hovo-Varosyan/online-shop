const loginModel = require("../model/model");

class User {


  static user = async (req, res, next) => {
    try {
      const data = await loginModel.findById({ _id: req.user.id });
      if (data) {
        return res.json({ data });
      } else {
        return res.status(404).json({ err: "not user data" })
      }
    } catch (e) {
      return res.json({ err: e.message });
    }
  };


}

module.exports = User;
