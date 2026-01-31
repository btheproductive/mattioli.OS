import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Settings, Download, FileText, Database, Trash2,
    Wifi, Calendar, LayoutGrid,
    ChevronLeft, ChevronRight, Zap, Smile, Check, X,
    XCircle
} from "lucide-react";

// Static demo data - habits with colors
const DEMO_HABITS = [
    { id: '1', title: 'Meditation', color: '#8B5CF6', start_date: '2026-01-01' },
    { id: '2', title: 'Workout', color: '#10B981', start_date: '2026-01-01' },
    { id: '3', title: 'Reading', color: '#F59E0B', start_date: '2026-01-01' },
    { id: '4', title: 'Coding', color: '#3B82F6', start_date: '2026-01-01' },
    { id: '5', title: 'Journal', color: '#EC4899', start_date: '2026-01-01' },
];

// Generate demo calendar data for January 2026
const generateDemoData = () => {
    const data: Record<string, Record<string, 'done' | 'missed' | null>> = {};

    // Fixed seed for consistent demo data
    const seedRandom = (seed: number) => {
        const x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
    };

    for (let day = 1; day <= 31; day++) {
        const dateKey = `2026-01-${day.toString().padStart(2, '0')}`;
        data[dateKey] = {};

        DEMO_HABITS.forEach((habit, habitIndex) => {
            const seed = day * 100 + habitIndex;
            const random = seedRandom(seed);

            if (day <= 18) {
                if (random > 0.25) {
                    data[dateKey][habit.id] = 'done';
                } else if (random > 0.1) {
                    data[dateKey][habit.id] = 'missed';
                }
            }
        });
    }
    return data;
};

const DEMO_RECORDS = generateDemoData();
const DAYS = ['LUN', 'MAR', 'MER', 'GIO', 'VEN', 'SAB', 'DOM'];
const DAYS_FULL = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];

type ViewType = 'month' | 'week';

// Day Details Modal Component
function DemoDayModal({
    isOpen,
    onClose,
    day
}: {
    isOpen: boolean;
    onClose: () => void;
    day: number | null;
}) {
    if (!isOpen || !day) return null;

    const dateKey = `2026-01-${day.toString().padStart(2, '0')}`;
    const dayRecord = DEMO_RECORDS[dateKey] || {};

    const dayNames = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
    const date = new Date(2026, 0, day);
    const dayName = dayNames[date.getDay()];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-zinc-900 border border-white/10 rounded-xl p-4 w-full max-w-xs shadow-2xl"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="text-sm font-bold text-white">{dayName} {day} Gennaio</h3>
                                <span className="text-[10px] text-zinc-500">Solo visualizzazione</span>
                            </div>
                            <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
                                <XCircle className="w-4 h-4 text-zinc-500" />
                            </button>
                        </div>

                        <div className="space-y-2">
                            {DEMO_HABITS.map(habit => {
                                const status = dayRecord[habit.id];
                                const isDone = status === 'done';
                                const isMissed = status === 'missed';

                                return (
                                    <div
                                        key={habit.id}
                                        className={`
                                            flex items-center justify-between p-2.5 rounded-lg border transition-all
                                            ${isDone ? 'bg-green-500/10 border-green-500/30' : ''}
                                            ${isMissed ? 'bg-red-500/10 border-red-500/30' : ''}
                                            ${!status ? 'bg-zinc-800/50 border-white/5' : ''}
                                        `}
                                    >
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="w-2.5 h-2.5 rounded-full"
                                                style={{ backgroundColor: habit.color }}
                                            />
                                            <span className="text-xs text-white">{habit.title}</span>
                                        </div>
                                        <div>
                                            {isDone && <Check className="w-4 h-4 text-green-500" />}
                                            {isMissed && <X className="w-4 h-4 text-red-500" />}
                                            {!status && <div className="w-4 h-4 rounded-full border border-zinc-600" />}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// Monthly Calendar View
function MonthView({ onDayClick }: { onDayClick: (day: number) => void }) {
    const startDay = 3; // January 2026 starts on Thursday
    const daysInMonth = 31;
    const numRows = Math.ceil((startDay + daysInMonth) / 7);

    const renderCalendarDays = () => {
        const cells = [];

        for (let i = 0; i < startDay; i++) {
            cells.push(<div key={`empty-${i}`} className="aspect-square" />);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dateKey = `2026-01-${day.toString().padStart(2, '0')}`;
            const dayRecord = DEMO_RECORDS[dateKey] || {};
            const isFuture = day > 18;
            const isToday = day === 18;

            const completedCount = DEMO_HABITS.filter(h => dayRecord[h.id] === 'done').length;
            const hasActivity = Object.keys(dayRecord).length > 0;

            let style = {};
            if (hasActivity && !isFuture) {
                const completionPct = completedCount / DEMO_HABITS.length;
                const hue = Math.round(completionPct * 142);
                style = {
                    backgroundColor: `hsl(${hue}, 70%, 10%, 0.3)`,
                    borderColor: `hsl(${hue}, 80%, 40%, 0.5)`,
                };
            }

            cells.push(
                <button
                    key={day}
                    onClick={() => !isFuture && onDayClick(day)}
                    disabled={isFuture}
                    style={style}
                    className={`
                        aspect-square rounded-lg flex flex-col items-center justify-start py-1.5
                        border border-white/5 transition-all
                        ${isFuture ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer hover:border-white/20 hover:bg-white/5'}
                        ${isToday ? 'ring-1 ring-purple-500/50 bg-purple-500/10' : ''}
                    `}
                >
                    <span className={`text-[10px] font-medium font-mono ${isToday ? 'text-purple-400 font-bold' : 'text-zinc-400'}`}>
                        {day}
                    </span>
                    <div className="flex flex-wrap items-center justify-center gap-0.5 px-0.5 mt-0.5">
                        {DEMO_HABITS.map(habit => {
                            const status = dayRecord[habit.id];
                            if (status !== 'done') return null;
                            return (
                                <div
                                    key={habit.id}
                                    className="w-1 h-1 rounded-sm"
                                    style={{ backgroundColor: habit.color }}
                                />
                            );
                        })}
                    </div>
                </button>
            );
        }

        return cells;
    };

    return (
        <div className="bg-zinc-900/30 rounded-xl border border-white/5 p-4">
            <div className="flex items-center justify-between mb-4">
                <button className="p-1.5 rounded-lg hover:bg-white/5 text-zinc-500">
                    <ChevronLeft className="w-4 h-4" />
                </button>
                <h2 className="text-lg font-bold">
                    Gennaio <span className="text-zinc-500 font-light">2026</span>
                </h2>
                <button className="p-1.5 rounded-lg hover:bg-white/5 text-zinc-500">
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
                {DAYS.map(day => (
                    <div key={day} className="text-center text-[8px] font-semibold text-zinc-600 uppercase py-1">
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
                {renderCalendarDays()}
            </div>
        </div>
    );
}

// Weekly View
function WeekView({ onDayClick }: { onDayClick: (day: number) => void }) {
    const weekDays = [12, 13, 14, 15, 16, 17, 18]; // Week of Jan 12-18

    return (
        <div className="bg-zinc-900/30 rounded-xl border border-white/5 p-4">
            <div className="flex items-center justify-between mb-4">
                <button className="p-1.5 rounded-lg hover:bg-white/5 text-zinc-500">
                    <ChevronLeft className="w-4 h-4" />
                </button>
                <h2 className="text-sm font-bold">12 - 18 Gennaio</h2>
                <button className="p-1.5 rounded-lg hover:bg-white/5 text-zinc-500">
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>

            <div className="grid grid-cols-7 gap-2">
                {weekDays.map((day, i) => {
                    const dateKey = `2026-01-${day.toString().padStart(2, '0')}`;
                    const dayRecord = DEMO_RECORDS[dateKey] || {};
                    const isToday = day === 18;

                    return (
                        <div key={day} className="flex flex-col gap-1">
                            <button
                                onClick={() => onDayClick(day)}
                                className={`
                                    text-center py-2 rounded-lg border border-transparent transition-all
                                    hover:bg-white/5 cursor-pointer
                                    ${isToday ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' : ''}
                                `}
                            >
                                <div className="text-[8px] uppercase font-bold opacity-60">{DAYS_FULL[i]}</div>
                                <div className="text-sm font-mono font-bold">{day}</div>
                            </button>

                            <div className="flex flex-col gap-1">
                                {DEMO_HABITS.map(habit => {
                                    const status = dayRecord[habit.id];
                                    return (
                                        <button
                                            key={habit.id}
                                            onClick={() => onDayClick(day)}
                                            className={`
                                                h-6 w-full rounded-md border border-white/5 transition-all
                                                hover:border-white/20 cursor-pointer
                                                ${status === 'done' ? 'opacity-100 shadow-[0_0_6px_currentColor]' : ''}
                                                ${status === 'missed' ? 'opacity-50 grayscale' : ''}
                                                ${!status ? 'bg-white/5' : ''}
                                            `}
                                            style={{
                                                backgroundColor: status === 'done' ? habit.color : undefined,
                                                color: habit.color
                                            }}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}


export function LandingDemo() {
    const [activeView, setActiveView] = useState<ViewType>('month');
    const [selectedDay, setSelectedDay] = useState<number | null>(null);

    const tabs = [
        { id: 'month' as ViewType, icon: Calendar, label: 'Mese' },
        { id: 'week' as ViewType, icon: LayoutGrid, label: 'Settimana' },
    ];

    const handleDayClick = (day: number) => {
        setSelectedDay(day);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative max-w-5xl mx-auto"
        >
            {/* Glow effect behind */}
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-purple-600/20 rounded-3xl blur-2xl opacity-50" />

            {/* Browser chrome */}
            <div className="relative bg-zinc-950 rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                {/* Title bar */}
                <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900/80 border-b border-white/5">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <div className="flex-1 flex justify-center">
                        <div className="px-4 py-1 bg-zinc-800/50 rounded-md text-xs text-zinc-500 font-mono">
                            dashboard.mattioli.os
                        </div>
                    </div>
                </div>

                {/* App content */}
                <div className="flex relative">
                    {/* Day Details Modal */}
                    <DemoDayModal
                        isOpen={selectedDay !== null}
                        onClose={() => setSelectedDay(null)}
                        day={selectedDay}
                    />

                    {/* Sidebar */}
                    <div className="w-56 bg-zinc-900/30 border-r border-white/5 p-4 space-y-4">
                        {/* Protocol Header */}
                        <div className="p-4 rounded-xl bg-zinc-800/30 border border-white/5">
                            <h3 className="text-sm font-bold text-white">Protocollo</h3>
                            <p className="text-[10px] text-zinc-500">Esecuzione giornaliera.</p>

                            {/* Switches */}
                            <div className="flex gap-2 mt-3">
                                <div className="flex items-center gap-1">
                                    <div className="w-6 h-3 bg-zinc-700 rounded-full relative">
                                        <div className="absolute left-0.5 top-0.5 w-2 h-2 bg-zinc-500 rounded-full" />
                                    </div>
                                    <span className="text-[8px] text-zinc-500">Privacy</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="w-6 h-3 bg-zinc-700 rounded-full relative">
                                        <div className="absolute left-0.5 top-0.5 w-2 h-2 bg-zinc-500 rounded-full" />
                                    </div>
                                    <span className="text-[8px] text-zinc-500">AI</span>
                                </div>
                            </div>

                            {/* Action buttons */}
                            <div className="flex gap-1 mt-3">
                                {[Settings, Download, FileText, Database, Trash2].map((Icon, i) => (
                                    <div key={i} className={`p-1.5 rounded-md border border-white/5 ${i === 4 ? 'bg-red-500/10 text-red-400' : 'bg-zinc-800/50 text-zinc-500'}`}>
                                        <Icon className="w-3 h-3" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* System Status */}
                        <div className="p-4 rounded-xl bg-zinc-800/30 border border-white/5">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[8px] text-zinc-500 uppercase tracking-wider">System Status</span>
                                <Wifi className="w-3 h-3 text-green-500" />
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="text-lg font-bold text-purple-400">Online</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            </div>
                            <div className="flex justify-between text-[8px] text-zinc-600 mt-2">
                                <span>Mattioli.OS v4.1</span>
                                <span>58ms</span>
                            </div>
                        </div>

                        {/* Daily Check-in */}
                        <div className="p-4 rounded-xl bg-zinc-800/30 border border-white/5">
                            <span className="text-[10px] text-zinc-400 font-medium">Daily Check-in</span>

                            {/* Mood */}
                            <div className="mt-3">
                                <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center gap-1">
                                        <Smile className="w-3 h-3 text-zinc-500" />
                                        <span className="text-[9px] text-zinc-500">Mood</span>
                                    </div>
                                    <span className="text-[9px] text-amber-400">😊 5/10</span>
                                </div>
                                <div className="h-1 bg-zinc-700 rounded-full">
                                    <div className="h-full w-1/2 bg-gradient-to-r from-zinc-600 to-zinc-400 rounded-full" />
                                </div>
                            </div>

                            {/* Energy */}
                            <div className="mt-3">
                                <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center gap-1">
                                        <Zap className="w-3 h-3 text-zinc-500" />
                                        <span className="text-[9px] text-zinc-500">Energy</span>
                                    </div>
                                    <span className="text-[9px] text-amber-400">⚡ 7/10</span>
                                </div>
                                <div className="h-1 bg-zinc-700 rounded-full">
                                    <div className="h-full w-[70%] bg-gradient-to-r from-zinc-600 to-zinc-400 rounded-full" />
                                </div>
                            </div>

                            {/* Update button */}
                            <button className="w-full mt-4 py-2 text-[9px] text-zinc-400 border border-white/10 rounded-lg bg-zinc-800/30 hover:bg-zinc-800/50 transition-colors">
                                📊 Update Daily Status
                            </button>
                        </div>
                    </div>

                    {/* Main content */}
                    <div className="flex-1 p-4">
                        {/* Tabs */}
                        <div className="flex justify-center mb-4">
                            <div className="inline-flex bg-zinc-800/30 rounded-lg p-1 border border-white/5">
                                {tabs.map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveView(tab.id)}
                                        className={`flex items-center gap-1.5 px-4 py-1.5 rounded-md text-[10px] font-medium transition-all ${activeView === tab.id
                                            ? 'bg-zinc-700/50 text-white'
                                            : 'text-zinc-500 hover:text-zinc-300'
                                            }`}
                                    >
                                        <tab.icon className="w-3 h-3" />
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* View Content */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeView}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                {activeView === 'month' && <MonthView onDayClick={handleDayClick} />}
                                {activeView === 'week' && <WeekView onDayClick={handleDayClick} />}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Label */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-zinc-900 border border-white/10 rounded-full text-xs text-zinc-400">
                ✨ Interactive Demo — Click on any day to see details
            </div>
        </motion.div>
    );
}

export default LandingDemo;
