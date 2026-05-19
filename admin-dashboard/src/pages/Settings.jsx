export default function Settings() {
  return (
    <div className="animate-fadeIn">
      <div className="mb-5 select-none">
        <h1 className="font-display font-black text-xl tracking-tight text-[#181c1e] uppercase">
          Settings Console
        </h1>
        <p className="text-[11px] text-[#44474c] mt-0.5 font-medium">
          Update administrative information, profile security credentials, and toggle parameters.
        </p>
      </div>

      <div className="bg-white border border-[#c4c6cc]/30 rounded-xl p-5 shadow-sm flex flex-col gap-5">
        <div className="border-b border-[#c4c6cc]/10 pb-3 select-none">
          <h2 className="font-display font-black text-xs text-[#181c1e] uppercase tracking-wider">
            Administrative Profile
          </h2>
          <p className="text-[10px] text-[#44474c] mt-0.5 font-medium">
            Your account holds global administration and write access keys.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 select-none">
          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-black uppercase tracking-widest text-[#44474c]">Profile Role</span>
            <div className="bg-[#f1f4f6] px-3.5 py-2.5 rounded-lg text-xs font-bold text-[#44474c] border border-[#c4c6cc]/20">
              Global Systems Manager
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-black uppercase tracking-widest text-[#44474c]">Registered Email</span>
            <div className="bg-[#f1f4f6] px-3.5 py-2.5 rounded-lg text-xs font-bold text-[#44474c] border border-[#c4c6cc]/20">
              admin@lunaris.com
            </div>
          </div>
        </div>

        <div className="border-t border-[#c4c6cc]/10 pt-4 select-none">
          <button 
            onClick={() => alert('Administrative configuration saved successfully.')}
            className="bg-[#0060a8] hover:bg-[#0060a8]/90 text-white font-black text-[10px] uppercase tracking-widest py-3 px-6 rounded-lg cursor-pointer shadow-md transition-all active:scale-98"
          >
            Save Configurations
          </button>
        </div>
      </div>
    </div>
  );
}
