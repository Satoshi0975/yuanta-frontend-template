export const FixedBg = ({ children }: { children: React.ReactNode }) => (
  <div className="sticky top-0 z-0 h-screen w-screen overflow-hidden bg-sts-blue-100">
    {children}
  </div>
);
