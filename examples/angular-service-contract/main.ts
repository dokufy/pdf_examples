import '@angular/compiler';
import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { Component, importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { setPaperfitDefaultInput, getPaperfitInput, configurePage, renderAfterFrameworkMount } from '@dokufy/paperfitjs';
import variables from './variables.json';
import './style.css';

setPaperfitDefaultInput(variables);

const input: any = getPaperfitInput();

configurePage({
  size: 'A4',
  margin: '20mm',
  header: `${input.provider} - Master Enterprise SaaS & SLA Agreement`,
  footer: `${input.provider} - Confidential`,
  pageNumbers: true,
});

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="contract">
      <header class="ctr-header">
        <h1>Master Enterprise SaaS &amp; SLA Agreement</h1>
        <div class="ctr-meta">
          <span>Contract No. {{ input.contractNumber }}</span>
          <span>Effective {{ input.effectiveDate }}</span>
          <span>Term {{ input.term }}</span>
        </div>
      </header>

      <section class="parties">
        <div *ngFor="let p of input.parties" class="party">
          <h3>{{ p.role }}</h3>
          <p class="party-name">{{ p.name }}</p>
          <p>{{ p.address }}</p>
          <p>Representative: {{ p.rep }}</p>
        </div>
      </section>

      <h2>SLA Availability Tiers</h2>
      <table class="sla">
        <thead>
          <tr><th>Tier</th><th>Uptime</th><th>Service Credit</th><th>Response Time</th></tr>
        </thead>
        <tbody>
          <tr *ngFor="let s of input.sla">
            <td class="tier">{{ s.tier }}</td>
            <td>{{ s.uptime }}</td>
            <td>{{ s.credit }}</td>
            <td>{{ s.response }}</td>
          </tr>
        </tbody>
      </table>

      <h2>Legal Clauses</h2>
      <ol class="clauses">
        <li *ngFor="let c of input.clauses">{{ c }}</li>
      </ol>

      <h2>Digital Signatures</h2>
      <div class="sigs">
        <div *ngFor="let s of input.signatures" class="sig">
          <div class="sig-line"></div>
          <p class="sig-name">{{ s.name }}</p>
          <p class="sig-title">{{ s.title }}</p>
          <p class="sig-date">Signed {{ s.date }}</p>
        </div>
      </div>
    </div>
  `,
})
class AppComponent {
  input = input;
}

renderAfterFrameworkMount(async () => {
  await bootstrapApplication(AppComponent);
}, { source: 'app-root' });