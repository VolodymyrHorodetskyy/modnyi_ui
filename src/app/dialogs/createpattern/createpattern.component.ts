import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RestService} from '../../rest/rest.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ShoeslistComponent} from '../../shoeslist/shoeslist.component';

@Component({
  selector: 'app-createpattern',
  templateUrl: './createpattern.component.html',
  styleUrls: ['./createpattern.component.css']
})
export class CreatepatternComponent implements OnInit {

  createPattern = new FormGroup({
    pattern: new FormControl('', Validators.required)
  });

  constructor(public rest: RestService, @Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<ShoeslistComponent>) {
  }

  ngOnInit() {
  }

  savePattern() {
    this.createPattern.value.shoeId = this.data;
    this.rest.addPattern(this.createPattern.value).subscribe(value => {
      this.dialogRef.close();
    });
  }

}
