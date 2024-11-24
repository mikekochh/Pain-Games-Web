import React from "react";

const ThankYou = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-red-900 to-black flex items-center justify-center min-h-screen">
      <div className="bg-black border border-red-600 p-6 rounded-lg shadow-lg text-white max-w-md text-center">
        {/* Header */}
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          Thank You for Entering the Pain Games
        </h1>

        {/* Body */}
        <p className="text-lg text-gray-400 mb-6">
          The suffering begins soon. Prepare yourself for the ultimate test of
          endurance, strength, and resolve. Only the strongest will rise.
        </p>

        {/* Quote */}
        <div className="bg-black border-t border-b border-red-600 py-4 mb-4">
          <p className="italic text-red-500">
            "Pain is temporary. Glory is eternal."
          </p>
        </div>

        {/* Closing */}
        <p className="text-gray-500">
          Stay vigilant. Watch your email for updates. The Pain Games are
          coming, and the weak will fail.
        </p>
      </div>
    </section>
  );
};

export default ThankYou;
