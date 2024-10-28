import { PortableTextValue } from '@components/global/Faq';
import { PortableText } from 'next-sanity';

export const Accordion: React.FC<{
  question: PortableTextValue;
  answer: PortableTextValue;
  idx: number;
  isVisible?: boolean;
}> = ({ question, answer, idx, isVisible }) => {
  return (
    <div className={`w-full ${!isVisible ? '' : 'hidden'}`}>
      <details className='group peer flex cursor-pointer justify-between'>
        <summary className='flex cursor-pointer justify-between px-0 pt-2 pb-3 lg:pt-5 lg:pb-6'>
          <div className='place-items-start justify-items-start gap-[clamp(1rem,4.1666666667vw,2rem)] grid grid-cols-12 w-full'>
            <span className='col-span-1 text-neutral-400 text-center leading-7 tracking-wider self-start justify-self-center'>
              {idx < 9 ? `0${idx + 1}` : `${idx + 1}`}
            </span>
            <h2 className='col-span-10 text-base text-neutral-200 leading-7 tracking-wider self-start max-w-[44rem] prose'>
              <PortableText value={question} />
            </h2>

            <div className='mt-1 col-span-1 size-5 self-start justify-self-center flex items-center justify-center rounded-full border border-[#2DD282]'>
              <span className='w-2 h-[1px] bg-gradient-primary rounded transition-all duration-500 ease-easing' />
              <span className='absolute w-2 h-[1px] bg-gradient-primary rounded transition-all duration-500 ease-easing rotate-90 ' />
            </div>
          </div>
        </summary>
      </details>
      <div className='relative grid grid-cols-12 grid-rows-[0fr] transition-all duration-700 ease-easing after:absolute after:-bottom-[1px] after:left-0 after:h-[1px] after:w-0 after:bg-gradient-primary after:transition-all after:duration-500 peer-open:grid-rows-[1fr] peer-open:after:w-full border-b border-neutral-400 gap-3 peer-open:pb-6'>
        <div className='overflow-hidden col-span-11 col-start-2 col-end-12 leading-7 tracking-widest text-sm text-neutral-200 max-w-[36rem] prose'>
          <PortableText value={answer} />
        </div>
      </div>
    </div>
  );
};
