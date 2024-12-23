import { CheckCircledIcon } from "@radix-ui/react-icons";

interface FormSuccessProps {
    message?: string;
}

const FormSuccess = ({ message }: FormSuccessProps) => {
    return (
        <>        {message && <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500" >
            <CheckCircledIcon />
            <p>
                {message}
            </p>
        </div>}
        </>

    )
        
}

export default FormSuccess