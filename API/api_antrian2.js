const axios = require("axios");
const {
  uri_antrian,
  createHeader,
  decompressV2,
  stringDecryptV2,
} = require("../ambilSigna");

const getAntrian = async (api_url, tStamp) => {
  return await await axios.get(api_url, {
    headers: createHeader(tStamp),
  });
};


//================================================REFERENSI
//get poli
//{BASE URL}/ref/poli
//http://localhost:3000/antri-poli
const getAntriPoli = async (request, response) => {
    const midle_url = "ref/poli";
    const api_url = `${uri_antrian}${midle_url}`;
    console.log(api_url);
    const tStamp = Math.floor(Date.now() / 1000);
    return await getAntrian(api_url, tStamp)
      .then(async (res) => {
        console.log(res.data.response);
        const resDecrypt = await stringDecryptV2(tStamp, res.data.response);
        console.log("resDecrypt: ",resDecrypt);
        const resDecompress = await JSON.parse(decompressV2(resDecrypt));
        console.log("resDecompress :",resDecompress);
        return response.json(resDecompress);
      })
      .catch((err) => {
        console.log(err);
        return response.json(err);
      });
  };

  module.exports = {
    getAntriPoli,
  };
  