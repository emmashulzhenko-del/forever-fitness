import { Sun, Moon } from 'lucide-react';

interface Props {
  dark: boolean;
  onToggle: () => void;
}

export default function ThemeToggle({ dark, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      className="p-2 text-zinc-500 hover:text-accent transition-colors duration-200"
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {dark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
