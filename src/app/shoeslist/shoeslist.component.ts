import {Component, OnInit} from '@angular/core';
import {RestService} from '../rest/rest.service';
import {MatDialog} from '@angular/material';
import {EditshoeComponent} from '../dialogs/editshoe/editshoe.component';
import {CreatepatternComponent} from '../dialogs/createpattern/createpattern.component';
import {PatternsComponent} from '../dialogs/patterns/patterns.component';
import {NewshoepricedialogComponent} from '../dialogs/newshoepricedialog/newshoepricedialog.component';

@Component({
  selector: 'app-shoeslist',
  templateUrl: './shoeslist.component.html',
  styleUrls: ['./shoeslist.component.css']
})
export class ShoeslistComponent implements OnInit {

  shoes;
  value = '';
  columnsToDisplay = ['model', 'color', 'price', 'cost', 'patterns', 'actions'];


  constructor(public rest: RestService, public matDialog: MatDialog) {
  }

  ngOnInit() {
    this.updateShoesList();
  }

  updateShoesList(model = null) {
    this.rest.getItems(model).subscribe(shoes => {
      this.shoes = shoes;
    });
  }

  onInput(value) {
    this.updateShoesList(value);
  }

  onCreateOrEdit(shoe = null) {
    const dialogRef = this.matDialog.open(EditshoeComponent, {
      data: shoe
    });
    dialogRef.afterClosed().subscribe(value1 => {
      this.updateShoesList();
    });
  }

  addPattern(row) {
    const dialogRef = this.matDialog.open(CreatepatternComponent, {
      data: row.id
    });
    dialogRef.afterClosed().subscribe(value1 => {
      this.updateShoesList();
    });
  }

  removePattern(row) {
    const diaalogRef = this.matDialog.open(PatternsComponent, {
      data: {id: row.id, patterns: row.patterns}
    });
    diaalogRef.afterClosed().subscribe(value1 => {
      this.updateShoesList();
    });
  }

  onSetPricesClick(id) {
    const dialogRef = this.matDialog.open(NewshoepricedialogComponent, {
      data: id
    });
    dialogRef.afterClosed().subscribe(value1 => {
      this.updateShoesList();
    });
  }

}
