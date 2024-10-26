import { defineType } from 'sanity';
import Faq from '@sanity/schemaTypes/components/Faq';

export default defineType({
  name: 'components',
  type: 'array',
  title: 'Components',
  of: [Faq],
  options: {
    insertMenu: {
      filter: true,
      showIcons: true,
      views: [
        {
          name: 'grid',
          previewImageUrl: (schemaTypeName) => `/static/${schemaTypeName}.webp`,
        },
        { name: 'list' },
      ],
    },
  },
});
