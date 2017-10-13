import { Component, OnInit,Input, Output, EventEmitter,ViewChild } from '@angular/core';
import { ResultComponent } from'../../components/result/result.component';
import { MyService } from'../../my.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})

export class HomeComponent implements OnInit {

  planets = [];
  final: any;
  vehicles = [];
  token: string;
  planet_names = [];
  vehicle_names = [];
  timeTaken = [];
  time_taken: number = 0;
  result: string;


  constructor(private _myservice: MyService, private route: Router) {}


  @ViewChild('radio1') r1;
  @ViewChild('radio2') r2;
  @ViewChild('radio3') r3;
  @ViewChild('radio4') r4;
  @ViewChild('findF') btn;
  @ViewChild('s1') s1;
  @ViewChild('s2') s2;
  @ViewChild('s3') s3;
  @ViewChild('s4') s4;

  ngOnInit() {
    //gets planets objects
    this.btn.nativeElement.disabled = true;
    this._myservice.getPlanets().subscribe(data => {
      this.planets = data;

    });

    //gets vehicles array of objects
    this._myservice.getVehicles().subscribe(data1 => {
      this.vehicles = data1;
    });

    //gets token value
    this._myservice.getToken().subscribe(token => {
      this.token = token.token;
    });

  }


  onChange(event, id) {

    let planet = event.target.value;
    if (this.planet_names.length < 4) {

      if (this.planet_names.length == 0) {

        this.planet_names.push(planet);
        this.r1.nativeElement.style.visibility = 'visible';
        this.s1.nativeElement.disabled = true;


      } else {

        let indexP1 = this.planet_names.map(function (e) {
          return e;
        }).indexOf(planet);

        //disables checkbox of vehicle whose total_no is 0
        this.vehicles.forEach((s) => {
          if (s.total_no == 0) {

            let i = this.vehicles.map(e => {
              return e;
            }).indexOf(s);

            this.r2.nativeElement.children[i].children[0].children[0].disabled = true;
            this.r3.nativeElement.children[i].children[0].children[0].disabled = true;
            this.r4.nativeElement.children[i].children[0].children[0].disabled = true;
          }
        });

        if (this.planet_names.indexOf(this.planet_names[indexP1]) == -1) {

          switch (id) {
            case 2:

              this.r2.nativeElement.style.visibility = 'visible';
              this.s2.nativeElement.disabled = true;
              break;
            case 3:
              this.r3.nativeElement.style.visibility = 'visible';
              this.s3.nativeElement.disabled = true;
              break;
            case 4:
              this.r4.nativeElement.style.visibility = 'visible';
              this.s4.nativeElement.disabled = true;
              this.btn.nativeElement.disabled = false;


              break;


          }
          this.planet_names.push(planet);



        } else {
          alert('Please select unique destination');
        }
     }

    }

  }


  onCheck(val, id, event) {


    if (this.vehicle_names.length < 4) {

      let indexV = this.vehicles.map(function (e) {
        return e.name
      }).indexOf(val);

      let indexP = this.planets.map(function (e) {
        return e.name
      }).indexOf(this.planet_names[id]);


    this.vehicles[indexV].total_no = this.vehicles[indexV].total_no - 1;

      if (this.vehicles[indexV].max_distance >= this.planets[indexP].distance) {

          if (this.vehicles[indexV].total_no == 0) {
            event.target.disabled = true;
          }

        let pDistance = this.planets[indexP].distance; // fetches distance of a planet

        let time_taken1 = (pDistance / this.vehicles[indexV].speed); // calculates time taken to reach the planet

        this.timeTaken.push(time_taken1); // array contains time taken to travel each destination
        this.time_taken = this.timeTaken.reduce((a, b) => a + b); // calulates the total time taken
        this.vehicle_names.push(val);
      } else {
        event.currentTarget.checked = false;
        this.vehicles[indexV].total_no = this.vehicles[indexV].total_no + 1;
        alert("Vehicle range is grater than planet");
      }


    }
    else{
     event.currentTarget.checked = false;
     alert('Already 4 vehicles selected');
    }


  }


  findFalcone() {

    let final = {
      token: this.token,
      planet_names: this.planet_names,
      vehicle_names: this.vehicle_names
    };


    this._myservice.findFalcone(final).then(data => {


      if (data.status == "success") {

        data.time_taken = this.time_taken;
        this._myservice.setResult(data);
        this.route.navigate(['/result']);

      } else {
        alert('Status:findFalcone failed');

      }
    }).catch(reason => {
      alert(reason);
    })

  }

}


