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

class User {
	constructor(email, password, id = -1) {
		this.email = email;
		this.password = password;
		this.id = id;
	}

	save(callback) {
		const db = openDB();
		var id = -1;
		db.serialize(() => {
			var stmt = "insert into user(email, password) values('" + this.email + "','" + this.password + "')";
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

	static getUser(email, password, callback) {
		const db = openDB();
		db.serialize(() => {

			db.get("select * from user where email= '" + email + "' and password = '" + password + "'", (err, row) => {
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

module.exports = User;