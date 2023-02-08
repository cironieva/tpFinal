import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';
import { ProductsService } from '../services/products.service';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { DeleteProductComponent } from '../delete-product/delete-product.component';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css'],
  host: {
    class:'crudCSS'
  }
})
export class CrudComponent implements OnInit {
  
  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'image', 'update', 'delete'];
  dataSource: any;

  productList: any;
  selectedProduct: any;

  constructor (
    private dialog: MatDialog,
    private service: ProductsService,
    private titleService:Title
  ) {
    this.titleService.setTitle("STR Guitars | CRUD");
  };
  
  ngOnInit(): void {
    this.service.getComments().subscribe((data: any) => {
      this.dataSource = data;
    });
  };

  onAddProduct() {
    const addDialogConfig = new MatDialogConfig();
    addDialogConfig.height="45vh";
    addDialogConfig.width="15vw";
    this.dialog.open(AddProductComponent, addDialogConfig);
  };

  onEditProduct(product: any) {

    this.dialog.open(EditProductComponent, {
      width: '15vw',
      height: '45vh',
      data: {
        product: {
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          image: product.image
        }
      }
    });
  };

  onDeleteProduct(id: any) {
    this.dialog.open(DeleteProductComponent, {
      width: '17vw',
      height: '15vh',
      data: id
    });
  };
};
