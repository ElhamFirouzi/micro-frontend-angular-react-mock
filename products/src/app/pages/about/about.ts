import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `
    <section class="about">
      <h2>درباره ما (از ریموت)</h2>
      <p>این صفحه توسط اپ ریموت micro-frontend رندر می‌شود.</p>
    </section>
  `,
  styles: `
    .about { padding: 1rem; direction: rtl; }
  `,
})
export class About {}
