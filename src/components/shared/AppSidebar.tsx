'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, LogOut, Settings, ShieldCheck, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';

const menuItems = [
  { href: '/library', label: 'Library', icon: BookOpen },
  { href: '/admin/dashboard', label: 'Admin', icon: ShieldCheck },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-primary" />
            <h1 className="text-xl font-bold font-headline">Nexus Library</h1>
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
      <SidebarFooter>
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
