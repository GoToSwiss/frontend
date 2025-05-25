import { VisualizationCardProps } from '../types/uploadType';

export default function VisualizationCard({
  title,
  description = '각 그래프별 특징 설명 넣기',
  className = '',
  isGraph = false,
  logoSrc,
  isClicked = false,
  onClick = () => {},
}: VisualizationCardProps) {
  return (
    <button
      onClick={onClick}
      className={`group flex flex-col items-center gap-4 rounded-xl border p-6 transition-shadow duration-200 hover:shadow-md ${isClicked ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'} ${className}`}
    >
      {logoSrc && (
        <img
          src={logoSrc}
          alt="logo"
          className={`${isGraph ? 'h-14 w-14' : 'h-8 w-8'} transition-transform duration-200 group-hover:scale-105`}
        />
      )}

      <div className="text-center">
        <h3
          className={`mb-1 text-base font-semibold transition-colors duration-200 ${isClicked ? 'text-blue-600' : 'text-gray-800 group-hover:text-blue-600'}`}
        >
          {title}
        </h3>
        <p className="text-sm leading-snug text-gray-500 group-hover:text-gray-700">
          {description}
        </p>
      </div>
    </button>
  );
}
