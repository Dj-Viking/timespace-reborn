curl \
-L https://github.com/evansiroky/timezone-boundary-builder/releases/download/2021c/timezones.shapefile.zip \
-o tz_world_mp.zip;

curl \
-L https://github.com/evansiroky/timezone-boundary-builder/releases/download/2021c/timezones.geojson.zip \
-o timezones.geojson;

unzip tz_world_mp.zip;
rm tz_world_mp.zip;
ogr2ogr -f GeoJSON timezones.geojson combined_shapefile.shp;
gzip -f timezones.geojson;

# arg2 datafile arg3 outfile
node ./regenerate/check-timezones.js timezones.geojson.gz timezones.geojson.gz;
node ./regenerate/quantize.js 8
# rm timezones.geojson.gz;
# rm combined-shapefile.dbf;
# rm combined-shapefile.prj;
# rm combined-shapefile.shp;
# rm combined-shapefile.shx;