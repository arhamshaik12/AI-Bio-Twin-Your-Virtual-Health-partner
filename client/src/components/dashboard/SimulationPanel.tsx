import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Loader2, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface SimulationPanelProps {
  onSimulationRun: (result: { impact: number; label: string; status: "nominal" | "warning" | "critical" }) => void;
}

export function SimulationPanel({ onSimulationRun }: SimulationPanelProps) {
  // Existing
  const [sleep, setSleep] = useState([7]);
  const [stress, setStress] = useState([40]);
  const [activity, setActivity] = useState([5000]); // Changed to steps (approx)
  
  // New
  const [energy, setEnergy] = useState([70]);
  const [mood, setMood] = useState([50]);
  const [water, setWater] = useState([2000]); // ml

  const [isSimulating, setIsSimulating] = useState(false);
  const [result, setResult] = useState<{ impact: number; label: string; status: "nominal" | "warning" | "critical" } | null>(null);

  const runSimulation = () => {
    setIsSimulating(true);
    setResult(null);

    setTimeout(() => {
      // Logic Simplified for immediate feedback
      // Sleep (0-12): < 6 bad, 7-9 good, > 10 okay
      let sleepScore = 0;
      if (sleep[0] < 6) sleepScore = -20;
      else if (sleep[0] >= 7 && sleep[0] <= 9) sleepScore = 20;
      else sleepScore = 5;

      // Stress (0-100): > 70 bad, < 30 good
      let stressScore = 0;
      if (stress[0] > 70) stressScore = -25;
      else if (stress[0] < 30) stressScore = 15;
      else stressScore = -5;

      // Activity (0-20000): < 3000 bad, > 8000 good
      let activityScore = 0;
      if (activity[0] < 3000) activityScore = -15;
      else if (activity[0] > 8000) activityScore = 15;
      else activityScore = 5;

      // Mood/Energy/Water (simplified impact)
      const energyScore = (energy[0] > 60) ? 10 : -10;
      const moodScore = (mood[0] > 60) ? 10 : -10;
      const waterScore = (water[0] > 2000) ? 10 : -5;

      const totalImpact = sleepScore + stressScore + activityScore + energyScore + moodScore + waterScore;
      
      let label = "Stable";
      let status: "nominal" | "warning" | "critical" = "nominal";

      // Thresholds
      if (totalImpact >= 20) {
        label = "Optimal State";
        status = "nominal";
      } else if (totalImpact >= -10) {
        label = "Needs Attention";
        status = "warning";
      } else {
        label = "Critical Decline";
        status = "critical";
      }

      const simResult = { impact: totalImpact, label, status };
      setResult(simResult);
      onSimulationRun(simResult);
      setIsSimulating(false);
    }, 800); // Faster feedback
  };

  return (
    <Card className="glass-panel border-white/5 relative overflow-hidden">
      {isSimulating && (
        <div className="absolute inset-0 z-0 bg-secondary/5 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-1 bg-secondary/50 shadow-[0_0_20px_2px_rgba(168,85,247,0.5)] animate-[scan_1.5s_ease-in-out_infinite]" />
        </div>
      )}

      <CardHeader>
        <CardTitle className="font-display text-lg text-secondary flex items-center gap-2 relative z-10">
          <Play className="h-4 w-4 fill-secondary" />
          Simulation Engine
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Column 1 */}
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <Label className="font-mono text-xs uppercase text-muted-foreground">Sleep Hours</Label>
                <span className="font-mono text-xs font-bold text-primary">{sleep} hrs</span>
              </div>
              <Slider value={sleep} onValueChange={setSleep} max={12} min={3} step={0.5} className="[&>.relative>.bg-primary]:bg-secondary" />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <Label className="font-mono text-xs uppercase text-muted-foreground">Stress Level</Label>
                <span className="font-mono text-xs font-bold text-primary">{stress}%</span>
              </div>
              <Slider value={stress} onValueChange={setStress} max={100} step={1} className="[&>.relative>.bg-primary]:bg-secondary" />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <Label className="font-mono text-xs uppercase text-muted-foreground">Energy Level</Label>
                <span className="font-mono text-xs font-bold text-primary">{energy}%</span>
              </div>
              <Slider value={energy} onValueChange={setEnergy} max={100} step={1} className="[&>.relative>.bg-primary]:bg-secondary" />
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-6">
             <div className="space-y-3">
              <div className="flex justify-between">
                <Label className="font-mono text-xs uppercase text-muted-foreground">Mood</Label>
                <span className="font-mono text-xs font-bold text-primary">{mood}%</span>
              </div>
              <Slider value={mood} onValueChange={setMood} max={100} step={1} className="[&>.relative>.bg-primary]:bg-secondary" />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <Label className="font-mono text-xs uppercase text-muted-foreground">Steps / Activity</Label>
                <span className="font-mono text-xs font-bold text-primary">{activity.toLocaleString()}</span>
              </div>
              <Slider value={activity} onValueChange={setActivity} max={20000} step={100} className="[&>.relative>.bg-primary]:bg-secondary" />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <Label className="font-mono text-xs uppercase text-muted-foreground">Water Intake</Label>
                <span className="font-mono text-xs font-bold text-primary">{water} ml</span>
              </div>
              <Slider value={water} onValueChange={setWater} max={4000} step={50} className="[&>.relative>.bg-primary]:bg-secondary" />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-white/5">
           <div className="flex justify-between items-center mb-4 min-h-[2rem]">
             <span className="text-sm font-medium text-muted-foreground">Projected Impact</span>
             {result ? (
               <div className="text-right animate-in fade-in slide-in-from-bottom-2">
                 <span className={cn(
                   "text-lg font-bold font-display block",
                   result.impact > 0 ? "text-green-400" : result.impact < 0 ? "text-red-400" : "text-white"
                 )}>
                   {result.impact > 0 ? "+" : ""}{result.impact}% Recovery
                 </span>
                 <span className="text-[10px] font-mono uppercase text-muted-foreground">{result.label}</span>
               </div>
             ) : (
                <span className="text-xs text-muted-foreground font-mono">--</span>
             )}
           </div>
           
           <Button 
             className={cn(
               "w-full font-display uppercase tracking-widest relative overflow-hidden transition-colors",
               result?.status === 'critical' ? "bg-red-600 hover:bg-red-700" :
               result?.status === 'warning' ? "bg-orange-600 hover:bg-orange-700" :
               "bg-secondary hover:bg-secondary/80 text-white"
             )}
             onClick={runSimulation}
             disabled={isSimulating}
           >
             {isSimulating ? (
               <>
                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                 Processing Model...
               </>
             ) : (
               <>
                 {result ? <RefreshCw className="mr-2 h-4 w-4" /> : null}
                 {result ? "Re-Run Simulation" : "Run Simulation"}
               </>
             )}
           </Button>
        </div>
      </CardContent>
    </Card>
  );
}