import { useEffect } from "react";
// @ts-ignore
import { Previewer } from "pagedjs";

const css = `
@page {
  size: A4;
  margin: 30mm 26mm 30mm 26mm;

  @bottom-center {
    vertical-align: center;
    text-align: center;
    font-size: 12px;
    content: "Boulder Heights Gym, Inc. | 1234 Maple Street, Brooklyn, NY 11201, USA | (718) 555-1234";
  }

  @bottom-left-corner {
    margin: auto auto;
    height: 60px;
    width: 60px;
    content: "";
    background: url(qr.png);
    background-size:     cover;
    background-repeat:   no-repeat;
    background-position: center center; 
  }

  @bottom-right-corner {
    vertical-align: center;
    text-align: center;
    font-size: 12px;
    content: "Page " counter(page) "/" counter(pages);
  }
}
`;

export default function Home() {
  useEffect(() => {
    let paged = new Previewer();

    paged.preview(undefined, [{ "test.css": css }], document.body);
  }, []);

  return (
    <div className="h-full grid grid-cols-2 gap-4">
      <div className="h-full flex flex-col justify-between">
        <div>
          <h1 className="text-6xl mb-10">
            Start
            <br />
            climbing
            <br />
            <b>now</b>
          </h1>
          <p>Dear Michael,</p>
          <br />
          <div className="space-y-2 mb-3">
            <p>
              Welcome to <strong>BrooklynBoulders.</strong>! We are thrilled to
              have you join our community of climbers.
            </p>

            <p>
              Enclosed, you will find your personal badge, which grants you
              access to our facility.
            </p>

            <p>
              As part of our community, you&apos;ll also have the opportunity to
              connect with fellow climbing enthusiasts and make new friends who
              share your passion for bouldering.
            </p>

            <p>
              Should you have any questions or need assistance, please do not
              hesitate to reach out to us at{" "}
              <span className="italic font-bold">
                info@brooklynboulders.com
              </span>{" "}
              or call us at{" "}
              <span className="italic font-bold">(718) 555-1234</span>. We’re
              here to ensure your experience is nothing short of fantastic.
            </p>
          </div>
          <p>Warm regards,</p>

          <p>BrooklynBoulders Team</p>
        </div>

        <div className="text-sm text-zinc-800">
          <p>
            Membership ID: <b>A24.553.985</b>
            <br />
            Join Date: 07/16/2024
          </p>
        </div>
      </div>
      <div className="h-full">
        <img
          className="object-cover h-full w-full"
          src="/climb_logo.jpg"
          alt="Climbing"
        />
      </div>
    </div>
  );
}
