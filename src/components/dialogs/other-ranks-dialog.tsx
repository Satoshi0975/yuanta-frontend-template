'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PrizeTable } from '@/components/ui/prize-table';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';

interface OtherRanksDialogProps {
  children?: React.ReactNode;
}

const OtherRanksDialog = ({ children }: OtherRanksDialogProps) => {
  const otherRanksData = [
    { rank: '第6名', prize: 65000 },
    { rank: '第7名', prize: 60000 },
    { rank: '第8名', prize: 55000 },
    { rank: '第9名', prize: 50000 },
    { rank: '第10名', prize: 45000 },
    { rank: '第11名', prize: 40000 },
    { rank: '第12名', prize: 35000 },
    { rank: '第13名', prize: 30000 },
    { rank: '第14名', prize: 25000 },
    { rank: '第15名', prize: 22000 },
    { rank: '第16名', prize: 20000 },
    { rank: '第17名', prize: 18000 },
    { rank: '第18名', prize: 15000 },
    { rank: '第19名', prize: 12000 },
    { rank: '第20名', prize: 10000 },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="z-[9999] mx-auto max-h-[90vh] max-w-lg rounded-lg border-none bg-sts-orange-100 ring-0">
        <DialogHeader>
          <DialogTitle className="text-center font-cubic text-2xl font-bold text-sts-text">
            其他名次獎項
          </DialogTitle>
        </DialogHeader>
        <div className="mx-1 h-full">
          <ScrollArea className="h-full max-h-[calc(100vh-200px)] p-1">
            <PrizeTable
              title="第6-20名"
              data={otherRanksData}
              className="text-base"
            />
            <ScrollBar />
          </ScrollArea>
          <p className="text-gray-500">
            * 16~20名僅有獎金，1~5除獎金外，另贈送 Nintendo 任天堂 Switch 2
            主機一台。
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OtherRanksDialog;
