import QCard from '@/components/QCard';
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Home() {
    return (
        <ScrollArea className='h-[calc(72vh+48px)] w-[calc(100vw-48px-36px)] pr-[12px] top-18 left-[48px] right-[48px] absolute'>
            <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                <QCard title="Pertanyaan 1" desc="pertanyaan test" date={Date.now()} question='apa itu quantum?' />
                <QCard title="Pertanyaan 1" desc="pertanyaan test" date={Date.now()} question='apa itu quantum?' />
                <QCard title="Pertanyaan 1" desc="pertanyaan test" date={Date.now()} question='apa itu quantum?' />
                <QCard title="Pertanyaan 1" desc="pertanyaan test" date={Date.now()} question='apa itu quantum?' />
                <QCard title="Pertanyaan 1" desc="pertanyaan test" date={Date.now()} question='lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum' />
                <QCard title="Pertanyaan 1" desc="pertanyaan test" date={Date.now()} question='apa itu quantum?' />
                <QCard title="Pertanyaan 1" desc="pertanyaan test" date={Date.now()} question='apa itu quantum?' />
                <QCard title="Pertanyaan 1" desc="pertanyaan test" date={Date.now()} question='apa itu quantum?' />
                <QCard title="Pertanyaan 1" desc="pertanyaan test" date={Date.now()} question='apa itu quantum?' />
                <QCard title="Pertanyaan 1" desc="pertanyaan test" date={Date.now()} question='apa itu quantum?' />
                <QCard title="Pertanyaan 1" desc="pertanyaan test" date={Date.now()} question='apa itu quantum?' />
                <QCard title="Pertanyaan 1" desc="pertanyaan test" date={Date.now()} question='apa itu quantum?' />
                <QCard title="Pertanyaan 1" desc="pertanyaan test" date={Date.now()} question='apa itu quantum?' />
                <QCard title="Pertanyaan 1" desc="pertanyaan test" date={Date.now()} question='apa itu quantum?' />
                <QCard title="Pertanyaan 1" desc="pertanyaan test" date={Date.now()} question='apa itu quantum?' />
                <QCard title="Pertanyaan 1" desc="pertanyaan test" date={Date.now()} question='apa itu quantum?' />
                <QCard title="Pertanyaan 1" desc="pertanyaan test" date={Date.now()} question='apa itu quantum?' />
                <QCard title="Pertanyaan 1" desc="pertanyaan test" date={Date.now()} question='apa itu quantum?' />
                <QCard title="Pertanyaan 1" desc="pertanyaan test" date={Date.now()} question='apa itu quantum?' />
                <QCard title="Pertanyaan 1" desc="pertanyaan test" date={Date.now()} question='apa itu quantum?' />
                <QCard title="Pertanyaan 1" desc="pertanyaan test" date={Date.now()} question='apa itu quantum?' />
                <QCard title="Pertanyaan 1" desc="pertanyaan test" date={Date.now()} question='apa itu quantum?' />
            </div>
        </ScrollArea>
    );
}
