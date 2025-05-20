import { VisualizationCardProps } from '../types/uploadType';

export default function VisualizationCard({
  title,
  description = '각 그래프별 특징 설명 넣기',
  className = '',
  isGraph = false,
  logoSrc,
  onClick = () => {},
}: VisualizationCardProps) {
  return (
    <button
      onClick={onClick}
      className={`${!isGraph && 'h-36'} group relative flex flex-col items-center justify-center rounded-lg border border-gray-200 p-4 text-center shadow-lg transition duration-300 hover:shadow-xl ${className}`}
    >
      <div className="flex items-center gap-4 pb-2">
        {!isGraph && <img src={logoSrc} alt="logo" className="size-6" />}
        <h3 className="text-lg font-bold text-gray-800 transition group-hover:text-blue-600">
          {title}
        </h3>
      </div>
      {isGraph && <img src={logoSrc} alt="logo" className="size-12" />}
      <div className="text-gray-600 transition group-hover:text-gray-800">{description}</div>
    </button>
  );
}
