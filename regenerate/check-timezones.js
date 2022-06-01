/* eslint-disable */
// ts-check
/**
 * Removes timezones that are not supported by moment-timezone.
 *
 * USE:
 *   node check-timezones.js timezones.geojson.gz timezones-cleaned.geojson.gz
 */

var fs = require('fs');
var zlib = require('zlib');
var moment = require('moment-timezone');

var datafile = process.argv[2];

console.log("what is the data file", datafile);
var outfile = process.argv[3];

if (!datafile) throw new Error('Timezone geojson file is required.');
if (!outfile) throw new Error('Output filename is required.');

var knownIssues = {
  'America/Monterey': 'America/Monterrey'
};

var buffer = fs.readFileSync(datafile);
zlib.gunzip(buffer, function (err, data) {
  if (err) throw err;

  // console.log("data to json", data.toJSON());

  // console.log("what happens here stringify", JSON.stringify(data.toJSON()));
  // console.log("what happens here parse", JSON.parse(data.toJSON()));
  // const data_thing_arr = JSON.stringify(data.toJSON(), null, 2).split("\n");
  // console.log("reading lines from datathing");
  // for (let i = 0; i < 20; i++) {
  //   console.log(data_thing_arr[i]);
  // }
  // fs.writeFile("./json-file-of-gzip-data-buffer.json", data_thing, (err) => {
  //   if (err) throw err;
  //   console.log("\x1b[33m WROTE JSON FILE!!! \x1b[00m", data_thing);
  // });

  //zones hopefully becomes combined.json which should be the result of g-unzipping timezones.geojson.gz
  /**
   * @type {Zones}
   */
  var zones = JSON.parse(data);

  // filter out timezones not supported by moment-timezone
  zones.features = zones.features.filter(function (zone) {

    // check if tzid is in `moment-timezone` library
    if (moment.tz.zone(zone.properties.tzid) === null) {

      if (zone.properties.tzid in knownIssues) {
        // if known issue, replace with the correct tzid
        var wrongTz = zone.properties.tzid;
        var correctTz = knownIssues[zone.properties.tzid];
        zone.properties.tzid = correctTz;
        console.log('Fixed timezone: ' + wrongTz + ' -> ' + correctTz);
        return true;

      } else {
        // if issue not known, remove from geojson
        console.log('Filtered out bad timezone ' + zone.properties.tzid);
        return false;
      }
    } else return true;
  });

  zlib.gzip(JSON.stringify(zones), function (err, result) {
    if (err) throw err;

    fs.writeFileSync(outfile, result);
  });
});

