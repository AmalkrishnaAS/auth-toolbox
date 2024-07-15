
import Navbar from "./_components/Navbar";
interface ProtectedLayoutProps {
    children: React.ReactNode;
}

const ProtectedLayout =({children}:ProtectedLayoutProps) => {
    return (
        <div
        className="h-full  flex flex-col gap-y-10 items-center justify-center bg-gradient-to-br from-sky-500 via-teal-500 to-blue-500">
            <Navbar />
            {children}
        </div>
    )
}

export default ProtectedLayout