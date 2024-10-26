import { groq } from 'next-sanity';

export const PortableTextQuery = (name: string) => groq`
  ${name}[] {
    ...,
    markDefs[] {
      _type == "link" => {
        _type,
        _key,
        linkType,
        "href": select(linkType == "internal" => internal -> slug.current, linkType == "external" => external, "#"),
      },
    },
  },
`;
