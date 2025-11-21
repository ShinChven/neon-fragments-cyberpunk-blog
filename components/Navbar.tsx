import React from 'react';
import { NavItem } from '../types';
import { Terminal, Radio, Settings, FolderOpen } from 'lucide-react';
import GlitchText from './GlitchText';

interface NavbarProps {
  activeItem: NavItem;
  onNavigate: (item: NavItem) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeItem, onNavigate }) => {
  const navItems = [
    { id: NavItem.HOME, label: 'FEED', icon: Terminal },
    { id: NavItem.NET, label: 'NET', icon: Radio },
    { id: NavItem.FILES, label: 'DATA', icon: FolderOpen },
    { id: NavItem.GEAR, label: 'GEAR', icon: Settings },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-cyber-black/90 backdrop-blur-sm border-b border-cyber-gray/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 cursor-pointer" onClick={() => onNavigate(NavItem.HOME)}>
            <h1 className="text-3xl font-display font-bold italic tracking-tighter text-cyber-yellow">
              <span className="text-cyber-cyan mr-1">NC</span>
              NET<span className="text-white">_</span>LINK
            </h1>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeItem === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`
                      group flex items-center px-3 py-2 text-sm font-medium font-mono transition-colors duration-200
                      ${isActive ? 'text-cyber-yellow bg-cyber-gray/30 border-b-2 border-cyber-yellow' : 'text-gray-400 hover:text-cyber-cyan'}
                    `}
                  >
                    <Icon className={`w-4 h-4 mr-2 ${isActive ? 'animate-pulse' : 'group-hover:text-cyber-red'}`} />
                    <GlitchText text={item.label} />
                  </button>
                );
              })}
            </div>
          </div>
          
          <div className="flex items-center">
             <div className="h-2 w-2 bg-green-500 rounded-full animate-ping mr-2"></div>
             <span className="text-xs font-mono text-green-500">ONLINE</span>
          </div>
        </div>
      </div>
      {/* Decorative Scanline under nav */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-cyber-cyan to-transparent opacity-50"></div>
    </nav>
  );
};

export default Navbar;
