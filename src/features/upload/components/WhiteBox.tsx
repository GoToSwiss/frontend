import { WhiteBoxProps } from '../types/uploadType';

export default function WhiteBox({ children, title, className }: WhiteBoxProps) {
  return (
    <div className={`h-auto w-full gap-6 rounded-md bg-white px-4 py-6 shadow-md ${className}`}>
      <h2 className="text-lg font-semibold">{title}</h2>
      {children}
    </div>
  );
}
