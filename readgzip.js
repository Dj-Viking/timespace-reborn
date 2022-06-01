/* eslint-disable */
const fs = require('fs');
const zlib = require('zlib');

const in_buf = fs.readFileSync("./timezones.geojson.gz");

let datafile = in_buf;

if (!datafile) throw new Error('Timezone geojson file is required.');
console.log("what is the data file", datafile);



// let data_lines_of_cocaine = in_buf.toString().split(/(?:\r\n|\r|\n)/g);
// console.log(data_lines_of_cocaine.length);
// let part_of_the_file = "";
// for (let i = 0; i < 100; i++) {
//     part_of_the_file += `${data_lines_of_cocaine[i]}`;
// }



zlib.gunzip(in_buf, function (err, out_buf) {
    if (err) throw err;

    const data_thing_arr = JSON.stringify(out_buf.toJSON(), null, 2).split("\n");
    console.log("reading lines from datathing");
    let part_of_the_file = ""
    for (let i = 0; i < 20; i++) {
        console.log(data_thing_arr[i]);
        part_of_the_file += data_thing_arr[i];
    }
    console.log(part_of_the_file);
    fs.writeFile("./test.txt", part_of_the_file, (err) => {
        if (err) throw new Error("error during writing the test part of the file", err);
    })

    const zones = JSON.parse(out_buf);

    console.log("zones features", zones.features);
});



