interface ProgressBarProps {
  value: number;
  max: number;
}
export function ProgressBar({ max, value }: ProgressBarProps) {
  return <progress max={max} value={value} className="rounded-md" />;
}
