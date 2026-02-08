import clsx from 'clsx';

export const Layout = ({ children, className }) => {
    return (
        <div className="relative h-[100dvh] w-full bg-black text-white overflow-hidden font-sans">
            {/* Animated Background Blobs - Subtler */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-10">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-900/40 rounded-full blur-[100px] animate-blob"></div>
                <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-purple-900/30 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] bg-blue-900/30 rounded-full blur-[100px] animate-blob animation-delay-4000"></div>
            </div>

            {/* Content Container */}
            <div className={clsx("relative z-10 h-full flex flex-col", className)}>
                {children}
            </div>
        </div>
    );
};
