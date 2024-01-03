const express = require('express')
const router = express.Router()
const County = require('../../models/county')

// show all countys and counties
router.get('/index', (req, res)=>{
	County.find({}).sort('state')
		.then(foundCounties => {
			res.json(foundCounties)
		})
		.catch(err => console.log(err))
})


router.get('/search', (req, res) => {
	County.findOne({ abbrev: req.query.state.toUpperCase(), name: { $regex: req.query.countyName} })
            .then(foundCounty => {
                console.log(foundCounty)
                !foundCounty ? res.json('No results found') : res.json(foundCounty.toObject())
			})
			.catch(err => console.log(err))
})
// router.get('/county/:county', (req, res) => {
// 	// if the request only has a county parameter, return the whole county
// 	if (!req.query.countyName) {
// 		County.find({ abbrev: req.params.county.toUpperCase() })
// 			.then(foundCounty => {
// 				res.json(foundCounty)
// 			})
// 			.catch(err => console.log(err))
// 	// but if there's a query, return just that county specified
// 	} else {
// 		County.findOne({ abbrev: req.params.county.toUpperCase() })
// 			.then(foundCounty => {
// 				const foundCounty = foundCounty.counties.filter(county => county.county.includes(req.query.countyName))
// 				res.json(foundCounty)
// 			})
// 			.catch(err => console.log(err))
// 	}
// })

// router.get('/fips/many', (req, res) => {
// 	let queries = req.query.countyCodes.split(',')
// 	let countysArray = []
// 	let fipsArray = []

// 	queries.forEach(query => {
// 		let countyCode = query.slice(0, 2)
// 		countysArray.push(parseInt(countyCode))
// 		fipsArray.push(parseInt(query))
// 	})

// 	County.find({ countyFips: countysArray })
// 		.then(countys => {
// 			console.log(countys)
// 			let codes = []
// 			countys.forEach((county, i) => {
// 				codes.push(county.counties.find(county => parseInt(county.fips) === parseInt(fipsArray[i])))
// 			})
// 			res.json(codes)
// 		})
// })

// router.get('/fips', (req, res) => {
// 	// extract the county code from the county's FIPS code
// 	let countyCode = req.query.code.toString().slice(0, 2)
// 	// use it to find the single county
// 	console.log('county code:', countyCode)
// 	County.findOne({ countyFips: countyCode })
// 		.then(foundCounty => {
// 			// filter for the county with the matching name
// 			let foundCounty = foundCounty.counties.filter(county => {
// 				return county.fips === parseInt(req.query.code)
// 			})
// 			res.json(foundCounty)
// 		})
// 		.catch(err=>console.log(err))
// })


module.exports = router