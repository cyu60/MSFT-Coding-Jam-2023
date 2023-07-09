import Footer from "components/Footer";
import Navbar from "components/Navbar";
import React from "react";

const About = () => {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-center bg-indigo-500">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 text-center">
          <h1 className="text-6xl font-extrabold tracking-tight text-white sm:text-[6rem] lg:text-[7rem]">
            About ChronoMate
          </h1>
          <p className="text-xl text-white sm:text-2xl lg:text-3xl">
            ChronoMate is a productivity application designed to help you manage
            and track your time. Whether you are studying, working, exercising,
            or taking a break, ChronoMate has got you covered. Explore our
            features and start making the most of your time!
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default About;
