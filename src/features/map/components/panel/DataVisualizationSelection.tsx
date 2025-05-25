import useDataVisualTypeStore from '../../store/useDataVisualTypeStore';

function DataVisualizationSelection() {
  const { dataVisualType, setDataVisualType } = useDataVisualTypeStore();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDataVisualType(event.target.value as 'heatmap' | 'marker');
  };

  return (
    <div>
      <h1 className="mb-2 text-xs font-semibold">데이터 시각화</h1>
      <select
        value={dataVisualType}
        onChange={handleSelectChange}
        className="w-full rounded border border-gray-300 px-3 py-2 text-xs shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
      >
        <option value="heatmap">히트맵</option>
        <option value="marker">마커</option>
      </select>
    </div>
  );
}

export default DataVisualizationSelection;
