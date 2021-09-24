const axios = require("axios");
const {
  uri,
  createHeader,
  decompressV2,
  stringDecryptV2,
} = require("../ambilSigna");

const getBPJS = async (api_url, tStamp) => {
  return await await axios.get(api_url, {
    headers: createHeader(tStamp),
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

module.exports = {
  getPoli,
  getDiagnosa,
  getFaskes,
};
