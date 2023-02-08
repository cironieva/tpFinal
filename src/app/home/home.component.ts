import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { CookieService } from 'ngx-cookie-service';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  host: {
    class:'homeCSS'
  }
})
export class HomeComponent implements OnInit {

  productList: any;
  selectedProduct: any;
  userList: any;
  cookieValue = this.cookieService.get('session');

  constructor (
    private productsService: ProductsService,
    private cookieService: CookieService,
    private titleService:Title
  ) {
    this.titleService.setTitle("STR Guitars");
  };
  
  ngOnInit(): void {
    this.productsService.getComments().subscribe((data: any) => {
      this.productList = data;
    });
  };
};
