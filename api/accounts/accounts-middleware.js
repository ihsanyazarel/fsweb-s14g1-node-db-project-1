const accModel = require("./accounts-model");
const db = require("../../data/db-config");

exports.checkAccountPayload = (req, res, next) => {
  // KODLAR BURAYA
  // Not: Validasyon için Yup(şu an yüklü değil!) kullanabilirsiniz veya kendiniz manuel yazabilirsiniz.
  try {
    const {name, budget} = req.body;
    if(!name || !budget){
      res.status(400).json({message: "name ve budget bilgilerini girmeniz gerekmektedir!..."})
    }
    else{
      const newUser = {name: name, budget: budget};
      req.newUser = newUser;
      next();
    }
  } catch (error) {
    next(error)
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  // KODLAR BURAYA
  try {
    const account = await db("accounts").where("name", req.body.name).first();
    if(!account){
      next();
    }
    else{
      if(!req.params.id){
        res.status(400).json({message: "Kullanıcı adı mevcut..."})
      }
      else{
        req.params.id == account.id ? next() : res.status(400).json({message: "Kullanıcı adı mevcut..."})
      }
    }
  } catch (error) {
    next(error)
  }
}

exports.checkAccountId = async (req, res, next) => {
  // KODLAR BURAYA
  try {
    const account = await accModel.getById(req.params.id);
    if(!account){
      res.status(404).json({messaeg: "Kullanıcı bulunamadı."})
    }
    else{
      req.account = account;
      next();
    }
  } catch (error) {
    next(error)
  }
}
