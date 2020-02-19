import {Component, OnInit} from '@angular/core';
import {RestService} from './rest/rest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'modnyichobitokui';



  constructor(public rest: RestService) {
  }

  ngOnInit() {

  }


}
