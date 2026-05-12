import EnquiryForm from "../components/enquiry/EnquiryForm";
import ResultCard from "../components/enquiry/ResultCard";
import { useAnalyseEnquiry } from "../hooks/useAnalyseEnquiry";
import { cn } from "../lib/cn";

function HomePage() {
  const {
    enquiry,
    setEnquiry,
    lastSubmittedEnquiry,
    result,
    isLoading,
    error,
    remainingCharacters,
    handleSubmit,
  } = useAnalyseEnquiry();

  const hasConversation = Boolean(lastSubmittedEnquiry || result || isLoading);

  return (
    <div
      className={cn(
        "mx-auto flex h-full w-full max-w-4xl flex-1 flex-col",
        hasConversation ? "pb-36" : "pb-0"
      )}
    >
      {hasConversation ? (
        <div className="flex-1 overflow-y-auto scroll-smooth py-6">
          <div className="mx-auto w-full max-w-3xl space-y-5">
            {lastSubmittedEnquiry ? (
              <div className="flex justify-end">
                <p className="max-w-[80%] rounded-3xl bg-slate-200 px-4 py-2 text-sm text-slate-900">
                  {lastSubmittedEnquiry}
                </p>
              </div>
            ) : null}

            {isLoading && !result ? (
              <p className="text-sm text-slate-600">Analysing enquiry...</p>
            ) : null}

            {result ? <ResultCard result={result} /> : null}
          </div>
        </div>
      ) : (
        <div className="flex-1" />
      )}

      <div
        className={cn(
          "fixed left-0 right-0 z-20 transition-all duration-500 ease-in-out",
          hasConversation ? "bottom-0" : "top-1/2 -translate-y-1/2"
        )}
      >
        <div
          className={cn(
            "mx-auto w-full max-w-6xl px-4 transition-all duration-500 sm:px-6",
            hasConversation
              ? "border-t border-slate-200 bg-slate-100/90 py-4 backdrop-blur"
              : "py-0"
          )}
        >
          <div className="mx-auto w-full max-w-3xl">
            <div
              className={cn(
                "overflow-hidden text-center transition-all duration-300",
                hasConversation ? "mb-0 max-h-0 opacity-0" : "mb-6 max-h-24 opacity-100"
              )}
            >
              <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
                Paste a client enquiry to analyse
              </h1>
            </div>

            <EnquiryForm
              enquiry={enquiry}
              onChange={setEnquiry}
              onSubmit={handleSubmit}
              isLoading={isLoading}
              error={error}
              remainingCharacters={remainingCharacters}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
