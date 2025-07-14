import Link from "next/link";
import Image from "next/image";
import { SignedIn, UserButton } from "@clerk/nextjs";

interface HeaderProps {
  showUserButton?: boolean;
}

export default function Header({ showUserButton = true }: HeaderProps) {
  return (
    <header className="w-full px-6 py-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-[#18181b] sticky top-0 z-20">
      <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
        <Image src="/logo.jpg" alt="CartpetAI Logo" width={32} height={32} className="w-8 h-8 rounded-full object-contain bg-white" />
        <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">CartpetAI</span>
      </Link>
      {showUserButton && (
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      )}
    </header>
  );
} 