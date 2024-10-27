import { PortableTextQuery } from '@/components/ui/portableText';
import { groq } from 'next-sanity';

export const getPageBody = groq`
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

export const getAllPagesSlugs = groq`
   *[_type == "page"]{
    "slug": slug.current
  }[].slug
`;

export const getPageBySlug = groq`
  *[_type == "page" && slug.current == $slug][0]{
    ...,
    components[]{...,
      _type == "image" => {..., asset->}
    }
  }
`;

export const getPageMetadata = groq`
  *[_type == "page" && slug.current == $slug]{
    seo
  }[0].seo
`;
