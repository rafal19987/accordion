'use client';

import { useState } from 'react';
import { groq, PortableText, PortableTextProps } from 'next-sanity';
import { PortableTextQuery } from '@components/ui/portableText';

export type PortableTextValue = PortableTextProps['value'];

export const FaqQuary = groq`
_type == "Faq" => {
  ${PortableTextQuery('heading')}
  list[] -> {
    question,
    answer
  }
}`;

export interface SanityComponent {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name: string;
  description: string;
}

export interface FAQProps extends SanityComponent {
  heading: PortableTextValue;
  list: {
    question: string;
    answer: string;
  }[];
}

export const Faq: React.FC<{ data: FAQProps }> = ({ data }) => {
  const [visibleQuestions, setVisibleQuestions] = useState(10);

  const loadMoreQuestions = () => {
    setVisibleQuestions((prev) => Math.min(prev + 10, data.list.length));
  };

  return (
    <section className='container py-10'>
      <div className='text-2xl'>
        <PortableText value={data.heading} />
      </div>

      <div className='flex items-center justify-center flex-col'>
        {data.list
          .slice(0, visibleQuestions)
          .map(({ question, answer }, idx) => (
            <div key={question + idx} className='w-full'>
              <details className='group peer flex cursor-pointer justify-between data-[state=closed]:animate-none data-[state=open]:animate-ping'>
                <summary className='flex cursor-pointer justify-between px-0 pt-2 pb-3 lg:pt-5 lg:pb-5'>
                  <div className='items-center justify-center gap-3 lg:gap-8 grid grid-cols-12 w-full'>
                    <span className='col-span-1 text-neutral-400'>
                      {idx < 9 ? `0${idx + 1}` : `${idx + 1}`}
                    </span>
                    <h2 className='col-span-11 text-body-1 text-base text-neutral-200'>
                      {question}
                    </h2>
                    <div className=''></div>
                  </div>
                </summary>
              </details>
              <div className='relative grid grid-cols-12 grid-rows-[0fr] transition-[grid-template-rows] duration-300 after:absolute after:-bottom-[1px] after:left-0 after:h-[1px] after:w-0 after:bg-gradient-primary after:transition-all after:duration-500 peer-open:grid-rows-[1fr] peer-open:after:w-full border-b border-neutral-400 gap-3'>
                <div className='overflow-hidden col-span-11 col-start-2 col-end-12 text-sm text-neutral-200'>
                  {answer}
                </div>
              </div>
            </div>
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
                <div
                  className='absolute bottom-[0.6rem] bg-primary-600 rounded-full py-[0.24rem] px-[0.38rem] w-12 text-xs text-neutral-200 text-center transform -translate-x-1/2 transition-all duration-300 after:absolute after:mx-auto after:left-0 after:right-0 after:-bottom-[3px] after:size-[6px] after:rotate-45 after:bg-primary-600'
                  style={{
                    left: `${(visibleQuestions / data.list.length) * 100}%`,
                  }}
                >
                  {visibleQuestions}/{data.list.length}
                </div>
              </div>
            </div>
            <button
              onClick={loadMoreQuestions}
              className='flex gap-3 items-center justify-center mt-4 px-4 py-2 bg-blue-500 text-neutral-200 rounded hover:bg-primary-600 transition-colors duration-300'
              aria-label='Pokaż więcej pytań z odpowiedziami'
            >
              <span>Pokaż więcej</span>
              <svg
                className='animate-floating'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='17'
                fill='none'
              >
                <path
                  stroke='url(#faq-load)'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M8 3.152V13.82m0 0 4-4m-4 4-4-4'
                />
                <defs>
                  <linearGradient
                    id='faq-load'
                    x1='11.85'
                    x2='3.509'
                    y1='3.152'
                    y2='3.551'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#2DD282' />
                    <stop offset='1' stopColor='#90F4E8' />
                  </linearGradient>
                </defs>
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
