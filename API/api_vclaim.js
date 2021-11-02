const axios = require("axios");
const {
  uri,
  createHeader,
  decompressV2,
  stringDecryptV2,
  URL_vclaim,
} = require("../ambilSigna");

const getBPJS = async (api_url, tStamp) => {
  return await axios.get(api_url, {
    headers: createHeader(tStamp),
  });
};

const postBPJS = async (api_url, tStamp, data) => {
  return await axios.post(api_url, {
    headers: createHeader(tStamp),
    body: data,
  });
};

//================================================REFERENSI
//get diagnosa
//{Base URL}/{Service Name}/referensi/diagnosa/{parameter}
//http://localhost:3000/diagnosa/A04
const getDiagnosa = async (request, response) => {
  const par1 = request.params.par1;
  const midle_url = "referensi/diagnosa";
  const api_url = `${uri}${midle_url}/${par1}`;
  const tStamp = Math.floor(Date.now() / 1000);
  return await getBPJS(api_url, tStamp)
    .then(async (res) => {
      const resDecrypt = await stringDecryptV2(tStamp, res.data.response);
      const resDecompress = await JSON.parse(decompressV2(resDecrypt));
      return response.json(resDecompress);
    })
    .catch((err) => {
      console.log(err);
      return response.json(err);
    });
};

//================================================
//get poli
//{Base URL}/{Service Name}referensi/poli/{Parameter}
//http://localhost:3000/poli/IGD
const getPoli = async (request, response) => {
  console.log("get poli");
  const par1 = request.params.par1;
  const midle_url = "referensi/poli";
  const api_url = `${uri}${midle_url}/${par1}`;
  const tStamp = Math.floor(Date.now() / 1000);
  return await getBPJS(api_url, tStamp)
    .then(async (res) => {
      const resDecrypt = await stringDecryptV2(tStamp, res.data.response);
      const resDecompress = await JSON.parse(decompressV2(resDecrypt));
      return response.json(resDecompress);
    })
    .catch((err) => {
      console.log(err);
      return response.json(err);
    });
};

//================================================
//get faskes
//{ Base URL } /{Service Name}/referensi / faskes / { Parameter 1} / { Parameter 2}
//Parameter 1 : nama atau kode faskes
//Parameter 2 : Jenis Faskes(1. Faskes 1, 2. Faskes 2 / RS)
//http://localhost:3000/faskes/kalijaga/2
const getFaskes = async (request, response) => {
  const midle_url = "referensi/faskes";
  const par1 = request.params.par1;
  const par2 = request.params.par2;
  const api_url = `${uri}${midle_url}/${par1}/${par2}`;
  const tStamp = Math.floor(Date.now() / 1000);
  return await getBPJS(api_url, tStamp)
    .then(async (res) => {
      const resDecrypt = await stringDecryptV2(tStamp, res.data.response);
      const resDecompress = await JSON.parse(decompressV2(resDecrypt));
      return response.json(resDecompress);
    })
    .catch((err) => {
      console.log(err);
      return response.json(err);
    });
};

//================================================
//get dpjp
//{Base URL}/{Service Name}/referensi/dokter/pelayanan/{Parameter 1}/tglPelayanan/{Parameter 2}/Spesialis/{Parameter 3}
//Parameter 1 : Jenis Pelayanan (1. Rawat Inap, 2. Rawat Jalan)
//Parameter 2 : Tgl.Pelayanan/SEP (yyyy-mm-dd)
//Parameter 3 : Kode Spesialis/Subspesialis
//http://localhost:3000/dpjp/1/2021-03-07/umum  ==> all inap di rs sendiri
//app.get("/dpjp/:par1/:par2/:par3", async (request, response) => {
const getDPJP = async (request, response) => {
  const midle_url1 = "referensi/dokter/pelayanan";
  const midle_url2 = "tglPelayanan";
  const midle_url3 = "Spesialis";
  const par1 = request.params.par1;
  const par2 = request.params.par2;
  const par3 = request.params.par3;
  const api_url = `${uri}${midle_url1}/${par1}/${midle_url2}/${par2}/${midle_url3}/${par3}`;
  const tStamp = Math.floor(Date.now() / 1000);
  return await getBPJS(api_url, tStamp)
    .then(async (res) => {
      if (res.data.response === null) return response.json(res.data.metaData);
      const resDecrypt = await stringDecryptV2(tStamp, res.data.response);
      const resDecompress = await JSON.parse(decompressV2(resDecrypt));
      return response.json(resDecompress);
    })
    .catch((err) => {
      console.log(err);
      return response.json(err);
    });
};

//================================================
//get propinsi
//{Base URL}/{Service Name}/referensi/propinsi
//Parameter 1 : propinsi
//http://localhost:3000/propinsi
const getPropinsi = async (request, response) => {
  const midle_url = "referensi/propinsi";
  const api_url = `${uri}${midle_url}`;
  const tStamp = Math.floor(Date.now() / 1000);
  //console.log(api_url);
  return await getBPJS(api_url, tStamp)
    .then(async (res) => {
      //console.log(res.data.response);
      if (res.data.response === null) return response.json(res.data.metaData);
      const resDecrypt = await stringDecryptV2(tStamp, res.data.response);
      //console.log("resDecrypt",resDecrypt);
      const resDecompress = await JSON.parse(decompressV2(resDecrypt));
      //console.log(resDecompress);
      return response.json(resDecompress);
    })
    .catch((err) => {
      console.log(err);
      return response.json(err);
    });
};

//================================================
//get kabupaten
//{Base URL}/{Service Name}/referensi/kabupaten/propinsi/{paramater 1}
//Parameter 1 : Kode Propinsi
//http://localhost:3000/kabupaten/12
const getKabupaten = async (request, response) => {
  const midle_url = "referensi/kabupaten/propinsi";
  const par1 = request.params.par1;
  const api_url = `${uri}${midle_url}/${par1}`;
  const tStamp = Math.floor(Date.now() / 1000);
  return await getBPJS(api_url, tStamp)
    .then(async (res) => {
      const resDecrypt = await stringDecryptV2(tStamp, res.data.response);
      const resDecompress = await JSON.parse(decompressV2(resDecrypt));
      return response.json(resDecompress);
    })
    .catch((err) => {
      console.log(err);
      return response.json(err);
    });
};

//================================================
//get kecamatan
//{Base URL}/{Service Name}/referensi/kecamatan/kabupaten/{paramater 1}
//Parameter 1 : Kode Kabupaten
//http://localhost:3000/kecamatan/0161
const getKecamatan = async (request, response) => {
  const midle_url = "referensi/kecamatan/kabupaten";
  const par1 = request.params.par1;
  const api_url = `${uri}${midle_url}/${par1}`;
  const tStamp = Math.floor(Date.now() / 1000);
  return await getBPJS(api_url, tStamp)
    .then(async (res) => {
      const resDecrypt = await stringDecryptV2(tStamp, res.data.response);
      const resDecompress = await JSON.parse(decompressV2(resDecrypt));
      return response.json(resDecompress);
    })
    .catch((err) => {
      console.log(err);
      return response.json(err);
    });
};

//================================================
//get Procedure / Tindakan (Hanya Untuk Lembar Pengajuan Klaim)
//{Base URL}/{Service Name}/referensi/procedure/{Parameter}
//Parameter : nama atau kode procedure
//http://localhost:3000/procedure/vertigo
const getProcedure = async (request, response) => {
  const midle_url = "referensi/procedure";
  const par1 = request.params.par1;
  const api_url = `${uri}${midle_url}/${par1}`;
  const tStamp = Math.floor(Date.now() / 1000);
  return await getBPJS(api_url, tStamp)
    .then(async (res) => {
      const resDecrypt = await stringDecryptV2(tStamp, res.data.response);
      const resDecompress = await JSON.parse(decompressV2(resDecrypt));
      return response.json(resDecompress);
    })
    .catch((err) => {
      console.log(err);
      return response.json(err);
    });
};

//================================================
//get Kelas Rawat (Hanya Untuk Lembar Pengajuan Klaim)
//{Base URL}/{Service Name}/referensi/kelasrawat
//http://localhost:3000/kelasrawat
const getKelasRawat = async (request, response) => {
  const midle_url = "referensi/kelasrawat";
  const api_url = `${uri}${midle_url}`;
  const tStamp = Math.floor(Date.now() / 1000);
  return await getBPJS(api_url, tStamp)
    .then(async (res) => {
      const resDecrypt = await stringDecryptV2(tStamp, res.data.response);
      const resDecompress = await JSON.parse(decompressV2(resDecrypt));
      return response.json(resDecompress);
    })
    .catch((err) => {
      console.log(err);
      return response.json(err);
    });
};

//================================================
//get Dokter (Hanya Untuk Lembar Pengajuan Klaim)
//{Base URL}/{Service Name}/referensi/dokter/{Parameter}
//Parameter : nama dokter/DPJP
//http://localhost:3000/dokter/gunawan
const getDokter = async (request, response) => {
  const midle_url = "referensi/dokter";
  const par1 = request.params.par1;
  const api_url = `${uri}${midle_url}/${par1}`;
  console.log(api_url);
  const tStamp = Math.floor(Date.now() / 1000);
  return await getBPJS(api_url, tStamp)
    .then(async (res) => {
      //console.log(res);
      console.log(res.statusText);
      console.log(res.data);
      console.log(res.data.metaData);
      console.log("response", res.data.response);
      if (res.data.response === null) return response.json(res.data.metaData);
      const resDecrypt = await stringDecryptV2(tStamp, res.data.response);
      const resDecompress = await JSON.parse(decompressV2(resDecrypt));
      console.log("resDecompress", resDecompress);
      return response.json(resDecompress);
    })
    .catch((err) => {
      console.log(err);
      return response.json(err);
    });
};

//================================================
//get Diagnosa Program PRB (Hanya Untuk Lembar Pengajuan Klaim)
//{Base URL}/{Service Name}/referensi/diagnosaprb
//http://localhost:3000/diagnosaprb
const getDiagPRB = async (request, response) => {
  const midle_url = "/referensi/diagnosaprb";
  const api_url = `${uri}${midle_url}`;
  const tStamp = Math.floor(Date.now() / 1000);
  return await getBPJS(api_url, tStamp)
    .then(async (res) => {
      const resDecrypt = await stringDecryptV2(tStamp, res.data.response);
      const resDecompress = await JSON.parse(decompressV2(resDecrypt));
      return response.json(resDecompress);
    })
    .catch((err) => {
      console.log(err);
      return response.json(err);
    });
};

//================================================
//get Diagnosa Program PRB (Hanya Untuk Lembar Pengajuan Klaim)
//{Base URL}/{Service Name}/referensi/obatprb/{Parameter 1}
//http://localhost:3000/obatprb/insulin
const getObatPRB = async (request, response) => {
  const midle_url = "referensi/obatprb";
  const par1 = request.params.par1;
  const api_url = `${uri}${midle_url}/${par1}`;
  const tStamp = Math.floor(Date.now() / 1000);
  return await getBPJS(api_url, tStamp)
    .then(async (res) => {
      console.log("response", res.data.response);
      const resDecrypt = await stringDecryptV2(tStamp, res.data.response);
      const resDecompress = await JSON.parse(decompressV2(resDecrypt));
      return response.json(resDecompress);
    })
    .catch((err) => {
      console.log(err);
      return response.json(err);
    });
};

//================================================
//get Spesialistik (Hanya Untuk Lembar Pengajuan Klaim)
//{Base URL}/{Service Name}/referensi/spesialistik
//http://localhost:3000/spesialistik
const getSpesialistik = async (request, response) => {
  const midle_url = "referensi/spesialistik";
  const api_url = `${uri}${midle_url}`;
  const tStamp = Math.floor(Date.now() / 1000);
  return await getBPJS(api_url, tStamp)
    .then(async (res) => {
      const resDecrypt = await stringDecryptV2(tStamp, res.data.response);
      const resDecompress = await JSON.parse(decompressV2(resDecrypt));
      return response.json(resDecompress);
    })
    .catch((err) => {
      console.log(err);
      return response.json(err);
    });
};

//================================================
//get Ruang Rawat (Hanya Untuk Lembar Pengajuan Klaim)
//{Base URL}/{Service Name}/referensi/ruangrawat
//http://localhost:3000/ruangrawat
const getRuangRawat = async (request, response) => {
  const midle_url = "referensi/ruangrawat";
  const api_url = `${uri}${midle_url}`;
  const tStamp = Math.floor(Date.now() / 1000);
  return await getBPJS(api_url, tStamp)
    .then(async (res) => {
      if (res.data.response === null) return response.json(res.data.metaData);
      const resDecrypt = await stringDecryptV2(tStamp, res.data.response);
      const resDecompress = await JSON.parse(decompressV2(resDecrypt));
      return response.json(resDecompress);
    })
    .catch((err) => {
      console.log(err);
      return response.json(err);
    });
};

//get Cara Keluar (Hanya Untuk Lembar Pengajuan Klaim)
//{Base URL}/{Service Name}/referensi/carakeluar
//http://localhost:3000/carakeluar
const getCaraKeluar = async (request, response) => {
  const midle_url = "referensi/carakeluar";
  const api_url = `${uri}/${midle_url}`;
  const tStamp = Math.floor(Date.now() / 1000);
  return await getBPJS(api_url, tStamp)
    .then(async (res) => {
      const resDecrypt = await stringDecryptV2(tStamp, res.data.response);
      const resDecompress = await JSON.parse(decompressV2(resDecrypt));
      return response.json(resDecompress);
    })
    .catch((err) => {
      console.log(err);
      return response.json(err);
    });
};
//get Pasca Pulang (Hanya Untuk Lembar Pengajuan Klaim)
//{Base URL}/{Service Name}/referensi/pascapulang
//http://localhost:3000/pascapulang
const getPascaPulang = async (request, response) => {
  const midle_url = "referensi/pascapulang";
  const api_url = `${uri}/${midle_url}`;
  const tStamp = Math.floor(Date.now() / 1000);
  return await getBPJS(api_url, tStamp)
    .then(async (res) => {
      const resDecrypt = await stringDecryptV2(tStamp, res.data.response);
      const resDecompress = await JSON.parse(decompressV2(resDecrypt));
      return response.json(resDecompress);
    })
    .catch((err) => {
      console.log(err);
      return response.json(err);
    });
};

//================================================PESERTA
//get No.Kartu BPJS
//{BASE URL}/{Service Name}/Peserta/nokartu/{parameter 1}/tglSEP/{parameter 2}
//Parameter 1 : Nomor Kartu
//Parameter 2 : Tanggal Pelayanan/SEP - format : yyyy-MM-dd
//http://localhost:3000/nokartu/0001803721702/2021-03-08
const getNoKartu = async (request, response) => {
  const midle_url1 = "Peserta/nokartu";
  const midle_url2 = "tglSEP";
  const par1 = request.params.par1;
  const par2 = request.params.par2;
  const api_url = `${uri}${midle_url1}/${par1}/${midle_url2}/${par2}`;
  const tStamp = Math.floor(Date.now() / 1000);
  return await getBPJS(api_url, tStamp)
    .then(async (res) => {
      if (res.data.response === null) return response.json(res.data.metaData);
      const resDecrypt = await stringDecryptV2(tStamp, res.data.response);
      const resDecompress = await JSON.parse(decompressV2(resDecrypt));
      return response.json(resDecompress);
    })
    .catch((err) => {
      console.log(err);
      return response.json(err);
    });
};

//================================================
//get NIK
//{BASE URL}/{Service Name}/Peserta/nik/{parameter 1}/tglSEP/{parameter 2}
//Parameter 1 : NIK KTP
//Parameter 2 : Tanggal Pelayanan/SEP - format : yyyy-MM-dd
//http://localhost:3000/nik/3321062508410001/2021-03-08
const getNIK = async (request, response) => {
  const midle_url1 = "Peserta/nik";
  const midle_url2 = "tglSEP";
  const par1 = request.params.par1;
  const par2 = request.params.par2;
  const api_url = `${uri}${midle_url1}/${par1}/${midle_url2}/${par2}`;
  const tStamp = Math.floor(Date.now() / 1000);
  return await getBPJS(api_url, tStamp)
    .then(async (res) => {
      if (res.data.response === null) return response.json(res.data.metaData);
      const resDecrypt = await stringDecryptV2(tStamp, res.data.response);
      const resDecompress = await JSON.parse(decompressV2(resDecrypt));
      return response.json(resDecompress);
    })
    .catch((err) => {
      console.log(err);
      return response.json(err);
    });
};

//================================================
//get SEP
//{BASE URL}/{Service Name}/sep/{parameter}
//Parameter: Nomor SEP Peserta
//http://localhost:3000/sep/1131R0040321V002004
const getCariSEP = async (request, response) => {
  const midle_url = "SEP";
  const par1 = request.params.par1;
  const api_url = `${uri}${midle_url}/${par1}`;
  //const api_url = `https://new-api.bpjs-kesehatan.go.id:8080/new-vclaim-rest/Rujukan/List/TglRujukan/2021-09-25`;
  const tStamp = Math.floor(Date.now() / 1000);
  console.log(api_url);
  return await getBPJS(api_url, tStamp)
    .then(async (res) => {
      if (res.data.response === null) return response.json(res.data.metaData);
      if (URL_vclaim == "LIVE") {
        const data = res.data.response;
        console.log("datanya", data);
        console.log("data SEP", data);
        return response.json(data);
      } else {
        const resDecrypt = await stringDecryptV2(tStamp, res.data.response);
        const resDecompress = await JSON.parse(decompressV2(resDecrypt));
        return response.json(resDecompress);
      }
    })
    .catch((err) => {
      console.log(err);
      return response.json(err);
    });
};

const postCreateSEP = async (request, response) => {
  const midle_url = "SEP/1.1/insert";
  const api_url = `${uri}${midle_url}`;
  // const dataSEP = {
  //   request: {
  //     t_sep: {
  //       // "{nokartu BPJS }"
  //       noKartu: request.body.noKartu,
  //       // "{tanggal penerbitan sep format yyyy-mm-dd}",
  //       tglSep: request.body.tglSep,
  //       // "{kode faskes pemberi pelayanan}",
  //       ppkPelayanan: request.body.ppkPelayanan,
  //       // "{jenis pelayanan = 1. r.inap 2. r.jalan}",
  //       jnsPelayanan: request.body.jnsPelayanan,
  //       // "{kelas rawat 1. kelas 1, 2. kelas 2 3.kelas 3}",
  //       klsRawat: request.body.klsRawat,
  //       // "{nomor medical record RS}",
  //       noMR: request.body.noMR,
  //       rujukan: {
  //         // "{asal rujukan ->1.Faskes 1, 2. Faskes 2(RS)}",
  //         asalRujukan: request.body.asalRujukan,
  //         // "{tanggal rujukan format: yyyy-mm-dd}",
  //         tglRujukan: request.body.tglRujukan,
  //         // "{nomor rujukan}",
  //         noRujukan: request.body.noRujukan,
  //         // "{kode faskes rujukam -> baca di referensi faskes}",
  //         ppkRujukan: request.body.ppkRujukan,
  //       },
  //       // "{catatan peserta}",
  //       catatan: request.body.catatan,
  //       // "{diagnosa awal ICD10 -> baca di referensi diagnosa}",
  //       diagAwal: request.body.diagAwal,
  //       poli: {
  //         // "{kode poli -> baca di referensi poli}",
  //         tujuan: request.body.tujuan,
  //         // "{poli eksekutif -> 0. Tidak 1.Ya}",
  //         eksekutif: request.body.eksekutif,
  //       },
  //       cob: {
  //         // "{cob -> 0.Tidak 1. Ya}",
  //         cob: request.body.cob,
  //       },
  //       katarak: {
  //         // "{katarak --> 0.Tidak 1.Ya}",
  //         katarak: request.body.katarak,
  //       },
  //       jaminan: {
  //         //"Kecelakaan Lalu Lintas --> 0.Tidak 1.Ya",
  //         lakaLantas: request.body.lakaLantas,
  //         penjamin: {
  //           // "{penjamin lakalantas -> 1=Jasa raharja PT, 2=BPJS Ketenagakerjaan, 3=TASPEN PT, 4=ASABRI PT} jika lebih dari 1 isi -> 1,2 (pakai delimiter koma)}",
  //           penjamin: request.body.penjamin,
  //           //"{tanggal kejadian KLL format: yyyy-mm-dd}",
  //           tglKejadian: request.body.tglKejadian,
  //           //"{Keterangan Kejadian KLL}",
  //           keterangan: request.body.keterangan,
  //           suplesi: {
  //             //"{Suplesi --> 0.Tidak 1. Ya}",
  //             suplesi: request.body.suplesi,
  //             //"{No.SEP yang Jika Terdapat Suplesi}",
  //             noSepSuplesi: request.body.noSepSuplesi,
  //             lokasiLaka: {
  //               //"{Kode Propinsi}",
  //               kdPropinsi: request.body.kdPropinsi,
  //               //"{Kode Kabupaten}",
  //               kdKabupaten: request.body.kdKabupaten,
  //               //"{Kode Kecamatan}",
  //               kdKecamatan: request.body.kdKecamatan,
  //             },
  //           },
  //         },
  //       },
  //       skdp: {
  //         //"{Nomor Surat Kontrol}",
  //         noSurat: request.body.noSurat,
  //         //"{kode dokter DPJP --> baca di referensi dokter DPJP}",
  //         kodeDPJP: request.body.kodeDPJP,
  //       },
  //       //"{nomor telepon}",
  //       noTelp: request.body.noTelp,
  //       user: "SIMRSNODE WS",
  //     },
  //   },
  // };
  console.log(api_url, CobaSEP);
  const tStamp = Math.floor(Date.now() / 1000);
  return await postBPJS(api_url, tStamp, CobaSEP)
    .then(async (res) => {
      console.log("response", res);
      if (res.data.response === null) return response.json(res.data.metaData);
      const resDecrypt = await stringDecryptV2(tStamp, res.data.response);
      const resDecompress = await JSON.parse(decompressV2(resDecrypt));
      return response.json(resDecompress);
    })
    .catch((err) => {
      console.log("error", err);
      return response.json(err);
    });
};

//================================================
//get Rujukan Berdasarkan Nomor Rujukan
//{BASE URL}/{Service Name}/Rujukan/{parameter}
//Parameter : Nomor Rujukan
//http://localhost:3000/rujpus/
const getRujPus = async (request, response) => {
  const midle_url = "Rujukan";
  const par1 = request.params.par1;
  const api_url = `${uri}${midle_url}/${par1}`;
  const tStamp = Math.floor(Date.now() / 1000);
  return await getBPJS(api_url, tStamp)
    .then(async (res) => {
      console.log("response", res.data.response);
      const resDecrypt = await stringDecryptV2(tStamp, res.data.response);
      const resDecompress = await JSON.parse(decompressV2(resDecrypt));
      return response.json(resDecompress);
    })
    .catch((err) => {
      console.log(err);
      return response.json(err);
    });
};

//================================================
//get Rujukan Berdasarkan Nomor Rujukan
//{BASE URL}/{Service Name}/Rujukan/RS/{parameter}
//Parameter : Nomor Rujukan
//http://localhost:3000/rujrs/
const getRujRS = async (request, response) => {
  const midle_url = "Rujukan/RS";
  const par1 = request.params.par1;
  const api_url = `${uri}${midle_url}/${par1}`;
  const tStamp = Math.floor(Date.now() / 1000);
  return await getBPJS(api_url, tStamp)
    .then(async (res) => {
      console.log("response", res.data.response);
      if (res.data.response === null) return response.json(res.data.metaData);
      const resDecrypt = await stringDecryptV2(tStamp, res.data.response);
      const resDecompress = await JSON.parse(decompressV2(resDecrypt));
      return response.json(resDecompress);
    })
    .catch((err) => {
      console.log(err);
      return response.json(err);
    });
};

//================================================
//get Rujukan Berdasarkan Nomor Kartu (1 Record)
//{BASE URL}/{Service Name}/Rujukan/Peserta/{parameter}
//Parameter : Nomor kartu
//http://localhost:3000/rujpuspes/
const getRujPusPes = async (request, response) => {
  const midle_url = "Rujukan/Peserta";
  const par1 = request.params.par1;
  const api_url = `${uri}${midle_url}/${par1}`;
  const tStamp = Math.floor(Date.now() / 1000);
  return await getBPJS(api_url, tStamp)
    .then(async (res) => {
      console.log("response", res.data.response);
      if (res.data.response === null) return response.json(res.data.metaData);
      const resDecrypt = await stringDecryptV2(tStamp, res.data.response);
      const resDecompress = await JSON.parse(decompressV2(resDecrypt));
      return response.json(resDecompress);
    })
    .catch((err) => {
      console.log(err);
      return response.json(err);
    });
};

//================================================
//get Rujukan Berdasarkan Nomor Kartu (1 Record)
//{BASE URL}/{Service Name}/Rujukan/RS/Peserta/{parameter}
//Parameter : Nomor kartu
//http://localhost:3000/rujrspes/
const getRujRSPes = async (request, response) => {
  const midle_url = "Rujukan/RS/Peserta";
  const par1 = request.params.par1;
  const api_url = `${uri}${midle_url}/${par1}`;
  const tStamp = Math.floor(Date.now() / 1000);
  return await getBPJS(api_url, tStamp)
    .then(async (res) => {
      console.log("response", res.data.response);
      if (res.data.response === null) return response.json(res.data.metaData);
      const resDecrypt = await stringDecryptV2(tStamp, res.data.response);
      const resDecompress = await JSON.parse(decompressV2(resDecrypt));
      return response.json(resDecompress);
    })
    .catch((err) => {
      console.log(err);
      return response.json(err);
    });
};

//================================================
//get Rujukan Berdasarkan Nomor Kartu (Multi Record)
//{BASE URL}/{Service Name}/Rujukan/List/Peserta/{parameter}
//Parameter : Nomor kartu
//http://localhost:3000/rujpuslist/0002424858671
const getRujPusList = async (request, response) => {
  const midle_url = "Rujukan/List/Peserta";
  const par1 = request.params.par1;
  const api_url = `${uri}${midle_url}/${par1}`;
  const tStamp = Math.floor(Date.now() / 1000);
  return await getBPJS(api_url, tStamp)
    .then(async (res) => {
      console.log("response", res.data.response);
      if (res.data.response === null) return response.json(res.data.metaData);
      const resDecrypt = await stringDecryptV2(tStamp, res.data.response);
      const resDecompress = await JSON.parse(decompressV2(resDecrypt));
      return response.json(resDecompress);
    })
    .catch((err) => {
      console.log(err);
      return response.json(err);
    });
};
//================================================
//get Rujukan Berdasarkan Nomor Kartu (Multi Record)
//{BASE URL}/{Service Name}/Rujukan/RS/List/Peserta/{parameter}
//Parameter : Nomor kartu
//http://localhost:3000/rujrslist/0002424858671
const getRujRSList = async (request, response) => {
  const midle_url = "Rujukan/RS/List/Peserta";
  const par1 = request.params.par1;
  const api_url = `${uri}${midle_url}/${par1}`;
  const tStamp = Math.floor(Date.now() / 1000);
  return await getBPJS(api_url, tStamp)
    .then(async (res) => {
      console.log("response", res.data.response);
      if (res.data.response === null) return response.json(res.data.metaData);
      const resDecrypt = await stringDecryptV2(tStamp, res.data.response);
      const resDecompress = await JSON.parse(decompressV2(resDecrypt));
      return response.json(resDecompress);
    })
    .catch((err) => {
      console.log(err);
      return response.json(err);
    });
};

//================================================
//get Rujukan Berdasarkan Tanggal (Multi Record)
//{BASE URL}/{Service Name}/Rujukan/RS/List/Peserta/{parameter}
//Parameter : Nomor kartu
//http://localhost:3000/rujlisttgl/2021-09-01
const getRujListTgl = async (request, response) => {
  const midle_url = "Rujukan/List/TglRujukan";
  const par1 = request.params.par1;
  //const api_url = `${uri}${midle_url}/${par1}`;
  const api_url = `https://new-api.bpjs-kesehatan.go.id:8080/new-vclaim-rest/Rujukan/List/TglRujukan/2021-09-25`;
  const tStamp = Math.floor(Date.now() / 1000);
  console.log("api", api_url);
  return await getBPJS(api_url, tStamp)
    .then(async (res) => {
      const data = res.data.response;
      console.log("datanya", data);
      console.log("rujukannya", data.rujukan);
      //if (res.data.response === null) return response.json(res.data.metaData);
      //const resDecrypt = await stringDecryptV2(tStamp, res.data.response);
      //const resDecompress = await JSON.parse(decompressV2(resDecrypt));
      return response.json(data.rujukan);
    })
    .catch((err) => {
      console.log(err);
      return response.json(err);
    });
};

const CobaSEP = {
  request: {
    t_sep: {
      noKartu: "0001803721702",
      tglSep: "2021-09-25",
      ppkPelayanan: "1131R004",
      jnsPelayanan: "2",
      klsRawat: "3",
      noMR: "123456",
      rujukan: {
        asalRujukan: "1",
        tglRujukan: "2021-09-25",
        noRujukan: "1234567",
        ppkRujukan: "1131U001",
      },
      catatan: "test",
      diagAwal: "A00.1",
      poli: {
        tujuan: "INT",
        eksekutif: "0",
      },
      cob: {
        cob: "0",
      },
      katarak: {
        katarak: "0",
      },
      jaminan: {
        lakaLantas: "0",
        penjamin: {
          penjamin: "1",
          tglKejadian: "2018-08-06",
          keterangan: "kll",
          suplesi: {
            suplesi: "0",
            noSepSuplesi: "0301R0010718V000001",
            lokasiLaka: {
              kdPropinsi: "12",
              kdKabupaten: "0161",
              kdKecamatan: "2104",
            },
          },
        },
      },
      skdp: {
        noSurat: "000002",
        kodeDPJP: "31661",
      },
      noTelp: "081919999",
      user: "Coba Ws",
    },
  },
};

module.exports = {
  getPoli,
  getDiagnosa,
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
  postCreateSEP,
  getRujPus,
  getRujRS,
  getRujPusPes,
  getRujRSPes,
  getRujPusList,
  getRujRSList,
  getRujListTgl,
  postCreateSEP,
};
