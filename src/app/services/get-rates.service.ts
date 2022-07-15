import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Currency } from '../models/Currency';


@Injectable({
  providedIn: 'root'
})
export class GetRatesService {

  constructor(private http: HttpClient) { }

  public getRates():Observable<Currency[]>{
    let dataUrl:string = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5'
    return this.http.get<Currency[]>(dataUrl);
  }

}