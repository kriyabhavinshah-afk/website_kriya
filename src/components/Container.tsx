interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
}

export default function Container({
  children,
  className = "",
  as: Component = "div",
}: ContainerProps) {
  return (
    <Component className={`max-w-content mx-auto px-6 ${className}`}>
      {children}
    </Component>
  );
}
