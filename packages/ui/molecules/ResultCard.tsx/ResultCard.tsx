import Card from '../../atoms/Card/Card';
import { WithDefaultProps } from '../../types';

type ResultCardProps = WithDefaultProps<{}>;

export default function ResultCard({}: ResultCardProps) {
  return (
    <div className="w-full rounded-md border border-blue-300 p-4 shadow my-2">
      <div className="flex animate-pulse space-x-4">
        <div className="h-10 w-10 rounded-full bg-slate-700"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 rounded bg-slate-700"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 h-2 rounded bg-slate-700"></div>
              <div className="col-span-1 h-2 rounded bg-slate-700"></div>
            </div>
            <div className="h-2 rounded bg-slate-700"></div>
          </div>
        </div>
        <div className="h-10 w-10 rounded-full bg-slate-700"></div>
      </div>
    </div>
  );
}
