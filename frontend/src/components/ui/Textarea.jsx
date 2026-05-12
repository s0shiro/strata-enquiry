import { cn } from "../../lib/cn";

function Textarea({ className, ...props }) {
  return (
    <textarea
      className={cn(
        "min-h-52 w-full rounded-xl border border-slate-300 bg-white p-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200",
        className
      )}
      {...props}
    />
  );
}

export default Textarea;
