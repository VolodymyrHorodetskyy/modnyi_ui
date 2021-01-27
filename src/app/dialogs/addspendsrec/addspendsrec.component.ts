import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AdsSpendsService} from "../../rest/ads-spends.service";
import {DatePipe} from "@angular/common";
import {MatDialogRef} from "@angular/material";
import {AdsSpendsComponent} from "../../ads-spends/ads-spends.component";

@Component({
  selector: 'app-addspendsrec',
  templateUrl: './addspendsrec.component.html',
  styleUrls: ['./addspendsrec.component.css']
})
export class AddspendsrecComponent implements OnInit {

  adsSpendRec = new FormGroup({
    start: new FormControl('', Validators.required),
    end: new FormControl('', Validators.required),
    spends: new FormControl('', Validators.required)
  });

  constructor(public restAdsSpends: AdsSpendsService, private datePipe: DatePipe, public dialogRef: MatDialogRef<AdsSpendsComponent>) {
  }

  ngOnInit() {
  }

  onButtonSave() {
    const adsSpends = this.adsSpendRec.value;
    adsSpends.start = this.tranformDate(adsSpends.start);
    adsSpends.end = this.tranformDate(adsSpends.end);
    console.log(adsSpends);
    this.restAdsSpends.saveAdsSpends(adsSpends).subscribe(value => {
      this.dialogRef.close();
    });
  }

  private tranformDate(date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd HH:mm');
  }

}
