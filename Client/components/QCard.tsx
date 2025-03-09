import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface QCardProps {
    title: string;
    desc: string;
    date: number;
    question: string;
}


export default function QCard({ title, desc, date, question }: QCardProps){
    return (
        <Card className="h-[24vh] relative">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{desc}</CardDescription>
                <CardDescription className="absolute top-[24px] right-[36px]">{date}</CardDescription>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[8vh]">
                    <p>{question}</p>
                </ScrollArea>
            </CardContent>
            <CardFooter className="absolute bottom-5.5 w-full">
                <Button className="w-full" variant={"default"}>
                    Answer
                </Button>
            </CardFooter>
        </Card>
    )
}