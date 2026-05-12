import { PRIORITY_BADGE_STYLES } from "../../features/enquiry/constants";
import { cn } from "../../lib/cn";

function PriorityBadge({ priority }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset",
        PRIORITY_BADGE_STYLES[priority] || "bg-slate-100 text-slate-700 ring-slate-300"
      )}
    >
      {priority}
    </span>
  );
}

export default PriorityBadge;
