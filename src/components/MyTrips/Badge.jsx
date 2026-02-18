export default function Badge({ children, color = "blue" }) {
  const styles = {
    blue: "bg-[#0046FF]/10 text-[#0046FF] border border-[#0046FF]/20",
    teal: "bg-[#73C8D2]/20 text-[#0e7490] border border-[#73C8D2]/40",
    orange: "bg-[#FF9013]/10 text-[#b45309] border border-[#FF9013]/50",
    white: "bg-[#FFFFFF]/10 text-[#FFFFFF] border border-[#FFFFFF]/50",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${styles[color]}`}
    >
      {children}
    </span>
  );
}