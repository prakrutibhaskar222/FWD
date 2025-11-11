import React from "react";

export default function Stats() {
  return (
    <section className="px-6 md:px-20 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          {/* Rating */}
          <div className="flex items-center gap-4">
            {/* Star icon */}
            <div
              className="flex-shrink-0 w-12 h-12 rounded-lg border border-gray-200 flex items-center justify-center"
              aria-hidden="true"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-amber-400"
              >
                <path
                  d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                  fill="currentColor"
                />
              </svg>
            </div>

            <div>
              <div className="text-2xl font-extrabold leading-none">4.8</div>
              <div className="text-sm text-gray-500">Service Rating*</div>
            </div>
          </div>

          {/* Customers */}
          <div className="flex items-center gap-4">
            {/* Users icon */}
            <div
              className="flex-shrink-0 w-12 h-12 rounded-lg border border-gray-200 flex items-center justify-center"
              aria-hidden="true"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-700"
              >
                <path
                  d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zM8 11c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5C23 14.17 18.33 13 16 13z"
                  fill="currentColor"
                />
              </svg>
            </div>

            <div>
              <div className="text-2xl font-extrabold leading-none">12M+</div>
              <div className="text-sm text-gray-500">Customers Globally*</div>
            </div>
          </div>
        </div>

        {/* small footnote text like the screenshot */}
        <div className="text-xs text-gray-400 mt-3">
          *Based on user reviews and internal metrics
        </div>
      </div>
    </section>
  );
}
