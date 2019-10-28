const express = require("express");
const router = express.Router();

const bankCard = require('../utilities/bankCardAttribution')

router.get('/:cardNbr', (req, res, next) => {
  res.status(200).json(post);
})

module.exports = router;
