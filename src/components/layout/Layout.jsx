import { Outlet } from 'react-router-dom';
import { TopBar } from './TopBar';
import { Footer } from './Footer';
import { CartConflictModal } from '../cart/CartConflictModal';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <TopBar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartConflictModal />
    </div>
  );
}
