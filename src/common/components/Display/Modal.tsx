import { AiOutlineClose } from 'react-icons/ai';
import Button from "../Inputs/Button";
export interface ModalProps {
    children?: React.ReactNode
    cardClass?: string,
    rootClass?: string
    isOpen?: boolean
    onClose?: () => void
}

const Modal: React.FC<ModalProps> = (props) => {
    const { children, cardClass, rootClass, isOpen, onClose } = props;

    return isOpen && <div className={`h-screen w-screen z-50 fixed top-0 left-0 flex  items-center justify-center transition-all bg-opacity-[0.1] backdrop-blur-md bg-yellow-500 ${rootClass}`}>
        <div className={`relative  bg-white h-auto p-[1rem] rounded-lg shadow-lg ${cardClass}`} data-aos="fade-up">
            <Button buttonAttributes={{ onClick: () => onClose?.() }} btnType='link' className='absolute right-0 top-2 z-50'>
                <AiOutlineClose size={20} />
            </Button>
            <div className='z-40'>
                {children}
            </div>
        </div>
    </div>;
};

export default Modal;
