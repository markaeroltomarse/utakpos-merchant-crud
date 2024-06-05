import Loading from "./Loading";

export interface CardProps {
    children?: React.ReactNode
    className?: string
    isLoading?: boolean
    loadingElement?: React.ReactNode
}

const Card: React.FC<CardProps> = (props) => {
    const { className, children, isLoading, loadingElement } = props;

    const renderLoading = () => {
        if (!isLoading) return <></>

        if (loadingElement) {
            return loadingElement
        }

        return <div className="absolute w-full h-full flex items-center justify-center">
            <Loading size={50} />
        </div>
    }
    return <div tabIndex={1} className={`${className} ${isLoading && 'overflow-hidden'}`}>
        {renderLoading()}
        <div className={`${isLoading && 'opacity-50'}`}>
            {children}
        </div>
    </div>;
};

export default Card;
