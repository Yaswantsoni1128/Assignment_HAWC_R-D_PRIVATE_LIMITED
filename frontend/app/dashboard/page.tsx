"use client";

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Users, PlusCircle, LogOut, Loader2 } from 'lucide-react';

interface Teacher {
  id: number;
  university_name: string;
  gender: string;
  year_joined: number;
  subject: string;
  user: {
    first_name: string;
    last_name: string;
    email: string;
  };
}

export default function Dashboard() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: '', first_name: '', last_name: '', password: '',
    university_name: '', gender: 'Male', year_joined: new Date().getFullYear(), subject: '', phone: ''
  });

  const fetchData = async () => {
    try {
      const res = await api.get('/data/teachers');
      setTeachers(res.data.data);
    } catch (err: any) {
      setError('Failed to fetch teachers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubitTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/data/teacher', formData);
      setIsModalOpen(false);
      fetchData();
      setFormData({
        email: '', first_name: '', last_name: '', password: '',
        university_name: '', gender: 'Male', year_joined: new Date().getFullYear(), subject: '', phone: ''
      });
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to create teacher');
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200">
      {/* Sidebar / Header */}
      <nav className="border-b border-slate-800 bg-[#1e293b]/50 backdrop-blur-xl sticky top-0 z-10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-600 rounded-lg"><LayoutDashboard size={20} className="text-white" /></div>
          <h1 className="text-xl font-bold text-white uppercase tracking-wider">HAWC Portal</h1>
        </div>
        <button 
          onClick={() => { localStorage.clear(); window.location.href = '/login'; }}
          className="flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-white transition duration-200"
        >
          <LogOut size={18} /> Logout
        </button>
      </nav>

      <main className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-white">Teacher Management</h2>
            <p className="text-slate-400">Manage and view all registered teachers and their details.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-500/20 transition duration-200 font-medium"
          >
            <PlusCircle size={20} /> Add New Teacher
          </button>
        </div>

        {/* Data Table */}
        <div className="bg-[#1e293b] rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
          {loading ? (
            <div className="p-20 flex flex-col items-center justify-center gap-4 text-slate-400">
              <Loader2 className="animate-spin" size={32} />
              <p>Fetching teacher records...</p>
            </div>
          ) : error ? (
            <div className="p-20 text-center text-red-400">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#1e293b] border-b border-slate-800">
                    <th className="px-6 py-4 text-sm font-semibold text-slate-400 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-400 uppercase tracking-wider">Full Name</th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-400 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-400 uppercase tracking-wider">University</th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-400 uppercase tracking-wider">Subject</th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-400 uppercase tracking-wider text-right">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {teachers.map((teacher, idx) => (
                    <motion.tr 
                      key={teacher.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="hover:bg-slate-800/50 transition duration-150 group"
                    >
                      <td className="px-6 py-5 text-slate-500 font-mono text-sm">#{teacher.id}</td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold border border-blue-500/20">
                            {teacher.user.first_name[0]}{teacher.user.last_name[0]}
                          </div>
                          <div className="text-white font-medium group-hover:text-blue-400">
                            {teacher.user.first_name} {teacher.user.last_name}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-slate-300">{teacher.user.email}</td>
                      <td className="px-6 py-5 text-slate-300">{teacher.university_name}</td>
                      <td className="px-6 py-5">
                        <span className="px-3 py-1 rounded-full bg-slate-700/50 text-xs font-semibold text-slate-300 border border-slate-600">
                          {teacher.subject}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right font-mono text-slate-400">{teacher.year_joined}</td>
                    </motion.tr>
                  ))}
                  {teachers.length === 0 && (
                    <tr><td colSpan={6} className="p-10 text-center text-slate-500 italic">No teacher records found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Modal for adding teacher */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-2xl bg-[#1e293b] rounded-2x border border-slate-700 shadow-2xl overflow-hidden p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Add Teacher & Link Account</h3>
              <form onSubmit={handleSubitTeacher} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-blue-400 uppercase tracking-widest">Account Details</h4>
                  <input placeholder="Email" required className="w-full p-3 bg-[#0f172a] border border-slate-700 rounded-lg text-white" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  <input placeholder="First Name" required className="w-full p-3 bg-[#0f172a] border border-slate-700 rounded-lg text-white" value={formData.first_name} onChange={e => setFormData({...formData, first_name: e.target.value})} />
                  <input placeholder="Last Name" required className="w-full p-3 bg-[#0f172a] border border-slate-700 rounded-lg text-white" value={formData.last_name} onChange={e => setFormData({...formData, last_name: e.target.value})} />
                  <input placeholder="Password" required type="password" className="w-full p-3 bg-[#0f172a] border border-slate-700 rounded-lg text-white" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                </div>
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-blue-400 uppercase tracking-widest">Professional Details</h4>
                  <input placeholder="University Name" required className="w-full p-3 bg-[#0f172a] border border-slate-700 rounded-lg text-white" value={formData.university_name} onChange={e => setFormData({...formData, university_name: e.target.value})} />
                  <select className="w-full p-3 bg-[#0f172a] border border-slate-700 rounded-lg text-white" value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})}>
                    <option>Male</option><option>Female</option><option>Other</option>
                  </select>
                  <input placeholder="Year Joined" required type="number" className="w-full p-3 bg-[#0f172a] border border-slate-700 rounded-lg text-white" value={formData.year_joined} onChange={e => setFormData({...formData, year_joined: parseInt(e.target.value)})} />
                  <input placeholder="Subject" required className="w-full p-3 bg-[#0f172a] border border-slate-700 rounded-lg text-white" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} />
                </div>
                <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 rounded-lg text-slate-400 hover:bg-slate-800 transition">Cancel</button>
                  <button type="submit" className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-2">
                    Create Unified Profile
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
