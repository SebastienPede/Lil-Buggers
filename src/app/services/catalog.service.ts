import { Injectable } from '@angular/core';

import { Product } from '../Product';
import { CATALOG } from '../Catalog';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  //Set desired collection from sister route to catalog, destroy 

  private desiredCollection = new BehaviorSubject<string>('none')
  $desiredCollection = this.desiredCollection.asObservable()
  
  getDesiredCollection(){
    return this.$desiredCollection
  }

  setDesiredCollection(collection:string){

    this.desiredCollection.next(collection)

  }

  resetDesiredCollection(){
    this.desiredCollection.next('none')
  }

 


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

  getProductsFromCollections(collections:string[]){


    let filtered_products = []

    for(let collection of collections){

      for(let product of CATALOG){
        if(product.collection == collection){
          filtered_products.push(product)
        }
      }

    }

    return filtered_products
    

  }


  getProductsFromSizes(sizes:string[], existing_list?:Product[]){

    let products_to_search : Product[] = []


    if(existing_list){

      products_to_search = existing_list

    }else{

      products_to_search = CATALOG
    }

    
    let filtered_products : Product[] = []

    for(let product of products_to_search){

      let fits_required_size = true

      for(let size of sizes){

        if(!(product.sizes.includes(size))){
          fits_required_size = false
          
          break
        }

      }

      if(fits_required_size){

        filtered_products.push(product)

      }
      
    }


    return filtered_products

  }


  getProductsFromColors(colors:string[], existing_list?:Product[]){

    let products_to_search : Product[] = []

    if(existing_list){

      products_to_search = existing_list

    }else{

      products_to_search = CATALOG
    }

    let filtered_products : Product[] = []

    for(let color of colors){
      for(let product of products_to_search){
        if(product.color == color){
          filtered_products.push(product)
        }
      }
    }

    return filtered_products


    


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
