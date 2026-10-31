import { setPaperfitDefaultInput, getPaperfitInput, bindPaperfitVariables, configurePage, renderPaperfit } from '@dokufy/paperfitjs';
import variables from './variables.json';
import './style.css';

setPaperfitDefaultInput(variables);
const input = getPaperfitInput();

configurePage({
  size: 'A4',
  margin: '16mm',
  header: 'AetherCloud Inc. - Tax Invoice',
  footer: 'AetherCloud Inc. | Confidential',
  pageNumbers: true,
});

bindPaperfitVariables(document, input);

renderPaperfit({ source: '#invoice-root' });