import { Component, OnInit, ViewChild, } from '@angular/core';
import { Country } from '../entities/country';
import { CountryService } from '../service/country.service';
import { Observable, Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';


@Component({
  selector: 'app-listcountries',
  templateUrl: './listcountries.component.html',
  styleUrls: ['./listcountries.component.scss']
})
export class ListcountriesComponent implements OnInit {
  @ViewChild(PerfectScrollbarComponent) public directiveScroll: PerfectScrollbarComponent;

  selectedCountry:Country=null;
  countries: Country[]=null; 
  countries$: Observable<Country>;
  found :boolean=false;
  private searchTerms = new Subject<string>();
  activeCountry:Country;
  constructor(  private  countryService:CountryService) { }

  ngOnInit(): void {
      this.listcountries();
  }
  search(term: string): void {
    if (!term.trim()) {
      this.found=false;
      
    }else {
    this.searchTerms.next(term);
    }
    
  }
  onSelect(country:Country)
  {
      this.activeCountry=country;
  }

  listcountries():void{

    this.searchByCountry();
    this.countryService.getCountries().subscribe(list => 
      {
      this.countries=list
      this.found=false;
      }
      );
  }

  searchByCountry():void{

    this.countries$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      switchMap((term: string) => this.countryService.searchCountry(term)))
      this.countries$.subscribe(country=>
        {
          this.selectedCountry=country;this.found=true;
      
        }
        )
  }

  

}
