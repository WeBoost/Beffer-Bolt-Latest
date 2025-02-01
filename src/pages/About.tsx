import React from 'react';
import { Users, Target, Award, ArrowRight, Building2, Globe2, Rocket } from 'lucide-react';

const stats = [
  { label: 'Door Manufacturers', value: '500+', icon: Building2 },
  { label: 'Countries', value: '25+', icon: Globe2 },
  { label: 'Doors Configured', value: '1M+', icon: Rocket }
];

const team = [
  {
    name: 'John Smith',
    role: 'CEO & Founder',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2670&auto=format&fit=crop',
    bio: 'Former door manufacturing executive with 15+ years of industry experience.'
  },
  {
    name: 'Sarah Johnson',
    role: 'CTO',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2670&auto=format&fit=crop',
    bio: '12+ years in software engineering, specialized in 3D configuration systems.'
  },
  {
    name: 'Michael Chen',
    role: 'Head of Design',
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=2670&auto=format&fit=crop',
    bio: 'Award-winning designer with expertise in manufacturing UX/UI.'
  }
];

export function About() {
  return (
    <div className="bg-slate-900">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Revolutionizing the Door Manufacturing Industry
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            We're on a mission to transform how door manufacturers showcase, sell, and
            manage their products online with cutting-edge technology.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-slate-800/50 p-8 rounded-xl border border-slate-700 text-center hover:border-slate-600 transition-colors"
              >
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon className="text-blue-400" size={24} />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-slate-400">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Mission & Values */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Our Mission & Values</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center shrink-0">
                  <Target className="text-blue-400" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Mission</h3>
                  <p className="text-slate-300">
                    To empower door manufacturers with digital tools that transform their
                    business and delight their customers.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center shrink-0">
                  <Award className="text-purple-400" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Values</h3>
                  <p className="text-slate-300">
                    Innovation, customer success, and sustainability drive everything we do.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl"></div>
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop"
              alt="Team meeting"
              className="rounded-xl relative z-10"
            />
          </div>
        </div>

        {/* Team */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">Meet Our Team</h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Industry experts and technology innovators working together to transform
            door manufacturing.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-colors group"
            >
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full"></div>
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover rounded-full relative z-10"
                />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
              <p className="text-blue-400 mb-4">{member.role}</p>
              <p className="text-slate-300">{member.bio}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Join Us in Shaping the Future
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            We're always looking for talented individuals who share our vision.
          </p>
          <button className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2 text-lg font-medium group">
            View Open Positions
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}