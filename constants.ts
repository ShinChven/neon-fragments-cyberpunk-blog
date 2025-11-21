import { BlogPost, UserProfile, NavItem } from './types';
import { Terminal, Radio, Settings, FolderOpen } from 'lucide-react';

export const NAV_ITEMS = [
  { id: NavItem.HOME, label: 'FEED', icon: Terminal, path: '/' },
  { id: NavItem.NET, label: 'NET', icon: Radio, path: '/net' },
  { id: NavItem.FILES, label: 'DATA', icon: FolderOpen, path: '/data' },
  { id: NavItem.GEAR, label: 'GEAR', icon: Settings, path: '/gear' },
];

export const MOCK_USER: UserProfile = {
  name: "V. MENDES",
  handle: "@net_runner_01",
  role: "NETRUNNER",
  level: 50,
  bio: "Navigating the datastreams of Night City. Hunting daemons and dodging corporate ice. Everything burns eventually.",
  stats: {
    ram: 64,
    cpu: 88,
    network: 42
  }
};

export const INITIAL_POSTS: BlogPost[] = [
  {
    id: '1',
    title: "THE ARASAKA BREACH: POST-MORTEM",
    slug: "arasaka-breach-post-mortem",
    content: "The ice was thicker than we anticipated. Black ICE everywhere. But we got the payload. The new neural link prototypes are definitely unstable. \n\nI saw glitches in the matrix that shouldn't exist. Is it the Relic? Or something else entirely? \n\nStandard encryption protocols failed within seconds. We had to switch to legacy analogue overrides. Remind me to thank Judy for the patch.",
    date: "2077-08-12 04:20",
    author: "V. Mendes",
    tags: ["NETRUNNING", "ARASAKA", "DAEMONS"],
    readTime: "3 min read",
    likes: 1204,
    isGlitch: false
  },
  {
    id: '2',
    title: "CHROMATIC ROCK: SAMURAI REUNION?",
    slug: "chromatic-rock-samurai-reunion",
    content: "Rumors are circulating in the Afterlife. Kerry Eurodyne was seen looking at old setlists. Are we finally getting the reunion tour, or is this just another corporate distraction? \n\nRefused to comment. Classic.",
    date: "2077-08-10 18:45",
    author: "Bes Isis",
    tags: ["MUSIC", "SAMURAI", "NIGHT CITY"],
    readTime: "1 min read",
    likes: 892,
    isGlitch: false
  },
  {
    id: '3',
    title: "WARNING: CYBERPSYCHOSIS SPIKE IN WATSON",
    slug: "warning-cyberpsychosis-spike-watson",
    content: "NCPD reports a 300% increase in reported cyberpsychosis incidents in the Watson district. Avoid the Kabuki markets after dark. \n\nRegina needs help cleaning up the mess without flatlining the poor souls. If you have non-lethal mods, now's the time to equip them.",
    date: "2077-08-09 09:00",
    author: "Regina Jones",
    tags: ["WARNING", "NCPD", "WATSON"],
    readTime: "2 min read",
    likes: 3400,
    isGlitch: true
  }
];
