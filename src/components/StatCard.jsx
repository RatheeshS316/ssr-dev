const StatCard = ({ icon, value, label }) => (
  <div className="flex items-center gap-4 p-5 bg-surface2 border border-slate-800
    rounded-2xl transition-all duration-200 hover:border-slate-600 hover:shadow-xl group">
    <div className="p-3 bg-surface3 border border-slate-700/50 rounded-xl shrink-0
      group-hover:border-slate-600 transition-colors">
      {icon}
    </div>
    <div>
      <p className="text-2xl font-extrabold text-white leading-tight">{value}</p>
      <p className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5">{label}</p>
    </div>
  </div>
);

export default StatCard;
