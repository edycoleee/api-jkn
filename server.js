const express = require("express");
const moment = require("moment");
const { getAntriPoli,postAddAntrian } = require("./API/api_antrian2");
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
app.post("/antri-add", postAddAntrian);


const port = 3000;

app.listen(3000, () =>
  console.log(`cli-nodejs-api listening at http://localhost:${port}`)
);
