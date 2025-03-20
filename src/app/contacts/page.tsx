import Link from "next/link";
import React from "react";

export default function Contacts() {
  return (
    <section className="bg-gray-900 text-gray-200 body-font py-16 h-screen">
      <div className="container mx-auto px-5">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-4xl text-3xl font-bold mb-4">
            Contact Support
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-lg">
            Having issues or need help with our service? Fill in the form below
            or contact us directly.
          </p>
        </div>
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-800 rounded-lg p-8 flex flex-col md:mx-auto w-full mt-10 shadow-lg">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="leading-7 text-sm text-gray-400"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full bg-gray-700 rounded border border-gray-600 focus:border-sky-500 focus:ring-2 focus:ring-sky-500 text-base outline-none text-gray-100 py-2 px-3 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-400"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full bg-gray-700 rounded border border-gray-600 focus:border-sky-500 focus:ring-2 focus:ring-sky-500 text-base outline-none text-gray-100 py-2 px-3 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="message"
                    className="leading-7 text-sm text-gray-400"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className="w-full bg-gray-700 rounded border border-gray-600 focus:border-sky-500 focus:ring-2 focus:ring-sky-500 h-32 text-base outline-none text-gray-100 py-2 px-3 resize-none transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>
              <div className="p-2 w-full">
                <button className="flex mx-auto text-white bg-sky-500 border-0 py-3 px-8 focus:outline-none hover:bg-sky-600 rounded-lg text-lg transition-colors duration-200">
                  Send Message
                </button>
              </div>
              <div className="p-2 w-full pt-8 mt-8 border-t border-gray-700 text-center">
                <Link
                  className="text-sky-500 hover:underline"
                  href="mailto:accsaver@email.com"
                >
                  accsaver@email.com
                </Link>
                <p className="mt-2 text-gray-500 text-sm">
                  We typically respond within 24 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
