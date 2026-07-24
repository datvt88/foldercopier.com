'use client';
import { useState } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await axios.get(`${backendUrl}/api/admin/system-logs?secret=${password}`);
      setData(res.data);
      setIsAuthenticated(true);
    } catch (err: any) {
      setErrorMsg('Sai mật khẩu hoặc lỗi máy chủ!');
    }
    setLoading(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-white/10 p-8 rounded-2xl shadow-xl border border-white/20 text-center max-w-sm w-full backdrop-blur-md space-y-6">
          <h2 className="text-2xl font-bold text-white">Admin Login</h2>
          <input 
            type="password" 
            placeholder="Nhập mật khẩu..." 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-xl bg-black/50 text-white outline-none border border-white/20 focus:border-purple-500"
          />
          {errorMsg && <p className="text-red-400 text-sm">{errorMsg}</p>}
          <button type="submit" disabled={loading} className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold p-3 rounded-xl transition-all">
            {loading ? 'Đang kiểm tra...' : 'Vào trang quản trị'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-8">
      <h1 className="text-4xl font-extrabold text-white mb-10">System Dashboard</h1>
      
      {/* 2 Khối Thống Kê Tổng Quan */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-emerald-500/10 border border-emerald-500/30 p-6 rounded-2xl shadow-lg">
          <p className="text-emerald-400 font-semibold mb-2 uppercase tracking-wider">Thành công</p>
          <p className="text-5xl font-black text-emerald-300">{data.success}</p>
        </div>
        <div className="bg-rose-500/10 border border-rose-500/30 p-6 rounded-2xl shadow-lg">
          <p className="text-rose-400 font-semibold mb-2 uppercase tracking-wider">Thất bại</p>
          <p className="text-5xl font-black text-rose-300">{data.failed}</p>
        </div>
      </div>

      {/* Bảng Chi Tiết Lỗi */}
      <div className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-xl mt-12">
        <div className="p-6 border-b border-slate-700 bg-slate-800">
          <h2 className="text-xl font-bold text-white">Log lỗi chi tiết (Nhóm theo nội dung)</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-slate-300">
            <thead className="bg-slate-900 text-slate-400 text-sm uppercase">
              <tr>
                <th className="px-6 py-4 font-medium">Nội dung lỗi (Error Message)</th>
                <th className="px-6 py-4 font-medium text-center w-32">Số lần</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {Object.keys(data.errors).length === 0 ? (
                <tr>
                  <td colSpan={2} className="px-6 py-8 text-center text-slate-500">Chưa có lỗi nào được ghi nhận. Hệ thống đang chạy hoàn hảo!</td>
                </tr>
              ) : (
                Object.entries(data.errors)
                  // Sắp xếp lỗi nào xảy ra nhiều nhất lên đầu
                  .sort(([, a], [, b]) => Number(b) - Number(a))
                  .map(([errorMsg, count]) => (
                    <tr key={errorMsg} className="hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4 font-mono text-sm text-rose-300 whitespace-pre-wrap">{errorMsg}</td>
                      <td className="px-6 py-4 text-center font-bold text-white text-lg">
                        <span className="bg-rose-500/20 px-3 py-1 rounded-full text-rose-400">{String(count)}</span>
                      </td>
                    </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
