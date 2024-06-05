import AOS from "aos";
import "aos/dist/aos.css";
import { ReactElement, ReactNode, useEffect } from "react";

export interface AppLayoutProps {
    children: React.ReactElement;
    getLayout: (_page: ReactElement) => ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = (props) => {
    const { children, getLayout } = props;

    useEffect(() => {
        AOS.init({
            easing: 'ease-in-cubic'
        });
    }, []);

    return (
        <div>
            {getLayout(children)}
        </div>
    );
};

export default AppLayout