import { Component, Inject, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit {
  
  constructor (
    private service: ProductsService,
    public deleteProductDialogRef: MatDialogRef<DeleteProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {};

  ngOnInit(): void {
    
    
  }

  deleteProduct() {
    this.service.deleteProduct(this.data.id).subscribe(data => {
      this.deleteProductDialogRef.close();
      window.location.reload();
    });
  };


  // TEST
  // deleteProduct() {
  //   this.service.deleteProduct(this.data.id);
  // };
};
