type Props = {
  name: string;
  arguments: string;
};

export default function FunctionCallDisplay({ name, arguments: args }: Props) {
  let parsedArgs: Record<string, any> = {};
  try {
    parsedArgs = JSON.parse(args);
  } catch {
    // fallback to raw string if JSON parsing fails
  }

  return (
    <div className="mt-2 rounded border border-gray-300 bg-gray-50 px-3 py-2 font-mono text-sm text-gray-800">
      <div className="mb-1 font-semibold text-blue-600">Function Call</div>
      <div>
        <span className="text-gray-500">name:</span> <span>{name}</span>
      </div>
      <div>
        <span className="text-gray-500">arguments:</span>
        <pre className="mt-1 overflow-x-auto rounded bg-gray-100 p-2 text-xs text-gray-700">
          {typeof parsedArgs === 'object' ? JSON.stringify(parsedArgs, null, 2) : args}
        </pre>
      </div>
    </div>
  );
}
