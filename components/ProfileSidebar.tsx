import React, { useEffect, useRef } from 'react';
import { UserProfile } from '../types';
import { Shield, Cpu, Wifi, Battery } from 'lucide-react';
import * as d3 from 'd3';

interface ProfileSidebarProps {
  user: UserProfile;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ user }) => {
  const d3Container = useRef<SVGSVGElement>(null);

  // D3 Visualization for "Brain Activity"
  useEffect(() => {
    if (d3Container.current) {
      const svg = d3.select(d3Container.current);
      svg.selectAll("*").remove(); // Clear previous

      const width = 200;
      const height = 60;
      const n = 40;
      const data = new Array(n).fill(0).map(() => Math.random());

      const x = d3.scaleLinear().domain([0, n - 1]).range([0, width]);
      const y = d3.scaleLinear().domain([0, 1]).range([height, 0]);

      const line = d3.line<number>()
        .x((d, i) => x(i))
        .y((d) => y(d))
        .curve(d3.curveBasis);

      const path = svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#00f0ff")
        .attr("stroke-width", 1.5)
        .attr("d", line);

      // Animate the line to look like brain waves
      const tick = () => {
        // Shift data
        data.push(Math.random());
        data.shift();
        path.datum(data).attr("d", line);
      };

      const timer = d3.interval(tick, 100);
      return () => timer.stop();
    }
  }, []);

  return (
    <div className="bg-cyber-black border border-cyber-gray/50 p-6 clip-corner-tr relative overflow-hidden">
      {/* Background grid effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(20,20,20,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(20,20,20,0.8)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none z-0 opacity-50"></div>

      <div className="relative z-10">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-cyber-yellow clip-both flex items-center justify-center overflow-hidden border-2 border-white">
             <img src="https://picsum.photos/200/200" alt="Avatar" className="w-full h-full object-cover mix-blend-multiply grayscale contrast-125" />
          </div>
          <div>
            <h2 className="text-2xl font-display font-bold text-white leading-none">{user.name}</h2>
            <p className="text-cyber-yellow font-mono text-sm">{user.handle}</p>
            <span className="inline-block bg-cyber-red text-black text-[10px] px-1 font-bold mt-1">LVL {user.level}</span>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-400 text-sm font-mono leading-relaxed border-l-2 border-cyber-cyan pl-3 italic">
            "{user.bio}"
          </p>
        </div>

        <div className="space-y-4 font-mono text-xs">
          <div className="flex justify-between items-center">
            <span className="flex items-center text-gray-400 w-20"><Cpu className="w-3 h-3 mr-2" /> RAM</span>
            <div className="w-32 h-2 bg-gray-800 rounded-none overflow-hidden">
              <div className="h-full bg-cyber-yellow" style={{ width: `${user.stats.ram}%` }}></div>
            </div>
            <span className="text-cyber-yellow w-12 text-right">{user.stats.ram}%</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="flex items-center text-gray-400 w-20"><Shield className="w-3 h-3 mr-2" /> ICE</span>
            <div className="w-32 h-2 bg-gray-800 rounded-none overflow-hidden">
              <div className="h-full bg-cyber-red" style={{ width: `${user.stats.cpu}%` }}></div>
            </div>
            <span className="text-cyber-red w-12 text-right">{user.stats.cpu}%</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="flex items-center text-gray-400 w-20"><Wifi className="w-3 h-3 mr-2" /> UPLINK</span>
             <div className="w-32 h-2 bg-gray-800 rounded-none overflow-hidden">
              <div className="h-full bg-cyber-cyan" style={{ width: `${user.stats.network}%` }}></div>
            </div>
            <span className="text-cyber-cyan w-12 text-right">{user.stats.network}MS</span>
          </div>
        </div>

        <div className="mt-8 border-t border-cyber-gray pt-4">
          <h3 className="text-cyber-cyan font-bold mb-2 text-sm uppercase tracking-widest">NEURAL ACTIVITY</h3>
          <svg ref={d3Container} width="200" height="60" className="w-full overflow-visible"></svg>
        </div>

        <div className="mt-4 flex space-x-2">
             <button className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 text-xs font-bold border border-gray-600 uppercase">Log</button>
             <button className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 text-xs font-bold border border-gray-600 uppercase">Ping</button>
        </div>
      </div>

      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 p-2">
         <div className="w-2 h-2 bg-cyber-red"></div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
