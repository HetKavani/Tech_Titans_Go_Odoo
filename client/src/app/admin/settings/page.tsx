'use client';

import React from 'react';
import { Settings, User, Bell, Shield, Database, Globe } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold mb-2">System Settings</h1>
        <p className="text-gray-400">Configure your platform preferences and notification rules.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-1">
            {[
                { name: 'General', icon: Globe },
                { name: 'Profile', icon: User },
                { name: 'Notifications', icon: Bell },
                { name: 'Security', icon: Shield },
                { name: 'Database', icon: Database },
            ].map((item, i) => (
                <button 
                    key={item.name}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        i === 0 ? 'bg-blue-600/10 text-blue-400' : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                    <item.icon className="w-4 h-4" /> {item.name}
                </button>
            ))}
        </div>

        <div className="md:col-span-3 p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md space-y-8">
            <section>
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-blue-400" /> Platform Configuration
                </h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                        <div>
                            <p className="text-sm font-semibold">Low Stock Threshold</p>
                            <p className="text-xs text-gray-500">Alert me when stock drops below this value.</p>
                        </div>
                        <input type="number" defaultValue={10} className="w-20 px-3 py-2 bg-[#020617] border border-white/10 rounded-lg text-sm text-center" />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                        <div>
                            <p className="text-sm font-semibold">Currency Display</p>
                            <p className="text-xs text-gray-500">Format for inventory valuations.</p>
                        </div>
                        <select className="w-24 px-3 py-2 bg-[#020617] border border-white/10 rounded-lg text-sm">
                            <option>USD ($)</option>
                            <option>GBP (£)</option>
                            <option>EUR (€)</option>
                        </select>
                    </div>
                </div>
            </section>

            <section className="pt-8 border-t border-white/5">
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                    <Bell className="w-5 h-5 text-purple-400" /> Email Notifications
                </h3>
                <div className="space-y-4">
                    {[
                        'Daily inventory summaries',
                        'Critical low stock alerts',
                        'New transfer requests',
                        'Weekly performance reports'
                    ].map((label, i) => (
                        <div key={i} className="flex items-center justify-between">
                            <span className="text-sm text-gray-300">{label}</span>
                            <div className="w-10 h-6 bg-blue-600 rounded-full flex items-center px-1">
                                <div className="w-4 h-4 bg-white rounded-full ml-auto" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <div className="pt-8 flex justify-end gap-3">
                <button className="px-6 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm font-medium hover:bg-white/10 transition-all">Cancel</button>
                <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-blue-600/20">Save Changes</button>
            </div>
        </div>
      </div>
    </div>
  );
}
