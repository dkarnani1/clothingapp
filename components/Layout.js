import { Tag, Box, BarChart } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Layout({ children }) {
  const pathname = usePathname();

  const navItems = [
    {
      label: 'Clothes',
      href: '/clothes',
      icon: Tag
    },
    {
      label: 'Outfits',
      href: '/outfits',
      icon: Box
    },
    {
      label: 'Analytics',
      href: '/analytics',
      icon: BarChart
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto max-w-[1600px] px-16">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold">My Closet</h1>
              <p className="text-sm text-gray-500">Elevate your closet with AI</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 rounded-lg bg-green-600 px-3 py-2 text-white hover:bg-green-500">
                <span className="text-sm font-medium">Add Clothes</span>
              </button>
              <button className="flex items-center gap-2 rounded-lg border border-green-600 px-3 py-2 text-green-600 hover:bg-green-50">
                <span className="text-sm font-medium">AI Assistant</span>
              </button>
              <button className="rounded-full p-2 hover:bg-gray-100">
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="bg-gray-50">
        <div className="mx-auto max-w-[1600px] px-16">
          <nav className="flex space-x-2 py-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm ${
                    isActive
                      ? 'bg-gray-100 font-medium text-gray-900'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-[1600px] px-16 py-6">
        {children}
      </main>
    </div>
  );
} 