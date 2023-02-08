import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  
  parsedCart: any;
  finalPrice: any;

  constructor (
    private titleService:Title
  ) {
    this.titleService.setTitle("STR Guitars | Cart");
  };

  ngOnInit(): void {
    const cart = localStorage.getItem("cart") || '{}';
    const parsedCart = JSON.parse(cart);
    this.parsedCart = parsedCart;

    
  }

  subOne (element: any) {
    element.quant = element.quant - 1;
    if (element.quant <= 1) {
      element.quant = 1;
    };
  };

  addOne (element: any) {
    element.quant = element.quant + 1;
  };

  totalPrice() {
    let list = [];
  
    for (let i = 0; i < this.parsedCart.length; i++) {
      let price = Number(document.getElementById(`price${[i]}`)?.innerHTML);
      list.push(price);
    };
    
    let sum = 0;

    for (let i = 0; i < list.length; i++) {
        sum += list[i];
    };

    this.finalPrice = sum;
  };

  buy() {
    alert("Muchas gracias Ícaro por enseñarme todo esto :D")
  };

  cleanCart() {
    localStorage.removeItem('cart');
    setTimeout(() => {
      window.location.reload();
    }, 0);
  };
};
