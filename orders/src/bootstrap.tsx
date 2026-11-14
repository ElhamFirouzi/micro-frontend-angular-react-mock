import { StrictMode } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { OrdersApp } from './OrdersApp';

class OrdersElement extends HTMLElement {
  private root: Root | null = null;

  connectedCallback() {
    const shadow = this.shadowRoot ?? this.attachShadow({ mode: 'open' });
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      :host { font-family: 'Segoe UI', Tahoma, sans-serif; color: #1f2937; display: block; }
      .wrap { padding: 24px; }
      h2 { margin: 0 0 16px; color: #6d28d9; }
      table { width: 100%; border-collapse: collapse; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,.1); }
      th, td { padding: 10px 16px; text-align: right; border-bottom: 1px solid #eee; }
      th { background: #f5f3ff; color: #5b21b6; }
      tr:hover td { background: #fafafa; }
      .badge { padding: 2px 10px; border-radius: 999px; font-size: 12px; }
      .delivered { background: #dcfce7; color: #166534; }
      .pending { background: #fef9c3; color: #854d0e; }
      .cancelled { background: #fee2e2; color: #991b1b; }
    `;
    shadow.appendChild(styleEl);
    const mount = document.createElement('div');
    shadow.appendChild(mount);
    this.root = createRoot(mount);
    this.root.render(
      <StrictMode>
        <OrdersApp />
      </StrictMode>,
    );
  }

  disconnectedCallback() {
    this.root?.unmount();
    this.root = null;
  }
}

if (!customElements.get('orders-app')) {
  customElements.define('orders-app', OrdersElement);
}
