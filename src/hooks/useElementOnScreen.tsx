import { useEffect, useState } from "react";

const useElementOnScreen = (ref: React.RefObject<HTMLElement>, rootMargin = "0px") => {
    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => setIntersecting(entry.isIntersecting),
            { rootMargin }
        );

        observer.observe(ref.current);

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, [ref, rootMargin]);

    return isIntersecting;
};

export default useElementOnScreen;
