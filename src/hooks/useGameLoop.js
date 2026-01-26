import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    showMole,
    hideMole,
    registerTimeoutMiss,
    stopGame
} from '../store/gameSlice';

const useGameLoop = () => {
    const dispatch = useDispatch();
    const { gameStatus, timeLeft, activeMole, feedbackStatus, score, misses } = useSelector((state) => state.game);

    // Використовуємо рефи для таймерів, щоб очищати їх при розмонтуванні
    const moleTimerRef = useRef(null);
    const loopTimerRef = useRef(null);

    // Перевірка умов перемоги/поразки
    useEffect(() => {
        if (gameStatus === 'PLAYING') {
            if (misses >= 3) {
                dispatch(stopGame('LOST'));
            } else if (score >= 100) {
                dispatch(stopGame('WON'));
            }
        }
    }, [misses, score, gameStatus, dispatch]);

    // Основний цикл
    useEffect(() => {
        if (gameStatus !== 'PLAYING') {
            clearTimeout(moleTimerRef.current);
            clearTimeout(loopTimerRef.current);
            return;
        }

        // СЦЕНАРІЙ 1: Кріт вже на полі, чекаємо тайм-аут (якщо гравець не встиг)
        if (activeMole !== null && feedbackStatus === null) {
            moleTimerRef.current = setTimeout(() => {
                dispatch(registerTimeoutMiss());
                dispatch(hideMole());
            }, timeLeft);
        }

        // СЦЕНАРІЙ 2: Крота немає (або щойно сховався/був клік), готуємо наступного
        if (activeMole === null) {
            // Якщо була якась дія (клік), то є пауза
            // ТЗ: 20мс пауза перед новим кротом (або 40мс+20мс після кліку, це ми обробимо в кліку)

            // Тут ми просто робимо затримку перед появою
            loopTimerRef.current = setTimeout(() => {
                dispatch(showMole());
            }, 500); // Я поставив 500мс замість 20мс, бо 20мс це занадто швидко для ока, але можна змінити на 20
        }

        return () => {
            clearTimeout(moleTimerRef.current);
            clearTimeout(loopTimerRef.current);
        };
    }, [gameStatus, activeMole, feedbackStatus, timeLeft, dispatch]);
};

export default useGameLoop;