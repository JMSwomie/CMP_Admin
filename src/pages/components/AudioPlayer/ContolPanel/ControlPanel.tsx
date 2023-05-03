import { Button } from '../Button/Button';

import './ControlPanel.scss';

type Props = {
   currentTime: number;
   duration: number;
   isPlaying: boolean;
   play: () => void;
};

export const ControlPanel = ({ currentTime, duration, isPlaying, play }: Props) => {
   const secondsToTime = (seconds: number) => {
      if (!seconds) {
         return '00:00';
      }

      const hou = Math.floor(seconds / 3600);
      const min = Math.floor((seconds % 3600) / 60);
      const sec = Math.floor(seconds % 60);

      const houT = hou > 0 ? (hou < 10 ? `0${hou}` : `${hou}`) : '';
      const minT = min < 10 ? `0${min}` : `${min}`;
      const secT = sec < 10 ? `0${sec}` : `${sec}`;

      return houT ? `${houT}:${minT}:${secT}` : `${minT}:${secT}`;
   };


   return (
      <div className='controlPanel'>
         <div className='timer'>{secondsToTime(currentTime)}</div>
         <Button play={play} isPlaying={isPlaying} />
         <div className='timer'>{secondsToTime(duration)}</div>
      </div>
   );
};
