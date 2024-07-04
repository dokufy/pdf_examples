import DonutChart from "./chart/DonutChart";

const totalRevenueData = [
  { name: "Solar", value: 30 },
  { name: "Wind", value: 36 },
  { name: "Hydro", value: 54 },
  { name: "Fossil fuels", value: 35 },
  { name: "Other", value: 12 },
];
const totalInvestmentData = [
  { name: "Solar", value: 15 },
  { name: "Wind", value: 20 },
  { name: "Hydro", value: 25 },
  { name: "Fossil fuels", value: 10 },
  { name: "Other", value: 6 },
];
const energySourcesData = [
  { name: "Solar", value: 30 },
  { name: "Wind", value: 46 },
  { name: "Hydro", value: 74 },
  { name: "Fossil fuels", value: 25 },
  { name: "Other", value: 9 },
];
const powerGenerationData = [
  { name: "Solar", value: 29 },
  { name: "Wind", value: 33 },
  { name: "Hydro", value: 60 },
  { name: "Fossil fuels", value: 45 },
  { name: "Other", value: 11 },
];

const colors = ["#ffa600", "#58508d", "#003f5c", "#bc5090", "#ff6361"];

export function KeyFiguresPage() {
  return (
    <div className="new-page flex flex-col">
      <h1
        className="section-title book-index text-4xl"
        data-book-index="4 Key figures by segment"
      >
        Key figures by segment
      </h1>
      <div className="flex flex-row mt-48">
        <DonutChart
          title={"Total revenue"}
          width={250}
          height={250}
          data={totalRevenueData}
          colors={colors}
        />
        <DonutChart
          title={"Total invested"}
          width={250}
          height={250}
          data={totalInvestmentData}
          colors={colors}
        />
        <DonutChart
          title={"Energy sources"}
          width={250}
          height={250}
          data={energySourcesData}
          colors={colors}
        />
        <DonutChart
          title={"Power generation"}
          width={250}
          height={250}
          data={powerGenerationData}
          colors={colors}
        />
      </div>
      <div className="flex flex-row space-x-4 mx-auto">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4" style={{ backgroundColor: "#ffa600" }}></div>
          <span className="text-gray-700">Solar</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4" style={{ backgroundColor: "#58508d" }}></div>
          <span className="text-gray-700">Wind</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4" style={{ backgroundColor: "#003f5c" }}></div>
          <span className="text-gray-700">Hydro</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4" style={{ backgroundColor: "#bc5090" }}></div>
          <span className="text-gray-700">Fossil Fuels</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4" style={{ backgroundColor: "#ff6361" }}></div>
          <span className="text-gray-700">Other</span>
        </div>
      </div>
    </div>
  );
}
