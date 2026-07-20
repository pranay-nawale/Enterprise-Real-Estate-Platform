import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function AdminSidebar() {
  const location = useLocation();
  const currentTab = location.pathname.split('/').pop() || '';

  const menuItems = [
    { label: 'Hero Section', path: 'hero' },
    { label: 'About Project', path: 'about' },
    { label: 'Services', path: 'services' },
    { label: 'Properties / Floor Plans', path: 'properties' },
    { label: 'Projects / Gallery', path: 'projects' },
    { label: 'Testimonials', path: 'testimonials' },
    { label: 'FAQ', path: 'faq' },
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

      {/* Footer info */}
      <div className="p-4 border-t border-accent/15 text-center text-[9px] text-beige-dark/40 uppercase tracking-widest">
        MERN CMS v1.0.0
      </div>
    </div>
  );
}

export default AdminSidebar;
