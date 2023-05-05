import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ProductsService } from '../../services/products.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { capitalLetterValidator } from '../../validators/name-validator';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() product: Product | undefined;
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalRef: NzModalRef,
    private productsService: ProductsService,
    private notification: NzNotificationService
    
    
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)], capitalLetterValidator],
      category: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      inStock: [0, [Validators.required]],
    });
  }

  ngOnInit() {
    if (this.product) {
      console.log(this.product);
      this.productForm.setValue({
        name: this.product.name,
        category: this.product.category,
        price: this.product.price,
        inStock: this.product.inStock,
      });
    }
  }

  submitForm() {
    if (this.productForm.valid) {
      const product: Product = {
        id: this.product.id,
        name: this.productForm.get('name').value,
        category: this.productForm.get('category').value,
        price: this.productForm.get('price').value,
        inStock: this.productForm.get('inStock').value,
      };

      this.productsService.updateProduct(product);
      this.notification.success('Success', 'Product updated successfully.');
    }else
    {
      this.notification.error('Error', 'Please insert the data correctly.');
    }
  }

  addProduct() {
    if (this.productForm.valid) {
      const product: Product = {
        name: this.productForm.get('name').value,
        category: this.productForm.get('category').value,
        price: this.productForm.get('price').value,
        inStock: this.productForm.get('inStock').value,
      };

      this.productsService.addProduct(product);
    }
  }
}
