import { notFound } from 'next/navigation';
import { type Metadata } from 'next';
import { client } from '@/sanity/lib/client';
import { SECTION_COMPONENTS } from '@/components/Components';
import {
  getPageBody,
  getAllPagesSlugs,
  getPageBySlug,
  getPageMetadata,
} from '@/queries';

type Props = { params: { slug?: string[] } };

const fetchPageBody = async (slug: string) => {
  return await client.fetch(getPageBody, { slug }, { cache: 'no-cache' });
};

const fetchAllPagesSlugs = async () => {
  return await client.fetch(getAllPagesSlugs, {}, { cache: 'no-cache' });
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug ? `${params.slug.join('/')}` : '/';
  const metadata = await client.fetch(
    getPageMetadata,
    { slug },
    { cache: 'no-cache' }
  );

  if (!metadata) return {};

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_HOST_URL!),
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      type: 'website',
      countryName: 'Polska',
      locale: 'pl_PL',
      title: metadata.title,
      description: metadata.description,
      url: new URL(process.env.NEXT_PUBLIC_HOST_URL!),
      images: metadata.ogImage?.asset.url,
      siteName: metadata.title,
    },
    twitter: {
      title: metadata.title,
      description: metadata.description,
      card: 'summary_large_image',
      images: metadata.ogImage?.asset.url,
      creator: 'Rafał Izdebski',
    },
    authors: [{ name: 'Rafał Izdebski', url: 'https://rafalizdebski.pl/' }],
    creator: 'Rafał Izdebski',
  };
}

export default async function Page({ params }: Props) {
  const { slug } = params;

  const pageSlug = slug ? slug.join('/') : '/';
  const page = await client.fetch(getPageBySlug, { slug: pageSlug });

  if (!page) return notFound();

  const body = await fetchPageBody(pageSlug);

  if (!body) return <div>{params.slug}</div>;

  return (
    <>
      {body.map((item: any, index: number) => {
        const SectionComponent =
          SECTION_COMPONENTS[item._type as keyof typeof SECTION_COMPONENTS];

        return SectionComponent ? (
          <SectionComponent key={`${item._type}-${index}`} {...item} />
        ) : null;
      })}
    </>
  );
}

export async function generateStaticParams() {
  const slugs = await fetchAllPagesSlugs();
  return slugs.map((slug: string) => ({
    slug: slug ? slug.split('/') : ['/'],
  }));
}
