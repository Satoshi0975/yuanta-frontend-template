export const FixedBg = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-sts-blue-100 sticky top-0 -mb-[100vh] h-screen w-screen overflow-hidden">
    {children}
  </div>
);
