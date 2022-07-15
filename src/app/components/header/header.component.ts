import { Component, OnInit } from '@angular/core';
import { GetRatesService } from 'src/app/services/get-rates.service';
import { Currency } from 'src/app/models/Currency';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public currency: Currency[] = [];

  constructor(private getRatesServie: GetRatesService) {
    
  }

  ngOnInit(): void {
    this.getRatesServie.getRates().subscribe((data: Currency[]) => {
      this.currency = data;
    });
    this.getRate();
  }

  public options = [
    { id: '1', name: 'Доллар' },
    { id: '2', name: 'Евро' },
    { id: '3', name: 'Гривна' },
  ];

  public selectedOption1 = this.options[2].id;
  public selectedOption2 = this.options[0].id;

  public value1: number | undefined;
  public value2: number | undefined;

  public today:Date = new Date();

  public rate: number | undefined;
  public getBackRate():number {
    this.getRate();
    return this.rate ? 1/this.rate : 0;
  }
  public getRate():number{
    if(this.selectedOption1 === '1' && this.selectedOption2 === '1'){this.rate = 1;}
    if(this.selectedOption1 === '1' && this.selectedOption2 === '2'){this.rate = +this.currency[0].buy / (+this.currency[1].sale)}
    if(this.selectedOption1 === '1' && this.selectedOption2 === '3'){this.rate = +this.currency[0].buy}
    if(this.selectedOption1 === '2' && this.selectedOption2 === '1'){+this.currency[1].buy / (+this.currency[0].sale)}
    if(this.selectedOption1 === '2' && this.selectedOption2 === '2'){this.rate = 1}
    if(this.selectedOption1 === '2' && this.selectedOption2 === '3'){this.rate = +this.currency[1].buy}
    if(this.selectedOption1 === '3' && this.selectedOption2 === '1'){this.rate = 1 / (+this.currency[0].sale)}
    if(this.selectedOption1 === '3' && this.selectedOption2 === '2'){this.rate = 1 / (+this.currency[1].sale)}
    if(this.selectedOption1 === '3' && this.selectedOption2 === '3'){this.rate = 1}
    return (this.rate) ? this.rate : 0;
  }

  public buyCurrency():void{
    this.getRate();
    if(this.value1 && this.rate) {
      this.value2 = +(this.value1 * this.rate).toFixed(3);
    }
  }

  public sellCurrency():void{
    this.getRate();
    if(this.value2 && this.rate){
      this.value1 = +(this.value2 / this.rate).toFixed(3);
    }
  }

  public swapCurrency():void {
    let x = this.selectedOption2;
    this.selectedOption2 = this.selectedOption1;
    this.selectedOption1 = x;
    let y = this.value2;
    this.value1 = y;
    this.buyCurrency();
  }


}
