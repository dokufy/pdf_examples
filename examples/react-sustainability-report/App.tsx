import React from 'react';
import * as d3 from 'd3';
import { getPaperfitInput } from '@dokufy/paperfitjs';

const COLORS = ['#ffa600', '#58508d', '#003f5c', '#bc5090', '#ff6361'];

function DonutChart({ title, data }: { title: string; data: { name: string; value: number }[] }) {
  const width = 210, height = 210, radius = 82;
  const pie = d3.pie<any, any>().value((d: any) => d.value)(data);
  const arc = d3.arc<any>().innerRadius(50).outerRadius(radius) as any;
  return (
    <div className="donut">
      <h4>{title}</h4>
      <svg width={width} height={height}>
        <g transform={`translate(${width / 2}, ${height / 2})`}>
          {pie.map((p, i) => <path key={i} d={arc(p)} fill={COLORS[i % COLORS.length]} />)}
        </g>
      </svg>
    </div>
  );
}

export default function App() {
  const input: any = getPaperfitInput();
  return (
    <div id="root">
      <div className="page cover">
        <img src="/firstpage.png" alt="Cover" />
      </div>

      <div className="page">
        <h1 className="section-title">Report Overview</h1>
        <div className="cards">
          {input.imageCards.map((c: any, i: number) => (
            <a key={i} className="card" href="#">
              <img src={c.imageSrc} alt={c.title} />
              <div className="card-body">
                <h5>{c.title}</h5>
                <p>{c.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="page">
        <h1 className="section-title">Key figures {input.reportYear}</h1>
        <div className="kpi-grid">
          {input.kpis.map((k: any, i: number) => (
            <div key={i} className="kpi">
              <div className="kpi-amount">{k.amount}</div>
              <div className="kpi-unit">{k.unit}</div>
              <div className="kpi-desc">{k.description}</div>
            </div>
          ))}
        </div>
        <div className="executive-callout">
          <h4>Executive commentary</h4>
          <p>{input.executiveSummary}</p>
        </div>
      </div>

      <div className="page">
        <h1 className="section-title">Key figures by segment</h1>
        <div className="donuts">
          {input.segments.map((s: any, i: number) => (
            <DonutChart key={i} title={s.title} data={s.data} />
          ))}
        </div>
        <div className="legend">
          {['Solar', 'Wind', 'Hydro', 'Fossil fuels', 'Other'].map((n, i) => (
            <div key={n} className="legend-item">
              <span className="swatch" style={{ backgroundColor: COLORS[i] }} />
              {n}
            </div>
          ))}
        </div>
        <div className="summary-bar">
          {input.segments.map((s: any, i: number) => (
            <div key={i} className="item">
              <div className="label">{s.title}</div>
              <div className="value">{Math.round(((s.data[0].value + s.data[1].value + s.data[2].value) / s.data.reduce((a: number, d: any) => a + d.value, 0)) * 100)}% Renewables</div>
            </div>
          ))}
        </div>
      </div>

      <div className="page two-col">
        <div>
          <h1 className="section-title">About the report</h1>
          <h3>{input.company} annual report for {input.reportYear}</h3>
          <p>{input.executiveSummary}</p>
          <h3>Key points of the report</h3>
          <p>{input.executiveSummary}</p>
          <h3>Other {input.reportYear} reporting published on</h3>
          <p>Complementary disclosures, EU taxonomy alignment and additional sustainability information are available on the {input.company} investor portal.</p>
        </div>
        <img className="about-img" src="/about-report.png" alt="About report" />
      </div>
    </div>
  );
}