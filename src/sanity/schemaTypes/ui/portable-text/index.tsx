import { defineField } from 'sanity';
import { CustomInput } from './CustomInput';
import { isValidUrl } from '@sanity/utils/is-valid-url';

export const PortableText = ({
  name,
  title,
  allowHeadings = false,
}: {
  name?: string;
  title?: string;
  allowHeadings?: boolean;
}) =>
  defineField({
    name: name || 'PortableText',
    type: 'array',
    title: title || 'Portable Text',
    components: {
      // @ts-expect-error
      input: CustomInput,
    },
    of: [
      {
        type: 'block',
        styles: [
          { title: 'Normal', value: 'normal' },
          ...(allowHeadings
            ? [
                { title: 'Heading 2', value: 'h2' },
                { title: 'Heading 3', value: 'h3' },
              ]
            : []),
        ],
        lists: [
          { title: 'Bullet', value: 'bullet' },
          { title: 'Numbered', value: 'number' },
        ],
        marks: {
          decorators: [
            { title: 'Strong', value: 'strong' },
            { title: 'Emphasis', value: 'em' },
          ],
          annotations: [
            defineField({
              name: 'link',
              type: 'object',
              title: 'Link',
              icon: () => '🔗',
              fields: [
                defineField({
                  name: 'linkType',
                  type: 'string',
                  title: 'Type',
                  description:
                    'Choose "External" for links to websites outside your domain, or "Internal" for links to pages within your site.',
                  options: {
                    list: ['external', 'internal'],
                    layout: 'radio',
                    direction: 'horizontal',
                  },
                  initialValue: 'external',
                }),
                defineField({
                  name: 'external',
                  type: 'string',
                  title: 'URL',
                  description:
                    'Specify the full URL. Ensure it starts with "https://", "mailto:" or "tel:" protocol.',
                  hidden: ({ parent }) => parent?.linkType !== 'external',
                  validation: (Rule) => [
                    Rule.custom((value, { parent }) => {
                      const linkType = (parent as { linkType?: string })
                        ?.linkType;
                      if (linkType === 'external') {
                        if (!value) return 'URL is required';
                        if (
                          !value.startsWith('https://') &&
                          !value.startsWith('mailto:') &&
                          !value.startsWith('tel:')
                        ) {
                          return 'External link must start with the "https://", "mailto:" or "tel:" protocol';
                        }
                        if (!isValidUrl(value)) return 'Invalid URL';
                      }
                      return true;
                    }),
                  ],
                }),
                defineField({
                  name: 'internal',
                  title: 'Internal reference to page',
                  description: 'Select an internal page to link to.',
                  type: 'reference',
                  to: [{ type: 'page' }],
                  options: {
                    disableNew: true,
                    filter: 'defined(slug.current)',
                  },
                  hidden: ({ parent }) => parent?.type !== 'internal',
                  validation: (Rule) =>
                    Rule.custom((value, { parent }) => {
                      const type = (parent as { type?: string })?.type;
                      if (type === 'internal' && !value?._ref)
                        return 'You have to choose internal page to link to.';
                      return true;
                    }),
                }),
              ],
            }),
          ],
        },
      },
    ],
  });

export default PortableText({});
