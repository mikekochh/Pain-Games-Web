import Image from 'next/image'
import { Dumbbell, Flame, Trophy, Users } from 'lucide-react'
import EmailSignup from '@/components/EmailSignup'

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="p-4 bg-red-900">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Pain Games</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#features" className="hover:text-red-400">Features</a></li>
              <li><a href="#download" className="hover:text-red-400">Download</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-red-900 to-black">
        <div className="container mx-auto md:w-2/3 text-center">
          <h2 className="text-5xl font-semibold mb-4">Elevate your fitness with relentless competition</h2>
          <p className="text-xl">
            Enter the Pain Games - where you'll battle rivals across the globe, challenge your friends, and conquer your own weaknesses. Dominate your fitness journey or be left behind.
          </p>
          <EmailSignup headerText={"Join If You Dare"} />
        </div>
      </section>

      <section>
        <div className="bg-black md:mx-auto md:w-2/3 rounded">
          <h2 className="text-5xl font-bold mb-4">Welcome to the Pain Games</h2>
              <p className="text-white text-lg">
                Many will not survive the pain games. The competition will be fierce. The bragging rights will be off the
                charts. The glory will be unparalleled. The rewards that await the few and the strong will be
                You will not survive the pain games. The competition will be fierce. The winnings will be glorious.
                The bragging rights will be off the charts. The rewards that await the few and the strong will be
                glorious. 

                Don't miss your chance to embrace the suffering, push your limits, and compete for ultimate glory.
                Enter your email below to stay in the loop and prepare for the pain (and the gains).

                The Pain Games are coming - prepare yourself.
              </p>
            </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Embrace the Pain, Reap the Gain</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<Dumbbell className="w-12 h-12 text-red-500" />}
              title="Log Workouts"
              description="Track your progress with detailed workout logs"
            />
            <FeatureCard 
              icon={<Users className="w-12 h-12 text-red-500" />}
              title="Compete"
              description="Challenge friends or join global competitions"
            />
            <FeatureCard 
              icon={<Flame className="w-12 h-12 text-red-500" />}
              title="Burn"
              description="Set personal records and watch your calories burn"
            />
            <FeatureCard 
              icon={<Trophy className="w-12 h-12 text-red-500" />}
              title="Win"
              description="Earn badges and climb the leaderboards"
            />
          </div>
        </div>
      </section>

      {/* App Preview Section */}
      <section className="py-20 bg-gradient-to-t from-red-900 to-black">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h3 className="text-3xl font-bold mb-4">Experience the Thrill</h3>
            <p className="mb-4">Push your limits, compete with friends, and transform your body with Pain Games. Our app turns your fitness journey into an exhilarating challenge.</p>
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Learn More
            </button>
          </div>
          <div className="md:w-1/2">
            <Image 
              src="/placeholder.svg?height=600&width=300" 
              alt="Pain Games App Preview" 
              width={300} 
              height={600} 
              className="rounded-lg shadow-lg mx-auto"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="download" className="py-20 bg-red-900">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Play?</h3>
          <p className="mb-8">Download Pain Games now and start your journey to fitness domination</p>
          <div className="flex justify-center space-x-4">
            <button className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded">
              Download for iOS
            </button>
            <button className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded">
              Download for Android
            </button>
          </div>
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



