import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private dataSubject = new BehaviorSubject<Product[]>([
    {
      id: 1,
      name: 'Bananas',
      category: 'fruits',
      price: 10,
      inStock: 10,
    },
    {
      id: 2,
      name: 'Carrot',
      category: 'vegetables',
      price: 20,
      inStock: 90,
    },
    {
      id: 3,
      name: 'Apple',
      category: 'fruits',
      price: 30,
      inStock: 40,
    },
    {
      id: 4,
      name: 'Cucumber',
      category: 'vegetables',
      price: 40,
      inStock: 70,
    },
    {
      id: 5,
      name: 'Soap',
      category: 'body care',
      price: 50,
      inStock: 80,
    },
  ]);
  data$: Observable<Product[]> = this.dataSubject.asObservable();

  constructor() {}

  getProducts(): Observable<Product[]> {
    return this.data$;
  }

  addProduct(product: Product): void {
    const currentData = this.dataSubject.getValue();
    const newProduct = { ...product, id: currentData.length + 1 };
    this.dataSubject.next([...currentData, newProduct]);
  }

  updateProduct(product: Product): void {
    const currentData = this.dataSubject.getValue();
    const updatedData = currentData.map((item) => {
      if (item.id === product.id) {
        console.log('a intrat');
        return { ...item, ...product };
      }
      return item;
    });
    this.dataSubject.next(updatedData);
  }
}
