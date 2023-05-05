import { Component } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormComponent } from '../form/form.component';
import { ProductsService } from '../../services/products.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  data$: Observable<Product[]>;

  constructor(
    private modalService: NzModalService,
    private productsService: ProductsService
  ) {
    this.data$ = this.productsService.getProducts();
    this.productsService.data$.subscribe(() => {
      this.data$ = this.productsService.getProducts();
    });
  }

  editItem(product: Product): void {
    const modal = this.modalService.create({
      nzTitle: 'Edit Product',
      nzContent: FormComponent,
      nzComponentParams: {
        product: product,
      },
      nzFooter: [
        {
          label: 'Save',
          onClick: (componentInstance: FormComponent) => {
            componentInstance.submitForm();
            modal.destroy();
          },
        },
        {
          label: 'Cancel',
          onClick: () => {
            modal.destroy();
          },
        },
      ],
    });
  }

  addItem(): void {
    const modal = this.modalService.create({
      nzTitle: 'Add Product',
      nzContent: FormComponent,
      nzFooter: [
        {
          label: 'Save',
          onClick: (componentInstance: FormComponent) => {
            componentInstance.addProduct();
            modal.destroy();
          },
        },
        {
          label: 'Cancel',
          onClick: () => {
            modal.destroy();
          },
        },
      ],
    });
  }
}
