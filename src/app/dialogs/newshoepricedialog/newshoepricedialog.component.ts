import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {EditshoeComponent} from '../editshoe/editshoe.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RestorderService} from '../../rest/restorder.service';

@Component({
  selector: 'app-newshoepricedialog',
  templateUrl: './newshoepricedialog.component.html',
  styleUrls: ['./newshoepricedialog.component.css']
})
export class NewshoepricedialogComponent implements OnInit {

  newShoePriceGroup = new FormGroup({
    cost: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required)
  });


  constructor(private rest: RestorderService, public dialogRef: MatDialogRef<EditshoeComponent>, @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit() {
  }

  onSave() {
    this.newShoePriceGroup.value.shoeId = this.data;
    this.rest.setNewShoePrice(this.newShoePriceGroup.value).subscribe(value => {
      this.dialogRef.close();
    });
  }

}
