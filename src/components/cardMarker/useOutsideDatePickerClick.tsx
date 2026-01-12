import { useAdvancedMarkerRef } from '@vis.gl/react-google-maps';
import { useEffect, useRef, MouseEvent } from 'react'

export const useOutsideDatePickerClick = (callback: () => void) => {
    const [markerRef, marker] = useAdvancedMarkerRef();
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
    }, [markerRef]);

    return markerRef;
};