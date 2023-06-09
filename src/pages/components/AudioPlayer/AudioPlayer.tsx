import React, { useEffect, useRef, useState } from 'react';
// import song from './GnarlsBarkley-Crazy.mp3';
import { ControlPanel } from './ContolPanel/ControlPanel';
import { Slider } from './Slider/Slider';

import './AudioPlayer.scss';

type Props = {
   audioFile: string;
   closeModal: boolean;
   playing: boolean;
   setPlaying: (value: boolean) => void;
};

export const AudioPlayer = ({
   audioFile,
   closeModal,
   playing,
   setPlaying,
}: Props) => {
   const [currentTime, setCurrentTime] = useState<number>(0);
   const [duration, setDuration] = useState<number>(0);
   const [percentage, setPercentage] = useState<number>(0);

   const audioRef = useRef<HTMLAudioElement>(null);

   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const audio = audioRef.current;

      if (audio) {
         audio.currentTime = (audio.duration / 100) * Number(e.target.value);
         setPercentage(Number(e.target.value));
      }
   };

   const play = () => {
      setPlaying(!playing);
   };

   const getCurrentDuration = (e: React.SyntheticEvent<HTMLAudioElement>) => {
      const audio = e.currentTarget;

      if (audio) {
         const percent = (audio.currentTime / audio.duration) * 100;
         const time = audio.currentTime;

         setPercentage(percent);
         setCurrentTime(time);
      }
   };

   const handleAudioEnded = () => {
      setPlaying(false);
   };

   useEffect(() => {
      if (audioRef.current) {
         const audio = audioRef.current;

         if (playing) {
            audio.play();
         } else {
            audio.pause();
         }
      }
   }, [playing]);

   useEffect(() => {
      if (closeModal && audioRef.current) {
         audioRef.current.pause();
         audioRef.current.currentTime = 0;
         setPlaying(false);
      }
   }, [closeModal]);

   return (
      <div className='audioPlayerContainer'>
         {audioFile && (
            <>
               <Slider onChange={onChange} percentage={percentage} />
               <audio
                  ref={audioRef}
                  onEnded={handleAudioEnded}
                  onLoadedData={(e) =>
                     setDuration(parseFloat(e.currentTarget.duration.toFixed(2)))
                  }
                  onTimeUpdate={getCurrentDuration}
                  src={audioFile}
               />
               <ControlPanel
                  currentTime={currentTime}
                  duration={duration}
                  isPlaying={playing}
                  play={play}
               />
            </>
         )}
      </div>
   );
};
