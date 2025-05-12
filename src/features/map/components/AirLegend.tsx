function AirLegend() {
  return (
    <div className="space-y-2 text-xs font-medium">
      <div className="text-xs font-semibold">범례</div>
      <div className="flex items-center space-x-2">
        <div className="h-4 w-4 rounded-sm bg-green-400" />
        <span className="text-xs">좋음 (0-30)</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="h-4 w-4 rounded-sm bg-yellow-400" />
        <span className="text-xs">보통 (31-80)</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="h-4 w-4 rounded-sm bg-orange-500" />
        <span className="text-xs">나쁨 (81-150)</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="h-4 w-4 rounded-sm bg-red-500" />
        <span className="text-xs">매우나쁨 (151+)</span>
      </div>
    </div>
  );
}

export default AirLegend;
