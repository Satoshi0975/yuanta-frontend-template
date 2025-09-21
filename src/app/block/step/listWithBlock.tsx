import { cn } from '@/lib/utils';
import { ReactElement } from 'react';

type Props = {
  list: (string | ReactElement)[];
  className?: string;
};
const ListWithBlock = ({ list, className }: Props) => {
  return (
    <ul
      className={cn(
        'list-disc space-y-3 text-lg marker:text-2xl marker:text-yt-orange-100 md:space-y-6 md:pl-12 md:text-xl lg:text-2xl',
        className
      )}
    >
      {list.map((item, index) => (
        <li
          className="before:text-y-secondary relative text-left text-gray-800"
          key={
            typeof item === 'string'
              ? `list-item-${index}-${item.substring(0, 10)}`
              : `list-item-${index}`
          }
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

export default ListWithBlock;
