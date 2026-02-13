import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50">
      <h1 className="text-4xl font-bold text-blue-900 mb-4">Sovereign Suites</h1>
      <p className="text-lg text-gray-600 mb-8">Smart Booking System for Modern Hotels</p>
      
      <div className="flex gap-4">
        <Link href="/login" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Owner Login
        </Link>
        <Link href="/register" className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">
          Register Hotel
        </Link>
      </div>
    </main>
  );
}