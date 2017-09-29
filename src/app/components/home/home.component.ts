import { Component, OnInit } from '@angular/core';
import { MyService } from'../../my.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'app works!';
  planets = [];
  final: any;
  vehicles = [];
  token: string;
  planet_names = [];
  vehicle_names = [];
  timeTaken = [];
  time_taken: number = 0;
  result: string;
  show: boolean = false;
  constructor(private _myservice: MyService, private route : Router) {}

  ngOnInit() {
    //gets planets objects
    this._myservice.getPlanets().subscribe(data => {
      this.planets = data;
      console.log('this.planets:', this.planets);

    });

    //gets vehicles array of objects
    this._myservice.getVehicles().subscribe(data1 => {
      this.vehicles = data1;

      console.log('this.vehicles:', this.vehicles);

    });

    //gets token value
    this._myservice.getToken().subscribe(token => {
      this.token = token.token;
    });

  }


  onChange(selectedVal) {
    console.log('Planet name:', selectedVal);

    if (this.planet_names.length < 4) {
      if (this.planet_names.length == 0) {
        this.planet_names.push(selectedVal);
      } else {
        let indexP1 = this.planet_names.map(function (e){
          return e;
        }).indexOf(selectedVal);

        if (this.planet_names.indexOf(this.planet_names[indexP1]) == -1) {
          this.planet_names.push(selectedVal);
        }
        else{
            alert('Please select unique destination');
        }
      }

      // let index = this.planets.map(function (e) {
      //   return e.name;
      // }).indexOf(selectedVal);
      // console.log('index in planets :', index);
      //this.planets.splice(index, 1);
      //console.log('planets array of objects:',this.planets);
    }

    console.log('planet_names', this.planet_names);

  }


onCheck(val, id, event) {

  console.log('vehicle selected and id', val, id);
  console.log('planet :', this.planet_names[id]);
  console.log('event obj', event);



  if (this.vehicle_names.length < 4) {

    let indexV = this.vehicles.map(function (e) {
      return e.name
    }).indexOf(val);

    let indexP = this.planets.map(function (e) {
      return e.name
    }).indexOf(this.planet_names[id]);


    if (this.vehicles[indexV].max_distance >= this.planets[indexP].distance) {

      console.log('Vehicle object:', this.vehicles[indexV]);
      let pDistance = this.planets[indexP].distance; // fetches distance of a planet
      console.log('planet obj:', this.planets[indexP]);
      this.vehicles[indexV].total_no = this.vehicles[indexV].total_no - 1; //decrement value by 1

      //disables thecheckbox element
      // this.vehicles.forEach(element => {
      //   if (element.total_no == 0) {
      //     event.target.disabled = true;
      //   }
      // })

      if (this.vehicles[indexV].total_no == 0) {
        event.target.disabled = true;
      }

      let time_taken1 = (pDistance / this.vehicles[indexV].speed); // calculates time taken to reach the planet


      console.log('time_taken:', time_taken1);
      //this.time_taken = time_taken1;
      this.timeTaken.push(time_taken1); // array contains time taken to travel each destination
      this.time_taken = this.timeTaken.reduce((a, b) => a + b); // calulates the total time taken
      this.vehicle_names.push(val);
    } else {
      event.currentTarget.checked = false;
      alert("Vehicle range is grater than planet");
    }


  }

  console.log('vehicle_names', this.vehicle_names);

}




  findFalcone() {

    let final = {
      token: this.token,
      planet_names: this.planet_names,
      vehicle_names: this.vehicle_names
    };



    console.log('total time taken:', this.time_taken);
    console.log('token value:', final.token);
    console.log('final object:', final);

    this._myservice.findFalcone(final).then(data => {

      console.log('findFalcone response:', data);
      if (data.status == "success"){
 this.result = data.planet_name

      }
else{
alert('Status:findFalcone failed');
console.log('status failure');

}
    }).catch(reason => {
      alert(reason);
    })

  }

  }


