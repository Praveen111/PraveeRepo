import { Component, OnInit,Output, Input, EventEmitter } from '@angular/core';
import { Resolve } from '@angular/router';
import { MyService } from'../../my.service';


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  public planet: string;
  public time_taken1: string;
  constructor(private _myservice: MyService) {}

  ngOnInit() {

    console.log('initiating result component');
    let data = this._myservice.getResult();
    this.planet = data.planet_name;
    this.time_taken1 = data.time_taken;
  }


}

