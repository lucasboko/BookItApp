import { useEffect, useRef, MouseEvent } from 'react'

export const useClickOutside = (callback: () => void) => {

    const ref = useRef(null);

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if ((ref.current && typeof ref.current === 'object') && !ref.current.contains(event.target)) {
                callback();
            }
        };

        document.addEventListener('click', handleClick, true);

        return () => {
            document.removeEventListener('click', handleClick, true);
        };
    }, [ref]);

    return ref;
};