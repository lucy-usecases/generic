import React from "react";
import './videobg.scss';

interface VideoBgProps  {
    loop?: boolean,
    muted?: boolean,
    poster?: string,
    autoPlay?: boolean,
    onEnded?: ()=>void,
    onPlay?: ()=>void,
    onPlaying?: ()=>void,
};
export const VideoBg:React.FunctionComponent<VideoBgProps> = ({
  
  loop = true,
  muted = true,
  autoPlay = true,
  onEnded,
  poster,
  children,
  onPlaying,
  onPlay,

}) => {
  return (
    <div
      className={'videobg-wrapper'}
    >
      <video
        className={'videobg-video'}
        loop={loop}
        muted={muted}
        poster={poster}
        autoPlay={autoPlay}
        onEnded={onEnded ||( ()=>{}) }
        onPlaying={onPlaying || (()=>{}) }
        onPlay={onPlay || (() => {})}
      >
        {children}
      </video>
    </div>
  );
};


interface VideoBgSourceProps {
    src: string;
    type: string;
}
export const Source:React.FunctionComponent<VideoBgSourceProps> = ({ src, type }) => <source src={src} type={type} />;