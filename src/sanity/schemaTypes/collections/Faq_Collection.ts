import { defineField, defineType } from 'sanity';
import { toPlainText } from '@/sanity/utils/to-plain-text';
import { LinkIcon } from '@sanity/icons';
import { isValidUrl } from '@/sanity/utils/is-valid-url';

const title = 'FAQ items Collection';
const icon = () => '❓';

export default defineType({
  name: 'Faq_Collection',
  type: 'document',
  title,
  icon,
  fields: [
    defineField({
      name: 'question',
      type: 'Heading',
      title: 'Pytanie',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      type: 'array',
      title: 'Odpowiedź',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
          marks: {
            annotations: [
              defineField({
                name: 'link',
                title: 'Link',
                type: 'object',
                icon: LinkIcon,
                fields: [
                  defineField({
                    name: 'type',
                    title: 'Link Type',
                    type: 'string',
                    description: 'Choose the type of link',
                    options: {
                      list: ['internal', 'external'],
                      layout: 'radio',
                      direction: 'horizontal',
                    },
                    initialValue: 'external',
                  }),
                  defineField({
                    name: 'external',
                    title: 'URL',
                    type: 'string',
                    description:
                      'The URL of the link. Ensure it starts with "https://", "mailto:" or "tel:" protocol',
                    hidden: ({ parent }) => parent?.type !== 'external',
                    validation: (Rule) => [
                      Rule.custom((value, { parent }) => {
                        const type = (parent as { type?: string })?.type;
                        if (type === 'external') {
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
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'answer',
    },
    prepare: ({ title, subtitle }) => ({
      title: toPlainText(title),
      subtitle: toPlainText(subtitle),
      icon,
    }),
  },
});
