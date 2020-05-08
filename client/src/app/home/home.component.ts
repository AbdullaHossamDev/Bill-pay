import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditBillsComponent } from '../edit-bills/edit-bills.component';
import { AddBillComponent } from '../add-bill/add-bill.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user;
  searchInput;
  customers;
  bills;
  choosedBills = [];

  showedCustomers = [];
  notPayed = true;
  currentCustomer;

  constructor(
    private http: HttpService,
    private route: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.user = this.http.getUser();
    console.log('this.http.getUser(): ', this.user.email)
    if (!this.user || this.user == '') {
      this.route.navigate(['/login']);
    }

    this.http.getCustomers().subscribe((data: any) => {
      if (data.msg == 'success') {
        this.customers = data.customers;
        this.showedCustomers = this.customers;
      }
      else {
        alert(data.msg)
      }
    })
  }

  filterList() {
    console.log('d5l hna')
    this.showedCustomers = this.customers.filter((item) => {
      return item.name.toLowerCase().includes(this.searchInput.toLowerCase());
    });
  }

  getBills(customer) {
    this.currentCustomer = customer;
    this.http.getCustomerBills(customer.id).subscribe((data: any) => {
      if (data.msg != 'success') {
        alert(data.msg)
      }
      this.bills = data.bills;
      this.notPayed= true;
      this.choosedBills = []
    }, err => {
      if (err.status == 500) {
        alert(err.error.msg);
      }
    })
  }

  editBills(form) {
    const dialogRef = this.dialog.open(EditBillsComponent, {
      width: '800px',
      height: '600px',
      data: {
        bills: this.choosedBills,
        customerName: this.currentCustomer.name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.http.updateBills(result).subscribe((data: any) => {
          if (data.msg) {
            alert("Bills updated successfully")
            this.choosedBills = []
            this.getBills(this.currentCustomer)
          }
        }, err => {
          alert(err.error.msg)
        });
      }


    });
  }

  addBill(){
    const dialogRef = this.dialog.open(AddBillComponent, {
      width: '850px',
      height: '400px',
      data: {
        customerName: this.currentCustomer.name,
        customer_id: this.currentCustomer.id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.http.addBills(result).subscribe((data: any) => {
          if (data.msg) {
            alert("Bills updated successfully")
            this.choosedBills = []
            this.getBills(this.currentCustomer)
          }
        }, err => {
          alert(err.error.msg)
        });
      }
    });
  }


  onChange(id: string, isChecked: boolean) {
    if (isChecked) {
      const index = this.bills.findIndex(x => x.id === id);
      this.choosedBills.push(this.bills[index]);
    } else {
      const index = this.choosedBills.findIndex(x => x.id === id);
      this.choosedBills.splice(index, 1)
    }
  }

  changePayed() {
    console.log('notPayed: ', this.notPayed)
    this.choosedBills = []
    if (!this.notPayed) {
      console.log('d5l 1')
      this.http.getCustomerBills(this.currentCustomer.id).subscribe((data: any) => {
        if (data.msg != 'success') {
          alert(data.msg)
        }
        console.log('bills: ', data.bills)
        this.bills = data.bills;
      }, err => {
        if (err.status == 500) {
          alert(err.error.msg);
        }
      })
    } else {
      console.log('d5l 2')

      this.http.getCustomerPayedBills(this.currentCustomer.id).subscribe((data: any) => {
        if (data.msg != 'success') {
          alert(data.msg)
        }
        console.log('bills: ', data.bills)
        this.bills = data.bills;
      }, err => {
        if (err.status == 500) {
          alert(err.error.msg);
        }
      })
    }
  }
}
