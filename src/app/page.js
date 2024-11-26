"use client";
import { Dumbbell, Users, Globe, Medal } from 'lucide-react'
import EmailSignup from '@/components/EmailSignup'
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {

  const [backgroundImage, setBackgroundImage] = useState(null);
  const [bottomBannerImage, setBottomBannerImage] = useState(null);
  const [viewStartTime, setViewStartTime] = useState(new Date());

  // we only have to track the view when they first come to the page, theres no other pages to worry about

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        handleEndView(); // End the current view when the page is hidden
      } else if (document.visibilityState === "visible") {
        // Reset the viewStartTime when the user returns to the page
        setViewStartTime(new Date());
      }
    };

    const handleBeforeUnload = () => {
      // Use navigator.sendBeacon to reliably send data on unload
      const endTime = Date.now();
      const startTime = viewStartTime.getTime();
      const sessionLength = Math.floor((endTime - startTime) / 1000);

      const data = JSON.stringify({ sessionLength });

      navigator.sendBeacon("/api/views/addView", data);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [viewStartTime]);

  // Function to calculate and send the session length
  const handleEndView = async () => {
    const endTime = Date.now();
    const startTime = viewStartTime.getTime();
    const sessionLength = Math.floor((endTime - startTime) / 1000);

    try {
      await axios.post("/api/views/addView", {
        sessionLength,
      });
    } catch (error) {
      console.error("There was an error tracking view:", error);
    }
  };

  useEffect(() => {
    // Ensure the code runs only on the client side
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setBackgroundImage('/paingamesbannerdesktop.webp');
        setBottomBannerImage('/paingamesbottombannerdesktop.webp');
      } else {
        setBackgroundImage('/paingamesbannermobile.webp');
        setBottomBannerImage('/paingamesbottombannermobile.webp');
      }
    };

    // Set the initial background image
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="custom-gradient">
      {/* Header */}
      <header className="p-4 bg-transparent fixed top-0 left-0 w-full z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Pain Games</h1>
        </div>
      </header>


      {/* Hero Section */}
      <section
        className="py-20"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto md:w-2/3 text-center mb-40">
          <h2 className="text-4xl font-semibold mb-4">
            Elevate your fitness with relentless competition
          </h2>
          <p className="text-xl mb-4">
            The ultimate fitness and weight training app, where you’ll compete with rivals globally, challenge your friends, and conquer your own weaknesses. Dominate your fitness journey or be left behind.
          </p>
          <EmailSignup headerText={"Sign up to be notified when Pain Games is launched"} subText={"Est. End of 2024"} />
        </div>
      </section>

      {/* How Does It Work Section */}
      <section id="howdoesitwork" className="pt-20 mb-16">
        <div className="container mx-auto px-4">
          <h3 className="text-xl font-light text-red-700 text-center">COMPETITION IS THE GREATEST MOTIVATION</h3>
          <h3 className="text-4xl font-bold text-center mb-12">How Do the Pain Games Work?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
            <FeatureCard 
              icon={<Dumbbell className="w-12 h-12 text-red-500" />}
              title="Log Workouts"
              description="Track your workouts and compete with your past self to achieve new fitness goals."
            />
            <FeatureCard 
              icon={<Users className="w-12 h-12 text-red-500" />}
              title="Compete with Friends"
              description="Challenge your friends to fitness competitions and see who comes out on top."
            />
            <FeatureCard 
              icon={<Globe className="w-12 h-12 text-red-500" />}
              title="Global Competitions"
              description="Enter the Colosseum to compete globally, climb the leaderboards, and prove your strength."
            />
            <FeatureCard 
              icon={<Medal className="w-12 h-12 text-red-500" />}
              title="Complete Challenges"
              description="Take on fitness challenges designed to push your limits. Earn medals and honors to showcase your accomplishments."
            />
          </div>
        </div>
      </section>

      <section>
        <div className="md:mx-auto md:w-2/3 rounded p-6">
          <h2 className="text-4xl font-bold text-white text-center">⚠️ WARNING ⚠️</h2>
          <p className="text-center mb-6">THE WEAK WILL BE CRUSHED BY THE PAIN GAMES</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="text-center">
              <img
                src="/pain1.webp" 
                alt="Competition" 
                className="w-full h-auto mx-auto rounded border-4 border-red-800 object-cover aspect-square"
              />
              <p className="text-red-100 text-md mt-2 font-semibold">
                The competition will be fierce
              </p>
            </div>
            <div className="text-center">
              <img
                src="/pain2.webp" 
                alt="Bragging Rights" 
                className="w-full h-auto mx-auto rounded border-4 border-red-800 object-cover aspect-square"
              />
              <p className="text-red-100 text-md mt-2 font-semibold">
                The bragging rights will be off the charts
              </p>
            </div>
            <div className="text-center">
              <img 
                src="/pain3.webp" 
                alt="Glory" 
                className="w-full h-auto mx-auto rounded border-4 border-red-800 object-cover aspect-square"
              />
              <p className="text-red-100 text-md mt-2 font-semibold">
                The glory will be unparalleled
              </p>
            </div>
            <div className="text-center">
              <img
                src="/pain4.webp" 
                alt="Gains" 
                className="w-full h-auto mx-auto rounded border-4 border-red-800 object-cover aspect-square"
              />
              <p className="text-red-100 text-md mt-2 font-semibold">
                The gains will be unbelievable
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final section */}
      <section>
        <div className="md:w-1/2 md:mx-auto relative">
          <h3 className="text-xl font-light text-red-700 text-center">STRENGTH IS THE HIGHEST VIRTUE</h3>
          <h2 className="font-bold text-4xl text-center mb-6">Embrace the Pain, Reap the Gains</h2>
          <p className="text-white text-lg mb-4 text-center">
            The rewards that await the few and the strong will be glorious. Don't miss your chance to embrace the suffering,
            push your limits, and compete for the ultimate glory. Enter your email below to be notified when the Pain Games
            begin.
          </p>
          <div className="relative md:mb-2">
            <img
              src={bottomBannerImage} 
              className="md:rounded-xl md:border md:border-1 md:border-black" 
            />
            <div className="absolute top-2 left-0 w-full h-full flex items-start justify-center">
              <EmailSignup headerText={"The Pain Games are coming - prepare yourself"} />
            </div>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="py-8 bg-black border-1 border-t border-red-700">
        <div className="container mx-auto text-center text-gray-400">
          <p>&copy; 2024 Pain Games. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-gray-900 border border-red-800 rounded-lg shadow-lg overflow-hidden">
      <div className="p-6 text-center">
        <div className="mb-4 flex justify-center">{icon}</div>
        <h4 className="text-xl font-semibold mb-2">{title}</h4>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  )
}



