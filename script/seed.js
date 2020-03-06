"use strict";

const db = require("../server/db");
const {User} = require("../server/db/models");
const {Transaction} = require("../server/db/models");
const {Stocks} = require("../server/db/models");

const fakeStockData = [
    {
      "date": "2020-02-05",
      "open": 338.4,
      "close": 329.34,
      "high": 333.92,
      "low": 330.21,
      "volume": 30787708,
      "uOpen": 327.53,
      "uClose": 329.33,
      "uHigh": 329.92,
      "uLow": 321.48,
      "uVolume": 30493715,
      "change": 0,
      "changePercent": 0,
      "label": "Feb 5",
      "changeOverTime": 0
    },
    {
      "date": "2020-02-06",
      "open": 338.02,
      "close": 336.91,
      "high": 337.36,
      "low": 329.22,
      "volume": 26500282,
      "uOpen": 334.34,
      "uClose": 336.19,
      "uHigh": 334.27,
      "uLow": 334.79,
      "uVolume": 26678226,
      "change": 3.77,
      "changePercent": 1.1958,
      "label": "Feb 6",
      "changeOverTime": 0.01222
    },
    {
      "date": "2020-02-07",
      "open": 338.26,
      "close": 334.46,
      "high": 336.6,
      "low": 323,
      "volume": 30621149,
      "uOpen": 330.53,
      "uClose": 333.59,
      "uHigh": 328.6,
      "uLow": 327,
      "uVolume": 30006724,
      "change": -5.2,
      "changePercent": -1.6508,
      "label": "Feb 7",
      "changeOverTime": -0.004629
    },
    {
      "date": "2020-02-10",
      "open": 323.12,
      "close": 324.51,
      "high": 325.99,
      "low": 326.54,
      "volume": 28498272,
      "uOpen": 327.91,
      "uClose": 336.66,
      "uHigh": 336.38,
      "uLow": 324.81,
      "uVolume": 28167366,
      "change": 1.56,
      "changePercent": 0.495,
      "label": "Feb 10",
      "changeOverTime": 0.000326
    },
    {
      "date": "2020-02-11",
      "open": 331.3,
      "close": 321.97,
      "high": 334.3,
      "low": 319.34,
      "volume": 23730259,
      "uOpen": 335.1,
      "uClose": 324.74,
      "uHigh": 327.7,
      "uLow": 327.41,
      "uVolume": 23914963,
      "change": -1.94,
      "changePercent": -0.6093,
      "label": "Feb 11",
      "changeOverTime": -0.005966
    },
    {
      "date": "2020-02-12",
      "open": 331.97,
      "close": 338.8,
      "high": 338.31,
      "low": 328.55,
      "volume": 28607254,
      "uOpen": 334.8,
      "uClose": 343.1,
      "uHigh": 331.72,
      "uLow": 327.44,
      "uVolume": 28560408,
      "change": 7.61,
      "changePercent": 2.4896,
      "label": "Feb 12",
      "changeOverTime": 0.018099
    },
    {
      "date": "2020-02-13",
      "open": 328.55,
      "close": 332.89,
      "high": 339.85,
      "low": 339.18,
      "volume": 23786104,
      "uOpen": 328.33,
      "uClose": 340.51,
      "uHigh": 327.93,
      "uLow": 336.01,
      "uVolume": 23901813,
      "change": -2.34,
      "changePercent": -0.7368,
      "label": "Feb 13",
      "changeOverTime": 0.01095
    },
    {
      "date": "2020-02-14",
      "open": 325.94,
      "close": 324.96,
      "high": 335.98,
      "low": 323.18,
      "volume": 20304676,
      "uOpen": 334.72,
      "uClose": 328.16,
      "uHigh": 331.1,
      "uLow": 326.72,
      "uVolume": 20644858,
      "change": 0.08,
      "changePercent": 0.0248,
      "label": "Feb 14",
      "changeOverTime": 0.011396
    },
    {
      "date": "2020-02-18",
      "open": 323.8,
      "close": 325,
      "high": 327.58,
      "low": 323.62,
      "volume": 39538951,
      "uOpen": 323.23,
      "uClose": 319,
      "uHigh": 330.67,
      "uLow": 317.93,
      "uVolume": 39147921,
      "change": -6.03,
      "changePercent": -1.87,
      "label": "Feb 18",
      "changeOverTime": -0.007844
    },
    {
      "date": "2020-02-19",
      "open": 332,
      "close": 333.05,
      "high": 339,
      "low": 334,
      "volume": 24499110,
      "uOpen": 322,
      "uClose": 325.12,
      "uHigh": 332.9,
      "uLow": 336,
      "uVolume": 24179026,
      "change": 4.73,
      "changePercent": 1.4537,
      "label": "Feb 19",
      "changeOverTime": 0.006826
    },
    {
      "date": "2020-02-20",
      "open": 330.75,
      "close": 323.2,
      "high": 338.85,
      "low": 329.21,
      "volume": 25616327,
      "uOpen": 324.65,
      "uClose": 334.1,
      "uHigh": 338.87,
      "uLow": 331.45,
      "uVolume": 25827482,
      "change": -3.33,
      "changePercent": -1.0572,
      "label": "Feb 20",
      "changeOverTime": -0.003664
    },
    {
      "date": "2020-02-21",
      "open": 324.57,
      "close": 313.32,
      "high": 335.58,
      "low": 315.9,
      "volume": 33368332,
      "uOpen": 326.34,
      "uClose": 328.56,
      "uHigh": 335.62,
      "uLow": 322.7,
      "uVolume": 32551421,
      "change": -7.58,
      "changePercent": -2.3356,
      "label": "Feb 21",
      "changeOverTime": -0.026935
    },
    {
      "date": "2020-02-24",
      "open": 308.77,
      "close": 303.33,
      "high": 312.16,
      "low": 295.75,
      "volume": 57488999,
      "uOpen": 308.66,
      "uClose": 299.74,
      "uHigh": 308.32,
      "uLow": 290.89,
      "uVolume": 55897151,
      "change": -15.35,
      "changePercent": -4.82,
      "label": "Feb 24",
      "changeOverTime": -0.074683
    },
    {
      "date": "2020-02-25",
      "open": 308.78,
      "close": 290.96,
      "high": 311.95,
      "low": 289.33,
      "volume": 59875266,
      "uOpen": 315.82,
      "uClose": 296.77,
      "uHigh": 305.77,
      "uLow": 287.86,
      "uVolume": 58597789,
      "change": -10.5,
      "changePercent": -3.4823,
      "label": "Feb 25",
      "changeOverTime": -0.105821
    },
    {
      "date": "2020-02-26",
      "open": 286.92,
      "close": 294.73,
      "high": 311.82,
      "low": 289.6,
      "volume": 50462839,
      "uOpen": 287.34,
      "uClose": 307.22,
      "uHigh": 305.9,
      "uLow": 289.3,
      "uVolume": 51282032,
      "change": 4.78,
      "changePercent": 1.6619,
      "label": "Feb 26",
      "changeOverTime": -0.093862
    },
    {
      "date": "2020-02-27",
      "open": 282.9,
      "close": 281.24,
      "high": 289,
      "low": 285.68,
      "volume": 82216056,
      "uOpen": 283.5,
      "uClose": 278.52,
      "uHigh": 298,
      "uLow": 282.5,
      "uVolume": 83858959,
      "change": -19.69,
      "changePercent": -6.8193,
      "label": "Feb 27",
      "changeOverTime": -0.155022
    },
    {
      "date": "2020-02-28",
      "open": 269.35,
      "close": 285.21,
      "high": 278.81,
      "low": 266.61,
      "volume": 107143385,
      "uOpen": 262.05,
      "uClose": 282.86,
      "uHigh": 290.56,
      "uLow": 262.96,
      "uVolume": 111442330,
      "change": -0.16,
      "changePercent": -0.0596,
      "label": "Feb 28",
      "changeOverTime": -0.150199
    },
    {
      "date": "2020-03-02",
      "open": 294.72,
      "close": 304.4,
      "high": 309.24,
      "low": 278.09,
      "volume": 85717690,
      "uOpen": 293.13,
      "uClose": 311.42,
      "uHigh": 304.49,
      "uLow": 283.4,
      "uVolume": 86370446,
      "change": 26.71,
      "changePercent": 9.7019,
      "label": "Mar 2",
      "changeOverTime": -0.073718
    },
    {
      "date": "2020-03-03",
      "open": 318.17,
      "close": 296.57,
      "high": 311,
      "low": 288.6,
      "volume": 83508358,
      "uOpen": 315.66,
      "uClose": 301.96,
      "uHigh": 313,
      "uLow": 296.2,
      "uVolume": 82571277,
      "change": -9.61,
      "changePercent": -3.3208,
      "label": "Mar 3",
      "changeOverTime": -0.101925
    },
    {
      "date": "2020-03-04",
      "open": 301.72,
      "close": 308.16,
      "high": 308.4,
      "low": 307.31,
      "volume": 56590875,
      "uOpen": 299.28,
      "uClose": 305.1,
      "uHigh": 314.2,
      "uLow": 306.74,
      "uVolume": 56090325,
      "change": 13.62,
      "changePercent": 4.6734,
      "label": "Mar 4",
      "changeOverTime": -0.058499
    }
  ]
async function seed() {
	await db.sync({force: true});
	console.log("db synced!");
	const users = await Promise.all([
		User.create({email: "cody@email.com",
			password: "Ab123456*",
			firstName: "Cody",
			lastName: "Pickles"}),
		User.create({email: "murphy@email.com", 
			password: "Bc123456*",
			firstName: "John",
			lastName: "Murphy"
		}),
		User.create({
			email: "tomjo@email.com",
			password: "Cd1238456*",
			admin: false,
			username: "Tommy",
			firstName: "Tommy",
			lastName: "Smitty",
			apt: "2",
			street: "Main st",
			houseNumber: "111",
			zipcode: "11111",
			state: "NY",
			country: "USA"
		}),
		User.create({
			email: "khaleesi@email.com",
			password: "Ed123456*",
			admin: true,
			username: "motherofdragons",
			firstName: "First-of-her-name",
			lastName: "Drogo",
			apt: "1",
			street: "John Snow st",
			houseNumber: "1",
			zipcode: "10009",
			state: "Winterfell",
			country: "The North"
		}),
		User.create({
			email: "sarah@email.com",
			password: "Wd123456*",
			admin: true,
			username: "skeg",
			firstName: "Sarah",
			lastName: "Kerrigan",
			apt: "2",
			street: "Zerg st",
			houseNumber: "111",
			zipcode: "11111",
			state: "Korhal",
			country : "Char"
		}),
		User.create({
			email: "khabib@email.com",
			password: "Kd123456*",
			admin: false,
			username: "noconnor",
			firstName: "Khabib",
			lastName: "Numargamedov",
			apt: "2",
			street: "Eagle st",
			houseNumber: "111",
			zipcode: "11111",
			state: "Dagestan",
			country: "Russian Federation"
		}),
		User.create({
			email: "artem@email.com",
			password: "Ad123456*",
			admin: true,
			username: "thegoat",
			firstName: "Artem",
			lastName: "Lobov",
			apt: "215B",
			street: "Goat st",
			houseNumber: "111",
			zipcode: "11111",
			city: "Dublin",
			country: "Ireland"
		}),
		User.create({
			email: "redion@email.com",
			password: "Yd123456*",
			admin: false,
			username: "redIon",
			firstName: "Red",
			lastName: "Ion",
			apt: "2",
			street: "Main st",
			houseNumber: "1112",
			zipcode: "11111",
			country: "Albania"
		}),
		User.create({
			email: "cersei@email.com",
			password: "Xd123456*",
			admin: true,
			username: "CLan",
			firstName: "Cersei",
			lastName: "lannister",
			apt: "1",
			street: "Kings st",
			houseNumber: "1",
			zipcode: "11111",
			state: "King's Landing",
			country: "Westeros"
		}),
		User.create({
			email: "tywin@email.com",
			password: "Zd123456*",
			admin: true,
			username: "tlan",
			firstName: "Tywin",
			lastName: "Lannister",
			apt: "1",
			street: "Kings",
			houseNumber: "Castle",
			zipcode: "1",
			state: "King's Landing",
			country: "Westeros",
			bankrollDollars: 100000000
		}),
		User.create({
			email: "billyboy@email.com",
			password: "Ed123456*",
			admin: false,
			username: "Billy",
			firstName: "Billy",
			lastName: "Billyson",
			apt: "21C",
			street: "Avenue C",
			houseNumber: "205",
			zipcode: "11009",
			state: "WY",
			country: "USA"
		}),
		User.create({
			email: "tomjones@email.com",
			password: "Dd123456*",
			admin: true,
			username: "tjs",
			firstName: "Tom",
			lastName: "Jones",
			apt: "2B",
			street: "Coney Island Ave",
			houseNumber: "2010",
			zipcode: "11230",
			state: "NY",
			country: "Europe"
		})
		
	]);
	const stocks = await Promise.all([
		Stocks.create({ticker: "TSLA",
		priceHistory: fakeStockData}),
		Stocks.create({ticker: "AMZN",
		priceHistory: fakeStockData}),
		Stocks.create({ticker: "IBM",
		priceHistory: fakeStockData}),
		Stocks.create({ticker: "ORCL",
		priceHistory: fakeStockData})
		
	])
	const transactions = await Promise.all([
		Transaction.create({
			ticker: "TSLA",
			priceAtTransaction: 800.03,
			quantity: 20,
			userId: 1,
			stockId: 1
		}),
		Transaction.create({
			ticker: "AMZN",
			priceAtTransaction: 2134.87,
			quantity: 500,
			userId: 1,
			stockId: 2,
		}),
		Transaction.create({
			ticker: "IBM",
			priceAtTransaction: 150.7,
			quantity: 50,
			userId: 1,
			stockId: 3,
			sold: true,
		}),
		Transaction.create({
			ticker: "ORCL",
			priceAtTransaction: 55.47,
			quantity: 150,
			userId: 3,
			stockId: 4
		})
	])
	
	console.log(`seeded ${transactions.length} transactions`)
	console.log(`seeded ${users.length} users`);
	console.log(`seeded successfully`);
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
	console.log("seeding...");
	try {
		await seed();
	} catch (err) {
		console.error(err);
		process.exitCode = 1;
	} finally {
		console.log("closing db connection");
		await db.close();
		console.log("db connection closed");
	}
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
	runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
