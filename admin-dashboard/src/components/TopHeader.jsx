export default function TopHeader({ activeTab }) {
  return (
    <header className="h-14 border-b border-outline/30 bg-surface/90 backdrop-blur-md flex items-center justify-between px-4 md:px-6 flex-shrink-0 z-30 select-none">
      {/* Brand logo (Mobile Only) */}
      <span className="md:hidden font-display font-black text-xs text-primary tracking-[0.2em] uppercase mr-2 flex-shrink-0">
        LUNARIS
      </span>

      {/* Spacer to push actions to the right */}
      <div className="flex-grow" />

      {/* Actions */}
      <div className="flex items-center gap-3 md:gap-4 ml-3 flex-shrink-0">
        <button className="relative text-on-surface-variant hover:text-primary transition-colors cursor-pointer flex items-center">
          <span className="material-symbols-outlined text-[18px]">notifications</span>
          <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-primary rounded-full"></span>
        </button>
        <button className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer flex items-center">
          <span className="material-symbols-outlined text-[18px]">help</span>
        </button>
      </div>
    </header>
  );
}
