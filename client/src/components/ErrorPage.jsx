import { Link, useNavigate } from "react-router-dom";

export default function ErrorPage({
  title = "Page Not Found",
  message = "Sorry, we couldn't find the page you're looking for.",
  code = "404",
}) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center sm:text-left">
        <main className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <p className="text-4xl font-extrabold text-blue-500 sm:text-5xl">
            {code}
          </p>
          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-gray-700 sm:pl-6">
              <h1 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
                {title}
              </h1>
              <p className="mt-2 text-base text-gray-400">{message}</p>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:border-l sm:border-transparent sm:pl-6">
              <button
                onClick={() => navigate(-1)}
                className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Go back
              </button>
              <Link
                to="/"
                className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-500 bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Go home
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
