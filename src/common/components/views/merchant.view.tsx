import MerchantNavbar from "../MerchantNavbar";

export interface MerchantViewProps {
    children: React.ReactNode;
}

const MerchantView: React.FC<MerchantViewProps> = (props) => {
    const { children } = props;

    return <div className="md:px-[15%] py-[10rem]">
        <div className="container" >
            <MerchantNavbar />
            {children}
        </div>

    </div>
};

export default MerchantView;
