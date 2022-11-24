import { Injectable } from '@angular/core';

import { Product } from '../Product';
import { CATALOG } from '../Catalog';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor() { }

  getCatalog(){
    return CATALOG
  }

  getProductsFromCollection(collection:string){

    let products : Product[] = []

    for(let i = 0 ; i < CATALOG.length ; i++){

      if(CATALOG[i].collection == collection){
        products.push(CATALOG[i])
      }

    }


    return products



  }

  getProductsByLabel(label:string){

    let products : Product[] = []

    for(let i = 0 ; i < CATALOG.length ; i++){

      if(CATALOG[i].label == label){
        products.push(CATALOG[i])
      }

    }


    return products


  }

  getProductByName(name:string){


    for(let i = 0 ; i < CATALOG.length ; i++){

      if(CATALOG[i].name == name){

        return CATALOG[i]
        
      }

    }

    return CATALOG[0]

    

  }


}
