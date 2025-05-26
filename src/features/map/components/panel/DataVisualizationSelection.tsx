import useDataVisualTypeStore from '../../store/useDataVisualTypeStore';

function DataVisualizationSelection() {
  const { dataVisualType, setDataVisualType } = useDataVisualTypeStore();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDataVisualType(event.target.value as 'heatmap' | 'marker' | '3d');
  };

  return (
    <div>
      <h1 className="mb-2 text-xs font-semibold">데이터 시각화</h1>
      {dataVisualType === '3d' && (
        <p className="mb-2 text-xs text-red-500">3d 모드는 실험적입니다.</p>
      )}
      <select
        value={dataVisualType}
        onChange={handleSelectChange}
        className="w-full rounded border border-gray-300 px-3 py-2 text-xs shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
      >
        <option value="heatmap">히트맵</option>
        <option value="marker">마커</option>
        <option value="3d">3D</option>
      </select>
    </div>
  );
}

export default DataVisualizationSelection;
