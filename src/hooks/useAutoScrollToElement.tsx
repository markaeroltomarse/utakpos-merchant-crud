import { useCallback } from 'react';

const useAutoScrollToElement = (id: string) => {
    const scrollToById = useCallback(() => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [id])

    return { scrollToById }
};

export default useAutoScrollToElement;
