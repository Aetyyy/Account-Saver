const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-slate-800 min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-900/50 rounded-lg shadow-xl">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
