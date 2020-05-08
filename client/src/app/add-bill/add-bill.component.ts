import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-bill',
  templateUrl: './add-bill.component.html',
  styleUrls: ['./add-bill.component.css']
})
export class AddBillComponent implements OnInit {

  bills = [];
  constructor(
    public dialogRef: MatDialogRef<AddBillComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    var bill ={
      bill_number: '',
      customer_id: this.data.customer_id,
      cost: 0,
      payed: 0,
      remainder: 0,
    }
    this.bills.push(bill);
  }

  addBill() {
    var bill ={
      bill_number: '',
      customer_id: this.data.customer_id,
      cost: 0,
      payed: 0,
      remainder: 0,
    }
    this.bills.push(bill);
  }

  addPayed(ind, event) {
    var newValue = event.target.value;
    if (Number(newValue) <= Number(this.bills[ind].cost)) {
      this.bills[ind].payed = Number(newValue);
      this.bills[ind].remainder = Number(this.bills[ind].cost) - Number(this.bills[ind].payed);
    }
    else {
      alert(`The new value is much more the bill's needed!!`)
    }
  }

  submit() {
    this.dialogRef.close(this.bills)
  }

}
