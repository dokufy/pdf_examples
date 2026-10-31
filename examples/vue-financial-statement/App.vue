<template>
  <div id="app" class="statement">
    <header class="stmt-header">
      <div>
        <div class="brand">{{ input.company }}</div>
        <div class="subtitle">Executive Financial &amp; Portfolio Statement</div>
      </div>
      <div class="period">{{ input.period }}</div>
    </header>

    <h2>Executive KPIs</h2>
    <div class="kpi-grid">
      <div v-for="k in input.kpis" :key="k.label" class="kpi">
        <div class="kpi-label">{{ k.label }}</div>
        <div class="kpi-value">{{ k.value }}</div>
        <div class="kpi-delta">{{ k.delta }}</div>
      </div>
    </div>

    <h2>Asset Allocation</h2>
    <div class="alloc">
      <div v-for="a in input.allocation" :key="a.name" class="alloc-row">
        <span class="alloc-name">{{ a.name }}</span>
        <div class="alloc-bar"><div class="alloc-fill" :style="{ width: a.pct + '%', background: a.color }"></div></div>
        <span class="alloc-pct">{{ a.pct }}%</span>
      </div>
    </div>

    <h2>Top Holdings &amp; Performance</h2>
    <table class="holdings">
      <thead>
        <tr>
          <th>Ticker</th><th>Name</th><th>Sector</th><th>Weight</th><th>Return</th><th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="h in input.holdings" :key="h.ticker">
          <td class="ticker">{{ h.ticker }}</td>
          <td>{{ h.name }}</td>
          <td>{{ h.sector }}</td>
          <td>{{ h.weight }}</td>
          <td class="pos">{{ h.return }}</td>
          <td>{{ h.value }}</td>
        </tr>
      </tbody>
    </table>

    <footer class="stmt-footer">
      Prepared by Vanguard Meridian Asset Management. Past performance is not indicative of future results.
    </footer>
  </div>
</template>

<script setup lang="ts">
import { getPaperfitInput } from '@dokufy/paperfitjs';
const input: any = getPaperfitInput();
</script>