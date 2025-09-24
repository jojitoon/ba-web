'use client';

import { MuxPlayer } from '@mux/mux-player-react';
import { Play, Volume2, Maximize, Settings } from 'lucide-react';

interface MuxVideoPlayerProps {
  playbackId: string;
  title?: string;
  poster?: string;
  autoplay?: boolean;
  muted?: boolean;
  controls?: boolean;
  className?: string;
}

export default function MuxVideoPlayer({
  playbackId,
  title,
  poster,
  autoplay = false,
  muted = false,
  controls = true,
  className = '',
}: MuxVideoPlayerProps) {
  return (
    <div className={`relative ${className}`}>
      <MuxPlayer
        playbackId={playbackId}
        title={title}
        poster={poster}
        autoplay={autoplay}
        muted={muted}
        controls={controls}
        className='w-full h-full'
        style={
          {
            '--controls-backdrop-color': 'rgba(0, 0, 0, 0.7)',
            '--controls-backdrop-blur': '8px',
            '--primary-color': 'var(--primary)',
            '--secondary-color': 'var(--accent)',
          } as React.CSSProperties
        }
        streamType='on-demand'
        metadata={{
          video_title: title,
          viewer_user_id: 'anonymous',
        }}
      />
    </div>
  );
}

// Custom video player with enhanced controls
export function EnhancedMuxVideoPlayer({
  playbackId,
  title,
  poster,
  autoplay = false,
  muted = false,
  className = '',
}: Omit<MuxVideoPlayerProps, 'controls'>) {
  return (
    <div className={`relative group ${className}`}>
      <MuxPlayer
        playbackId={playbackId}
        title={title}
        poster={poster}
        autoplay={autoplay}
        muted={muted}
        controls={false}
        className='w-full h-full'
        style={
          {
            '--primary-color': 'var(--primary)',
            '--secondary-color': 'var(--accent)',
          } as React.CSSProperties
        }
        streamType='on-demand'
        metadata={{
          video_title: title,
          viewer_user_id: 'anonymous',
        }}
      />

      {/* Custom overlay controls */}
      <div className='absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
        <div className='absolute bottom-4 left-4 right-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-3'>
              <button className='p-2 bg-background/80 rounded-full hover:bg-background transition-colors'>
                <Play className='w-5 h-5 text-foreground' />
              </button>
              <div className='flex items-center space-x-2'>
                <button className='p-2 bg-background/80 rounded-full hover:bg-background transition-colors'>
                  <Volume2 className='w-5 h-5 text-foreground' />
                </button>
                <div className='w-20 h-1 bg-background/50 rounded-full'>
                  <div className='w-3/4 h-full bg-primary rounded-full'></div>
                </div>
              </div>
            </div>
            <div className='flex items-center space-x-2'>
              <button className='p-2 bg-background/80 rounded-full hover:bg-background transition-colors'>
                <Settings className='w-5 h-5 text-foreground' />
              </button>
              <button className='p-2 bg-background/80 rounded-full hover:bg-background transition-colors'>
                <Maximize className='w-5 h-5 text-foreground' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
