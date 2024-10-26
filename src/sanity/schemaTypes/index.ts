import { type SchemaTypeDefinition } from 'sanity';

import Page_Collection from '@sanity/schemaTypes/collections/Page_Collection';
import Faq_Collection from '@sanity/schemaTypes/collections/Faq_Collection';
import global from '@sanity/schemaTypes/singleTypes/global';
import Components from '@sanity/schemaTypes/Components';
import portableText from '@sanity/schemaTypes/ui/portable-text';
import seo from '@sanity/schemaTypes/ui/seo';
import sectionId from '@sanity/schemaTypes/ui/sectionId';
import Heading from '@sanity/schemaTypes/ui/portable-text/Heading';

const collectionTypes: SchemaTypeDefinition[] = [
  Page_Collection,
  Faq_Collection,
];
const singleTypes: SchemaTypeDefinition[] = [global];
const components: SchemaTypeDefinition[] = [Components];
const ui: SchemaTypeDefinition[] = [
  seo as unknown as SchemaTypeDefinition,
  Heading,
];

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [...collectionTypes, ...singleTypes, ...components, ...ui],
};
