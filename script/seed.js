"use strict";

const db = require("../server/db");
const {User} = require("../server/db/models");
const {Transaction} = require("../server/db/models");
const {Stocks} = require("../server/db/models");

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
		Stocks.create({ticker: "TSLA"}),
		Stocks.create({ticker: "AMZN"}),
		Stocks.create({ticker: "IBM",}),
		Stocks.create({ticker: "ORCL",})
		
	])
	const transactions = await Promise.all([
		Transaction.create({
			stockTicker: "TSLA",
			priceAtTransaction: 800.03,
			quantity: 20,
			userId: 1,
		
		}),
		Transaction.create({
			stockTicker: "AMZN",
			priceAtTransaction: 2134.87,
			quantity: 500,
			userId: 1,
	
		}),
		Transaction.create({
			stockTicker: "IBM",
			priceAtTransaction: 150.7,
			quantity: 50,
			userId: 1,
			
			sold: true,
		}),
		Transaction.create({
			stockTicker: "ORCL",
			priceAtTransaction: 55.47,
			quantity: 150,
			userId: 3,
			
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
