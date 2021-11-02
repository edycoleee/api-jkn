var express = require("express");
var router = express.Router();
const {
  getDiagnosa,
  getPoli,
  getFaskes,
  getDPJP,
  getPropinsi,
  getKabupaten,
  getKecamatan,
  getProcedure,
  getKelasRawat,
  getDokter,
  getDiagPRB,
  getObatPRB,
  getSpesialistik,
  getRuangRawat,
  getCaraKeluar,
  getPascaPulang,
  getNoKartu,
  getNIK,
  getCariSEP,
  getRujPus,
  getRujRS,
  getRujPusPes,
  getRujRSPes,
  getRujPusList,
  getRujRSList,
  getRujListTgl,
  postCreateSEP
} = require("../API/api_vclaim");

router.get("/", (req, res) => {
  res.json({
    Server: "OK",
    BackEnd: "node js",
    Api: "Vclaim",
  });
});

//Referensi
router.get("/diagnosa/:par1", getDiagnosa);
router.get("/poli/:par1", getPoli);
router.get("/faskes/:par1/:par2", getFaskes);
router.get("/dpjp/:par1/:par2/:par3", getDPJP);
router.get("/propinsi", getPropinsi);
router.get("/kabupaten/:par1", getKabupaten);
router.get("/kecamatan/:par1", getKecamatan);
router.get("/procedure/:par1", getProcedure);
router.get("/kelasrawat", getKelasRawat);
router.get("/dokter/:par1", getDokter);
router.get("/diagnosaprb", getDiagPRB);
router.get("/obatprb/:par1", getObatPRB);
router.get("/spesialistik", getSpesialistik);
router.get("/ruangrawat", getRuangRawat);
router.get("/carakeluar", getCaraKeluar);
router.get("/pascapulang", getPascaPulang);
//Peserta
router.get("/nokartu/:par1/:par2", getNoKartu);
router.get("/nik/:par1/:par2", getNIK);
// //SEP
router.get("/sep/:par1", getCariSEP);
// router.get("/sepcbg/:par1", getCariSEPCBG);
// router.put("/sepplg", putPlgSEP);
// //router.put("/sepupd", putUpdateSEP);
// router.delete("/sepdel", delSEP);
router.post("/sepinsert", postCreateSEP);
// //Rujukan
router.get("/rujpus/:par1", getRujPus);
router.get("/rujrs/:par1", getRujRS);
router.get("/rujpuspes/:par1", getRujPusPes);
router.get("/rujrspes/:par1", getRujRSPes);
router.get("/rujpuslist/:par1", getRujPusList);
router.get("/rujrslist/:par1", getRujRSList);
router.get("/rujlisttgl/:par1", getRujListTgl);
// router.post("/rujinsert", postCreateRujukan);
// router.put("/rujupdate", putUpdateRujukan);
// router.delete("/rujdelete", delRujukan);
// //Monitoring
// router.get("/kunjungan/:par1/:par2", getKunjungan);
// router.get("/klaim/:par1/:par2/:par3", getKlaim);
// router.get("/history/:par1/:par2/:par3", getHistory);
// router.get("/raharja/:par1/:par2/", getRaharja);

module.exports = router;
