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
import { Badge } from "@/components/ui/badge"

interface QCardProps {
    title: string;
    diff: "default" | "destructive" | "outline" | "secondary" | "hard" | "medium" | "easy";
    date: number;
    question: string;
}


export default function QCard({ title, diff, date, question }: QCardProps){
    return (
        <Card className="h-[24vh] relative">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>
                    <Badge variant={diff}>{diff}</Badge>
                </CardDescription>
                <CardDescription className="absolute top-[24px] right-[36px]">{date}</CardDescription>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[8vh]">
                    <p>{question}</p>
                </ScrollArea>
            </CardContent>
            <CardFooter className="absolute bottom-5.5 w-full">
                <Button className="w-full cursor-pointer" variant={"default"}>
                    Answer
                </Button>
            </CardFooter>
        </Card>
    )
}