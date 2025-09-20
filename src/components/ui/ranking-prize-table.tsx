const RankingPrizeTable = () => {
  return (
    <div className="rounded-lg bg-black text-center text-2xl shadow-lg nes-corners">
      <div className="grid h-full grid-cols-2 gap-1">
        <div className="flex items-center justify-center bg-green-600 p-3 font-semibold text-white">
          人氣王
        </div>
        <div className="flex items-center justify-center bg-green-400 p-3 font-semibold text-white">
          獎金
        </div>

        <div className="flex items-center justify-center bg-white p-3">
          第一名
        </div>
        <div className="flex items-center justify-center bg-white p-3">
          100,000
        </div>

        <div className="flex items-center justify-center bg-white p-3">
          第二名
        </div>
        <div className="flex items-center justify-center bg-white p-3">
          90,000
        </div>

        <div className="flex items-center justify-center bg-white p-3">
          第三名
        </div>
        <div className="flex items-center justify-center bg-white p-3">
          80,000
        </div>
      </div>
    </div>
  );
};

export { RankingPrizeTable };