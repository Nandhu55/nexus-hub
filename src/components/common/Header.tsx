'use client';

import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { BookMarked, LogOut, User as UserIcon, Bell, Trash2, FileText, Shapes, Briefcase, BookHeart, UserPlus, BookCheck, Shield, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import type { Notification } from '@/lib/data';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ThemeToggle } from './theme-toggle';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

function NotificationIcon({ type }: { type: Notification['type'] }) {
    const iconProps = { className: "h-5 w-5" };
    switch (type) {
        case 'welcome':
            return <UserPlus {...iconProps} />;
        case 'new_book':
            return <BookCheck {...iconProps} />;
        case 'security':
             return <Shield {...iconProps} />;
        default:
            return <Bell {...iconProps} />;
    }
}

export function Header({ user }: { user: User }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('timestamp', { ascending: false })
        .limit(10);
    
    if (error) {
        // Handle error silently for now
        console.error("Error fetching notifications:", error);
    } else {
        setNotifications(data || []);
    }
    setLoading(false);
  }, [supabase, user.id]);

  useEffect(() => {
    fetchNotifications();

    const channel = supabase
      .channel(`notifications:${user.id}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'notifications', filter: `user_id=eq.${user.id}` }, 
      (payload) => {
        console.log('Change received!', payload)
        fetchNotifications();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };

  }, [fetchNotifications, supabase, user.id]);

  const clearNotifications = async () => {
    const { error } = await supabase.from('notifications').delete().eq('user_id', user.id);
    if (!error) setNotifications([]);
  };

  const markAsRead = async () => {
    const unreadIds = notifications.filter(n => !n.read).map(n => n.id);
    if (unreadIds.length === 0) return;
    
    const { error } = await supabase.from('notifications').update({ read: true }).in('id', unreadIds);
    if (!error) {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    }
  };


  const unreadCount = notifications.filter(n => !n.read).length;

  const handleOpenChange = (open: boolean) => {
    if (open && unreadCount > 0) {
      markAsRead();
    }
  };

  const formatTimestamp = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      if (isNaN(date.getTime())) {
        return "a moment ago";
      }
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (e) {
      return "a moment ago";
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  }

  const userMetadata = user.user_metadata;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center px-4">
        <Link href="/library" className="flex items-center gap-3 group">
            <BookMarked className="h-8 w-8 text-primary group-hover:text-primary/80 transition-colors duration-300" />
            <span className="font-headline text-2xl font-bold text-foreground tracking-tighter group-hover:text-primary transition-colors duration-300">
                B-Tech Hub
            </span>
        </Link>
        
        <div className="ml-auto flex items-center gap-2">
            <nav className="hidden md:flex items-center gap-1">
                <Button asChild variant="ghost">
                    <Link href="/library">
                        <BookHeart className="mr-2 h-4 w-4" />
                        <span>Library</span>
                    </Link>
                </Button>
                <Button asChild variant="ghost">
                    <Link href="/exam-papers">
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Exam Papers</span>
                    </Link>
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost">
                            <Shapes className="mr-2 h-4 w-4" />
                            <span>Resources</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                        <Link href="/career-guidance">
                            <Briefcase className="mr-2 h-4 w-4" />
                            <span>Career Guidance</span>
                        </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                        <Link href="/other-books">
                            <BookHeart className="mr-2 h-4 w-4" />
                            <span>Other Books</span>
                        </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </nav>

            <div className="flex items-center gap-1">
                <div className="md:hidden">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                                <Link href="/library">
                                    <BookHeart className="mr-2 h-4 w-4" />
                                    <span>Library</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/exam-papers">
                                    <FileText className="mr-2 h-4 w-4" />
                                    <span>Exam Papers</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                             <DropdownMenuLabel>Resources</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                            <Link href="/career-guidance">
                                <Briefcase className="mr-2 h-4 w-4" />
                                <span>Career Guidance</span>
                            </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                            <Link href="/other-books">
                                <BookHeart className="mr-2 h-4 w-4" />
                                <span>Other Books</span>
                            </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <ThemeToggle />

                <DropdownMenu onOpenChange={handleOpenChange}>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-foreground hover:text-primary hover:bg-primary/10 relative">
                            <Bell className="h-5 w-5" />
                            {unreadCount > 0 && (
                                <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">{unreadCount}</Badge>
                            )}
                            <span className="sr-only">Notifications</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-80 md:w-96" align="end">
                        <DropdownMenuLabel className="flex justify-between items-center">
                            <span className="font-semibold">Notifications</span>
                            {notifications.length > 0 && (
                                <Button variant="ghost" size="sm" onClick={clearNotifications} className="text-xs text-muted-foreground h-auto p-1">
                                    <Trash2 className="mr-1 h-3 w-3" />
                                    Clear all
                                </Button>
                            )}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <ScrollArea className="h-[300px]">
                            {loading ? (
                                <p className="text-center text-sm text-muted-foreground py-10">Loading...</p>
                            ) : notifications.length === 0 ? (
                                <p className="text-center text-sm text-muted-foreground py-10">No new notifications</p>
                            ) : (
                                notifications.map((n) => (
                                    <DropdownMenuItem key={n.id} className="flex items-start gap-3 p-3 whitespace-normal cursor-default" onSelect={(e) => e.preventDefault()}>
                                        <div className="rounded-full bg-primary/10 text-primary p-2">
                                            <NotificationIcon type={n.type} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold">{n.title}</p>

                                            <p className="text-sm text-muted-foreground">{n.description}</p>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                {formatTimestamp(n.timestamp)}
                                            </p>
                                        </div>
                                    </DropdownMenuItem>
                                ))
                            )}
                        </ScrollArea>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                        <Avatar className="h-10 w-10 border-2 border-primary/50 hover:border-primary transition-colors duration-300">
                        <AvatarImage src={userMetadata?.avatar_url} alt={userMetadata?.name} data-ai-hint="person portrait" />
                        <AvatarFallback>
                            <UserIcon />
                        </AvatarFallback>
                        </Avatar>
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{userMetadata?.name || 'Student'}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                        </p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link href="/profile">
                            <UserIcon className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
      </div>
    </header>
  );
}
