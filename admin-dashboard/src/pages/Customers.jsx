export default function Customers({ customers, searchQuery }) {
  return (
    <div className="animate-fadeIn">
      <div className="mb-5 select-none">
        <h1 className="font-display font-black text-xl tracking-tight text-[#181c1e] uppercase">
          Customer Records
        </h1>
        <p className="text-[11px] text-[#44474c] mt-0.5 font-medium">
          Review profiles, lifetime values, and registered user indices.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-[#c4c6cc]/30 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f1f4f6] border-b border-[#c4c6cc]/20 text-[9px] text-[#44474c] uppercase tracking-wider select-none font-bold">
                <th className="p-3">User ID</th>
                <th className="p-3">Full Name</th>
                <th className="p-3">Email Address</th>
                <th className="p-3 text-center">Orders Logged</th>
                <th className="p-3 text-right">Lifetime Spent</th>
              </tr>
            </thead>
            <tbody className="text-[11px] text-[#181c1e]">
              {customers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-[#44474c]/60 font-semibold select-none">
                    No customers match "{searchQuery}".
                  </td>
                </tr>
              ) : (
                customers.map(customer => (
                  <tr key={customer.id} className="border-b border-[#c4c6cc]/10 hover:bg-[#f7fafc] transition-all font-medium">
                    <td className="p-3 font-bold text-[#74777d]">{customer.id}</td>
                    <td className="p-3 font-bold text-[#181c1e]">{customer.name}</td>
                    <td className="p-3 text-[10px] text-[#44474c]">{customer.email}</td>
                    <td className="p-3 text-center font-black text-black">{customer.ordersCount}</td>
                    <td className="p-3 text-right font-black text-[#0060a8]">{customer.totalSpent}</td>
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
