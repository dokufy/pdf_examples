export interface FigureBox {
  amount: string;
  unit: string;
  description: string;
}

export function FigureBox(opts: FigureBox) {
  return (
    <div className="flex flex-col text-center space-y-2">
      <div className="text-5xl">{opts.amount}</div>
      <div className="text-xs capitalize text-red-800">{opts.unit}</div>
      <div>{opts.description}</div>
    </div>
  );
}
