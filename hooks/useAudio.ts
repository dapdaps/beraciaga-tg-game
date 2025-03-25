import { useAudioStore } from '@/stores/useAudioStore';
import { useEffect, useRef, useState } from 'react';

interface UseAudioProps {
  src: string;              // 音频文件路径
  volume?: number;          // 音量 (0-1)
  preload?: boolean;        // 是否预加载
}

export const useAudio = ({ src, volume = 1, preload = true }: UseAudioProps) => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const store = useAudioStore()
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();

    if (preload) {
      loadAudio();
    }

    return () => {
      if (audioContextRef.current?.state !== 'closed') {
        audioContextRef.current?.close();
      }
    };
  }, [src, preload]);


  const loadAudio = async () => {
    if (!audioContextRef.current || isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(src);

      const arrayBuffer = await response.arrayBuffer();

      const buffer = await audioContextRef.current.decodeAudioData(arrayBuffer);

      console.log('Audio loaded >>>>>: ', buffer);

      setAudioBuffer(buffer);
    } catch (err) {

      console.error('Failed to load audio', err);

      setError(err instanceof Error ? err : new Error('Failed to load audio'));
    } finally {
      setIsLoading(false);
    }
  };


  const play = async () => {

    if (!audioContextRef.current) return;

    if (!audioBuffer && !isLoading) {
      await loadAudio();
    }

    if (!audioBuffer) return;

    const source = audioContextRef.current.createBufferSource();
    const gainNode = audioContextRef.current.createGain();
    
    source.buffer = audioBuffer;
    gainNode.gain.value = volume;

    source.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);

    source.start();
  };

  return {
    play,
    isLoading,
    error,
    loadAudio
  };
};