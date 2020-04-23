import { Component, OnInit, Input } from '@angular/core';
import { GlobalService } from '../service/global.service';
import { Global } from '../entities/global';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  global:Global;
  constructor(private globalService:GlobalService) { }

  ngOnInit(): void {
    this.getStates();
  }

  getStates(): void {
    this.globalService.getGlobalStat()
      .subscribe(global => this.global = global);
  }


}
