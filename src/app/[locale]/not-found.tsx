export default function NotFound() {
  return (
    <main className="wrap min-h-[60vh] grid content-center gap-4">
      <p className="eyebrow">404</p>
      <h1 className="h2">This page does not exist.</h1>
      <a href="/" className="text-brand-hi no-underline">
        Back to the landing page
      </a>
    </main>
  );
}
