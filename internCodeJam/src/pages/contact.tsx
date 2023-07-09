import Footer from "components/Footer";
import Navbar from "components/Navbar";
import React from "react";

const Contact = () => {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-center bg-indigo-800 font-sans">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-6xl font-extrabold tracking-tight text-white sm:text-[6rem]">
            Contact Us
          </h1>
          <p className="mb-4 text-xl leading-relaxed text-white">
            We are always happy to hear from our users! If you have any
            questions, suggestions or need help with ChronoMate, feel free to
            reach out.
          </p>
          <a
            href="mailto:t-chinatyu@microsoft.com"
            className="focus:shadow-outline rounded bg-blue-500 px-6 py-3 text-xl font-bold text-white transition-colors duration-200 hover:bg-blue-700 focus:outline-none"
          >
            Email us
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
