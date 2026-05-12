import LoadingSpinner from "../ui/LoadingSpinner";
import { MAX_ENQUIRY_LENGTH } from "../../features/enquiry/constants";

function EnquiryForm({ enquiry, onChange, onSubmit, isLoading, error, remainingCharacters }) {
  const isEmpty = !enquiry.trim();
  const isTooLong = enquiry.trim().length > MAX_ENQUIRY_LENGTH;

  function handleTextareaKeyDown(event) {
    const isEnter = event.key === "Enter";
    const isShiftEnter = event.shiftKey;
    const isComposing = event.nativeEvent.isComposing;

    if (!isEnter || isShiftEnter || isComposing) {
      return;
    }

    event.preventDefault();

    if (isLoading || isEmpty || isTooLong) {
      return;
    }

    event.currentTarget.form?.requestSubmit();
    onChange("");
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="rounded-3xl border border-slate-300 bg-white px-4 py-3 shadow-sm">
        <div className="flex items-end gap-3">
          <textarea
            name="enquiry"
            value={enquiry}
            onChange={(event) => onChange(event.target.value)}
            maxLength={MAX_ENQUIRY_LENGTH}
            placeholder="Ask anything"
            aria-label="Client enquiry"
            rows={2}
            onKeyDown={handleTextareaKeyDown}
            className="min-h-12 flex-1 resize-none bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-500"
          />

          <button
            type="submit"
            disabled={isLoading || isEmpty || isTooLong}
            className="inline-flex h-10 min-w-10 items-center justify-center rounded-full bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? <LoadingSpinner /> : "Send"}
          </button>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-end text-xs text-slate-500">
        <span>{remainingCharacters} remaining</span>
      </div>

      {error ? <p className="mt-2 text-sm font-medium text-red-600">{error}</p> : null}
    </form>
  );
}

export default EnquiryForm;
