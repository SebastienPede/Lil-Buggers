import { Component, OnInit } from '@angular/core';
import { Product } from '../Product';
import { CatalogService } from '../services/catalog.service';

import { faBan, faShoppingCart, faPlus, faMinus, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { first, lastValueFrom, Subscription } from 'rxjs';

//Form handling
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  

  faBan = faBan
  faShoppingCart = faShoppingCart
  faPlus = faPlus
  faMinus = faMinus
  faCheck = faCheck
  faTrash = faTrash

  product_modal_open=false;
  product_modal_status= 'selectQuantity'


  fragmentSub:Subscription
  collectionSub:Subscription


  extendedProduct:Product

  productQuantity = 1;

  catalog : Product[] = []



  //Catalog Form
  catalogFilterForm:FormGroup;

  constructor(private catalogService:CatalogService, private cartService:CartService, private route: ActivatedRoute, private fb: FormBuilder ) { 

    this.catalogFilterForm = this.fb.group({
      collection: ['']
      
    }) 

    this.catalogFilterForm.valueChanges.subscribe(change => {
      console.log("These are the changes :", change)
    })




  }


  //Catalog Filter functions

  filterIsDirty(){

    let filter_dirty = false

    for(let filter of this.filters){

      if(filter.length > 0){
        filter_dirty = true
        break
      }

    }

    return filter_dirty

  }

  clearFilters(){

   

    var inputs = document.getElementsByClassName('form-check-input')

    for(let i = 0 ; i < inputs.length ; i++){

      let each_input = inputs[i] as HTMLInputElement

      each_input.checked = false


    }

    console.log("what is filters ? :", this.filters)

    this.collections = []
    this.sizes = []
    this.colors = []

    this.filters = [this.collections, this.sizes, this.colors]

    return this.refreshCatalog()
   

    

  }


  collections : string[] = []

  toggleCollection(collection:string){

    if(this.collections.includes(collection)){

      const index = this.collections.indexOf(collection)

      this.collections.splice(index,1);

    }else{
      this.collections.push(collection)
    }

    
    this.refreshCatalog()


  }


  sizes : string[] = []

  toggleSize(size:string){

    if(this.sizes.includes(size)){

      const index = this.sizes.indexOf(size)

      this.sizes.splice(index,1);

    }else{
      this.sizes.push(size)
    }

    console.log("These are the sizes : ", this.sizes)
    
    this.refreshCatalog()

  }

 

  


  colors : string[] = []

  toggleColor(color:string){

    if(this.colors.includes(color)){

      const index = this.colors.indexOf(color)

      this.colors.splice(index,1);

    }else{
      this.colors.push(color)
    }

    //console.log("These are the colors : ", this.colors)
    
    this.refreshCatalog()


  }

  filters = [this.collections, this.sizes, this.colors]


  refreshCatalog(){

    let needs_filtering = false;

    for(let filter of this.filters){

      if(filter.length > 0){
        needs_filtering = true
        break
      }
      
    }

    if(needs_filtering){

      let filtered_catalog : Product[] = []

      let filter_step = 0;

      let filter_dirty = false;

      for(let filter of this.filters){

        

        if(filter_step == 0){


          if(filter.length > 0){

            let filtered_products : Product[] = []
  
            filtered_products = this.catalogService.getProductsFromCollections(filter)
  
            for(let product of filtered_products){
  
              if(!(filtered_catalog.includes(product))){
                filtered_catalog.unshift(product)
                if(!filter_dirty){
                  filter_dirty = true
                }
              }
  
            }
            
          }

        }

        if(filter_step == 1){


          if(filter.length > 0){

            let filtered_products : Product[] = []

            

            if(filter_dirty){

              filtered_products = this.catalogService.getProductsFromSizes(filter, filtered_catalog)

              filtered_catalog = filtered_products

            }else{

              filtered_products = this.catalogService.getProductsFromSizes(filter)

              for(let product of filtered_products){
  
                if(!(filtered_catalog.includes(product))){
                  filtered_catalog.unshift(product)
                  if(!filter_dirty){
                    filter_dirty = true
                  }
                }
    
              }


            }

          
            
          }


        }

        if(filter_step == 2){


          if(filter.length > 0){

            let filtered_products : Product[] = []

            if(filter_dirty){

              filtered_products = this.catalogService.getProductsFromColors(filter, filtered_catalog)

              filtered_catalog = filtered_products

            }else{

             

              filtered_products = this.catalogService.getProductsFromColors(filter)

            
              for(let product of filtered_products){
  
                if(!(filtered_catalog.includes(product))){
                  filtered_catalog.unshift(product)
                }
    
              }


            }

          
            
          }


        }

        filter_step++

        

      }

      this.catalog = filtered_catalog

      

    }else{

      this.catalog = this.catalogService.getCatalog()
    }

  }





  extendProduct(product:Product){
    this.extendedProduct = product
    
    this.toggleProductModal()
  }

  toggleProductModal(){

    this.productQuantity = 1
    this.product_modal_status= 'selectQuantity'

    this.product_modal_open = !this.product_modal_open

  }

  addToCart(product:Product){

    let product_with_qty:Product = {

      product_qty: this.productQuantity,
      ...product

    }


    this.product_modal_status= 'addedToCart'
    this.cartService.addToCart(product_with_qty)

  }

  incrementProductQuantity(){

    this.productQuantity += 1
  }

  decrementProductQuantity(){

    if(this.productQuantity > 1){

      this.productQuantity -= 1

    }

    
  }




  ngOnInit(): void {

    
    this.collectionSub = this.catalogService.getDesiredCollection().subscribe(collection => {
      
      if(collection !== 'none'){

        this.toggleCollection(collection)

        let checkbox = document.getElementById(collection) as HTMLInputElement
        checkbox.checked = true


      }

    })

    this.refreshCatalog()

    

    this.fragmentSub = this.route.fragment.subscribe(fragment => {

      if(fragment){

        this.extendProduct(this.catalogService.getProductByName(fragment))

      }

    
    })


  }


  ngOnDestroy():void{
    this.fragmentSub.unsubscribe()
    this.collectionSub.unsubscribe()

    this.catalogService.resetDesiredCollection()



  }

}
