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
      className={`group flex flex-col items-center justify-between rounded-2xl border p-6 text-left shadow-sm transition-all duration-300 hover:shadow-lg ${isClicked ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'} ${className}`}
    >
      <div className="flex flex-col items-center justify-center gap-3">
        {logoSrc && <img src={logoSrc} alt="logo" className={isGraph ? 'h-12 w-12' : 'h-6 w-6'} />}
        <h3
          className={`text-lg font-semibold transition-colors duration-200 ${
            isClicked ? 'text-blue-600' : 'text-gray-800 group-hover:text-blue-600'
          }`}
        >
          {title}
        </h3>
      </div>

      <p className="mt-4 text-center text-sm leading-relaxed text-gray-600 group-hover:text-gray-800">
        {description}
      </p>
    </button>
  );
}
