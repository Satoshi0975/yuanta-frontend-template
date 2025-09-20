export const FixedBg = ({ children }: { children: React.ReactNode }) => (
  <div className="sticky top-0 -mb-[100vh] h-screen w-screen overflow-hidden bg-yuanta-bg">
    {children}
  </div>
);
