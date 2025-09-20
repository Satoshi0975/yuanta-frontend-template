import React from 'react';

interface PrizeItem {
  rank: string;
  prize: string | number;
}

interface PrizeTableProps {
  title: string;
  titleColor?: 'blue' | 'green' | 'orange';
  data: PrizeItem[];
  showThirdColumn?: boolean;
  thirdColumnTitle?: string;
  thirdColumnContent?: React.ReactNode;
  className?: string;
}

export function PrizeTable({
  title,
  titleColor = 'blue',
  data,
  showThirdColumn = false,
  thirdColumnTitle,
  thirdColumnContent,
  className = ''
}: PrizeTableProps) {
  const getColorClasses = () => {
    switch (titleColor) {
      case 'green':
        return {
          header: 'bg-green-600',
          subHeader: 'bg-green-400'
        };
      case 'orange':
        return {
          header: 'bg-orange-600',
          subHeader: 'bg-orange-400'
        };
      default:
        return {
          header: 'bg-blue-600',
          subHeader: 'bg-blue-400'
        };
    }
  };

  const colors = getColorClasses();
  const gridCols = showThirdColumn ? 'md:grid-cols-[minmax(0,3fr)_minmax(0,3fr)_minmax(0,5fr)]' : 'grid-cols-2';

  return (
    <div className={`rounded-lg bg-black text-center text-xl shadow-lg nes-corners ${className}`}>
      <div className={`grid gap-1 ${gridCols}`}>
        <div className={`${colors.header} p-3 font-semibold text-white`}>
          {title}
        </div>
        <div className={`${colors.subHeader} p-3 font-semibold text-white`}>
          獎金
        </div>
        {showThirdColumn && thirdColumnTitle && (
          <div className={`hidden ${colors.header} p-3 font-semibold text-white md:block`}>
            {thirdColumnTitle}
          </div>
        )}

        {data.map((item, index) => (
          <React.Fragment key={index}>
            <div className="bg-white p-3">{item.rank}</div>
            <div className="bg-white p-3">
              {typeof item.prize === 'number' ? item.prize.toLocaleString() : item.prize}
            </div>
          </React.Fragment>
        ))}

        {showThirdColumn && (
          <>
            <div className={`col-span-2 ${colors.header} p-3 font-semibold text-white md:col-span-1 md:col-start-3 md:row-span-${data.length} md:row-start-2 md:hidden`}>
              {thirdColumnTitle}
            </div>
            <div className={`col-span-2 bg-white p-4 md:col-span-1 md:col-start-3 md:row-span-${data.length} md:row-start-2`}>
              <div className="flex h-full flex-col justify-center">
                {thirdColumnContent}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}