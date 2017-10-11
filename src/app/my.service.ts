import { Injectable } from '@angular/core';
import { Http,Headers,Response } from '@angular/http';
import 'rxjs';

@Injectable()
export class MyService {

public results :any;
  constructor(private http: Http) {

  }

  getPlanets() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('https://findfalcone.herokuapp.com/planets', {
        headers: headers
      })
      .map((res: Response) => res.json())
  }

  getVehicles() {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('https://findfalcone.herokuapp.com/vehicles', {
        headers: headers
      })
      .map((res: Response) => res.json())
  }

  getToken() {

    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return this.http.post('https://findfalcone.herokuapp.com/token', {}, {
        headers: headers
      })
      .map((res: Response) => res.json());

  }

  findFalcone(data) {
    console.log('in service', data);

    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    return this.http.post('https://findfalcone.herokuapp.com/find', data, {
        headers: headers
      })
      .map((res: Response) => res.json()).toPromise();
    //return this.http.post('',data,{ headers : headers})

  }

  setResult(data){
     this.results = data;
     console.log('results',this.results);

  }

  getResult(){
    console.log('get results',this.results);

      return this.results;
  }

}

