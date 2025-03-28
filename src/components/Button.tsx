import { ButtonProps } from '@/types/globalTypes';

export default function Button({ children, className = '', onClick }: ButtonProps) {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}
