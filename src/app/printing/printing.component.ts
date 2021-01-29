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
    this.rest.getMarking(this.modelAndColor, this.size, this.ttn).subscribe(value => {
      this.markings = value;
    });
  }

}
