import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../services/products.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  public addForm!: FormGroup;

  constructor (
    private fb: FormBuilder,
    private service: ProductsService,
    public addProductDialogRef: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string
  ){};
  
  ngOnInit(): void {
    this.addForm = this.fb.group({
      name: [, [Validators.required]],
      description: [, [Validators.required]],
      price: [, [Validators.required, Validators.min(0)]],
      image: [, [Validators.required]],
    });
  };

  validInput(input: string) {
    return this.addForm.controls[input].errors && this.addForm.controls[input].touched;
  };

  addProduct() {
    if (this.addForm.invalid) {
      this.addForm.markAllAsTouched();
    }

    else {
      this.service.createProduct(JSON.stringify(this.addForm.value)).subscribe(data => {
        this.addProductDialogRef.close();
        window.location.reload();
      });
    };
  };
};