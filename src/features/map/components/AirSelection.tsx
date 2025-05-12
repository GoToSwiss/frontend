function AirSelection() {
  return (
    <div>
      <h1 className="mb-2 text-xs font-semibold">데이터 유형</h1>
      <select className="w-full rounded border border-gray-300 px-3 py-2 text-xs shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-400">
        <option>미세먼지 (PM10)</option>
        <option>초미세먼지 (PM2.5)</option>
        <option>오존 (O₃)</option>
      </select>
    </div>
  );
}

export default AirSelection;
