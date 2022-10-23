import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiURL;
  private authToken = environment.authToken;
  private selectedBusiness = new BehaviorSubject('');
  selectedBusinessObj = this.selectedBusiness.asObservable();

  constructor(private http: HttpClient) {

  }

  // Method to call the API to get local business data based on latitude and longitude
  getLocalBusinessData(latitude: Number, longitude: Number): Promise<void | any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authToken}`,
      // 'Access-Control-Allow-Headers': 'Content-Type',
      // 'Access-Control-Allow-Methods': 'GET',
      // 'Access-Control-Allow-Origin':'*'
    })
    return this.http.get(this.apiUrl + `&latitude=${latitude}`+`&longitude=${longitude}`, { headers: headers })
      .toPromise()
      .then(response => response as any[])
      .catch(this.handleError);
  }

// Method to read JSON with all data
  getJSON(): Observable<any> {
    return this.http.get("./assets/businessData.json");
  }

  // Method to read JSON with six data
  getFirstSixJSON(): Observable<any> {
    return this.http.get("./assets/businessDataFirstSix.json");
  }


  private handleError(error: any) {
    console.log(error.error.message);
  }
}
