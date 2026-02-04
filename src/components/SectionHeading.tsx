interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
  id?: string;
}

export default function SectionHeading({
  children,
  className = "",
  as: Component = "h2",
  id,
}: SectionHeadingProps) {
  return (
    <Component
      id={id}
      className={`font-open-sans text-xl sm:text-2xl text-foreground tracking-tight ${className}`}
    >
      {children}
    </Component>
  );
}
