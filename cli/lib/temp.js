const path = require('path');
const fs = require('fs');

/*
 * The object where the infos about the payer and the program are saved.
 * It's useful because it gives us the info to do our calls to the network.
 * It's temporary because it contains some data that can't be shared but is generated from our scripts.
 */

// The directory in which temp files are created
const DIR = path.join(__dirname, '../../temp');

module.exports = {
	// Return temp location
	location: () => DIR,

	// Load data converting store json file to usable object
	load: (filename) => {
		try {
			filename = path.join(DIR, filename + '.json');
			const data = JSON.parse(fs.readFileSync(filename, 'utf8'));
			return data;
		} catch (er) {
			return null;
		}
	},

	// Save data from object to json file
	save: (filename, data) => {
		try {
			fs.mkdirSync(DIR);
		} catch (er) {
			// Nothing
		}
		filename = path.join(DIR, filename + '.json');
		data = JSON.stringify(data, null, 2);
		return fs.writeFileSync(filename, data, 'utf8');
	},
};
