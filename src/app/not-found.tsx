import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center px-6 text-center bg-burgundy-deep text-cream">
      <p className="eyebrow mb-6">404</p>
      <h1 className="display-md mb-6">This glass is empty.</h1>
      <p className="lede max-w-md mb-10">The page you are looking for does not exist.</p>
      <Link href="/" className="btn btn-solid">Back to LALA</Link>
    </main>
  );
}
