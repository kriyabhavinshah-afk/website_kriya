interface RichListProps {
  items: string[];
  title?: string;
  className?: string;
}

export default function RichList({
  items,
  title,
  className = "",
}: RichListProps) {
  return (
    <div className={className}>
      {title && (
        <h4 className="font-open-sans text-lg text-foreground mb-4">{title}</h4>
      )}
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex gap-3 text-muted text-[15px] leading-relaxed"
          >
            <span className="text-accent shrink-0" aria-hidden="true">
              &bull;
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
