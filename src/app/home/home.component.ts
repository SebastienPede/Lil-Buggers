import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../services/catalog.service';

import { Product } from '../Product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  saleProducts:Product[]
  newProducts:Product[]
  popularProducts:Product[]
  




  constructor(private catalogService:CatalogService) { }

  ngOnInit(): void {


    
    this.saleProducts = this.catalogService.getProductsByLabel('sale')
    this.newProducts = this.catalogService.getProductsByLabel('new')
    this.popularProducts = this.catalogService.getProductsByLabel('popular')



  }

}
