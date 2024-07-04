import { FigureBox } from "./visual/FigureBox";

export function KeyFigures2024Page() {
  return (
    <div className="new-page flex flex-col space-y-20">
      <h1
        className="section-title book-index text-4xl"
        data-book-index="3 Key figures 2024"
      >
        Key figures 2024
      </h1>
      <div className="grid grid-cols-4 gap-10">
        <div className="text-center text-xl font-semibold">Safety</div>
        <div className="text-center text-xl font-semibold col-span-2">
          Sustainablility
        </div>
        <div className="text-center text-xl font-semibold">High value</div>
        <div>
          <FigureBox
            amount="0.2"
            unit="SIF"
            description="Serious incident frequency (per million hours worked)"
          />
        </div>
        <div>
          <FigureBox
            amount="5.4"
            unit="KG / BOE"
            description="CO2 upstream intensity"
          />
        </div>
        <div>
          <FigureBox
            amount="23"
            unit="PERCENT"
            description="Greenhouse gas (GHG) emissions reduced (year on year value)"
          />
        </div>
        <div>
          <FigureBox
            amount="23"
            unit="USD BILLION"
            description="Adjusted earnings*"
          />
        </div>

        <div>
          <FigureBox
            amount="1.8"
            unit="TRIF"
            description="Total recordable incident frequency (per million hours worked)"
          />
        </div>
        <div>
          <FigureBox
            amount="15"
            unit="PERCENT"
            description="Gross capex* to transition. Renewables & Low Carbon Solution share (REN & LCS)"
          />
        </div>
        <div>
          <FigureBox
            amount="6"
            unit="GW"
            description="Renewables pipeline additions"
          />
        </div>
        <div>
          <FigureBox
            amount="14"
            unit="USD BILLION"
            description="Cash flow from operations after tax* (CFFO)"
          />
        </div>

        <div>
          <FigureBox
            amount="7"
            unit="OIL AND GAS LEAKAGES"
            description="with rate above 0.1 kg/second during the past 12 months"
          />
        </div>
        <div>
          <FigureBox
            amount="55"
            unit="PERCENT"
            description="Our recycling efforts from diverting waste from landfills"
          />
        </div>
        <div>
          <FigureBox
            amount="83"
            unit="ESG SCORE"
            description="Our esg score has continuously increased over the past 12 months"
          />
        </div>
        <div>
          <FigureBox
            amount="8"
            unit="USD BILLION"
            description="Net income / (loss)"
          />
        </div>

        <div className="text-center text-xs col-span-4 mt-10">
          * For items marked with an asterisk throughout this report, see
          section 5.4 Use and reconciliation of non-GAAP financial measures.
        </div>
      </div>
    </div>
  );
}
