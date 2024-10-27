import { groq } from 'next-sanity';
import { Faq, FAQProps } from '@components/global/Faq';

type SanityComponentsName = ['Faq'];

export const SECTION_COMPONENTS: Record<
  SanityComponentsName[number],
  React.ComponentType<any>
> = {
  Faq: (props: FAQProps) => <Faq data={props} />,
};
