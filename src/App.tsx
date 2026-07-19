import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Events } from './pages/Events';
import { CaseStudyPage } from './pages/CaseStudyPage';
import type { PageName, SetPage } from './lib/navigation';

function App() {
  const [route, setRoute] = useState<{ page: PageName; slug?: string }>({ page: 'home' });

  const setPage: SetPage = (page, arg) => {
    if (page === 'case-study') {
      setRoute({ page, slug: arg });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setRoute({ page });

    if (arg) {
      // Small delay so the target page has mounted before we scroll to a section.
      setTimeout(() => {
        const el = document.getElementById(arg);
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-[100dvh] bg-background text-foreground flex flex-col font-sans selection:bg-primary/30 selection:text-white">
      <Navbar activePage={route.page} setPage={setPage} />

      <div className="flex-grow">
        {route.page === 'case-study' ? (
          <CaseStudyPage slug={route.slug ?? ''} setPage={setPage} />
        ) : route.page === 'events' ? (
          <Events setPage={setPage} />
        ) : (
          <Home setPage={setPage} />
        )}
      </div>

      <Footer setPage={setPage} />
    </div>
  );
}

export default App;
