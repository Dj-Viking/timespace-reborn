declare type Zones = {
    "type": string | "FeatureCollection";
    "features": Array<
        {
            "type": string | "feature";
            "properties": {
                "tzid": string | "Africa/Abidjan"
            };
            "geometry": {
                "type": string | "Polygon"
                "coordinates": Uint8Array;
            }
        }
    >
}