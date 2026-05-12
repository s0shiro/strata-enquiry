import { cn } from "../../lib/cn";

function Card({ className, children }) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6",
        className
      )}
    >
      {children}
    </section>
  );
}

export default Card;
