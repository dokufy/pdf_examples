export interface ImageCardOpts {
  imageSrc: string;
  title: string;
  description: string;
}

export function ImageCard(opts: ImageCardOpts) {
  return (
    <a href="#">
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow h-full">
        <div>
          <img className="rounded-t-lg" src={opts.imageSrc} />
        </div>
        <div className="p-6">
          <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-8700">
            {opts.title}
          </h5>
          <p className="mb-3 font-normal text-gray-800">{opts.description}</p>
        </div>
      </div>
    </a>
  );
}
