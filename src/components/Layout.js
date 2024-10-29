import Navigation from './Navigation';

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Navigation />
      <main>{children}</main>
    </div>
  );
} 