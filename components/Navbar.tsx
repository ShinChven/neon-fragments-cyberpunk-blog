import React from 'react';
import { NavItem } from '../types';
import { Terminal, Radio, Settings, FolderOpen } from 'lucide-react';
import GlitchText from './GlitchText';

interface NavbarProps {
  activeItem: NavItem;
  onNavigate: (item: NavItem) => void;
  onToggleProfile?: () => void;
  isProfileOpen?: boolean;
}

const CyberMenuIcon = ({ className, isOpen }: { className?: string, isOpen?: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Top Line */}
    <path
      d="M2 6H22"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
      className={`transition-all duration-300 origin-center ${isOpen ? 'translate-y-[6px] rotate-45' : ''}`}
      style={{ transformBox: 'fill-box' }}
    />

    {/* Middle Lines */}
    <path
      d="M2 12H16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
      className={`transition-all duration-300 ${isOpen ? 'opacity-0 -translate-x-4' : 'opacity-100'}`}
    />
    <path
      d="M19 12H22"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
      className={`transition-all duration-300 ${isOpen ? 'opacity-0 translate-x-4' : 'opacity-100'}`}
    />

    {/* Bottom Line */}
    <path
      d="M2 18H22"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
      className={`transition-all duration-300 origin-center ${isOpen ? '-translate-y-[6px] -rotate-45' : ''}`}
      style={{ transformBox: 'fill-box' }}
    />

    {/* Decorative Rects */}
    <rect
      x="20" y="4" width="2" height="4"
      fill="currentColor"
      className={`transition-all duration-300 ${isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}
    />
    <rect
      x="2" y="16" width="2" height="4"
      fill="currentColor"
      className={`transition-all duration-300 ${isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}
    />
  </svg>
);

const Navbar: React.FC<NavbarProps> = ({ activeItem, onNavigate, onToggleProfile, isProfileOpen }) => {
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
          <div className="flex items-center">
            {/* Mobile Profile Toggle */}
            <button
              className="md:hidden mr-4 text-cyber-yellow hover:text-cyber-cyan transition-colors z-50 relative"
              onClick={onToggleProfile}
              aria-label="Toggle Profile"
            >
              <CyberMenuIcon className="w-8 h-8" isOpen={isProfileOpen} />
            </button>

            <div className="flex-shrink-0 cursor-pointer" onClick={() => onNavigate(NavItem.HOME)}>
              <h1 className="text-3xl font-display font-bold italic tracking-tighter text-cyber-yellow">
                <span className="text-cyber-cyan mr-1">NC</span>
                NET<span className="text-white">_</span>LINK
              </h1>
            </div>
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
};export default Navbar;
