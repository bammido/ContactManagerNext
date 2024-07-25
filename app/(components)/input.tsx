interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    typeStyle?: 'alternative'
}

export default function Input({typeStyle, ...rest} : InputProps) {
    let style = ""

    switch (typeStyle) {
        case 'alternative':
            style = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            break;

        default:
            style = "mb-6 h-10 grow p-2 border-black border-2 rounded focus:border-primary outline-none transition-colors"
            break;
    }
    
    return <input
        className={style}
        {...rest}
    />
}