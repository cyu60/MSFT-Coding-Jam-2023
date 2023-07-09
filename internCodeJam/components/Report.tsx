export default function Report() {
  return (
    <>
      <div className="bg-slate-100 shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6 flex items-start justify-between">
          <div>
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Continuous Integration
            </h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Commodi, totam at reprehenderit maxime aut beatae ad.
              </p>
            </div>
            <div className="mt-3 text-sm leading-6">
              <a
                href="#"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Learn more about our CI features
                <span aria-hidden="true"> &rarr;</span>
              </a>
            </div>
          </div>
          <div className="relative">
            <input
              id="comments"
              aria-describedby="comments-description"
              name="comments"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
          </div>
        </div>
      </div>
    </>
  );
}
