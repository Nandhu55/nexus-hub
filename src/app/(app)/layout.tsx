import { Header } from '@/components/common/Header';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Header user={user} />
      <main className="container py-6 sm:py-8">{children}</main>
    </div>
  );
}
