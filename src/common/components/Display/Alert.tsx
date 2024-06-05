import { useCallback, useEffect, useMemo, useState } from 'react';

export interface AlertProps {
    type: 'success' | 'error' | 'warning' | 'info' | 'confirmation';
    message: string;
    onClose?: () => void;
    onConfirm?: () => void;
    onCancel?: () => void;
    duration?: number;
}

const useAlert = () => {
    const [alertInfo, setAlertInfo] = useState<AlertProps | null>(null);

    const executeAlert = (alertProps: AlertProps) => {
        setAlertInfo(alertProps);
        if (alertProps.duration && alertProps.type !== 'confirmation') {
            const timer = setTimeout(() => {
                alertProps.onClose?.();
                setAlertInfo(null);
            }, alertProps.duration);

            // Cleanup the timer on component unmount
            return () => clearTimeout(timer);
        }
    };

    const handleClose = useCallback(() => {
        alertInfo?.onClose?.();
        setAlertInfo(null);
    }, [alertInfo]);

    const handleConfirm = useCallback(() => {
        alertInfo?.onConfirm?.();
        setAlertInfo(null);
    }, [alertInfo]);

    const handleCancel = useCallback(() => {
        alertInfo?.onCancel?.();
        setAlertInfo(null);
    }, [alertInfo]);

    const renderNotification = useMemo(() => {
        if (!alertInfo?.message) return null;

        const typeClasses = {
            success: 'bg-green-100 border-green-400 text-green-700',
            error: 'bg-red-100 border-red-400 text-red-700',
            warning: 'bg-yellow-100 border-yellow-400 text-yellow-700',
            info: 'bg-blue-100 border-blue-400 text-blue-700',
            confirmation: 'bg-purple-100 border-purple-400 text-purple-700'
        };

        const alertClass = typeClasses[alertInfo.type] || typeClasses.info;

        return (
            <div id='custom-alert' data-aos="fade-down" className={`border flex justify-between items-center px-4 py-3 rounded mb-4 ${alertClass}`}>
                <span>{alertInfo.message}</span>
                {alertInfo.type === 'confirmation' ? (
                    <div className="flex gap-2">
                        <button
                            className="ml-2 px-2 py-1 bg-green-200 text-green-700 rounded hover:bg-green-300"
                            onClick={handleConfirm}
                        >
                            Confirm
                        </button>
                        <button
                            className="ml-2 px-2 py-1 bg-red-200 text-red-700 rounded hover:bg-red-300"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </div>
                ) : (
                    <button
                        className="ml-2 text-current hover:text-opacity-80"
                        onClick={handleClose}
                    >
                        &times;
                    </button>
                )}
            </div>
        );
    }, [alertInfo, handleClose, handleConfirm, handleCancel]);

    useEffect(() => {
        return () => {
            if (alertInfo?.duration && alertInfo.type !== 'confirmation') {
                clearTimeout(alertInfo.duration);
            }
        };
    }, [alertInfo]);

    return { renderNotification, executeAlert };
};

export default useAlert;
