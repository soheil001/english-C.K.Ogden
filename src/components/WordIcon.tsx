import React from 'react';
import {
  BookOpen,
  Home,
  Droplets,
  Users,
  Clock,
  Gift,
  Hand,
  Footprints,
  Compass,
  Wrench,
  Utensils,
  Eye,
  Sparkles,
  MessageSquare,
  FolderInput,
  Lock,
  Lightbulb,
  DoorClosed,
  Sun,
  Moon,
  ThumbsUp,
  Sparkle,
  User,
  HeartHandshake,
  Baby,
  Ear,
  Brain,
  Heart,
  Type,
  Tag,
  MapPin,
  Armchair,
  Table,
  TreePine,
  Star,
  CloudSun,
  Flame,
  Globe,
  Wind,
  Waves,
  Car,
  Route,
  Building2,
  Flag,
  GraduationCap,
  BookMarked,
  HelpCircle,
  CheckCircle,
  LifeBuoy,
  Briefcase,
  Gamepad2,
  Glasses,
  PenLine,
  Headphones,
  Volume2,
  Smile,
  ShieldCheck,
  Zap,
  ArrowUp,
  ArrowDown,
  PlayCircle,
  PauseCircle,
  Unlock,
  KeyRound,
  LogIn,
  LogOut,
  Maximize2,
  Minimize2,
  FastForward,
  Hourglass,
  Calendar,
  Check,
  Layers,
} from 'lucide-react';

interface WordIconProps {
  wordKey: string;
  className?: string;
  size?: number;
}

export const WordIcon: React.FC<WordIconProps> = ({ wordKey, className = 'w-7 h-7 text-blue-700', size = 28 }) => {
  const normalized = wordKey.toLowerCase().trim();

  // Consistent SVG mapping for all Ogden words
  switch (normalized) {
    case 'book':
      return <BookOpen size={size} className={className} strokeWidth={2} />;
    case 'house':
      return <Home size={size} className={className} strokeWidth={2} />;
    case 'water':
      return <Droplets size={size} className={className} strokeWidth={2} />;
    case 'friend':
      return <Users size={size} className={className} strokeWidth={2} />;
    case 'time':
      return <Clock size={size} className={className} strokeWidth={2} />;
    case 'give':
      return <Gift size={size} className={className} strokeWidth={2} />;
    case 'take':
      return <Hand size={size} className={className} strokeWidth={2} />;
    case 'come':
      return <Footprints size={size} className={className} strokeWidth={2} />;
    case 'go':
      return <Compass size={size} className={className} strokeWidth={2} />;
    case 'make':
      return <Wrench size={size} className={className} strokeWidth={2} />;
    case 'food':
      return <Utensils size={size} className={className} strokeWidth={2} />;
    case 'see':
      return <Eye size={size} className={className} strokeWidth={2} />;
    case 'get':
      return <Sparkles size={size} className={className} strokeWidth={2} />;
    case 'say':
      return <MessageSquare size={size} className={className} strokeWidth={2} />;
    case 'put':
      return <FolderInput size={size} className={className} strokeWidth={2} />;
    case 'keep':
      return <Lock size={size} className={className} strokeWidth={2} />;
    case 'light':
      return <Lightbulb size={size} className={className} strokeWidth={2} />;
    case 'door':
      return <DoorClosed size={size} className={className} strokeWidth={2} />;
    case 'day':
      return <Sun size={size} className={className} strokeWidth={2} />;
    case 'night':
      return <Moon size={size} className={className} strokeWidth={2} />;
    case 'good':
      return <ThumbsUp size={size} className={className} strokeWidth={2} />;
    case 'new':
      return <Sparkle size={size} className={className} strokeWidth={2} />;
    case 'man':
      return <User size={size} className={className} strokeWidth={2} />;
    case 'woman':
      return <HeartHandshake size={size} className={className} strokeWidth={2} />;
    case 'child':
      return <Baby size={size} className={className} strokeWidth={2} />;
    case 'hand':
      return <Hand size={size} className={className} strokeWidth={2} />;
    case 'eye':
      return <Eye size={size} className={className} strokeWidth={2} />;
    case 'ear':
      return <Ear size={size} className={className} strokeWidth={2} />;
    case 'head':
      return <Brain size={size} className={className} strokeWidth={2} />;
    case 'heart':
      return <Heart size={size} className={className} strokeWidth={2} />;
    case 'word':
      return <Type size={size} className={className} strokeWidth={2} />;
    case 'name':
      return <Tag size={size} className={className} strokeWidth={2} />;
    case 'place':
      return <MapPin size={size} className={className} strokeWidth={2} />;
    case 'room':
      return <Armchair size={size} className={className} strokeWidth={2} />;
    case 'table':
      return <Table size={size} className={className} strokeWidth={2} />;
    case 'tree':
      return <TreePine size={size} className={className} strokeWidth={2} />;
    case 'sun':
      return <Sun size={size} className={className} strokeWidth={2} />;
    case 'moon':
      return <Moon size={size} className={className} strokeWidth={2} />;
    case 'star':
      return <Star size={size} className={className} strokeWidth={2} />;
    case 'sky':
      return <CloudSun size={size} className={className} strokeWidth={2} />;
    case 'fire':
      return <Flame size={size} className={className} strokeWidth={2} />;
    case 'earth':
      return <Globe size={size} className={className} strokeWidth={2} />;
    case 'wind':
      return <Wind size={size} className={className} strokeWidth={2} />;
    case 'sea':
      return <Waves size={size} className={className} strokeWidth={2} />;
    case 'river':
      return <Droplets size={size} className={className} strokeWidth={2} />;
    case 'car':
      return <Car size={size} className={className} strokeWidth={2} />;
    case 'road':
      return <Route size={size} className={className} strokeWidth={2} />;
    case 'city':
      return <Building2 size={size} className={className} strokeWidth={2} />;
    case 'country':
      return <Flag size={size} className={className} strokeWidth={2} />;
    case 'school':
      return <GraduationCap size={size} className={className} strokeWidth={2} />;
    case 'story':
      return <BookMarked size={size} className={className} strokeWidth={2} />;
    case 'question':
      return <HelpCircle size={size} className={className} strokeWidth={2} />;
    case 'answer':
      return <CheckCircle size={size} className={className} strokeWidth={2} />;
    case 'help':
      return <LifeBuoy size={size} className={className} strokeWidth={2} />;
    case 'work':
      return <Briefcase size={size} className={className} strokeWidth={2} />;
    case 'play':
      return <Gamepad2 size={size} className={className} strokeWidth={2} />;
    case 'read':
      return <Glasses size={size} className={className} strokeWidth={2} />;
    case 'write':
      return <PenLine size={size} className={className} strokeWidth={2} />;
    case 'listen':
      return <Headphones size={size} className={className} strokeWidth={2} />;
    case 'speak':
      return <Volume2 size={size} className={className} strokeWidth={2} />;
    case 'love':
      return <Heart size={size} className={className} strokeWidth={2} />;
    case 'peace':
      return <Smile size={size} className={className} strokeWidth={2} />;
    case 'hope':
      return <ShieldCheck size={size} className={className} strokeWidth={2} />;
    case 'step':
      return <Footprints size={size} className={className} strokeWidth={2} />;
    case 'start':
      return <PlayCircle size={size} className={className} strokeWidth={2} />;
    case 'stop':
      return <PauseCircle size={size} className={className} strokeWidth={2} />;
    case 'open':
      return <Unlock size={size} className={className} strokeWidth={2} />;
    case 'close':
      return <Lock size={size} className={className} strokeWidth={2} />;
    case 'key':
      return <KeyRound size={size} className={className} strokeWidth={2} />;
    case 'up':
      return <ArrowUp size={size} className={className} strokeWidth={2} />;
    case 'down':
      return <ArrowDown size={size} className={className} strokeWidth={2} />;
    case 'in':
      return <LogIn size={size} className={className} strokeWidth={2} />;
    case 'out':
      return <LogOut size={size} className={className} strokeWidth={2} />;
    case 'big':
      return <Maximize2 size={size} className={className} strokeWidth={2} />;
    case 'small':
      return <Minimize2 size={size} className={className} strokeWidth={2} />;
    case 'fast':
      return <FastForward size={size} className={className} strokeWidth={2} />;
    case 'now':
      return <Hourglass size={size} className={className} strokeWidth={2} />;
    case 'today':
      return <Calendar size={size} className={className} strokeWidth={2} />;
    case 'yes':
      return <Check size={size} className={className} strokeWidth={2} />;
    default:
      return <Sparkles size={size} className={className} strokeWidth={2} />;
  }
};
