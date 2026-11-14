import { useState } from 'react';

type Status = 'delivered' | 'pending' | 'cancelled';

interface Order {
  id: number;
  customer: string;
  item: string;
  total: string;
  status: Status;
}

const STATUS_LABELS: Record<Status, string> = {
  delivered: 'تحویل شده',
  pending: 'در انتظار',
  cancelled: 'لغو شده',
};

const INITIAL_ORDERS: Order[] = [
  { id: 1001, customer: 'علی رضایی', item: 'لپ‌تاپ لنوو', total: '۴۵٬۰۰۰٬۰۰۰ تومان', status: 'delivered' },
  { id: 1002, customer: 'مریم احمدی', item: 'دریل شارژی', total: '۳٬۲۰۰٬۰۰۰ تومان', status: 'pending' },
  { id: 1003, customer: 'رضا کریمی', item: 'مانیتور سامسونگ', total: '۱۲٬۵۰۰٬۰۰۰ تومان', status: 'delivered' },
  { id: 1004, customer: 'سارا موسوی', item: 'کیبورد مکانیکال', total: '۲٬۱۰۰٬۰۰۰ تومان', status: 'cancelled' },
];

export function OrdersApp() {
  const [orders] = useState(INITIAL_ORDERS);

  return (
    <div className="wrap">
      <h2>📦 سفارشات</h2>
      <table>
        <thead>
          <tr>
            <th>شماره</th>
            <th>مشتری</th>
            <th>کالا</th>
            <th>مبلغ</th>
            <th>وضعیت</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.customer}</td>
              <td>{o.item}</td>
              <td>{o.total}</td>
              <td>
                <span className={`badge ${o.status}`}>{STATUS_LABELS[o.status]}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
