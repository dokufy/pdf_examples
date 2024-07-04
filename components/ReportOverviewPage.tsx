import { ImageCard } from "./visual/ImageCard";

export function ReportOverview() {
  return (
    <div className="new-page flex flex-col">
      <h1
        className="section-title book-index text-4xl"
        data-book-index="1 Report Overview"
      >
        Report Overview
      </h1>
      <div className="flex flex-row space-x-6 mt-40">
        <ImageCard
          imageSrc="/about-us.png"
          title="About us"
          description="An introduction to who we are, our business and our strategy."
        />
        <ImageCard
          imageSrc="/group-performance.png"
          title="Group performance"
          description="Group financial and sustainability performance, research and innovation activities."
        />
        <ImageCard
          imageSrc="/reporting-segment-performance.png"
          title="Reporting segment performance"
          description="Financial, operational and sustainability performance review and strategic update."
        />
        <ImageCard
          imageSrc="/financial-statements.png"
          title="Financial statements"
          description="Consolidated financial statements of the Energo group."
        />
        <ImageCard
          imageSrc="/additional-information.png"
          title="Additional information"
          description="Complementary information supporting the report."
        />
      </div>
    </div>
  );
}
