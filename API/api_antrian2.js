const axios = require("axios");
const {
  uri_antrian,
  createHeader,
  decompressV2,
  stringDecryptV2,
} = require("../ambilSigna");
const LZString = require("lz-string");

const getAntrian = async (api_url, tStamp) => {
  return await axios.get(api_url, {
    headers: createHeader(tStamp),
  });
};

const postAntrian = async (api_url, body) => {
  return await axios.post(api_url, {
    headers: createHeader(tStamp),
    body: JSON.stringify(body),
  });
};

const putAntrian = async (api_url, body) => {
  return await axios.put(api_url, {
    headers: createHeader(tStamp),
    body: JSON.stringify(body),
  });
};

const delAntrian = async (api_url, body) => {
  return await axios.delete(api_url, {
    headers: createHeader(tStamp),
    body: JSON.stringify(body),
  });
};

//================================================REFERENSI
//get poli
//{BASE URL}/ref/poli
//http://localhost:3000/antri-poli
const getAntriPoli = async (request, response) => {
  const midle_url = "ref/poli";
  //const midle_url = "ref/dokter";
  //OBG/ORT/ANA/INT/UMU
  //const midle_url = "jadwaldokter/kodepoli/UMU/tanggal/2021-08-01";
  const api_url = `${uri_antrian}${midle_url}`;
  console.log(api_url);
  const tStamp = Math.floor(Date.now() / 1000);
  return await getAntrian(api_url, tStamp)
    .then(async (res) => {
      console.log(res);
      console.log(res.data.response);
      const resDecrypt = await stringDecryptV2(tStamp, res.data.response);
      const resDecompress = await JSON.parse(
        LZString.decompressFromEncodedURIComponent(resDecrypt)
      );
      return response.json(resDecompress);
    })
    .catch((err) => {
      console.log(err);
      return response.json(err);
    });
};

//================================================REFERENSI
//get poli
//{BASE URL}/ref/poli
//http://localhost:3000/antri-poli
// const postAntrian = async (request, response) => {
//   const midle_url = "updateJadwal";
//   const api_url = `${uri_antrian}${midle_url}`;
//   console.log(api_url);
//   const tStamp = Math.floor(Date.now() / 1000);
//   return await getAntrian(api_url, tStamp)
//     .then(async (res) => {
//       console.log(res.data.response);
//       const resDecrypt = await stringDecryptV2(tStamp, res.data.response);
//       const resDecompress = await JSON.parse(
//         LZString.decompressFromEncodedURIComponent(resDecrypt)
//       );
//       return response.json(resDecompress);
//     })
//     .catch((err) => {
//       console.log(err);
//       return response.json(err);
//     });
// };


module.exports = {
  getAntriPoli,
};
