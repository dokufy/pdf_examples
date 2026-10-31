import React from 'react';
import { createRoot } from 'react-dom/client';
import { setPaperfitDefaultInput, getPaperfitInput, configurePage, renderAfterFrameworkMount } from '@dokufy/paperfitjs';
import App from './App';
import variables from './variables.json';
import './style.css';

setPaperfitDefaultInput(variables);

const input: any = getPaperfitInput();

configurePage({
  size: 'A4',
  orientation: 'landscape',
  margin: '20mm',
  header: `${input.company} ${input.reportYear} Sustainability Annual Report`,
  footer: `${input.company} ${input.reportYear} Sustainability Annual Report`,
  pageNumbers: true,
});

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

renderAfterFrameworkMount(async () => {
  root.render(<App />);
}, { source: '#root' });