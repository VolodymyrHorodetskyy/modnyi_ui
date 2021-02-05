import {Component, OnInit} from '@angular/core';
import {AdsSpendsService} from "../rest/ads-spends.service";

@Component({
  selector: 'app-printing',
  templateUrl: './printing.component.html',
  styleUrls: ['./printing.component.css']
})
export class PrintingComponent implements OnInit {

  ttn;
  modelAndColor;
  size;
  printed = true;

  markings;

  constructor(private rest: AdsSpendsService) {
  }

  ngOnInit() {
    this.onFilterChange();
  }

  onFilterChange() {
    if (this.size == null) {
      this.size = '';
    }
    this.rest.getMarking(this.modelAndColor, this.size, this.ttn, this.printed).subscribe(value => {
      this.markings = value;
    });
  }

  printMarking(id) {
    this.rest.setPrinted(id).subscribe(value => {
      this.onFilterChange();
    });
  }

  setValue(event) {
    this.printed = event.checked;
    this.onFilterChange();
  }

}
