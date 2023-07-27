const router = require('express').Router();
const { checkAccountPayload, checkAccountId, checkAccountNameUnique } = require('./accounts-middleware');
const accModel = require("./accounts-model");

// get all accounts
router.get('/', async (req, res, next) => {
  try {
    const accounts = await accModel.getAll();
    res.json(accounts);
  } catch (error) {
    next(error);
  }
})

// get account by id
router.get('/:id', checkAccountId, async (req, res, next) => {
  try {
    // const account = await accModel.getById(req.params.id);
    res.json(req.account);
  } catch (error) {
    next(error);
  }
})

// create account
router.post('/', checkAccountPayload, checkAccountNameUnique,  async (req, res, next) => {
  try {
    const account = await accModel.create(req.newUser);
    res.json(account);
  } catch (error) {
    next(error);
  }
})

// update account
router.put('/:id', checkAccountPayload, checkAccountId, checkAccountNameUnique, async (req, res, next) => {
  try {
    const account = await accModel.updateById(req.params.id, req.newUser);
    res.json(account);
  } catch (error) {
    next(error);
  }
});

// delete account
router.delete('/:id', checkAccountId, async (req, res, next) => {
  try {
    const deletedAccount = await accModel.deleteById(req.params.id);
    res.json(deletedAccount);
  } catch (error) {
    next(error);
  }
})

// error mw
router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({message: err.message || "Sunucu Hatası!"});
})

module.exports = router;
