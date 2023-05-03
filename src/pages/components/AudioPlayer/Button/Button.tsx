import './Button.scss';

type Props = {
   play: () => void;
   isPlaying: boolean;
};

export const Button = ({ play, isPlaying }: Props) => {
   return (
      <div className='btnContainer'>
         <div className={isPlaying ? 'btnStop' : 'btnPlay'} onClick={play}></div>
      </div>
   );
};
