import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {EditshoeComponent} from '../editshoe/editshoe.component';
import {RestService} from '../../rest/rest.service';

@Component({
  selector: 'app-patterns',
  templateUrl: './patterns.component.html',
  styleUrls: ['./patterns.component.css']
})
export class PatternsComponent implements OnInit {

  patterns;

  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<EditshoeComponent>,
              public rest: RestService) {
    if (this.data.patterns != null) {
      this.patterns = data.patterns;
    } else {
      this.patterns = [];
    }
  }

  ngOnInit() {
  }

  onDelete(row) {
    this.rest.deletePattern({shoeId: this.data.id, pattern: row}).subscribe(value => {
      const index = this.patterns.indexOf(row, 0);
      if (index > -1) {
        this.patterns.splice(index, 1);
      }
    });
  }

}
