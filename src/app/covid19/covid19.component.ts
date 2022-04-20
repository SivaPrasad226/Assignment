import { Component, OnInit, ViewChild } from '@angular/core';
import { CountryReports } from 'src/countryReports';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CovidinfoService } from '../covidinfo.service';
import {  MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';


@Component({
  selector: 'app-covid19',
  templateUrl: './covid19.component.html',
  styleUrls: ['./covid19.component.css']
})
export class Covid19Component implements OnInit {
  
  @ViewChild(MatSidenav, {static: false}) 
   sidenav!:MatSidenav;

  ELEMENT_DATA : CountryReports[];
 // displayedColumns: string[] = ['country','cases','todayCases','deaths','todayDeaths','recovered','active','critical','casesPerOneMillion','deathsPerOneMillion','tests','testsPerOneMillion'];
 displayedColumns: string[] = ['country','cases','todayCases','deaths','todayDeaths','recovered','active','critical'];
 
 dataSource = new MatTableDataSource<CountryReports>(this.ELEMENT_DATA);
  
 cards = [
  {title: 'cases', content: 758455},
  {title: 'todayCases', content: '25841'},
  {title: 'deaths', content: '102'},
  {title: 'todayDeaths', content: '45'}
];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private service:CovidinfoService ,private observer:BreakpointObserver) { }

  ngAfterViewInit(){
    this.observer.observe(['(max-width:800px)']).subscribe((res)=>{
if(res.matches){
  this.sidenav.mode='over';
  this.sidenav.close();

}
else{
  this.sidenav.mode='side';
  this.sidenav.open();
}
    });
  }
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort=this.sort;
    this.getAllReports();
    console.log(this.dataSource)
  }

  public getAllReports(){
    let resp = this.service.covid19Reports();
    resp.subscribe(report=>this.dataSource.data=report  as CountryReports[])
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
