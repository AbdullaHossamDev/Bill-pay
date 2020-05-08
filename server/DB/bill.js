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

class Bill {
  constructor(bill_number, customer_id, cost, payed, remainder, id = -1) {
    this.bill_number = bill_number;
    this.customer_id = customer_id;
    this.cost = cost;
    this.payed = payed;
    this.remainder = remainder;
    this.id = id;
  }


  static save(bills, callback) {
    // console.log('bills in save: ',bills)
    // console.log('bills.length in save: ',bills.length)
    const db = openDB();
    db.serialize(() => {
      // var stmt = db.prepare("insert into bill(bill_number, customer_id, cost, payed, remainder) values(?,?,?,?,?)");
      for (var i = 0; i < bills.length; i++) {
        // stmt.run(bills[i].bill_number, bills[i].customer_id, bills[i].cost,bills[i].payed, bills[i].remainder);
        db.run("insert into bill(bill_number, customer_id, cost, payed, remainder) values($bill_number, $customer_id, $cost, $payed, $remainder)", {
          $bill_number: bills[i].bill_number,
          $customer_id: bills[i].customer_id,
          $cost: bills[i].cost,
          $payed: bills[i].payed,
          $remainder: bills[i].remainder,
        },(err,data)=>{
          console.log('err in save 1')
          if(err){
            console.log('error in save',err)
          return callback(null,err)
          }else{
            console.log('data', data)
            callback('done')
          }
        });
      }
      
    });
    closeDB(db);

  }

  static getBillByNumber(bill_number, callback) {
    const db = openDB();
    db.serialize(() => {

      db.get("select * from bill where bill_number= " + bill_number, (err, row) => {
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

  static getBillByCustomerPayed(customer_id, callback) {
    const db = openDB();
    db.serialize(() => {

      db.all("select * from bill b where b.cost = b.payed and customer_id= " + customer_id, (err, row) => {
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

  static getBillByCustomerNotPayed(customer_id, callback) {
    const db = openDB();
    db.serialize(() => {

      db.all("select * from bill b where b.cost <> b.payed and customer_id= " + customer_id, (err, row) => {
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

  static updateAll(bills, callback) {
    const db = openDB();
    db.serialize(() => {
      var stmt = db.prepare("update bill set payed=? ,remainder=? where id=?");
      for (var i = 0; i < bills.length; i++) {
        stmt.run(bills[i].payed, bills[i].remainder, bills[i].id);
      }
      stmt.finalize((err)=>{
        if(err){
          console.log(err)
        }
        callback('Done');
      });
      
    });
    closeDB(db);

  }

}

module.exports = Bill;