import { DashboardClient } from '@/components/admin/DashboardClient';

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold font-headline">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Manage your e-library content. Add, edit, or remove books.
        </p>
      </div>
      <DashboardClient />
    </div>
  );
}
