import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import generatedImage from "@assets/generated_images/holographic_digital_twin_avatar.png";

interface TwinVisualizerProps {
  simulationStatus?: "nominal" | "warning" | "critical";
  simulationScore?: number;
}

export function TwinVisualizer({ simulationStatus = "nominal", simulationScore }: TwinVisualizerProps) {
  // Determine colors based on status
  const statusColor = simulationStatus === 'critical' ? "text-red-500" : 
                      simulationStatus === 'warning' ? "text-orange-500" : 
                      "text-primary";
                      
  const borderColor = simulationStatus === 'critical' ? 'rgba(239, 68, 68, 0.8)' : 
                      simulationStatus === 'warning' ? 'rgba(249, 115, 22, 0.8)' : 
                      'rgba(0, 255, 255, 0.3)';

  const bgGradient = simulationStatus === 'critical' 
    ? 'radial-gradient(circle at center, rgba(239, 68, 68, 0.15) 0%, rgba(0,0,0,0.4) 70%)'
    : simulationStatus === 'warning'
    ? 'radial-gradient(circle at center, rgba(249, 115, 22, 0.15) 0%, rgba(0,0,0,0.4) 70%)'
    : 'radial-gradient(circle at center, rgba(0, 255, 255, 0.05) 0%, rgba(0,0,0,0.4) 70%)';

  const glowShadow = simulationStatus === 'critical' ? '0 0 30px rgba(239, 68, 68, 0.2)' :
                     simulationStatus === 'warning' ? '0 0 30px rgba(249, 115, 22, 0.2)' :
                     'none';

  return (
    <div className="relative w-full aspect-[3/4] md:aspect-square lg:aspect-[3/4] rounded-xl overflow-hidden glass-panel group border-primary/20 bg-black/40 transition-all duration-700"
         style={{ 
           borderColor: borderColor,
           boxShadow: glowShadow,
           background: bgGradient
         }}>
      
      {/* Background/Scanlines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none z-0" />
      
      {/* The Avatar Image - 2D Object */}
      <div className="absolute inset-0 flex items-center justify-center p-8 z-10">
         <motion.img 
           src={generatedImage} 
           alt="Digital Twin" 
           className={cn(
             "h-full w-full object-contain mix-blend-screen transition-all duration-500",
             simulationStatus === 'nominal' ? "opacity-80 drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]" : "opacity-40 grayscale-[0.5]"
           )}
           animate={{
             scale: simulationStatus === 'nominal' ? [1, 1.02, 1] : 1,
             filter: simulationStatus === 'critical' ? 'hue-rotate(-45deg) drop-shadow(0 0 10px red)' : 
                     simulationStatus === 'warning' ? 'hue-rotate(-20deg) drop-shadow(0 0 10px orange)' : 
                     'hue-rotate(0deg) drop-shadow(0 0 15px cyan)'
           }}
           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
         />
      </div>

      {/* Scanner Effect */}
      <motion.div 
        className={cn(
          "absolute top-0 left-0 w-full h-1 shadow-[0_0_20px_2px_currentColor] z-20 opacity-50",
          statusColor
        )}
        style={{ backgroundColor: 'currentColor' }}
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 8, ease: "linear", repeat: Infinity }}
      />

      {/* Data Points Overlays - Fixed positions for 2D */}
      <DataPoint 
        top="20%" left="30%" 
        label="Brain Activity" 
        value={simulationStatus === 'critical' ? "High Stress" : "Normal"} 
        status={simulationStatus}
        delay={0} 
      />
      <DataPoint 
        top="35%" right="25%" 
        label="Heart Rate" 
        value={simulationStatus === 'critical' ? "110 BPM" : simulationStatus === 'warning' ? "85 BPM" : "72 BPM"} 
        status={simulationStatus}
        delay={1} 
      />
      <DataPoint 
        top="60%" left="35%" 
        label="Digestion" 
        value="Optimal" 
        status={simulationStatus}
        delay={2} 
      />
      <DataPoint 
        top="80%" right="40%" 
        label="Recovery" 
        value={simulationScore ? `${100 + simulationScore}%` : "94%"} 
        status={simulationStatus}
        delay={3} 
      />

      {/* Overlay UI elements */}
      <div className="absolute top-4 left-4 z-30 pointer-events-none">
        <div className="flex items-center gap-2">
           <div className={cn("w-2 h-2 rounded-full animate-pulse", 
             simulationStatus === 'critical' ? "bg-red-500" : 
             simulationStatus === 'warning' ? "bg-orange-500" : 
             "bg-primary"
           )} />
           <span className={cn("text-xs font-mono uppercase tracking-widest transition-colors",
             simulationStatus === 'critical' ? "text-red-400" : 
             simulationStatus === 'warning' ? "text-orange-400" : 
             "text-primary/80"
           )}>
             {simulationStatus === 'critical' ? "CRITICAL ALERT" : 
              simulationStatus === 'warning' ? "WARNING STATE" : 
              "SYSTEM NOMINAL"}
           </span>
        </div>
      </div>

      {/* Status Footer */}
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent p-6 z-30 pointer-events-none">
        <div className="flex justify-between items-end">
          <div>
            <h3 className={cn("font-display font-bold text-lg transition-colors",
               simulationStatus === 'critical' ? "text-red-500" : 
               simulationStatus === 'warning' ? "text-orange-500" : 
               "text-primary"
            )}>
              {simulationStatus === 'nominal' ? "System Sync" : "Simulation Active"}
            </h3>
            <p className="text-xs text-muted-foreground font-mono">2D Analysis View</p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-display font-bold text-white">98%</span>
            <p className="text-xs text-primary uppercase tracking-wider">Accuracy</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DataPoint({ top, left, right, label, value, status, delay }: any) {
  const colorClass = status === 'critical' ? "text-red-500" : 
                     status === 'warning' ? "text-orange-500" : 
                     "text-primary";
                     
  const borderClass = status === 'critical' ? "border-red-500/50" : 
                      status === 'warning' ? "border-orange-500/50" : 
                      "border-primary/30";

  return (
    <motion.div 
      className="absolute flex items-center gap-2 group cursor-pointer z-20"
      style={{ top, left, right }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 1 }}
    >
      <div className="relative">
        <div className={cn("h-3 w-3 rounded-full animate-pulse", status === 'critical' ? "bg-red-500" : "bg-primary")} />
        <div className={cn("absolute inset-0 h-3 w-3 rounded-full animate-ping opacity-50", status === 'critical' ? "bg-red-500" : "bg-primary")} />
      </div>
      <div className={cn("bg-black/80 backdrop-blur-md border px-3 py-1 rounded text-xs transition-colors", borderClass)}>
        <span className="text-muted-foreground block text-[10px] uppercase tracking-wider">{label}</span>
        <span className={cn("font-bold font-mono", colorClass)}>{value}</span>
      </div>
      {/* Connector Line */}
      <div className={cn(
        "absolute top-1.5 h-[1px] w-8",
        left ? "-right-8" : "-left-8",
        status === 'critical' ? "bg-red-500/30" : "bg-primary/30"
      )} />
    </motion.div>
  );
}