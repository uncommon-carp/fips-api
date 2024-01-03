const express = require('express')
const router = express.Router()
const County = require('../../models/county')

router.get('/', (req, res) => {
    res.redirect('/docs')
})

router.get('/docs', (req, res) => {
    res.render('home')
})

router.get('/search', (req, res) => {
    if (!req.query.countyName || !req.query.state) {
        res.render('search')
    } else {
        County.findOne({ abbrev: req.query.state.toUpperCase(), name: { $regex: req.query.countyName} })
            .then(foundCounty => {
                // const foundCounty = foundState.counties.filter(county => county.county.includes(req.query.countyName))
                console.log(foundCounty)
                !foundCounty ? res.render('search', {county: {name: 'No results found'}} ) : res.render('search', { county: foundCounty.toObject() })
			})
			.catch(err => console.log(err))
    }
    
})

module.exports = router