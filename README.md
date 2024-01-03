# US FIPS County Code API
United States counties and their Federal Information Processing Standards codes

## About
This API was launched to provide an easier option for accessing a desired FIPS code. There are some government resources, a very long list and the Census Bureau API. The format of the data from both those sources isn't conducive to a number of web app functions. The data and scripts that initialized this APIs core data were based on work by [Derek Swingley](https://derekswingley.com) and his article [Using the Census API to Get County FIPS Codes](https://derekswingley.com/2019/10/13/using-the-census-api-to-get-county-fips-codes/). I'm taking it a step further, mostly because I'm practicing development skills, but also because there has to be at least one other person needing an easier time accessing these codes.

# Docs
This API takes only GET requests.

## Request Endpoints

### api/index

`https://fips-code-api.herokuapp.com/api/index`

Provides a complete data set: every county and code, grouped by state.

### api/search

`https://fips-code-api.herokuapp.com/api/search?state=StateAbbreviation&countyName=CountyName`

Provides a county's information.

```
{
    "name": "Travis County",
    "fips": "48453",
    "stateFips": "48",
    "state": "Texas",
    "abbrev": "TX"
}
```

## Bugs/Issues

Please use the issues portion of this repo. This is a hobby API and meant to be relatively shallow in terms of functionality.
There will, however, be a few more features implemented in the near future. Mostly other routes for more specific searches or by
different parameters. Some more styling and deeper search features on the webpage as well.

Collaborators are welcome!