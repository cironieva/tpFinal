import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../services/products.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent {
  public editForm!: FormGroup;

  constructor (
    private fb: FormBuilder,
    private service: ProductsService,
    public addProductDialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){};
  
  ngOnInit(): void {
    this.editForm = this.fb.group({
      name: [this.data.product.name, [Validators.required]],
      description: [this.data.product.description, [Validators.required]],
      price: [this.data.product.price, [Validators.required, Validators.min(0)]],
      image: [this.data.product.image, [Validators.required]],
    });
  };

  validInput(input: string) {
    return this.editForm.controls[input].errors && this.editForm.controls[input].touched;
  };

  editProduct() {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
    }

    else {
      const id = this.data.product.id;
      const body = this.editForm.value;

      this.service.updateProduct(id, body).subscribe(data => {
        this.addProductDialogRef.close();
        window.location.reload();
      });
    };
  };
};
