import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

const data = [
  { day: "Mon", actual: 85, predicted: 85 },
  { day: "Tue", actual: 82, predicted: 83 },
  { day: "Wed", actual: 78, predicted: 80 },
  { day: "Thu", actual: 90, predicted: 88 },
  { day: "Fri", actual: 88, predicted: 86 }, // Today
  { day: "Sat", predicted: 92 }, // Future
  { day: "Sun", predicted: 95 }, // Future
];

export function PredictiveChart() {
  return (
    <Card className="glass-panel border-white/5 col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-display text-lg text-primary">Recovery Score Projection</CardTitle>
            <CardDescription>AI Model v4.2 Confidence: 94%</CardDescription>
          </div>
          <div className="flex gap-4 text-xs font-mono">
             <div className="flex items-center gap-2">
               <div className="w-3 h-3 bg-primary/50 rounded-full"></div>
               <span>Historical</span>
             </div>
             <div className="flex items-center gap-2">
               <div className="w-3 h-3 border border-dashed border-primary rounded-full"></div>
               <span>Predicted</span>
             </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }}
                itemStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <ReferenceLine x="Fri" stroke="hsl(var(--muted-foreground))" strokeDasharray="3 3" label={{ position: 'top',  value: 'TODAY', fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
              
              <Area 
                type="monotone" 
                dataKey="actual" 
                stroke="hsl(var(--primary))" 
                fillOpacity={1} 
                fill="url(#colorActual)" 
                strokeWidth={2}
              />
              <Area 
                type="monotone" 
                dataKey="predicted" 
                stroke="hsl(var(--secondary))" 
                strokeDasharray="5 5"
                fillOpacity={1} 
                fill="url(#colorPredicted)" 
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}