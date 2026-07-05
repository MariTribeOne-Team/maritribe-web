export function SiteBrand({
  variant = "default",
}: {
  variant?: "default" | "marketing-home";
}) {
  return (
    <div className="brand">
      <div className={variant === "marketing-home" ? "brand-mark brand-mark-square" : "brand-mark"}>
        {variant === "marketing-home" ? "M" : "MT"}
      </div>
      <span className={variant === "marketing-home" ? "brand-name brand-name-marketing" : "brand-name"}>
        maritribeOne
      </span>
    </div>
  );
}
