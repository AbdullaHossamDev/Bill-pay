import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-bills',
  templateUrl: './edit-bills.component.html',
  styleUrls: ['./edit-bills.component.css']
})
export class EditBillsComponent implements OnInit {
  numbers;
  willPay = 0;

  count = 0;
  constructor(
    public dialogRef: MatDialogRef<EditBillsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99]
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  validateAddedValue(index, added) {
    var newValue = added.target.value;
    if (newValue < 0) {
      newValue = 0;
    }
    if (this.data.bills[index].add) {
      if (Number(newValue) > Number(this.data.bills[index].add)) {
        if ((this.count + (Number(newValue) - Number(this.data.bills[index].add))) > Number(this.data.willPay)) {
          alert('The cost of all bills is more than the payed, Please recheck your added value!')
          this.validateAddedValue(index, { target: { value: this.data.bills[index].add } })
        } else if ((Number(newValue) - Number(this.data.bills[index].add)) + this.data.bills[index].payed > this.data.bills[index].cost) {
          alert(`You pay for bill ${this.data.bills[index].bill_number} much more money!`);
          this.validateAddedValue(index, { target: { value: this.data.bills[index].add } })
        } else {
          this.count += (Number(newValue) - Number(this.data.bills[index].add));
          this.data.bills[index].payed += (Number(newValue) - Number(this.data.bills[index].add));
          this.data.bills[index].remainder = Number(this.data.bills[index].cost) - Number(this.data.bills[index].payed);
          this.data.bills[index].add = Number(newValue);
        }
      } else { // Number(newValue) > this.data.bills[index].add)
        if (Number(this.data.bills[index].add) - Number(newValue) >= 0) {
          this.count -= (Number(this.data.bills[index].add) - Number(newValue));
          this.data.bills[index].payed -= (Number(this.data.bills[index].add) - Number(newValue));
          this.data.bills[index].remainder = Number(this.data.bills[index].cost) - Number(this.data.bills[index].payed);
          this.data.bills[index].add = Number(newValue);
        } else {
          alert('please check your inputs')
        }
      }
    } else { // this.data.bills[index].add
      if ((this.count + Number(newValue)) > this.data.willPay) {
        alert('The cost of bills is more than the payed, Please recheck your added value!')
        this.validateAddedValue(index, { target: { value: 0 } })
      } else if ((Number(newValue) + Number(this.data.bills[index].payed)) > Number(this.data.bills[index].cost)) {
        alert(`You pay for bill ${this.data.bills[index].bill_number} much more money!`);
        this.validateAddedValue(index, { target: { value: 0 } })
      } else {
        this.count += Number(newValue);
        this.data.bills[index].payed += Number(newValue);
        this.data.bills[index].remainder = Number(this.data.bills[index].cost) - Number(this.data.bills[index].payed);
        this.data.bills[index].add = Number(newValue);
      }
    }

  }


  addPayedValue() {
    if (this.willPay - this.count < 0) {
      alert('The new added value is less than needed, fix it please or change your bills pay!')
    }
    this.data.willPay = this.willPay;
  }

  submit(){
    this.dialogRef.close(this.data);
  }

}
