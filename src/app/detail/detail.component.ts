import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  id: any;
  sub: any;
  productSelected: any;

  constructor (
    private service: ProductsService,
    private route: ActivatedRoute
  ) {};
  
  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.getOneProduct(this.id);

    const cartExists = localStorage.getItem("cart");
    
    if (!cartExists) {
      const cart:any = [];
      localStorage.setItem("cart", JSON.stringify(cart));
    };
  };

  getOneProduct(id: number) {
    this.service.getProduct(id).subscribe((data: any) => {
      this.productSelected = data;
    });
  };

  addToCart() {
  
    const product = {
      name: this.productSelected.name,
      price: this.productSelected.price,
      image: this.productSelected.image,
      quant: 1
    };

    const cartExists = localStorage.getItem("cart");
    if (!cartExists) {
      const cart:any = [];
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    
    else {
      const cart: any = localStorage.getItem("cart");
      const cartParsed = JSON.parse(cart);

      const found = cartParsed.find(
        (element:any) => element.name == product.name
      );

      if (!found) {
        cartParsed.push(product);
        localStorage.setItem("cart", JSON.stringify(cartParsed));
      };
    };

    const btn:any = document.getElementById("btn");
    btn.innerHTML = "¡AGREGADO!";
  };
};