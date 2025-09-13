# Earthquake Data Schema

- **Source**: USGS Earthquake Hazards Program (https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv)
- **Total Records**: Approximately 9,888 (as of September 13, 2025)

## Schema Table

| Column Name     | Data Type         | Description                               | Example Value            |
| --------------- | ----------------- | ----------------------------------------- | ------------------------ |
| time            | string (ISO 8601) | Timestamp of the earthquake event         | 2025-09-13T17:40:07.250Z |
| latitude        | float             | Latitude coordinate in decimal degrees    | 35.1066667               |
| longitude       | float             | Longitude coordinate in decimal degrees   | -118.1955                |
| depth           | float             | Depth of the earthquake in kilometers     | 7.98                     |
| mag             | float             | Magnitude of the earthquake               | 0.73                     |
| magType         | string            | Magnitude type (ml, md, etc.)             | ml                       |
| nst             | integer/null      | Number of seismic stations used           | 22                       |
| gap             | float/null        | Azimuthal gap in degrees                  | 44                       |
| dmin            | float/null        | Minimum distance to station in degrees    | 0.04303                  |
| rms             | float             | Root mean square of travel time residuals | 0.13                     |
| net             | string            | Network code                              | ci                       |
| id              | string            | Event ID                                  | ci41290816               |
| updated         | string (ISO 8601) | Last update timestamp                     | 2025-09-13T17:43:38.494Z |
| place           | string            | Human-readable location description       | "6 km NNW of Mojave, CA" |
| type            | string            | Event type (usually "earthquake")         | earthquake               |
| horizontalError | float/null        | Horizontal location error in km           | 0.16                     |
| depthError      | float/null        | Depth error in km                         | 0.42                     |
| magError        | float/null        | Magnitude error                           | 0.216                    |
| magNst          | integer/null      | Number of stations for magnitude          | 14                       |
| status          | string            | Review status                             | automatic                |
| locationSource  | string            | Source of location data                   | ci                       |
| magSource       | string            | Source of magnitude data                  | ci                       |

## Sample Records

Here are the first 5 records from the dataset:

1. `2025-09-13T17:40:07.250Z,35.1066667,-118.1955,7.98,0.73,ml,22,44,0.04303,0.13,ci,ci41290816,2025-09-13T17:43:38.494Z,"6 km NNW of Mojave, CA",earthquake,0.16,0.42,0.216,14,automatic,ci,ci`

2. `2025-09-13T17:34:36.537Z,32.106,-101.475,1.0591,1.3,ml,14,95,0.1,0.7,tx,tx2025sbldfg,2025-09-13T17:37:24.050Z,"10 km W of Forsan, Texas",earthquake,0,1.5771461725235,0.2,6,automatic,tx,tx`

3. `2025-09-13T17:22:17.040Z,38.821166992188,-122.80616760254,1.4700000286102,1.04,md,19,56,0.003776,0.02,nc,nc75237452,2025-09-13T17:47:20.509Z,"7 km NNW of The Geysers, CA",earthquake,0.2,0.469999999,0.25,19,automatic,nc,nc`

4. `2025-09-13T17:13:38.200Z,38.793834686279,-122.75483703613,0.63999998569489,1.05,md,16,87,0.007777,0.03,nc,nc75237442,2025-09-13T17:32:19.391Z,"2 km NNE of The Geysers, CA",earthquake,0.23,0.400000006,0.3,19,automatic,nc,nc`

5. `2025-09-13T17:04:49.260Z,38.824333190918,-122.80899810791,2.8599998950958,1.16,md,26,41,0.001259,0.02,nc,nc75237437,2025-09-13T17:22:17.317Z,"7 km NNW of The Geysers, CA",earthquake,0.24,0.439999998,0.17,28,automatic,nc,nc`

## Notes for Implementation

- **Null Values**: Some columns may contain empty strings or null values (represented as empty fields in CSV)
- **Data Types**: Most numeric fields are floats, but some may be integers
- **Timestamps**: All datetime fields follow ISO 8601 format
- **Geographic Data**: Latitude/longitude are in decimal degrees, depth in kilometers
- **Magnitude**: Typically ranges from 0+ (minor) to 10+ (major), but most are 1-5
- **Parsing**: Use a CSV parser like PapaParse to handle quoted strings and commas within fields

This schema provides the foundation for building chart visualizations (e.g., scatter plots of magnitude vs depth) and data tables with proper column headers and data types.
