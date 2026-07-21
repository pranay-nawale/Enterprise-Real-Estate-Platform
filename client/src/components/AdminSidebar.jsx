import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AdminSidebar() {
  const location = useLocation();
  const currentTab = location.pathname.split('/').pop() || '';
  const { logout, adminUser } = useAuth();

  const menuItems = [
    { label: 'Hero Section', path: 'hero' },
    { label: 'About Project', path: 'about' },
    { label: 'Services', path: 'services' },
    { label: 'Properties / Floor Plans', path: 'properties' },
    { label: 'Projects / Gallery', path: 'projects' },
    { label: 'Contact Details', path: 'contact' },
    { label: 'Customer Inquiries', path: 'inquiries' }
  ];

  return (
    <div className="w-64 bg-primary-dark text-beige flex flex-col h-screen sticky top-0 border-r border-accent/20">
      {/* Brand Header */}
      <div className="p-6 border-b border-accent/20 flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <div className="border border-accent px-1.5 py-0.5 rounded-sm bg-primary/45">
            <span className="text-white font-extrabold text-sm tracking-tighter">one</span>
          </div>
          <span className="text-white text-xs font-bold tracking-widest uppercase">CMS DASHBOARD</span>
        </div>
        <Link
          to="/"
          className="text-accent hover:text-white text-[10px] uppercase font-bold tracking-widest flex items-center space-x-1 pt-2 transition-colors"
        >
          <span>← Back to Website</span>
        </Link>
      </div>

      {/* Logged in as */}
      {adminUser && (
        <div className="px-4 py-3 border-b border-accent/10 flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
          <span className="text-[10px] text-white/40 uppercase tracking-widest truncate">
            {adminUser}
          </span>
        </div>
      )}

      {/* Menu Links */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {menuItems.map((item, idx) => {
          const isActive = currentTab === item.path || (currentTab === 'admin' && item.path === 'hero');
          return (
            <Link
              key={idx}
              to={`/admin/${item.path}`}
              className={`block px-4 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-colors ${
                isActive
                  ? 'bg-accent text-white shadow-md'
                  : 'text-beige-dark/75 hover:bg-primary-light/20 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout + Footer */}
      <div className="p-4 border-t border-accent/15 space-y-3">
        <button
          id="admin-logout-btn"
          onClick={logout}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-sm border border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300 hover:border-red-400/50 transition-all duration-200 text-[10px] font-bold uppercase tracking-widest"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Logout</span>
        </button>
        <p className="text-center text-[9px] text-beige-dark/30 uppercase tracking-widest">MERN CMS v1.0.0</p>
      </div>
    </div>
  );
}

export default AdminSidebar;
