import { Component, computed, signal } from '@angular/core';
import { DatePipe } from '@angular/common';

export interface Equipment {
  id: number;
  name: string;
  code: string;
  status: 'active' | 'maintenance' | 'broken';
  location: string;
  lastService: string;
}

@Component({
  selector: 'app-equipment',
  imports: [DatePipe],
  template: `
    <section class="wrap">
      <h2>⚙️ مدیریت تجهیزات</h2>

      <div class="filters">
        <button
          [class.active]="filter() === 'all'"
          (click)="filter.set('all')">همه ({{ items().length }})</button>
        <button
          [class.active]="filter() === 'active'"
          (click)="filter.set('active')">فعال</button>
        <button
          [class.active]="filter() === 'maintenance'"
          (click)="filter.set('maintenance')">در تعمیر</button>
        <button
          [class.active]="filter() === 'broken'"
          (click)="filter.set('broken')">خراب</button>
      </div>

      <div class="grid">
        @for (eq of filtered(); track eq.id) {
          <div class="card" [class]="'card ' + eq.status">
            <div class="icon">{{ icon(eq.status) }}</div>
            <h3>{{ eq.name }}</h3>
            <span class="code">{{ eq.code }}</span>
            <span class="badge" [class]="'badge ' + eq.status">{{ label(eq.status) }}</span>
            <div class="meta">
              <span>📍 {{ eq.location }}</span>
              <span>🔧 آخرین سرویس: {{ eq.lastService | date: 'yyyy/MM/dd' }}</span>
            </div>
          </div>
        }
      </div>
    </section>
  `,
  styles: `
    .wrap { padding: 1.5rem; direction: rtl; }
    h2 { color: #1e293b; margin-bottom: 1rem; }
    .filters { display: flex; gap: 0.5rem; margin-bottom: 1.25rem; flex-wrap: wrap; }
    .filters button {
      border: 1px solid #cbd5e1; background: #fff; color: #475569;
      padding: 0.45rem 1.1rem; border-radius: 999px; cursor: pointer;
      font-family: inherit; font-size: 0.9rem; transition: all 0.2s;
    }
    .filters button.active { background: #6366f1; border-color: #6366f1; color: #fff; }
    .filters button:hover:not(.active) { border-color: #6366f1; color: #6366f1; }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1rem;
    }
    .card {
      background: #fff; border-radius: 14px; padding: 1.25rem;
      box-shadow: 0 2px 10px rgba(0,0,0,0.06);
      border-top: 4px solid #94a3b8;
      display: flex; flex-direction: column; gap: 0.4rem;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .card:hover { transform: translateY(-4px); box-shadow: 0 8px 20px rgba(0,0,0,0.12); }
    .card.active { border-top-color: #22c55e; }
    .card.maintenance { border-top-color: #f59e0b; }
    .card.broken { border-top-color: #ef4444; }
    .icon { font-size: 2rem; }
    .card h3 { margin: 0; font-size: 1.05rem; color: #1e293b; }
    .code { color: #94a3b8; font-size: 0.8rem; direction: ltr; align-self: flex-start; }
    .badge {
      align-self: flex-start; font-size: 0.75rem; padding: 0.2rem 0.7rem;
      border-radius: 999px; font-weight: 600;
    }
    .badge.active { background: #dcfce7; color: #16a34a; }
    .badge.maintenance { background: #fef3c7; color: #d97706; }
    .badge.broken { background: #fee2e2; color: #dc2626; }
    .meta { display: flex; flex-direction: column; gap: 0.25rem; color: #64748b; font-size: 0.85rem; margin-top: 0.5rem; }
  `,
})
export class EquipmentList {
  filter = signal<'all' | 'active' | 'maintenance' | 'broken'>('all');

  private readonly _items: Equipment[] = [
    { id: 1, name: 'پمپ آب صنعتی', code: 'EQ-PMP-001', status: 'active', location: 'سالن ۱', lastService: '2026-09-15' },
    { id: 2, name: 'کمپرسور هوا', code: 'EQ-CMP-014', status: 'maintenance', location: 'سالن ۲', lastService: '2026-10-02' },
    { id: 3, name: 'تسمه نقاله A', code: 'EQ-CNV-007', status: 'active', location: 'خط تولید', lastService: '2026-08-20' },
    { id: 4, name: 'دینام برق اضطراری', code: 'EQ-GEN-002', status: 'broken', location: 'محوطه پشت', lastService: '2026-05-11' },
    { id: 5, name: 'جرثقیل سقفی', code: 'EQ-CRN-003', status: 'active', location: 'انبار مرکزی', lastService: '2026-10-25' },
    { id: 6, name: 'سیستم تهویه', code: 'EQ-HVC-021', status: 'maintenance', location: 'سالن ۳', lastService: '2026-09-30' },
  ];

  items = signal<Equipment[]>(this._items);

  filtered = computed(() => {
    const f = this.filter();
    return f === 'all' ? this.items() : this.items().filter((e) => e.status === f);
  });

  label(s: Equipment['status']): string {
    return { active: 'فعال', maintenance: 'در تعمیر', broken: 'خراب' }[s];
  }

  icon(s: Equipment['status']): string {
    return { active: '✅', maintenance: '🛠️', broken: '❌' }[s];
  }
}
