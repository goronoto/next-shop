export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-[90vh] items-center justify-center">
            <div className="w-full max-w-md rounded-lg border p-6 shadow-md">
                {children}
            </div>
        </div>
    );
}
