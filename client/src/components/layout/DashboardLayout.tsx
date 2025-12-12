import { Link, useLocation } from "wouter";
import { 
  Activity, 
  User, 
  TrendingUp, 
  Settings, 
  AlertTriangle, 
  BrainCircuit,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { icon: Activity, label: "Live Vitals", path: "/" },
    { icon: User, label: "Twin Status", path: "/twin" },
    { icon: TrendingUp, label: "Predictions", path: "/predictions" },
    { icon: BrainCircuit, label: "Simulations", path: "/simulations" },
    { icon: AlertTriangle, label: "Risk Analysis", path: "/risks" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden relative text-foreground">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-sidebar border-r border-white/5 transition-transform duration-300 lg:translate-x-0 lg:static",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-white/5">
            <h1 className="text-2xl font-display font-bold text-primary tracking-wider flex items-center gap-2">
              <Activity className="h-6 w-6" />
              AI BioTwin
            </h1>
            <p className="text-xs text-muted-foreground mt-1 font-mono uppercase tracking-widest">
              System Online
            </p>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => {
              const isActive = location === item.path;
              return (
                <Link key={item.path} href={item.path}>
                  <div 
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer group",
                      isActive 
                        ? "bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_-3px_hsl(var(--primary)/0.3)]" 
                        : "text-muted-foreground hover:text-white hover:bg-white/5"
                    )}
                  >
                    <item.icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-muted-foreground group-hover:text-white")} />
                    <span className="font-display tracking-wide uppercase">{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-white/5 bg-black/20">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                <span className="font-display font-bold text-primary">JD</span>
              </div>
              <div>
                <p className="text-sm font-bold text-white font-display">John Doe</p>
                <p className="text-xs text-muted-foreground">Premium User</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Header (Mobile Only) */}
        <header className="h-16 border-b border-white/5 flex items-center px-4 lg:hidden bg-background/80 backdrop-blur-md sticky top-0 z-30">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </Button>
          <span className="ml-4 font-display font-bold text-xl">Dashboard</span>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 relative">
          {/* Background Grid Decoration */}
          <div className="absolute inset-0 pointer-events-none opacity-20" 
               style={{ 
                 backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
                 backgroundSize: '40px 40px'
               }} 
          />
          
          <div className="relative z-10 max-w-7xl mx-auto space-y-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}