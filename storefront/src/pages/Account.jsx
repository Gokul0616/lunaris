import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Account() {
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuth()

  // Handle logout and redirect to home
  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="flex-grow w-full bg-background text-on-background animate-fadeIn pb-24 md:pb-12">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-lg mt-4">
        
        {isAuthenticated ? (
          <div className="max-w-[576px] mx-auto flex flex-col w-full px-4">
            
            {/* Athlete Profile Header Card */}
            <section className="flex flex-col items-center justify-center pt-8 pb-6 border-b border-outline-variant/15">
              <div className="relative mb-4">
                <img 
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-xl bg-surface-container" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHTgiqVseeZ0fyxGLf7HiLwjDJH1geQMqiUriTocya2tGYMJkE3KoGdKCMQRlyC5Lc-5IDjDkSbYC4FVbT6eJeYW8CX2ewdAvlJrEumpfg5ZGjMBUP23exSRSmEmfGfY-zQKm4WsmZDnRCokaZNgqTdYrvE05VeQaAwr51gX_3I0CJJ3GYLhISFvXruOwjr-IV1VwW2bYFpGaUF-5ZGk59P7FuBX7_uVtlDF8qFD-mCkcb8cVWBYbbz_vWBqgHHhHZH_IzspFfYdL7" 
                  alt="User Avatar"
                />
                <div className="absolute bottom-0 right-0 bg-secondary text-on-secondary w-8 h-8 rounded-full flex items-center justify-center border-2 border-background shadow-sm">
                  <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>workspace_premium</span>
                </div>
              </div>
              
              <h1 className="text-2xl font-black text-primary uppercase tracking-wide">
                {user?.name || 'Alex Carter'}
              </h1>
              <p className="text-xs text-on-surface-variant flex items-center gap-1 mt-1.5 font-semibold uppercase tracking-wider">
                <span className="material-symbols-outlined text-[16px] text-secondary">stars</span> 
                LUNARIS Elite Member
              </p>
              <span className="text-[10px] text-outline mt-1 font-mono">{user?.email}</span>
            </section>

            {/* Metric counters */}
            <div className="grid grid-cols-2 gap-4 mt-8 mb-8">
              <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 shadow-sm text-center">
                <div className="text-2xl font-black text-primary">12</div>
                <div className="text-[10px] uppercase font-black tracking-widest text-on-surface-variant mt-1">Orders</div>
              </div>
              <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 shadow-sm text-center">
                <div className="text-2xl font-black text-secondary">450</div>
                <div className="text-[10px] uppercase font-black tracking-widest text-on-surface-variant mt-1">Points</div>
              </div>
            </div>

            {/* List Menu Actions */}
            <div className="space-y-2">
              {[
                { icon: 'package_2', label: 'Order History' },
                { icon: 'favorite', label: 'My Wishlist' },
                { icon: 'location_on', label: 'Saved Addresses' },
                { icon: 'payment', label: 'Payment Methods' },
                { icon: 'notifications', label: 'Preferences' }
              ].map(item => (
                <button 
                  key={item.label} 
                  className="w-full flex items-center justify-between p-4 bg-surface-container-lowest border border-outline-variant rounded-xl hover:bg-surface-container-low transition-all cursor-pointer shadow-sm"
                >
                  <div className="flex items-center gap-4 text-primary">
                    <span className="material-symbols-outlined text-on-surface-variant">{item.icon}</span>
                    <span className="font-bold text-sm text-primary">{item.label}</span>
                  </div>
                  <span className="material-symbols-outlined text-outline text-[18px]">chevron_right</span>
                </button>
              ))}
              
              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 p-4 border border-error bg-error-container/10 text-error rounded-xl hover:bg-error-container/20 transition-all font-bold text-xs uppercase tracking-widest mt-6 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">logout</span> Log Out
              </button>
            </div>

          </div>
        ) : (
          /* Unauthenticated state block */
          <div className="max-w-[450px] w-full mx-auto text-center py-16 bg-surface-container-low rounded-2xl border border-outline-variant/15 px-6 flex flex-col items-center shadow">
            <span className="material-symbols-outlined text-4xl text-outline mb-4">account_circle</span>
            <h2 className="text-lg text-primary font-bold">Athlete Center</h2>
            <p className="text-xs text-on-surface-variant mt-2 max-w-[320px] leading-relaxed w-full">
              Create an athlete profile or sign in to track orders, earn reward points, and access premium training perks.
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full justify-center">
              <button 
                onClick={() => navigate('/login')}
                className="bg-primary text-on-primary px-6 py-3.5 rounded-lg font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-all cursor-pointer flex-grow shadow"
              >
                Sign In
              </button>
              <button 
                onClick={() => navigate('/register')}
                className="bg-transparent border border-primary text-primary px-6 py-3.5 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-surface-container-high transition-all cursor-pointer flex-grow"
              >
                Register
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
