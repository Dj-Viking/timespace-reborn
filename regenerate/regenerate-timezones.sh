
echo '[INFO]: downloading the shapefile zip from evansiroky/timezone-boundary-builder/releases';
curl \
-L https://github.com/evansiroky/timezone-boundary-builder/releases/download/2021c/timezones.shapefile.zip \
-o tz_world_mp.zip;

echo '[INFO]: downloading the timezones.geojson.zip file from evansiroky';

curl \
-L https://github.com/evansiroky/timezone-boundary-builder/releases/download/2021c/timezones.geojson.zip \
-o timezones.geojson;


echo '[INFO]: unzipping tz world zip';
unzip tz_world_mp.zip;
echo '[INFO]: deleting tz world zip';
rm tz_world_mp.zip;
echo '[INFO]: ogr2ogr command to apply the shape file to unpacked geojson zip';
ogr2ogr -f GeoJSON timezonez.geojson combined-shapefile.shp;
echo '[INFO]: compress the shaped geojson with GNU-zip';
gzip -f timezonez.geojson;

# move gz file the rust folder for the reader
# mv timezones.geojson.gz rust-reader/;
# npm run rust:run;

# arg2 datafile arg3 outfile
echo '[INFO]: regenerate the timezones with our compressed-shaped geojson';
node ./regenerate/check-timezones.js timezonez.geojson.gz timezones.geojson.gz;
echo '[INFO]: quantize the data';
node ./regenerate/quantize.js 8
# rm timezones.geojson.gz;
# rm combined-shapefile.dbf;
# rm combined-shapefile.prj;
# rm combined-shapefile.shp;
# rm combined-shapefile.shx;