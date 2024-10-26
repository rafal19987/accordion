import { defineField, defineType } from 'sanity';

const title = 'Pages Collection';
const icon = () => '📚';

export default defineType({
  name: 'page',
  title,
  type: 'document',
  icon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'components',
      title: 'Components',
      type: 'components',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    prepare({ title, slug }) {
      return {
        title: title,
        subtitle: slug === '/' ? '/' : `/${slug}`,
      };
    },
  },
});
