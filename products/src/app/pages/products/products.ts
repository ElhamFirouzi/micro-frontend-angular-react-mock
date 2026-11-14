import { Component, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

@Component({
  selector: 'app-products',
  imports: [CurrencyPipe],
  template: `
    <section class="products">
      <h2>محصولات (Micro-Frontend ریموت)</h2>
      <table>
        <thead>
          <tr>
            <th>شناسه</th><th>نام</th><th>قیمت</th><th>دسته</th><th>موجودی</th>
          </tr>
        </thead>
        <tbody>
          @for (p of products(); track p.id) {
            <tr>
              <td>{{ p.id }}</td>
              <td>{{ p.name }}</td>
              <td>{{ p.price | currency: 'USD' }}</td>
              <td>{{ p.category }}</td>
              <td>{{ p.inStock ? 'موجود' : 'ناموجود' }}</td>
            </tr>
          }
        </tbody>
      </table>
    </section>
  `,
  styles: `
    .products { padding: 1rem; }
    table { width: 100%; border-collapse: collapse; direction: rtl; }
    th, td { border: 1px solid #ddd; padding: 0.5rem 1rem; text-align: right; }
    thead { background: #f5f5f5; }
  `,
})
export class Products {
  private readonly _products: Product[] = [
    { id: 1, name: 'لپ‌تاپ مدل X', price: 1200, category: 'دیجیتال', inStock: true },
    { id: 2, name: 'هدفون بی‌سیم', price: 85, category: 'لوازم جانبی', inStock: true },
    { id: 3, name: 'ماوس گیمینگ', price: 45, category: 'لوازم جانبی', inStock: false },
    { id: 4, name: 'مانیتور ۲۷ اینچ', price: 320, category: 'دیجیتال', inStock: true },
    { id: 5, name: 'کیبورد مکانیکال', price: 110, category: 'لوازم جانبی', inStock: true },
  ];

  products = signal<Product[]>(this._products);
}
