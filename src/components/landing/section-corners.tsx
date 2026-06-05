export default function SectionCorners() {
  return (
    <>
      <div className="absolute -top-px left-0 h-1.5 w-1.5 border-t border-l border-foreground" />
      <div className="absolute -top-px right-0 h-1.5 w-1.5 border-t border-r border-foreground" />
      <div className="absolute -bottom-px left-0 h-1.5 w-1.5 border-b border-l border-foreground" />
      <div className="absolute right-0 -bottom-px h-1.5 w-1.5 border-r border-b border-foreground" />
    </>
  );
}
