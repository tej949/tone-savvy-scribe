
import { Mail } from "lucide-react";

const AppHeader = () => {
  return (
    <header className="text-center">
      <div className="flex items-center justify-center gap-2">
        <Mail className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">ToneSavvy</h1>
      </div>
      <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
        Rewrite your emails to match different cultural business norms. Avoid tone mistakes and communicate effectively across cultures.
      </p>
    </header>
  );
};

export default AppHeader;
