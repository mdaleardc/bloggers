const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        {/* Spinner */}
        <div className="relative w-12 h-12 mx-auto">
  <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent border-l-transparent rounded-full animate-spin"></div>
  <div className="absolute inset-1 border-4 border-blue-300 border-t-transparent border-l-transparent rounded-full animate-[spin_1.5s_linear_infinite]"></div>
</div>
        {/* Loading Text */}
        <p className="mt-4 text-lg font-semibold text-gray-700">Loading Data ...</p>
      </div>
    </div>
  );
};

export default LoadingPage;