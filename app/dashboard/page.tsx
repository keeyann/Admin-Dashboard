import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import DashboardCharts from "@/components/charts/DashboardCharts";
import ProductForm from "@/components/forms/ProductForm";
import DeleteButton from "@/components/buttons/DeleteButton";
import EditButton from "@/components/buttons/EditButton";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const session = await auth();
  const adminName = session?.user?.name || "Admin";

  const query = (await searchParams).q || "";

  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { category: { contains: query, mode: "insensitive" } },
      ],
    },
    orderBy: { createdAt: "desc" },
  });

  const totalProducts = products.length;
  const totalItems = products.reduce((acc, p) => acc + p.stock, 0);
  const totalValue = products.reduce(
    (acc, p) => acc + p.price * p.stock,
    0
  );

  const lowStockItems = products.filter(
    (p) => p.stock > 0 && p.stock < 10
  ).length;

  const outOfStock = products.filter((p) => p.stock === 0).length;
  const avgPrice = totalProducts > 0 ? totalValue / totalItems : 0;

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-8 text-gray-900">
      <div className="max-w-7xl mx-auto space-y-8">

        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Hello {adminName}
            </h1>
            <p className="text-gray-500">
              Manage your inventory and track stock metrics.
            </p>
          </div>
        </header>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <StatCard title="Total Products" value={totalProducts} icon="📦" />
          <StatCard title="Inventory Items" value={totalItems} icon="🔢" />
          <StatCard
            title="Stock Value"
            value={`₹${totalValue.toLocaleString()}`}
            icon="💰"
            color="text-green-600"
          />
          <StatCard
            title="Avg. Item Price"
            value={`₹${avgPrice.toFixed(2)}`}
            icon="📊"
            color="text-blue-600"
          />
          <StatCard
            title="Low Stock"
            value={lowStockItems}
            icon="⚠️"
            color="text-orange-600"
          />
          <StatCard
            title="Out of Stock"
            value={outOfStock}
            icon="🚫"
            color="text-red-600"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section className="lg:col-span-1 bg-white p-6 rounded-xl border border-gray-400 shadow-sm h-fit">
            <ProductForm />
          </section>

          <section className="lg:col-span-2 space-y-8">
            <DashboardCharts data={products} />
          </section>
        </div>

        <section className="bg-white rounded-xl border border-gray-400 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 className="text-lg font-bold">Inventory Management</h2>
            <form method="GET" className="relative w-full max-w-sm">
              <input
                name="q"
                defaultValue={query}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-black font-medium"
              />
              <span className="absolute left-3 top-2.5">🔍</span>
            </form>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-100 text-gray-900 uppercase font-bold border-b border-gray-300">
                <tr>
                  <th className="px-6 py-4">Preview</th>
                  <th className="px-6 py-4">Product Details</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Stock Status</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {products.map((p) => (
                  <tr
                    key={p.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      {p.imageUrl ? (
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          className="h-14 w-14 object-cover rounded-md border border-gray-300"
                        />
                      ) : (
                        <div className="h-14 w-14 bg-gray-200 rounded-md flex items-center justify-center text-[10px] text-gray-500 text-center p-1">
                          No Image
                        </div>
                      )}
                    </td>

                    <td className="px-6 py-4 max-w-sm">
                      <div className="font-bold text-gray-950 text-base">
                        {p.name}
                      </div>
                      <div className="text-xs text-gray-600 mt-1 leading-relaxed line-clamp-2">
                        {p.description}
                      </div>
                    </td>

                    <td className="px-6 py-4 font-medium">{p.category}</td>

                    <td className="px-6 py-4 font-bold text-gray-950">
                      ₹{p.price.toFixed(2)}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                          p.stock === 0
                            ? "bg-black text-white"
                            : p.stock < 10
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {p.stock === 0
                          ? "OUT OF STOCK"
                          : `${p.stock} units`}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-4">
                        <EditButton product={p} />
                        <DeleteButton product={p} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color = "text-gray-900" }: any) {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-300 shadow-sm flex items-center gap-3">
      <div className="text-2xl">{icon}</div>
      <div>
        <p className="text-[10px] font-bold text-gray-500 uppercase leading-none mb-1">
          {title}
        </p>
        <p className={`text-lg font-black ${color}`}>{value}</p>
      </div>
    </div>
  );
}
