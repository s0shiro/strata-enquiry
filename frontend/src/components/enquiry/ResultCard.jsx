import Card from "../ui/Card";
import PriorityBadge from "./PriorityBadge";

function ResultCard({ result }) {
  return (
    <Card>
      <h2 className="text-lg font-semibold text-slate-900">Result</h2>

      <div className="mt-4 grid gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Enquiry Type
          </p>
          <p className="mt-1 text-sm text-slate-900">{result.type}</p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Priority
          </p>
          <div className="mt-1">
            <PriorityBadge priority={result.priority} />
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Summary
          </p>
          <p className="mt-1 whitespace-pre-wrap text-sm text-slate-800">{result.summary}</p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Recommended Action
          </p>
          <p className="mt-1 whitespace-pre-wrap text-sm text-slate-800">
            {result.recommended_action}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Suggested Response
          </p>
          <p className="mt-1 whitespace-pre-wrap text-sm text-slate-800">
            {result.suggested_response}
          </p>
        </div>
      </div>
    </Card>
  );
}

export default ResultCard;
