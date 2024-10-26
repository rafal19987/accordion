import { defineField, defineType } from 'sanity';
import { toPlainText } from '@/sanity/utils/to-plain-text';

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
      type: 'string',
      title: 'Pytanie',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      type: 'string',
      title: 'Odpowiedź',
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
