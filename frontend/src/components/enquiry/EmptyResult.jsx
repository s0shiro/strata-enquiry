import Card from "../ui/Card";

function EmptyResult() {
  return (
    <Card className="flex min-h-72 items-center justify-center">
      <div className="text-center">
        <p className="text-sm font-medium text-slate-700">No analysis yet.</p>
        <p className="mt-1 text-sm text-slate-500">
          The AI result will appear here after you analyse an enquiry.
        </p>
      </div>
    </Card>
  );
}

export default EmptyResult;
