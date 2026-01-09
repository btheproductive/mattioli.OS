import {
    ComposedChart,
    Line,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Area
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMoods } from "@/hooks/useMoods";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format, subDays, parseISO, startOfDay } from "date-fns";
import { useTheme } from "next-themes";

// Helper to fetch completion stats for correlation
// In a real scenario, this might reuse existing hooks or stats logic
// For simplicity, we'll fetch aggregated logs here or assume a prop.
// Let's implement a quick fetch for recent habit stats.

const useHabitCompletionHistory = () => {
    return useQuery({
        queryKey: ["habit-completion-history"],
        queryFn: async () => {
            // Get last 30 days
            const startDate = format(subDays(new Date(), 30), "yyyy-MM-dd");

            // Fetch all logs
            const { data, error } = await supabase
                .from("goal_logs")
                .select("date, status")
                .gte("date", startDate);

            if (error) throw error;

            // Explicitly cast data to ensure types
            const logs = data as { date: string; status: 'done' | 'missed' | 'skipped' }[] | null;

            // Group by date
            const grouped: Record<string, { total: number; done: number }> = {};

            logs?.forEach(log => {
                const date = log.date;
                if (!grouped[date]) grouped[date] = { total: 0, done: 0 };
                // We count 'done' as success. 'missed' and 'skipped' count towards total?
                // Typically skipped might be excluded, but let's keep it simple: 
                // Success Rate = Done / (Done + Missed + Skipped)
                grouped[date].total += 1;
                if (log.status === 'done') grouped[date].done += 1;
            });

            return grouped;
        }
    });
};

export const MoodCorrelationChart = () => {
    const { data: moods } = useMoods();
    const { data: completionStats } = useHabitCompletionHistory();
    const { theme } = useTheme();

    if (!moods || !completionStats) return (
        <Card className="col-span-1 lg:col-span-2 h-[400px] flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </Card>
    );

    // Merge data
    // We want to show the last 14 days or so on the chart
    const data = moods.slice(0, 14).reverse().map(mood => {
        const stats = completionStats[mood.date] || { total: 0, done: 0 };
        const percentage = stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0;

        return {
            date: format(parseISO(mood.date), "dd/MM"),
            fullDate: mood.date,
            mood: mood.mood_score,
            energy: mood.energy_score,
            productivity: percentage
        };
    });

    const isDark = theme === "dark";

    return (
        <Card className="col-span-1 lg:col-span-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
                <CardTitle>Mood & Energy vs Productivity</CardTitle>
            </CardHeader>
            <CardContent className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={data}>
                        <defs>
                            <linearGradient id="colorProductivity" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} vertical={false} />
                        <XAxis
                            dataKey="date"
                            tick={{ fontSize: 12, fill: isDark ? "#A0A0A0" : "#666" }}
                            axisLine={false}
                            tickLine={false}
                        />
                        {/* Left Axis: Mood/Energy (1-10) */}
                        <YAxis
                            yAxisId="left"
                            domain={[0, 10]}
                            tickCount={6}
                            tick={{ fontSize: 12, fill: isDark ? "#A0A0A0" : "#666" }}
                            axisLine={false}
                            tickLine={false}
                            label={{ value: 'Score (1-10)', angle: -90, position: 'insideLeft', style: { fill: isDark ? "#A0A0A0" : "#666" } }}
                        />
                        {/* Right Axis: Productivity % */}
                        <YAxis
                            yAxisId="right"
                            orientation="right"
                            domain={[0, 100]}
                            tick={{ fontSize: 12, fill: "#8884d8" }}
                            axisLine={false}
                            tickLine={false}
                            unit="%"
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: isDark ? "#1f2937" : "#fff",
                                borderRadius: "12px",
                                border: "none",
                                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
                            }}
                        />
                        <Legend wrapperStyle={{ paddingTop: "10px" }} />

                        {/* Productivity Area */}
                        <Area
                            yAxisId="right"
                            type="monotone"
                            dataKey="productivity"
                            fill="url(#colorProductivity)"
                            stroke="#8884d8"
                            strokeWidth={3}
                            name="Habit Completion %"
                        />

                        {/* Mood Line */}
                        <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="mood"
                            stroke="#10b981"
                            strokeWidth={3}
                            dot={{ r: 4, strokeWidth: 2 }}
                            activeDot={{ r: 6 }}
                            name="Mood"
                        />

                        {/* Energy Line */}
                        <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="energy"
                            stroke="#f59e0b"
                            strokeWidth={3}
                            strokeDasharray="5 5"
                            dot={{ r: 4, strokeWidth: 2 }}
                            name="Energy"
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};
