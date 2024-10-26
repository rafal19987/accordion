import { type Metadata } from 'next';
import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';
import { notFound } from 'next/navigation';
import { SECTION_COMPONENTS } from '@/components/Components';
import { PortableTextQuery } from '@/components/ui/portableText';

type Props = { params: { slug?: string[] } };

const getAllPagesSlugs = groq`
   *[_type == "page"]{
    "slug": slug.current
  }[].slug
`;

const getPageBySlug = groq`
  *[_type == "page" && slug.current == $slug][0]{
    ...,
    components[]{...,
      _type == "image" => {..., asset->}
    }
  }
`;

const getPageBody = groq`
*[_type == "page" && slug.current == $slug]{
    components[] {
      _type,
      sectionId,
      _type == "Faq" => {
        ${PortableTextQuery('heading')}
        list[] -> {
          question,
          answer
        }
      }
    }
}[0].components
`;

const fetchPageBody = async (slug: string) => {
  return await client.fetch(getPageBody, { slug }, { cache: 'no-cache' });
};

const getPageMetadata = groq`
  *[_type == "page" && slug.current == $slug]{
    seo
  }[0].seo
`;

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
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      images: metadata.ogImage?.asset.url,
    },
    authors: {
      name: metadata.author,
    },
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
    <div className=''>
      {body.map((item: any, index: number) => {
        const SectionComponent =
          SECTION_COMPONENTS[item._type as keyof typeof SECTION_COMPONENTS];

        return SectionComponent ? (
          <SectionComponent key={`${item._type}-${index}`} {...item} />
        ) : null;
      })}
    </div>
  );
}

export async function generateStaticParams() {
  const slugs = await fetchAllPagesSlugs();
  return slugs.map((slug: string) => ({
    slug: slug ? slug.split('/') : ['/'],
  }));
}
