import { Link, useLocation } from "react-router-dom";
import { Brain, LayoutDashboard, ListChecks } from "lucide-react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-card">
        <div className="container mx-auto flex items-center justify-between h-14 px-4">
          <Link to="/" className="flex items-center gap-2 font-semibold text-foreground">
            <Brain className="h-5 w-5 text-primary" />
            <span className="hidden sm:inline">KognitiF</span>
          </Link>
          {!isLanding && (
            <nav className="flex items-center gap-1">
              <Link
                to="/tes"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors ${
                  location.pathname.startsWith("/tes")
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <ListChecks className="h-4 w-4" />
                Tes
              </Link>
              <Link
                to="/dashboard"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors ${
                  location.pathname === "/dashboard"
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
            </nav>
          )}
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default Layout;
