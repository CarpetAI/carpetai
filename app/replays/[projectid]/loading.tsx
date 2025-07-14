import Header from "@/components/common/Header";

export default function Loading() {
  return (
    <div className="min-h-screen w-full bg-[#f7f9fb]">
      <Header />
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="h-32 bg-gray-200 rounded-xl animate-pulse"></div>
          <div className="h-32 bg-gray-200 rounded-xl animate-pulse"></div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6 overflow-hidden h-[calc(100vh-160px)]">
          <div className="w-full lg:w-64 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col mb-4 lg:mb-0">
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="h-5 w-16 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="flex-1 p-4 space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="p-3 bg-gray-100 rounded-lg animate-pulse">
                  <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 w-24 bg-gray-200 rounded mb-1"></div>
                  <div className="h-3 w-40 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col items-center justify-center">
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4"></div>
            <div className="w-full max-w-[1024px] h-[576px] bg-gray-200 rounded animate-pulse"></div>
          </div>
          
          <div className="w-full lg:w-80 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col">
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="flex-1 p-4">
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-16 bg-gray-100 rounded animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 