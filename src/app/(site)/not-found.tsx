import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='container py-24 lg:py-48 flex flex-col items-center gap-12 lg:gap-14'>
      <span className='text-3xl lg:text-4xl'>Strona nie odnaleziona</span>
      <Link className='text-lg' href='/'>
        Wróć na stronę główną
      </Link>
    </div>
  );
}
