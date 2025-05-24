import Link from "next/link";
import Image from "next/image";
import ThemeToggler from "./theme-toggler";
import { Button } from "./ui/button";

export function Navbar() {
  return (
    <header className="flex justify-between items-center p-4 border-b border-muted bg-background/90 backdrop-blur-sm sticky top-0 z-40">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/logo.svg"
          width={32}
          height={32}
          alt="BacaCerdas-AI Logo"
          className="h-8 w-auto"
        />
        <span className="font-bold text-lg hidden sm:inline text-zinc-900 dark:text-primary">BacaCerdas-AI</span>
      </Link>

      <div className="flex items-center gap-4">
        <ThemeToggler />
        {/* Auth links - akan diintegrasikan dengan sistem auth baru */}
        <Link
          href="/auth/login"
          className="text-zinc-700 dark:text-foreground hover:text-zinc-900 dark:hover:text-muted-foreground text-sm px-3 py-2 rounded-md transition-colors"
        >
          Masuk
        </Link>
        <Button asChild>
          <Link
            href="/auth/register"
            className="text-sm px-4 py-2 rounded-md"
          >
            Daftar
          </Link>
        </Button>
      </div>
    </header>
  );
}