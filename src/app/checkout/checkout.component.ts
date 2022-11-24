import { Component, OnInit } from '@angular/core';

import { faUser, faShoppingCart, faTimes, faMinus , faCheck } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { Product } from '../Product';
import { CartService } from '../services/cart.service';
import { CatalogService } from '../services/catalog.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {


  checked_out=false;


  userCart: Observable<Product[]>

  faUser = faUser
  faShoppingCart = faShoppingCart
  faTimes = faTimes
  faMinus = faMinus
  faCheck = faCheck


  removeFromCart(product:Product){

    return this.cartService.removeFromCart(product)

  }

  calculateCartTotal(products:Product[]){

    let total = 0;

    for(let i = 0 ; i < products.length ; i++){

      total += products[i].price * products[i].product_qty!

    }

    return total

  }


  toggleCheckedOut(){

    this.checked_out = !this.checked_out
    this.cartService.clearCart()

  }


  constructor(private cartService:CartService, private catalogService:CatalogService) { }

  ngOnInit(): void {

    this.userCart = this.cartService.getCart()

  }

}
