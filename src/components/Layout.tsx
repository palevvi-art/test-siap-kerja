import { Link, useLocation } from "react-router-dom";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const navLink = (to: string, label: string) => {
    const active =
      to === "/tes"
        ? location.pathname.startsWith("/tes") || location.pathname.startsWith("/hasil")
        : location.pathname === to;
    return (
      <Link
        to={to}
        className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
          active
            ? "bg-accent text-accent-foreground font-medium"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border/60 bg-background/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between h-14 px-6 max-w-5xl">
          <Link to="/" className="font-semibold text-foreground tracking-tight">
            KognitiF
          </Link>
          <nav className="flex items-center gap-1">
            {navLink("/tes", "Tes")}
            {navLink("/dashboard", "Dashboard")}
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default Layout;
