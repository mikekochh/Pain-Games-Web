"use client";

import Image from 'next/image'
import { Dumbbell, Trophy, Users, Globe, Medal } from 'lucide-react'
import EmailSignup from '@/components/EmailSignup'
import { useEffect, useState } from 'react';

export default function Home() {

  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    if (window.innerWidth > 768) {
      setBackgroundImage('/paingamesbannerdesktop.jpeg');
    } else {
      setBackgroundImage('/paingamesbannermobile.jpeg');
    }
  }, [window]);

  return (
    <div className="custom-gradient">
      {/* Header */}
      <header className="p-4 bg-transparent fixed top-0 left-0 w-full z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Pain Games</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="#features" className="hover:text-red-400">Contact Us</a>
              </li>
            </ul>
          </nav>
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
      <section id="howdoesitwork" className="py-20">
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


          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <img 
                src="/pain1.jpeg" 
                alt="Competition" 
                className="w-full h-auto mx-auto rounded border-4 border-red-800 object-cover aspect-square"
              />
              <p className="text-red-100 text-md mt-2 font-semibold">
                The competition will be fierce
              </p>
            </div>
            <div className="text-center">
              <img 
                src="/pain2.jpeg" 
                alt="Bragging Rights" 
                className="w-full h-auto mx-auto rounded border-4 border-red-800 object-cover aspect-square"
              />
              <p className="text-red-100 text-md mt-2 font-semibold">
                The bragging rights will be off the charts
              </p>
            </div>
            <div className="text-center">
              <img 
                src="/pain3.jpeg" 
                alt="Glory" 
                className="w-full h-auto mx-auto rounded border-4 border-red-800 object-cover aspect-square"
              />
              <p className="text-red-100 text-md mt-2 font-semibold">
                The glory will be unparalleled
              </p>
            </div>
            <div className="text-center">
              <img 
                src="/pain4.jpeg" 
                alt="Gains" 
                className="w-full h-auto mx-auto rounded border-4 border-red-800 object-cover aspect-square"
              />
              <p className="text-red-100 text-md mt-2 font-semibold">
                The gains will be unbelievable
              </p>
            </div>
          </div>

          {/* Text paragraphs */}
          <h2 className="font-bold text-3xl text-center">Embrace the Pain, Reap the Gains</h2>
          <p className="text-white text-lg mb-4">
            The rewards that await the few and the strong will be glorious. Don't miss your chance to embrace the suffering,
            push your limits, and compete for the ultimate glory. Enter your email below to be notified when the Pain Games
            begin.
          </p>
          <EmailSignup headerText={"The Pain Games are coming - prepare yourself"} />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-black">
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



