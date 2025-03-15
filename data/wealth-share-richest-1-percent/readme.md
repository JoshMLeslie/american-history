# Wealth share of the richest 1% - Data package

This data package contains the data that powers the chart ["Wealth share of the richest 1%"](https://ourworldindata.org/grapher/wealth-share-richest-1-percent?tab=chart&time=1920..latest&country=USA~OWID_WRL~Asia+%28WID%29~CAN~Europe+%28WID%29~MEX~GBR&v=1&csvType=filtered&useColumnShortNames=false) on the Our World in Data website. It was downloaded on March 06, 2025.

### Active Filters

A filtered subset of the full data was downloaded. The following filters were applied:
country: USA, OWID_WRL, Asia (WID), CAN, Europe (WID), MEX, GBR
tab: chart
time: 1920..latest

## CSV Structure

The high level structure of the CSV file is that each row is an observation for an entity (usually a country or region) and a timepoint (usually a year).

The first two columns in the CSV file are "Entity" and "Code". "Entity" is the name of the entity (e.g. "United States"). "Code" is the OWID internal entity code that we use if the entity is a country or region. For normal countries, this is the same as the [iso alpha-3](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3) code of the entity (e.g. "USA") - for non-standard countries like historical countries these are custom codes.

The third column is either "Year" or "Day". If the data is annual, this is "Year" and contains only the year as an integer. If the column is "Day", the column contains a date string in the form "YYYY-MM-DD".

The final column is the data column, which is the time series that powers the chart. If the CSV data is downloaded using the "full data" option, then the column corresponds to the time series below. If the CSV data is downloaded using the "only selected data visible in the chart" option then the data column is transformed depending on the chart type and thus the association with the time series might not be as straightforward.

## Metadata.json structure

The .metadata.json file contains metadata about the data package. The "charts" key contains information to recreate the chart, like the title, subtitle etc.. The "columns" key contains information about each of the columns in the csv, like the unit, timespan covered, citation for the data etc..

## About the data

Our World in Data is almost never the original producer of the data - almost all of the data we use has been compiled by others. If you want to re-use data, it is your responsibility to ensure that you adhere to the sources' license and to credit them correctly. Please note that a single time series may have more than one source - e.g. when we stich together data from different time periods by different producers or when we calculate per capita metrics using population data from a second source.

## Detailed information about the data


## Wealth share of the richest 1%
The share of wealth owned by the richest 1%.
Last updated: May 24, 2024  
Next update: May 2025  
Date range: 1807–2022  
Unit: %  


### How to cite this data

#### In-line citation
If you have limited space (e.g. in data visualizations), you can use this abbreviated in-line citation:  
World Inequality Database (WID.world) (2024) – with major processing by Our World in Data

#### Full citation
World Inequality Database (WID.world) (2024) – with major processing by Our World in Data. “Wealth share of the richest 1%” [dataset]. World Inequality Database (WID.world), “World Inequality Database (WID)” [original data].
Source: World Inequality Database (WID.world) (2024) – with major processing by Our World In Data

### What you should know about this data
* This measure is related to net national wealth, which is the total value of non-financial and financial assets (housing, land, deposits, bonds, equities, etc.) held by households, minus their debts.
* The data is estimated from a combination of household surveys, tax records and national accounts data. This combination can provide a more accurate picture of the incomes of the richest, which tend to be captured poorly in household survey data alone.
* These underlying data sources are not always available. For some countries, observations are extrapolated from data relating to other years, or are sometimes modeled based on data observed in other countries. For more information on this methodology, see this related [technical note](https://wid.world/document/countries-with-regional-income-imputations-on-wid-world-world-inequality-lab-technical-note-2021-15/).

### Source

#### World Inequality Database (WID.world) – World Inequality Database (WID)
Retrieved on: 2024-07-04  
Retrieved from: https://wid.world  

#### Notes on our processing step for this indicator
We extract estimations of Gini, mean, percentile thresholds, averages, and shares via the [`wid` Stata command](https://github.com/thomasblanchet/wid-stata-tool). We calculate threshold and share ratios by dividing different thresholds and shares, respectively.

Interpolations and extrapolations are excluded by using the option `exclude` in the Stata command.


    