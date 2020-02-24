import {Component, OnInit} from '@angular/core';
import {RestService} from '../rest/rest.service';
import {Shoe} from '../entity/Shoe';
import {Configuration} from '../configuration';

@Component({
  selector: 'app-shoeslist',
  templateUrl: './shoeslist.component.html',
  styleUrls: ['./shoeslist.component.css']
})
export class ShoeslistComponent implements OnInit {

  shoes: Shoe[];
  value = '';

  constructor(public rest: RestService, public configuration: Configuration) {
  }

  ngOnInit() {
    this.rest.getItems(null).subscribe(shoes => {
      this.shoes = shoes;
    });
  }

  onInput(value) {
    this.rest.getItems(value).subscribe(shoes => {
      this.shoes = shoes;
    });
  }

}
