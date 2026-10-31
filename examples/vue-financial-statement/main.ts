import { createApp } from 'vue';
import { setPaperfitDefaultInput, getPaperfitInput, configurePage, renderAfterFrameworkMount } from '@dokufy/paperfitjs';
import App from './App.vue';
import variables from './variables.json';
import './style.css';

setPaperfitDefaultInput(variables);

const input: any = getPaperfitInput();

configurePage({
  size: 'A4',
  margin: '18mm',
  header: `${input.company} - ${input.period} Statement`,
  footer: `${input.company} - Confidential`,
  pageNumbers: true,
});

const app = createApp(App);

renderAfterFrameworkMount(async () => {
  app.mount('#app');
}, { source: '#app' });