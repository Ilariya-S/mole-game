import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    showMole,
    hideMole,
    registerTimeoutMiss,
} from '../store/gameSlice';

const useGameLoop = () => {
    const dispatch = useDispatch();
    const { gameStatus, timeLeft, activeMole, feedbackStatus } = useSelector((state) => state.game);
    
    const moleTimerRef = useRef(null);
    const loopTimerRef = useRef(null);

       useEffect(() => {
        if (gameStatus !== 'PLAYING') {
            clearTimeout(moleTimerRef.current);
            clearTimeout(loopTimerRef.current);
            return;
        }

        // SCENARIO 1: The mole is already on the field, waiting for a timeout (if the player did not make it in time).
        if (activeMole !== null && feedbackStatus === null) {
            moleTimerRef.current = setTimeout(() => {
                dispatch(registerTimeoutMiss());
                dispatch(hideMole());
            }, timeLeft);
        }

        // SCENARIO 2: The mole is not there (or has just hidden/been clicked), prepare the next one
        if (activeMole === null) {
            loopTimerRef.current = setTimeout(() => {
                dispatch(showMole());
            }, 200); 
        }

        return () => {
            clearTimeout(moleTimerRef.current);
            clearTimeout(loopTimerRef.current);
        };
    }, [gameStatus, activeMole, feedbackStatus, timeLeft, dispatch]);
};

export default useGameLoop;