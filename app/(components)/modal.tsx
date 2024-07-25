import Button from "./button";

interface ModalProps {
    visible: boolean;
    title: string;
    close: () => void;
    children?: React.ReactNode
}

export default function Modal({ visible, title, close, children } : ModalProps) {
    return <>
        {visible && <div id="authentication-modal" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex bg-glass justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative p-4 w-full max-w-md max-h-full flex justify-center items-center">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 flex flex-col grow">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 grow">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {title}
                        </h3>
                        <Button 
                            onClick={close}
                            typeStyle="alternative"
                        >
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                        </Button>
                    </div>
                    <div className="p-4 md:p-5">
                        {children}
                    </div>
                </div>
            </div>
        </div> }
    </>
    
}