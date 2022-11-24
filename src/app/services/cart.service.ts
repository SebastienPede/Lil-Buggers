import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  //Cart

  private cart = new BehaviorSubject<Product[]>([])
  $cart = this.cart.asObservable()

  getCart(){
    return this.$cart
  }

  addToCart(product:Product){

    this.cart.value.push(product)
    this.cart.next(this.cart.value)

  }

  removeFromCart(product:Product){

    this.cart.value.splice((this.cart.value).indexOf(product),1)


  }

  clearCart(){
    this.cart.next([])
  }

  constructor() { }

}
