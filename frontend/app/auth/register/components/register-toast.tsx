
interface RegisterToastProps {
    data: {
        message: string;
        submessage: string;
    }
}

export default function RegisterToast({ data }: RegisterToastProps) {
    return (
        <div>
            <p className="text-md">{data.message}</p>
            <p className="text-sm">{data.submessage}</p>
        </div>
    )
}