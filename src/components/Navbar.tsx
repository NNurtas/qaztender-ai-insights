import { Shield } from "lucide-react";

interface NavbarProps {
  currentSection: string;
  onNavigate: (section: string) => void;
}

const Navbar = ({ currentSection, onNavigate }: NavbarProps) => {
  const links = [
    { id: "hero", label: "Басты бет" },
    { id: "analysis", label: "Талдау" },
    { id: "dashboard", label: "Дашборд" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/30">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <button
          onClick={() => onNavigate("hero")}
          className="flex items-center gap-2.5"
        >
          <div className="h-8 w-8 rounded-lg gradient-gold flex items-center justify-center">
            <Shield className="h-4 w-4 text-accent-foreground" />
          </div>
          <span className="font-display font-bold text-lg text-foreground">
            QazTender <span className="text-gradient-gold">AI</span>
          </span>
        </button>

        <div className="flex items-center gap-1">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                currentSection === link.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
