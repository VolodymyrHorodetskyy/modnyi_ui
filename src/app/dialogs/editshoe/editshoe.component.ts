import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RestService} from '../../rest/rest.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import {ShoeslistComponent} from '../../shoeslist/shoeslist.component';
import {PatternsComponent} from '../patterns/patterns.component';
import {CreatepatternComponent} from '../createpattern/createpattern.component';

@Component({
  selector: 'app-editshoe',
  templateUrl: './editshoe.component.html',
  styleUrls: ['./editshoe.component.css']
})
export class EditshoeComponent implements OnInit {

  shoeForm = new FormGroup({
    model: new FormControl('', Validators.required),
    color: new FormControl('', Validators.required),
    companyId: new FormControl('', Validators.required)
  });

  buttonTxt = 'Створити';
  isUpdate = false;
  companies;
  cost;
  price;

  constructor(public rest: RestService, public dialogRef: MatDialogRef<ShoeslistComponent>,
              @Inject(MAT_DIALOG_DATA) public data, public matDialog: MatDialog) {
  }

  ngOnInit() {
    if (this.data != null) {
      this.buttonTxt = 'Змінити';
      this.isUpdate = true;
      this.shoeForm.patchValue({
        model: this.data.model,
        color: this.data.color,
        companyId: this.data.company.id
      });
      this.cost = this.data.cost;
      this.price = this.data.price;
    }
    this.rest.getCompanies().subscribe(value => {
      this.companies = value;
    });
  }

  onSave() {
    if (this.isUpdate) {
      this.shoeForm.value.shoeId = this.data.id;
      this.rest.updateShoe(this.shoeForm.value).subscribe(value => {
        this.dialogRef.close();
      });
    } else {
      this.rest.createShoe(this.shoeForm.value).subscribe(value => {
        this.dialogRef.close();
      });
    }
  }

  onDelete() {
    const conf = confirm('Видалити взуття ' + this.data.model + ' ' + this.data.color + ' ?');
    if (conf) {
      this.rest.deleteShoe(this.data.id).subscribe(value1 => {
      });
    }
  }

  onPatterns() {
    this.matDialog.open(PatternsComponent, {
      data: {patterns: this.data.patterns, id: this.data.id}
    });
  }

  addCreate() {
    this.matDialog.open(CreatepatternComponent, {
      data: this.data.id
    });
  }

}
