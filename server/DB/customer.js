const sqlite3 = require('sqlite3').verbose();

function openDB() {
	//return new sqlite3.Database('../database/crm_ass.db',(err) => {
	return new sqlite3.Database('./DB/database.db', (err) => {
		if (err) {
			console.error('0 ', err.message);
		}
	});

}

function closeDB(db) {
	db.close((err) => {
		if (err) {
			console.error(err.message);
		}
	});
}

class Customer {
	constructor(name, id = -1) {
		this.name = name;
		this.id = id;
	}

	save(callback) {
		const db = openDB();
		var id = -1;
		db.serialize(() => {
			var stmt = "insert into customer(name) values('" + this.name + "')";
			db.run(stmt, function (err) {
				if (err) { console.log(err.message); callback(null, err); }
				else {
					id = this.lastID;
					callback(id);
				}
			});
		});
		closeDB(db);
	}

	static getCustomer(id, callback) {
		const db = openDB();
		db.serialize(() => {

			db.get("select * from customer where id= " + id, (err, row) => {
				if (err) {
					console.log('1 ', err);
					callback(null, err);
					return;
				}
				callback(row);
			});
		});
		closeDB(db);
	}

	static getAllCustomers(callback) {
		const db = openDB();
		db.serialize(() => {

			db.all("select * from customer", (err, row) => {
				if (err) {
					console.log('1 ', err);
					callback(null, err);
					return;
				}
				callback(row);
			});
		});
		closeDB(db);
	}

}

module.exports = Customer;