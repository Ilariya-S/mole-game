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

    const requestID = useRef();
    const previousTime = useRef();
    const timer = useRef(0);

    const gameStateRef = useRef({ gameStatus, timeLeft, activeMole, feedbackStatus });

    useEffect(() => {
        gameStateRef.current = { gameStatus, timeLeft, activeMole, feedbackStatus };
        timer.current = 0;
    }, [gameStatus, timeLeft, activeMole, feedbackStatus]);

    const loop = time => {
        if (previousTime.current !== undefined) {
            const deltaTime = time - previousTime.current;
            const currentState = gameStateRef.current;

            if (currentState.gameStatus === 'PLAYING') {
                timer.current += deltaTime;
                if (currentState.activeMole !== null && currentState.feedbackStatus === null) {
                    if (timer.current >= currentState.timeLeft) {
                        dispatch(registerTimeoutMiss());
                        dispatch(hideMole());
                        timer.current = 0;
                    }
                }
                else if (currentState.activeMole !== null && currentState.feedbackStatus !== null) {
                    if (timer.current >= 500) {
                        dispatch(hideMole());
                        timer.current = 0;
                    }
                }
                else if (currentState.activeMole === null) {
                    if (timer.current >= 200) {
                        dispatch(showMole());
                        timer.current = 0;
                    }
                }
            }

        };
        previousTime.current = time;
        requestID.current = requestAnimationFrame(loop);
    };
    useEffect(() => {
        requestID.current = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(requestID.current);
    }, []);
};

export default useGameLoop;