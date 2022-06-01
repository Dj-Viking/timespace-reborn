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
                // unknown array depths....at least 2 or 3 dimensions...probably 3 but don't know
                "coordinates": Array<unknown>;
            }
        }
    >
}