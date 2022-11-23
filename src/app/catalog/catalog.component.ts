import { Component, OnInit } from '@angular/core';
import { Product } from '../Product';
import { CatalogService } from '../services/catalog.service';

import { faBan, faShoppingCart, faPlus, faMinus, faCheck } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../services/cart.service';

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

  product_modal_open=false;
  product_modal_status= 'selectQuantity'



  extendedProduct:Product

  productQuantity = 1;

  catalog : Product[] = []

  constructor(private catalogService:CatalogService, private cartService:CartService) { }


  extendProduct(product:Product){
    this.extendedProduct = product
    console.log("This is the extended product :", this.extendedProduct)
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

    this.catalog = this.catalogService.getCatalog()

  }

}
