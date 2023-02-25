// Number of days to form or forget a habit
let habit = 21

// Object Array Sorter. Returns ascending order

function sortByKey(array, key) {
    return array.sort(function(a, b) {
        let x = a[key]; let y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

// Use calcFrequency() with an target to record an action. The target must be the list to be ranked
// Use calcFrequency() without a target only to calculate the frequencies and store them in the list
function calcFrequency(list, target) {
	// We pass a list
	if (typeof(list) === 'array') {
		console.error('calcFrequency(): You must at least pass a list as first parameter')
		return false
	} else if (list === undefined) {
		return list
	}

	for (let i = 0; i < list.length; i++) {

		let id = list[i]['id']
		let data = list[i]['frequency-data']
		let TODAY = simpleDate()

		if (id === target) {
			addFrequency(data, true)
		} else {
			addFrequency(data)
		}

		let frequency = 0

		// Calculating frequency for each id in the list

		let rounds
		if (data.length <= habit) {
			rounds = data.length
		} else {
			rounds = habit
		}
		for (let i = 0; i < rounds; i++) {
			let weigh = data[i].interactions
			if (data[i].date === TODAY) {
				frequency += weigh
			} else {
				if (weigh > 0) {
					frequency += 1
				}
			}
		}
		list[i]['frequency'] = frequency
	}
	return list
}

function simpleDate() {
	let today = new Date
	let year = today.getFullYear()
	let month = today.getMonth() + 1
	let date = today.getDate()

	if (month < 10) {
		month = '0' + month
	}

	if (date < 10) {
		date = '0' + date
	}

	return (`${year}-${month}-${date}`)
}

function dateTime(customDate = false) {
	// Returns: 1) Date as a string in Google spreadsheets Date Time format (MM/DD/YYYY HH:MM:SS) and 2) Time zone in which the tx was recorded as a string

	let today

	if (customDate !== false) {
		today = customDate
	} else {
		today = new Date
	}

	let year = today.getFullYear()
	let month = today.getMonth() + 1
	let date = today.getDate()
	let hr = today.getHours()
	let min = today.getMinutes()

	if (min < 10) {
		min = '0' + min
	}

	let sec = today.getSeconds()

	if (sec < 10) {
		sec = '0' + sec
	}

	return (`${month}/${date}/${year} ${hr}:${min}:${sec}`)
}

function addFrequency(frequencyData, count) {
// TODAY adds a frequency that is equal to TODAY's number of interactions. This gives TODAY's interactions a really high weigh, this is to help someone that is selling lemonade for example register their incomes or expenses more quickly. This is useful in urgent situations
// The days before TODAY only add a frequency of 1 if there was any interaction or 0 if there wasn't any interaction. This means that even if you sold 50 lemonades yesterday, this high frequency of 50 won't make this particular transaction appear as the strongest habit on all future days, but rather it will only count as 1 towards the longer term habits or 'frequency'. This is because we want to show the strongest HABITS first and not high variances
	if (frequencyData.length > 0) {
		if (frequencyData[0].date !== simpleDate() && count === true) {
			frequencyData.unshift({
				'date' : simpleDate(),
				'interactions' : 1
			})
		} else if(frequencyData[0].date === simpleDate() && count === true) {
			frequencyData[0].interactions += 1
		}
	}

	if (frequencyData[0] === undefined || frequencyData[0].date !== simpleDate() && count === undefined) {
		// If there are no prior frequency data, or if there is prior data but the most recent data isn't today AND we aren't adding a count, we create TODAY's data with 0 interactions
		frequencyData.unshift({
			'date' : simpleDate(),
			'interactions' : 0
		})
	}

	// Limits data to only
	if (frequencyData.length > habit) {
		frequencyData.pop()
	}
}


var sstorage = {

	'accounts' : [
		{
			'id' : 'Personal',
			'frequency' : 7,
			'frequency-data' :[
				{
					'date' : '2018-09-10',
					'interactions' : 4
				},
				{
					'date' : '2018-09-09',
					'interactions' : 1
				},
				{
					'date' : '2018-09-08',
					'interactions' : 2
				}
			],
			'txs' : [
				{
					'date' : '9/11/2018 12:36:03',
					'jsdate': 'Sat Sep 15 2018 22:46:59 GMT-0500 (Peru Standard Time)',
					'description' : 'sol gas',
					'amount' : -38,
					'category' : 'propane',
					'picture' : ''
				}
			],
			'incomeCategories' : [
				{
					'id' : 'airbnb debit',
					'frequency' : 0,
					'frequency-data' : [
						{
							'date' : '2018-09-10',
							'interactions' : 1
						},
						{
							'date' : '2018-09-09',
							'interactions' : 0
						},
						{
							'date' : '2018-09-08',
							'interactions' : 1
						}
					],
					'amounts' : [
						{
							'id' : 1,
							'frequency' : 0,
							'frequency-data' : [
								{
									'date' : '2018-09-10',
									'interactions' : 0
								}
							]
						}
					]
				}
			],
			'expenseCategories' : [
				{
					'id' : 'food',
					'frequency' : 0,
					'frequency-data' : [
						{
							'date' : '2018-09-10',
							'interactions' : 4
						},
						{
							'date' : '2018-09-09',
							'interactions' : 1
						},
						{
							'date' : '2018-09-08',
							'interactions' : 2
						}
					],
					'amounts' : [
						{
							'id' : -1,
							'frequency' : 0,
							'frequency-data' : [
								{
									'date' : '2018-09-10',
									'interactions' :0
								}
							]
						}
					]
				}
			]
		}
	],


	'shortcuts' : [
		{
			'id' : 'personalexpensefood',
			'account' : 'personal',
			'ie' : 'expense',
			'category' : 'food',
			'frequency' : 200,
			'frequency-data' :[
				{
					'date' : '2018-09-10',
					'interactions' : 1
				},
				{
					'date' : '2018-09-09',
					'interactions' : 100
				}
			]
		},
		{
			'id' : 'personalexpensetransportation',
			'account' : 'personal',
			'ie' : 'expense',
			'category' : 'transportation',
			'frequency' : 100,
			'frequency-data' :[
				{
					'date' : '2018-09-10',
					'interactions' : 1
				}
			]
		}
	],


	'userShortcuts' : [
		{
			'id' : 'personalfood-5',
			'account' : 'personal',
			'ie' : 'expense',
			'category' : 'food',
			'amount' : -5,
			'frequency' : 9,
			'frequency-data' :[
				{
					'date' : '2018-09-10',
					'interactions' : 1
				}
			]
		},
		{
			'id' : 'personaltransportation-.8',
			'account' : 'personal',
			'ie' : 'expense',
			'category' : 'transportation',
			'amount' : -.8,
			'frequency' : 2,
			'frequency-data' :[
				{
					'date' : '2018-09-10',
					'interactions' : 1
				}
			]
		}
	]
}