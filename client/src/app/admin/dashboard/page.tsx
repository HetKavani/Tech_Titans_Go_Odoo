'use client';

import React, { useState, useEffect } from 'react';
import { KpiCard } from '@/components/dashboard/KpiCard';
import { 
  Package, 
  AlertTriangle, 
  ArrowDownLeft, 
  ArrowUpRight, 
  ArrowLeftRight,
  RefreshCcw,
  Truck,
  ShoppingBag,
  ArrowRightLeft,
  RotateCcw
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

interface Stats {
  totalProducts: number;
  lowStockItems: number;
  pendingReceipts: number;
  pendingDeliveries: number;
  scheduledTransfers: number;
}

interface Activity {
  id: string;
  qtyChange: number;
  opType: string;
  createdAt: string;
  product: { name: string };
  warehouse: { name: string };
}

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'];

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [distribution, setDistribution] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const headers = { 'Authorization': `Bearer ${token}` };
      
      const [statsRes, activityRes, distRes] = await Promise.all([
        fetch('http://localhost:5000/api/reports/stats', { headers }),
        fetch('http://localhost:5000/api/reports/activity', { headers }),
        fetch('http://localhost:5000/api/reports/distribution', { headers })
      ]);

      setStats(await statsRes.json());
      setActivities(await activityRes.json());
      setDistribution(await distRes.json());
    } catch (err) {
      console.error('Dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getOpIcon = (type: string) => {
      switch(type) {
          case 'RECEIPT': return <Truck className="w-4 h-4 text-emerald-400" />;
          case 'DELIVERY': return <ShoppingBag className="w-4 h-4 text-purple-400" />;
          case 'TRANSFER_IN':
          case 'TRANSFER_OUT': return <ArrowRightLeft className="w-4 h-4 text-orange-400" />;
          case 'ADJUSTMENT': return <RotateCcw className="w-4 h-4 text-red-400" />;
          default: return <Package className="w-4 h-4 text-blue-400" />;
      }
  };

  if (loading && !stats) return (
    <div className="flex h-96 items-center justify-center">
        <RefreshCcw className="w-8 h-8 text-blue-500 animate-spin" />
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Inventory Intelligence</h1>
          <p className="text-gray-400">Real-time metrics and warehouse activity.</p>
        </div>
        <button 
            onClick={fetchDashboardData}
            className="p-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all text-gray-400"
        >
            <RefreshCcw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <KpiCard title="Total Products" value={stats?.totalProducts.toString() || '0'} icon={Package} color="text-blue-500" trend="+12%" trendUp />
        <KpiCard title="Low Stock Items" value={stats?.lowStockItems.toString() || '0'} icon={AlertTriangle} color="text-red-500" trend="Critical" />
        <KpiCard title="Pending Receipts" value={stats?.pendingReceipts.toString() || '0'} icon={ArrowDownLeft} color="text-emerald-500" />
        <KpiCard title="Pending Deliveries" value={stats?.pendingDeliveries.toString() || '0'} icon={ArrowUpRight} color="text-purple-500" />
        <KpiCard title="Active Transfers" value={stats?.scheduledTransfers.toString() || '0'} icon={ArrowLeftRight} color="text-orange-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md shadow-xl">
            <h3 className="text-lg font-bold mb-8 flex items-center gap-2 uppercase tracking-widest text-gray-500">
                Category Distribution
            </h3>
            <div className="h-80 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={distribution}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {distribution.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff10', borderRadius: '12px' }}
                            itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                        />
                        <Legend verticalAlign="bottom" height={36} iconType="circle" />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>

        <div className="p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md shadow-xl">
            <h3 className="text-lg font-bold mb-8 flex items-center gap-2 uppercase tracking-widest text-gray-500">
                Real-time Ledger
            </h3>
            <div className="space-y-4 max-h-[340px] overflow-y-auto pr-2 custom-scrollbar">
                {activities.map((act) => (
                    <div key={act.id} className="flex items-center gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.05] transition-all">
                        <div className="p-3 bg-white/5 rounded-xl">
                            {getOpIcon(act.opType)}
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-bold text-white">{act.product.name}</p>
                            <p className="text-[10px] text-gray-500 flex items-center gap-1 font-medium uppercase tracking-tight">
                                {act.warehouse.name} • {new Date(act.createdAt).toLocaleTimeString()}
                            </p>
                        </div>
                        <div className={`text-sm font-black ${act.qtyChange >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                            {act.qtyChange >= 0 ? '+' : ''}{act.qtyChange}
                        </div>
                    </div>
                ))}
                {activities.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-48 text-gray-600">
                        <Package className="w-12 h-12 mb-2 opacity-20" />
                        <p className="text-sm italic">No recent movements detected</p>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}
