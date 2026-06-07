type CaptionLabelProps = {
  children: React.ReactNode;
  className?: string;
};

export function CaptionLabel({ children, className = "" }: CaptionLabelProps) {
  return <p className={`caption-label ${className}`}>{children}</p>;
}
