import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  constructor(private http: HttpClient) { }


  public getLocationRecommender(id){
    return this.http.get("http://34.68.120.1/airbnb_location_recommender?location_id="+id);

  }
  public recommendLocation(id){
    return this.http.get("http://34.68.120.1/competitor_recommend_location?location_id="+id);
  }
  public getPricePredictor(security_deposit) {
    let URL = "http://34.68.120.1/price_predictor?security_deposit="+security_deposit
    return this.http.get(URL);
  }

}
