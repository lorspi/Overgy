import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";

const HomePage = lazy(() => import("./pages/HomePage").then((m) => ({ default: m.HomePage })));
const NoticiasPage = lazy(() => import("./pages/NoticiasPage").then((m) => ({ default: m.NoticiasPage })));
const NoticiaPage = lazy(() => import("./pages/NoticiaPage").then((m) => ({ default: m.NoticiaPage })));
const WikiPage = lazy(() => import("./pages/WikiPage").then((m) => ({ default: m.WikiPage })));
const WikiCategoryPage = lazy(() => import("./pages/WikiCategoryPage").then((m) => ({ default: m.WikiCategoryPage })));
const ReglasPage = lazy(() => import("./pages/ReglasPage").then((m) => ({ default: m.ReglasPage })));
const TiendaPage = lazy(() => import("./pages/TiendaPage").then((m) => ({ default: m.TiendaPage })));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage").then((m) => ({ default: m.NotFoundPage })));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/noticias" element={<NoticiasPage />} />
          <Route path="/noticias/:slug" element={<NoticiaPage />} />
          <Route path="/ayuda" element={<WikiPage />} />
          <Route path="/ayuda/:slug" element={<WikiCategoryPage />} />
          <Route path="/reglas" element={<ReglasPage />} />
          <Route path="/tienda" element={<TiendaPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}
