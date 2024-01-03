const fips = require('./lib/fips_lookup_by_state')
const mongoose = require('mongoose')
const states = Object.values(fips)

// const State = require('./models/state')
const County = require('./models/county')

const db = require('./config/connection')

mongoose.connect(db, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})

mongoose.connection
	.on("open", () => {
		console.log(`Connected to ${db}`)
	const seedCounties = []

	states.forEach(state => {
		
		// turn the object's attributes into arrays
		let counties = Object.entries(state)
		// remove the first three array items because they're state info
		counties.splice(0, 3)
		//turn each of the remaining arrays into a county object inside the new state's counties array
		counties.forEach(county => {
			const newCounty = {}
			newCounty.name = county[0]
			newCounty.fips = county[1]
			newCounty.state = state._name
			newCounty.stateFips = state._fips
			newCounty.abbrev = state._abbrev
			seedCounties.push(newCounty)
		})
		
	})
		
	console.log('before deleteMany')
	County.deleteMany({})
        .then((deletedCounties) => {
        // Seed Counties
            County.create(seedCounties)
            .then((newCounties) => {
                // log the new States to confirm their creation
                console.log("Countiescreated");
                mongoose.connection.close();
            })
            .catch((error) => {
                console.log(error);
                mongoose.connection.close();
            });
        })
        .catch((error) => {
            console.log(error);
            mongoose.connection.close();
        });
})