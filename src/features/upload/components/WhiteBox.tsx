import { WhiteBoxProps } from '../types/uploadType';

export default function WhiteBox({ children, title }: WhiteBoxProps) {
  return (
    <div className="h-auto w-full rounded-md bg-white px-4 py-6 shadow-md">
      <h2 className="text-lg font-semibold">{title}</h2>
      {children}
    </div>
  );
}
