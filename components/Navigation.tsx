import React, { useState } from 'react';
import { ViewState } from '../types';

interface NavigationProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  // Helper to determine if a parent item is active
  const isActive = (view: ViewState) => currentView === view;
  const isParentActive = (views: ViewState[]) => views.includes(currentView);

  const navItemClass = (active: boolean) => 
    `px-4 py-3 cursor-pointer font-medium transition-colors duration-200 flex items-center ${
      active 
      ? 'text-green-700 bg-green-50 border-b-2 border-green-600' 
      : 'text-gray-600 hover:text-green-600 hover:bg-gray-50'
    }`;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center cursor-pointer gap-2" onClick={() => setView(ViewState.HOME)}>
               <div className="h-10 w-10 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-md">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
               </div>
               <span className="font-bold text-xl text-gray-800 tracking-tight hidden sm:block">Lịch Vạn Niên</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:ml-8 md:flex md:space-x-1">
              <div 
                className={navItemClass(isActive(ViewState.HOME))}
                onClick={() => setView(ViewState.HOME)}
              >
                Trang Chủ
              </div>
              <div 
                className={navItemClass(isActive(ViewState.CALENDAR))}
                onClick={() => setView(ViewState.CALENDAR)}
              >
                Lịch Vạn Niên
              </div>
              
              {/* Dropdown for Knowledge & Assistant */}
              <div className="relative group">
                <button 
                  className={navItemClass(isParentActive([ViewState.ASSISTANT, ViewState.BLOG, ViewState.KNOWLEDGE]))}
                  onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}
                >
                  <span>Kiến thức & Trợ lý</span>
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                <div className="absolute left-0 top-full mt-0 w-48 bg-white rounded-b-md shadow-xl py-2 border border-t-0 border-gray-100 hidden group-hover:block animate-fade-in">
                  <div 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 cursor-pointer"
                    onClick={(e) => { e.stopPropagation(); setView(ViewState.BLOG); }}
                  >
                    Blog
                  </div>
                  <div 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 cursor-pointer"
                    onClick={(e) => { e.stopPropagation(); setView(ViewState.KNOWLEDGE); }}
                  >
                    Kiến thức
                  </div>
                   <div 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 cursor-pointer"
                    onClick={(e) => { e.stopPropagation(); setView(ViewState.ASSISTANT); }}
                  >
                    Trợ lý
                  </div>
                </div>
              </div>

              <div 
                className={navItemClass(isActive(ViewState.LOVE))}
                onClick={() => setView(ViewState.LOVE)}
              >
                Bói Duyên
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path className={isMenuOpen ? 'hidden' : 'inline-flex'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                <path className={isMenuOpen ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-inner">
          <div className="pt-2 pb-3 space-y-1">
            <div className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-green-50" onClick={() => { setView(ViewState.HOME); setIsMenuOpen(false); }}>Trang Chủ</div>
            <div className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-green-50" onClick={() => { setView(ViewState.CALENDAR); setIsMenuOpen(false); }}>Lịch Vạn Niên</div>
            
            <div className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-green-50" onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}>
               <div className="flex justify-between items-center">
                 <span>Kiến thức & Trợ lý</span>
                 <svg className={`w-4 h-4 transform transition-transform ${isSubMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
               </div>
            </div>
            {isSubMenuOpen && (
              <div className="bg-gray-50 border-y border-gray-100">
                <div className="block pl-8 pr-4 py-3 text-sm font-medium text-gray-600 hover:text-green-700" onClick={() => { setView(ViewState.BLOG); setIsMenuOpen(false); }}>• Blog</div>
                <div className="block pl-8 pr-4 py-3 text-sm font-medium text-gray-600 hover:text-green-700" onClick={() => { setView(ViewState.KNOWLEDGE); setIsMenuOpen(false); }}>• Kiến thức</div>
                <div className="block pl-8 pr-4 py-3 text-sm font-medium text-gray-600 hover:text-green-700" onClick={() => { setView(ViewState.ASSISTANT); setIsMenuOpen(false); }}>• Trợ lý</div>
              </div>
            )}
            
            <div className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-green-50" onClick={() => { setView(ViewState.LOVE); setIsMenuOpen(false); }}>Bói Duyên</div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
