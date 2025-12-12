import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { TwinVisualizer } from "@/components/dashboard/TwinVisualizer";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { PredictiveChart } from "@/components/dashboard/PredictiveChart";
import { SimulationPanel } from "@/components/dashboard/SimulationPanel";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Zap, X, BrainCircuit, Activity, TrendingUp, User } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function Dashboard() {
  const [showRisk, setShowRisk] = useState(true);
  const [showOptimization, setShowOptimization] = useState(true);
  const [simulationStatus, setSimulationStatus] = useState<"nominal" | "warning" | "critical">("nominal");
  const [simulationScore, setSimulationScore] = useState<number | undefined>(undefined);
  const [location] = useLocation();

  const handleSimulationRun = (result: { impact: number; label: string; status: "nominal" | "warning" | "critical" }) => {
    setSimulationStatus(result.status);
    setSimulationScore(result.impact);
  };

  // Content for different "routes" to make buttons work
  const renderContent = () => {
    if (location === "/twin") {
       return (
         <div className="space-y-6">
           <h2 className="text-2xl font-display font-bold text-white">Twin Detailed Status</h2>
           <TwinVisualizer simulationStatus={simulationStatus} simulationScore={simulationScore} />
           <div className="grid grid-cols-2 gap-4">
              <div className="glass-panel p-6">
                <h3 className="text-primary font-bold mb-2">Genetic Profile</h3>
                <p className="text-sm text-muted-foreground">Sequence Match: 99.9%</p>
              </div>
              <div className="glass-panel p-6">
                 <h3 className="text-primary font-bold mb-2">Biometric Sync</h3>
                 <p className="text-sm text-muted-foreground">Latency: 12ms</p>
              </div>
           </div>
         </div>
       );
    }

    if (location === "/predictions") {
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-display font-bold text-white">Future Health Projections</h2>
          <PredictiveChart />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MetricCard title="Longevity Score" value="88" unit="/100" trend="up" trendValue="2%" data={[80,82,85,86,88]} />
            <MetricCard title="Disease Risk" value="Low" unit="" trend="down" trendValue="-5%" color="hsl(var(--secondary))" data={[40,35,30,25,20]} />
          </div>
        </div>
      );
    }
    
    if (location === "/simulations") {
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-display font-bold text-white">Scenario Engine</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SimulationPanel onSimulationRun={handleSimulationRun} />
            <div className="space-y-4">
              <TwinVisualizer simulationStatus={simulationStatus} simulationScore={simulationScore} />
              <div className="glass-panel p-4">
                <h4 className="font-bold text-white mb-2">Simulation Log</h4>
                <div className="text-xs text-muted-foreground font-mono space-y-2">
                  <p>{">"} Initializing physics engine...</p>
                  <p>{">"} Loading user biomarkers...</p>
                  <p>{">"} Applying environmental stressors...</p>
                  {simulationStatus !== 'nominal' && (
                    <p className={simulationStatus === 'critical' ? "text-red-400" : "text-orange-400"}>
                      {">"} WARNING: Adverse reaction detected in projection.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Default Dashboard View
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Visualizer & Alerts (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <TwinVisualizer simulationStatus={simulationStatus} simulationScore={simulationScore} />
          
          {showRisk && (
            <Alert variant="destructive" className="bg-destructive/10 border-destructive/20 text-destructive relative group">
              <AlertTriangle className="h-4 w-4" />
              <div className="flex justify-between items-start w-full">
                <div>
                  <AlertTitle className="font-display font-bold">Risk Detected</AlertTitle>
                  <AlertDescription className="text-xs">
                    Elevated cortisol levels predicted for 16:00 based on calendar events.
                  </AlertDescription>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6 -mr-2 -mt-2 hover:bg-destructive/20 hover:text-destructive"
                  onClick={() => setShowRisk(false)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </Alert>
          )}

          {showOptimization && (
            <Alert className="bg-primary/10 border-primary/20 text-primary relative group">
              <Zap className="h-4 w-4" />
              <div className="flex justify-between items-start w-full">
                <div>
                  <AlertTitle className="font-display font-bold">Optimization Available</AlertTitle>
                  <AlertDescription className="text-xs">
                    Consume 20g protein in next 30 mins to maximize recovery window.
                  </AlertDescription>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6 -mr-2 -mt-2 hover:bg-primary/20 hover:text-primary"
                  onClick={() => setShowOptimization(false)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </Alert>
          )}
        </div>

        {/* Right Column: Metrics & Charts (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetricCard 
              title="Readiness" 
              value="82" 
              unit="/100" 
              trend="up" 
              trendValue="4%"
              color="hsl(var(--primary))"
              data={[65, 70, 68, 72, 75, 80, 82]} 
            />
            <MetricCard 
              title="Sleep Debt" 
              value="45" 
              unit="min" 
              trend="down" 
              trendValue="15m"
              color="hsl(var(--secondary))"
              data={[90, 80, 75, 60, 50, 45, 45]} 
            />
            <MetricCard 
              title="HRV" 
              value="64" 
              unit="ms" 
              trend="neutral" 
              trendValue="0%"
              color="hsl(var(--accent))"
              data={[60, 62, 58, 65, 63, 64, 64]} 
            />
          </div>

          {/* Main Chart Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <PredictiveChart />
            </div>
            <div className="md:col-span-1">
              <SimulationPanel onSimulationRun={handleSimulationRun} />
            </div>
          </div>

          {/* Secondary Metrics Row */}
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass-panel p-4 rounded-lg border-white/5">
              <p className="text-xs text-muted-foreground uppercase font-mono">Resting HR</p>
              <p className="text-xl font-bold font-display text-white">48 bpm</p>
            </div>
            <div className="glass-panel p-4 rounded-lg border-white/5">
              <p className="text-xs text-muted-foreground uppercase font-mono">SpO2</p>
              <p className="text-xl font-bold font-display text-primary">99%</p>
            </div>
            <div className="glass-panel p-4 rounded-lg border-white/5">
              <p className="text-xs text-muted-foreground uppercase font-mono">Glucose</p>
              <p className="text-xl font-bold font-display text-white">95 mg/dL</p>
            </div>
            <div className="glass-panel p-4 rounded-lg border-white/5">
              <p className="text-xs text-muted-foreground uppercase font-mono">Temp</p>
              <p className="text-xl font-bold font-display text-white">98.4°F</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <DashboardLayout>
      {/* Top Welcome Section */}
      <div className="flex justify-between items-end mb-2">
        <div>
          <h2 className="text-3xl font-bold text-white font-display">
            {location === '/' ? 'Bio-State Overview' : 
             location === '/twin' ? 'Digital Twin Status' :
             location === '/predictions' ? 'Predictive Models' :
             location === '/simulations' ? 'Health Simulations' :
             'System Settings'}
          </h2>
          <p className="text-muted-foreground">Real-time sync with biological sensors active.</p>
        </div>
        <div className="flex items-center gap-2 text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20 animate-pulse-slow">
           <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
           <span className="text-xs font-mono uppercase tracking-widest">Connected</span>
        </div>
      </div>

      {renderContent()}
    </DashboardLayout>
  );
}