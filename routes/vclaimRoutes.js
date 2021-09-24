var express = require('express');
var router = express.Router();
const { getDiagnosa, getPoli, getFaskes } = require("../API/api_vclaim");

router.get("/", (req, res) => {
    res.json({
      Server: "OK",
      BackEnd: "node js",
      Api : "Vclaim"
    });
  });

//Referensi
router.get("/diagnosa/:par1", getDiagnosa);
router.get("/poli/:par1", getPoli);
router.get("/faskes/:par1/:par2", getFaskes);

module.exports = router;