"use client";

const ErrorPage = ({ error, reset }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-6">
      <h1 className="text-4xl font-bold text-red-600">Something went wrong!</h1>
      <p className="text-gray-700 mt-2">{error?.message || "An unexpected error occurred."}</p>
      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorPage;