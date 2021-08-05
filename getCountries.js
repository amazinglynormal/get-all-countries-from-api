const https = require("https");
const fs = require("fs");

https
  .get("https://restcountries.eu/rest/v2/all", (res) => {
    console.log("statusCode: ", res.statusCode);

    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      const countries = parseDataAndExtractCountryName(data);
      writeToFile(countries);
      console.log("success");
    });
  })
  .on("error", (e) => console.error(e));

function parseDataAndExtractCountryName(data) {
  const parsedData = JSON.parse(data);
  return extractCountryName(parsedData);
}

function extractCountryName(parsedData) {
  const countries = [];
  parsedData.forEach((country) => {
    countries.push(country.name);
  });

  return countries;
}

function writeToFile(data) {
  try {
    fs.writeFileSync("countries.json", JSON.stringify(data));
  } catch (e) {
    console.error(e);
  }
}
