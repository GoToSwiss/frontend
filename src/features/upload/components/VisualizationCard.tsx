import { VisualizationCardProps } from '../types/uploadType';

export default function VisualizationCard({
  title,
  description = '그래프 그림/아이콘 넣기',
  className = '',
}: VisualizationCardProps) {
  return (
    <button
      className={`group relative rounded-lg border border-gray-200 p-4 text-center shadow-lg transition duration-300 hover:shadow-xl ${className}`}
    >
      <div className="pb-2">
        <h3 className="text-lg font-bold text-gray-800 transition group-hover:text-blue-600">
          {title}
        </h3>
      </div>
      <div className="text-gray-600 transition group-hover:text-gray-800">{description}</div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-100 opacity-0 transition group-hover:opacity-20" />
    </button>
  );
}
