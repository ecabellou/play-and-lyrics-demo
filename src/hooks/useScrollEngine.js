import { useEffect, useRef, useState } from 'react';
import { ScrollRecorder, ScrollPlayer } from '../lib/scroll';

export const useScrollEngine = (refContainer, song, onUpdate) => {
    const [status, setStatus] = useState('IDLE'); // IDLE, RECORDING, PLAYING
    const recorder = useRef(new ScrollRecorder());
    const player = useRef(new ScrollPlayer(null));

    useEffect(() => {
        if (refContainer.current) {
            player.current = new ScrollPlayer(refContainer.current);
        }
    }, [refContainer]);

    // Load checkpoints when song changes
    useEffect(() => {
        if (song?.scrollData && player.current) {
            player.current.load(song.scrollData);
        }
    }, [song]);

    const toggleRecord = () => {
        if (status === 'RECORDING') {
            const checkpoints = recorder.current.stop();
            setStatus('IDLE');
            if (onUpdate) {
                onUpdate({ ...song, scrollData: checkpoints });
            }
        } else {
            setStatus('RECORDING');
            recorder.current.start();
        }
    };

    const togglePlay = () => {
        if (status === 'PLAYING') {
            player.current.pause();
            setStatus('IDLE');
        } else {
            setStatus('PLAYING');
            player.current.play(() => setStatus('IDLE'));
        }
    };

    const handleScroll = (e) => {
        if (status === 'RECORDING') {
            recorder.current.recordCheckpoint(e.target.scrollTop);
        }
    };

    return { status, toggleRecord, togglePlay, handleScroll };
};
