/* eslint-disable */
const fs = require('fs');
const zlib = require('zlib');

const buf = fs.readFileSync("./timezones.geojson.gz");

let datafile = buf;

if (!datafile) throw new Error('Timezone geojson file is required.');
console.log("what is the data file", datafile);

zlib.gunzip(buf, function (err, data) {
    if (err) throw err;

    const zones = JSON.parse(JSON.parse(data.toJSON()));

    console.log("zones features", zones.features);
});



