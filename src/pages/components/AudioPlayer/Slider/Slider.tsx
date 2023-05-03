import { useState, useRef, useEffect } from 'react';

import './Slider.scss';

type Props = {
   onChange: (e: any) => void;
   percentage: number;
};

export const Slider = ({ onChange, percentage = 0 }: Props) => {
   const [position, setPosition] = useState<number>(0);
   const [marginLeft, setMarginLeft] = useState<number>(0);
   const [progressBarWidth, setProgressBarWidth] = useState<number>(0);

   const rangeRef = useRef<HTMLInputElement>(null);
   const thumbRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      if (rangeRef.current && thumbRef.current) {
         const rangeWidth = rangeRef.current.getBoundingClientRect().width;
         const thumbWidth = thumbRef.current.getBoundingClientRect().width;
         const centerThumb = (thumbWidth / 100) * percentage * -1;
         const centerProgressBar = thumbWidth + (rangeWidth / 100) * percentage - (thumbWidth / 100) * percentage;

         setPosition(percentage);
         setMarginLeft(centerThumb);
         setProgressBarWidth(centerProgressBar);
      }
   }, [percentage]);

   return (
      <div className='sliderContainer'>
         <div className='progressBarCover' style={{ width: `${progressBarWidth}px` }}></div>
         <div className='thumb' ref={thumbRef} style={{ left: `${position}%`, marginLeft: `${marginLeft}px` }}></div>
         <input type='range' className='range' value={position} ref={rangeRef} step={0.01} onChange={onChange} />
      </div>
   );
};
