var express = require('express');
var router = express.Router();

router.get("/", (req, res) => {
    res.json({
      Server: "OK",
      BackEnd: "node js",
      Api : "Aplicare"
    });
  });



module.exports = router;