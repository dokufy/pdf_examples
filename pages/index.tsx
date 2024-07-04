import { useEffect } from "react";
// @ts-ignore
import { Previewer } from "pagedjs";
import { ReportOverview } from "@/components/ReportOverviewPage";
import { CoverPage } from "@/components/CoverPage";
import { ContentsPage } from "@/components/ContentsPage";
import { KeyFiguresPage } from "@/components/KeyFiguresPage";
import { KeyFigures2024Page } from "@/components/KeyFigures2024Page";
import { AboutReport } from "@/components/AboutReportPage";
import { createIndex } from "@/components/createIndex";

const css = `

h1.section-title {
  string-set: section-title content(text);
}

@page {
  size: A4 landscape;
  margin: 30mm 20mm 20mm 20mm;

  @top-left-corner {
    vertical-align: center;
    text-align: center;
    font-size: 12px;
    content: counter(page);
  }

  @top-left {
    vertical-align: center;
    text-align: left;
    content: string(section-title);
  }

  @bottom-left {
    vertical-align: center;
    text-align: left;
    font-size: 12px;
    content: "Energo 2024 Sustainability annual report";
  }
}

@page:nth(1) {
  margin: 0mm 0mm 0mm 0mm;
}

@page:nth(6) {
  margin-right: 0mm;
}

.new-page {
  break-before: page;
}
  
.link-page a::after {
    content: target-counter(attr(href), page);
}

.link-page:last-of-type::after {
    content: none;
}

.index-value::after {
    content: "  ";
}

.list-index-element {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
`;

export default function Home() {
  useEffect(() => {
    createIndex({
      spanClassIndex: "book-index",
      indexElement: "#book-index",
      alphabet: false,
    });

    let paged = new Previewer();

    paged.preview(undefined, [{ "page.css": css }], document.body);
  }, []);

  return (
    <div>
      <CoverPage />
      <ReportOverview />
      <ContentsPage />
      <KeyFigures2024Page />
      <KeyFiguresPage />
      <AboutReport />
    </div>
  );
}
