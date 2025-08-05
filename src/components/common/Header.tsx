'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  BookMarked,
  Menu,
  BookOpen,
  FileText,
  Compass,
  ShieldCheck,
  User,
  LogOut,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/common/theme-toggle';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import type { User as UserType } from '@/hooks/use-users';

const navItems = [
  { href: '/library', label: 'Library', icon: BookOpen },
  { href: '/exam-papers', label: 'Exam Papers', icon: FileText },
  { href: '/career-guidance', label: 'Career Guidance', icon: Compass },
];

const adminNavItems = [
    { href: '/admin/dashboard', label: 'Admin', icon: ShieldCheck },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useIsMobile();
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userJson = sessionStorage.getItem('currentUser');
      if (userJson) {
        setCurrentUser(JSON.parse(userJson));
      }
      const adminStatus = sessionStorage.getItem('isAdmin') === 'true';
      setIsAdmin(adminStatus);
    }
  }, []);
  
  const handleLogout = () => {
    if (typeof window !== 'undefined') {
        sessionStorage.clear();
    }
    router.push('/login');
  }

  const allNavItems = isAdmin ? [...navItems, ...adminNavItems] : navItems;

  const NavLinks = ({ inSheet = false }: { inSheet?: boolean }) => (
    <>
      {allNavItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={() => setSheetOpen(false)}
          className={cn(
            'transition-colors hover:text-primary',
            pathname.startsWith(item.href) ? 'text-primary font-semibold' : 'text-muted-foreground',
            inSheet && 'flex items-center gap-3 rounded-lg px-3 py-2 text-lg'
          )}
        >
          {inSheet && <item.icon className="h-5 w-5" />}
          {item.label}
        </Link>
      ))}
    </>
  );

  const UserMenu = () => {
    if (!currentUser && !isAdmin) return null;
    const displayName = isAdmin ? 'Admin' : currentUser?.name;
    const displayEmail = isAdmin ? 'admin@btech-hub.com' : currentUser?.email;

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{displayName}</p>
                <p className="text-xs leading-none text-muted-foreground">{displayEmail}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="container flex h-16 items-center px-4">
        <Link href="/library" className="mr-6 flex items-center gap-3 group">
          <BookMarked className="h-8 w-8 text-primary group-hover:text-primary/80 transition-colors duration-300" />
          <span className="font-headline text-2xl font-bold text-foreground tracking-tighter group-hover:text-primary transition-colors duration-300">
            B-Tech Hub
          </span>
        </Link>

        {isMobile ? (
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            <UserMenu />
            <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu />
                  <span className="sr-only">Open Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <BookMarked className="h-6 w-6 text-primary"/>
                    <span>B-Tech Hub</span>
                  </SheetTitle>
                </SheetHeader>
                <nav className="mt-8 grid gap-4">
                  <NavLinks inSheet />
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        ) : (
          <>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <NavLinks />
            </nav>
            <div className="ml-auto flex items-center gap-2">
              <ThemeToggle />
              <UserMenu />
            </div>
          </>
        )}
      </div>
    </header>
  );
}