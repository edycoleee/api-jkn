const express = require("express");
const moment = require("moment");
const { getDiagnosa, getPoli, getFaskes } = require("./API/api_vclaim");
const { getAntriPoli } = require("./API/api_antrian2");
const vclaimRoutes = require("./routes/vclaimRoutes")
const antrianRoutes = require("./routes/antrianRoutes")
const aplicareRoutes = require("./routes/aplicareRoutes")

const app = express();

//LOGGER
const logger = (req, res, next) => {
  console.log(
    `${req.protocol}://${req.get("host")}${
      req.originalUrl
    }: ${moment().format()}`
  );
  next();
};

app.use(logger);

app.use('/vclaim',vclaimRoutes);
app.use('/antrian',vclaimRoutes);
app.use('/aplicare',vclaimRoutes);
// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    Server: "OK",
    BackEnd: "node js",
  });
});


//Routes
//VCLAIM -






//BPJS
//Referensi
app.get("/diagnosa/:par1", getDiagnosa);
app.get("/poli/:par1", getPoli);
app.get("/faskes/:par1/:par2", getFaskes);
// app.get("/dpjp/:par1/:par2/:par3", getDpjp);
// app.get("/propinsi", getPropinsi);
// app.get("/kabupaten/:par1", getKabupaten);
// app.get("/kecamatan/:par1", getKecamatan);
// app.get("/procedure/:par1", getProcedure);
// app.get("/kelasrawat", getKelasRawat);
// app.get("/dokter/:par1", getDokter);
// app.get("/spesialistik", getSpesialistik);
// app.get("/ruangrawat", getRuangRawat);
// app.get("/carakeluar", getCaraKeluar);
// app.get("/pascapulang", getPascaPulang);
//Peserta
// app.get("/nokartu/:par1/:par2", getNoKartu);
// app.get("/nik/:par1/:par2", getNIK);
// //SEP
// app.get("/sep/:par1", getCariSEP);
// app.get("/sepcbg/:par1", getCariSEPCBG);
// app.put("/sepplg", putPlgSEP);
// //app.put("/sepupd", putUpdateSEP);
// app.delete("/sepdel", delSEP);
// app.post("/sepinsert", postCreateSEP);
// //Rujukan
// app.get("/rujpus/:par1", getRujPus);
// app.get("/rujrs/:par1", getRujRS);
// app.get("/rujpuspes/:par1", getRujPusPes);
// app.get("/rujrspes/:par1", getRujRSPes);
// app.get("/rujpuslist/:par1", getRujPusList);
// app.get("/rujrslist/:par1", getRujRSList);
// app.post("/rujinsert", postCreateRujukan);
// app.put("/rujupdate", putUpdateRujukan);
// app.delete("/rujdelete", delRujukan);
// //Monitoring
// app.get("/kunjungan/:par1/:par2", getKunjungan);
// app.get("/klaim/:par1/:par2/:par3", getKlaim);
// app.get("/history/:par1/:par2/:par3", getHistory);
// app.get("/raharja/:par1/:par2/", getRaharja);

//BPJS-ANTRIAN V2
//Referensi
app.get("/antri-poli", getAntriPoli);


const port = 3000;

app.listen(3000, () =>
  console.log(`cli-nodejs-api listening at http://localhost:${port}`)
);
