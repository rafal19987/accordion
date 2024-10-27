'use client';

import { useState } from 'react';
import { groq, PortableText, PortableTextProps } from 'next-sanity';
import { PortableTextQuery } from '@components/ui/portableText';
import { Accordion } from '@components/ui/Accordion';
import { Button } from '@components/ui/Button';
import { DownArrowIcon } from '@components/ui/DownArrowIcon';
import { type SanityComponent } from '@/app/(site)/types';

export type PortableTextValue = PortableTextProps['value'];

export const FaqQuary = groq`
_type == "Faq" => {
  ${PortableTextQuery('heading')}
  list[] -> {
    ${PortableTextQuery('question')}
    ${PortableTextQuery('answer')}
  }
}`;

export interface FAQProps extends SanityComponent {
  heading: PortableTextValue;
  list: {
    question: PortableTextValue;
    answer: PortableTextValue;
  }[];
}

export const Faq: React.FC<{ data: FAQProps }> = ({ data }) => {
  const [visibleQuestions, setVisibleQuestions] = useState(10);

  const loadMoreQuestions = () => {
    setVisibleQuestions((prev) => Math.min(prev + 10, data.list.length));
  };

  return (
    <section className='container py-10 flex flex-col gap-6 md:gap-12 lg:gap-8 prose-h1:text-2xl prose-strong:font-normal prose-a:no-underline prose-a:text-primary-600'>
      <h1 className='prose'>
        <PortableText value={data.heading} />
      </h1>

      <div className='flex items-center justify-center flex-col gap-2'>
        {data.list
          .slice(0, visibleQuestions)
          .map(({ question, answer }, idx) => (
            <Accordion
              key={idx}
              question={question}
              answer={answer}
              idx={idx}
            />
          ))}
        {visibleQuestions < data.list.length && (
          <div className='flex flex-col max-w-fit w-full items-center gap-[6px] mt-24'>
            <div className='relative w-full h-[1px] bg-primary-600 transition-all duration-300'>
              <div
                className='h-full bg-gradient-primary'
                style={{
                  width: `${(visibleQuestions / data.list.length) * 100}%`,
                }}
              >
                <ProgressTooltip
                  totalQuestions={data.list.length}
                  visibleQuestions={visibleQuestions}
                />
              </div>
            </div>
            <Button
              callback={loadMoreQuestions}
              label='Pokaż więcej'
              aria-label='Wczytaj więcej pytań z odpowiedziami'
            >
              <DownArrowIcon animated />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

const ProgressTooltip: React.FC<{
  visibleQuestions: number;
  totalQuestions: number;
}> = ({ visibleQuestions, totalQuestions }) => {
  return (
    <div
      className='absolute bottom-[0.6rem] bg-primary-600 rounded-full py-[0.24rem] px-[0.38rem] w-12 text-xs text-neutral-200 text-center transform -translate-x-1/2 transition-all duration-300 after:absolute after:mx-auto after:left-0 after:right-0 after:-bottom-[3px] after:size-[6px] after:rotate-45 after:bg-primary-600'
      style={{
        left: `${(visibleQuestions / totalQuestions) * 100}%`,
      }}
    >
      {visibleQuestions}/{totalQuestions}
    </div>
  );
};
