import * as d3 from "d3";

type DataItem = {
  name: string;
  value: number;
};
type DonutChartProps = {
  width: number;
  height: number;
  title: string;
  data: DataItem[];
  colors: string[];
};

export default function DonutChart({
  title,
  data,
  colors,
  width = 640,
  height = 400,
}: DonutChartProps) {
  const radius = Math.min(width, height) / 2 - 30;

  const pieGenerator = d3.pie<any, DataItem>().value((d) => d.value);
  const pie = pieGenerator(data);

  const arcPathGenerator = d3.arc();
  const arcs = pie.map((p) =>
    arcPathGenerator({
      innerRadius: 70,
      outerRadius: radius,
      startAngle: p.startAngle,
      endAngle: p.endAngle,
    }),
  );

  return (
    <div>
      <h3 className="text-center">{title}</h3>
      <svg width={width} height={height} style={{ display: "inline-block" }}>
        <g transform={`translate(${width / 2}, ${height / 2})`}>
          {arcs.map((arc, i) => {
            return <path key={i} d={arc!} fill={colors[i]} />;
          })}
        </g>
      </svg>
    </div>
  );
}
