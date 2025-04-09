interface LoadingProps {
  title: string;
  description: string;
}

function Loading({ title, description }: LoadingProps) {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="mb-3 h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500" />
      <p className="text-center text-lg font-bold text-gray-800">{title}</p>
      <p className="mt-1 text-center text-sm text-gray-500">
        <br />
        {description} <br /> <br />
        열심히 불러오고 있습니다 🚀
      </p>
    </div>
  );
}

export default Loading;
