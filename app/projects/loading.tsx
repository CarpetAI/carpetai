import Header from "@/components/common/Header";

export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex flex-col dark:bg-[#18181b]">
      <Header />
      <main className="px-4 pt-12 pb-12">
        <div className="max-w-6xl w-full mx-auto">
          <div className="h-10 w-48 bg-gray-200 rounded animate-pulse mb-6 mx-auto"></div>
          <div className="flex justify-center mb-8">
            <div className="h-12 w-48 bg-gray-200 rounded animate-pulse"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-[4/3] bg-white rounded-2xl shadow-lg border border-gray-100 p-6 dark:bg-[#23272f] dark:border-gray-800">
                <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4"></div>
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
} 