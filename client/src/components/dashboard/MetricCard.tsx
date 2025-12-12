import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";

interface MetricCardProps {
  title: string;
  value: string;
  unit: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  data: number[]; // Simple array of numbers for sparkline
  color?: string;
  className?: string;
}

export function MetricCard({ 
  title, 
  value, 
  unit, 
  trend = "neutral", 
  trendValue, 
  data,
  color = "var(--primary)",
  className
}: MetricCardProps) {
  const chartData = data.map((val, i) => ({ i, val }));

  return (
    <Card className={cn("glass-panel overflow-hidden border-white/5", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-widest font-display">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-1 mb-4">
          <span className="text-3xl font-bold font-display text-white">{value}</span>
          <span className="text-sm text-muted-foreground font-mono">{unit}</span>
        </div>

        <div className="h-[60px] w-full -mx-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area 
                type="monotone" 
                dataKey="val" 
                stroke={color} 
                strokeWidth={2}
                fill={`url(#gradient-${title})`} 
                isAnimationActive={true}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {trendValue && (
          <div className="flex items-center gap-2 mt-2 text-xs font-medium">
            {trend === "up" && <ArrowUpRight className="h-4 w-4 text-green-400" />}
            {trend === "down" && <ArrowDownRight className="h-4 w-4 text-red-400" />}
            {trend === "neutral" && <Minus className="h-4 w-4 text-yellow-400" />}
            
            <span className={cn(
              trend === "up" ? "text-green-400" : 
              trend === "down" ? "text-red-400" : "text-yellow-400"
            )}>
              {trendValue} vs last week
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}