const app = require('express')();
const bodyParser = require('body-parser')

const { User, Bill, Customer } = require('./DB');



app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/v1/user', (req, res, next) => {
  var email = req.body.email;
  var password = req.body.password;
  // console.log(req.body)
  if (!email || !password) {
    return res.status(400).json({ msg: 'Bad request' });
  }
  next()
})

app.post('/api/v1/user/getUser', (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  User.getUser(email, password, (data, err) => {
    if (err) {

      return res.status(500).json({ msg: 'Internal Error, try again soon' });
    }
    if (data) {
      return res.status(200).json({ msg: 'success', user: data })
    }
    res.status(400).json({ msg: 'Email or password are invalid!!' })
  })
})

app.post('/api/v1/user/saveUser', (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  let user = new User(email, password);
  user.save((data, err) => {
    if (err) {
      if (err.errno == 19) {
        return res.status(400).json({ msg: 'Email is already exist!' })
      }
      return res.status(500).json({ msg: 'Internal Error, try again soon' });
    }
    if (data) {
      return res.json({ msg: 'success', user_id: data })
    }

  })
})
///////////////////////////////////
app.post('/api/v1/customer/saveCustomer', (req, res, next) => {
  var name = req.body.name;
  if (!name) {
    return res.status(400).json({ msg: 'Bad request' });
  }


  let customer = new Customer(name);
  customer.save((data, err) => {
    if (err) {
      return res.status(500).json({ msg: 'Internal Error, try again soon' });
    }
    if (data) {
      return res.json({ msg: 'success', customer_id: data })
    }
  })
})

app.get('/api/v1/customer/getCustomer', (req, res, next) => {
  var id = req.body.id;
  if (!id) {
    return res.status(400).json({ msg: 'Bad request' });
  }

  Customer.getCustomer(id, (data, err) => {
    if (err) {
      return res.status(500).json({ msg: 'Internal Error, try again soon' });
    }
    if (data) {
      return res.json({ msg: 'success', customer: data })
    }
    return res.status(400).json({ msg: 'No customer with this id!' });
  })
})

app.get('/api/v1/customer/getAllCustomer', (req, res, next) => {
  Customer.getAllCustomers((data, err) => {
    if (err) {
      return res.status(500).json({ msg: 'Internal Error, try again soon' });
    }

    if (data.length > 0) {
      return res.json({ msg: 'success', customers: data })
    }
    return res.json({ msg: 'There are no customers' });
  })
})
//////////////////////////////////
app.post('/api/v1/bill/saveBill', (req, res) => {
  console.log(req.body.bills)
  var bills = req.body.bills;
  Bill.save(bills,(data, err) => {
    if (err) {
      if (err.errno == 19) {
        return res.status(400).json({ msg: 'This bill is already exists' })
      }
      return res.status(500).json({ msg: 'Internal Error, try again soon' });
    }

    if (data) {
      return res.json({ msg: 'success', bill_id: data });
    }
  })
})

app.post('/api/v1/bill/getPayedBill', (req, res) => {
  var customer_id = req.body.customer_id;
  if (!customer_id) {
    return res.status(400).json({ msg: 'Bad request' });
  }

  Bill.getBillByCustomerPayed(customer_id, (data, err) => {
    if (err) {
      return res.status(500).json({ msg: 'Internal Error, try again soon' });
    }

    if (data.length > 0) {
      return res.json({ msg: 'success', bills: data });
    }
    return res.json({ msg: 'There are no payed bills for this customer!' })
  })
})

app.post('/api/v1/bill/getNotPayedBill', (req, res) => {
  var customer_id = req.body.customer_id;
  if (!customer_id) {
    return res.status(400).json({ msg: 'Bad request' });
  }

  Bill.getBillByCustomerNotPayed(customer_id, (data, err) => {
    if (err) {
      return res.status(500).json({ msg: 'Internal Error, try again soon' });
    }
    if (data.length > 0) {
      return res.json({ msg: 'success', bills: data });
    }
    return res.json({ msg: 'This customer payed all his bills!' })
  })
})

app.post('/api/v1/bill/getBill', (req, res) => {
  var bill_number = req.body.bill_number;
  if (!bill_number) {
    return res.status(400).json({ msg: 'Bad request' });
  }

  Bill.getBillByNumber(bill_number, (data, err) => {
    if (err) {
      return res.status(500).json({ msg: 'Internal Error, try again soon' });
    }

    if (data) {
      return res.json({ msg: 'success', bill: data });
    }
    return res.json({ msg: 'There no bill with this number!' })
  })
})

app.put('/api/v1/bill/update', (req, res) => {
  var bills = req.body.bills;
  // console.log('bills: ',JSON.stringify(req.body.bills))
  if (!bills || bills.length == 0) {
    return res.status(400).json({ msg: 'Bad request' });
  }

  Bill.updateAll(bills.bills, (data, err) => {
    if (err) {
      return res.status(500).json({ msg: 'Internal Error, try again soon' });
    }
    // console.log('done in update')
    if (data) {
      return res.status(200).json({ msg: 'success' });
    }
  })
})

var port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log('listening on port: ', port)
});
