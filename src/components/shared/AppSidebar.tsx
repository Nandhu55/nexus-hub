'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, LogOut, ShieldCheck, Compass, FileText } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { ThemeToggle } from '../common/theme-toggle';

const menuItems = [
  { href: '/library', label: 'Library', icon: BookOpen },
  { href: '/exam-papers', label: 'Exam Papers', icon: FileText },
  { href: '/career-guidance', label: 'Career Guidance', icon: Compass },
  { href: '/admin/dashboard', label: 'Admin', icon: ShieldCheck },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-primary" />
            <h1 className="text-xl font-bold font-headline">B-Tech Hub</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  isActive={pathname.startsWith(item.href)}
                  tooltip={{ children: item.label }}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="flex-row items-center gap-2">
         <ThemeToggle />
         <Link href="/" legacyBehavior passHref>
            <SidebarMenuButton tooltip={{children: 'Logout'}}>
                <LogOut />
                <span>Logout</span>
            </SidebarMenuButton>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
