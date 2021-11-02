"use strick";

const crypto = require("crypto");
const dotenv = require("dotenv");
const LZString = require("lz-string");

dotenv.config();

const consId = process.env.CONSID;
const secret = process.env.SECRET;
const user_key = process.env.USER_KEY;
const URL_vclaim = process.env.VCLAIM;
const URL_aplicare = process.env.APLICARE;
const URL_antrian = process.env.ANTRIAN;
let uri = ""
const options = {
  host: "dvlp.bpjs-kesehatan.go.id",
  port: ":8888",
  service: "vclaim-rest-1.1",
};

const optionsLive = {
  host: "new-api.bpjs-kesehatan.go.id",
  port: ":8080",
  service: "new-vclaim-rest",
};

const aplicareOptions = {
  host: "dvlp.bpjs-kesehatan.go.id",
  port: ":8888",
  service: "aplicaresws",
};

const antrianOptionsLive = {
    host: "new-api.bpjs-kesehatan.go.id",
    port: ":8080",
    service: "new-vclaim-rest",
  };

const antrianOptions = {
  host: "apijkn-dev.bpjs-kesehatan.go.id",
  port: ":8888",
  service: "antreanrs_dev",
};

if (URL_vclaim === "LIVE") {
  uri = `https://${optionsLive.host}${optionsLive.port}/${optionsLive.service}/`;
} else {
  uri = `https://${options.host}/${options.service}/`;
}
console.log(uri,URL_vclaim);
const aplicareuri = `https://${aplicareOptions.host}${aplicareOptions.port}/${aplicareOptions.service}/`;
const uri_antrian = `https://${antrianOptions.host}/${antrianOptions.service}/`;

//https://apijkn-dev.bpjs-kesehatan.go.id/antreanrs_dev

function stringDecryptV2(tStamp, string) {
  const keyString = consId + secret + tStamp;
  let key_hash = crypto.createHash("sha256").update(keyString, "utf8").digest();
  let iv = key_hash.slice(0, 16, "blob");
  try {
    let decipher = crypto.createDecipheriv("aes-256-cbc", key_hash, iv);
    let decrypted = decipher.update(string, "base64", "utf8");
    return decrypted + decipher.final("utf8");
  } catch (e) {
    return null;
  }
}

function decompressV2(string) {
  var decompores = LZString.decompressFromEncodedURIComponent(string);
  return decompores;
}

const createHeader = (tStamp) => {
  const data = consId + "&" + tStamp;
  const signature = Buffer.from(
    crypto.createHmac("SHA256", secret).update(data).digest()
  ).toString("base64");
  return {
    "X-cons-id": consId,
    "X-timestamp": tStamp,
    "X-signature": signature,
    user_key,
    'Content-Type': 'application/json',
  };
};


module.exports = {
  uri,
  aplicareuri,
  uri_antrian,
  stringDecryptV2,
  decompressV2,
  createHeader,
  URL_vclaim
};
