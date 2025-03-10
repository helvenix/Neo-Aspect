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
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Textarea } from "@/components/ui/textarea"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { toast } from "sonner"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover" 
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Link from "next/link";
 
const formSchema = z.object({
    answer: z.string().min(1, {
        message: "Answer required"
    }).max(500, {
        message: "Maximum 500 characters"
    }),
})

interface QCardProps {
    id: number;
    title: string;
    diff: "default" | "destructive" | "outline" | "secondary" | "hard" | "medium" | "easy";
    type: "true-false" | "multiple-choices" | "form";
    date: string;
    question: string;
    author: string;
    choices: string[];
    answer: string;
    refresh: any;
    userRole: "guest" | "user" | "admin"
}

function formatRelativeTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
  
    if (seconds < 60) {
      return `${seconds} sec${seconds !== 1 ? "s" : ""} ago`;
    }
  
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return `${minutes} min${minutes !== 1 ? "s" : ""} ago`;
    }
  
    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return `${hours} hr${hours !== 1 ? "s" : ""} ago`;
    }
  
    const days = Math.floor(hours / 24);
    if (days < 7) {
      return `${days} day${days !== 1 ? "s" : ""} ago`;
    }
  
    const weeks = Math.floor(days / 7);
    if (days < 30) {
      return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
    }
  
    const months = Math.floor(days / 30);
    if (months < 12) {
      return `${months} month${months !== 1 ? "s" : ""} ago`;
    }
  
    const years = Math.floor(months / 12);
    return `${years} year${years !== 1 ? "s" : ""} ago`;
}

export default function QCard({ id,title, diff, type, date, question, author, choices, answer, refresh, userRole}: QCardProps){

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            answer: "",
        },
    })   

    function onSubmit(values: z.infer<typeof formSchema>) {
        if(values.answer === answer){
            toast.success("Correct!", {
                description: `the answer ${answer} is correct!`,
            })
        }else{
            toast.error("Incorrect!", {
                description: `your answer ${values.answer} is incorrect!`
            })
        }
    }

    async function handleDelete() {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                toast.success("Question deleted", {
                description: `${title} has been deleted.`,
                });
                refresh();
            } else {
                const errorData = await res.json();
                toast.error("Deletion failed", {
                description: errorData.message || "Failed to delete question.",
                });
            }
        } catch (err) {
          console.error(err);
          toast.error("Error", { description: "An error occurred during deletion." });
        }
    }
    
    return (
        <Card className="h-[24vh] relative">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription className="flex gap-2">
                    <Badge variant={diff}>{diff}</Badge>
                    <Badge variant="outline">{type}</Badge>
                </CardDescription>
                <CardDescription className="absolute top-[24px] right-[48px]">{formatRelativeTime(date)}</CardDescription>
                {userRole === "admin" && (
                    <Popover>
                        <PopoverTrigger className="absolute top-[22px] right-[18px] w-[12px] cursor-pointer hover:text-[#f4f4f4]">⋮</PopoverTrigger>
                        <PopoverContent className="w-[24vh] space-y-2">
                            <Button 
                                variant="default" 
                                className="cursor-pointer w-full"
                                asChild
                            >
                                <Link href={`edit/${id}`}>Edit</Link>
                            </Button>
                            <Dialog>
                            <DialogTrigger asChild>
                            <Button 
                                variant="destructive" 
                                className="cursor-pointer w-full"
                            >Delete</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                <DialogTitle>Are you absolutely sure?</DialogTitle>
                                <DialogDescription>
                                    This action cannot be undone. This will permanently delete the question
                                    and remove it from our servers.
                                </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <Button 
                                        variant="destructive" type="submit" className="cursor-pointer"
                                        onClick={handleDelete}
                                    >Confirm</Button>
                                </DialogFooter>
                            </DialogContent>
                            </Dialog>
                        </PopoverContent>
                    </Popover>
                )}
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[8vh]">
                    <p>{question}</p>
                </ScrollArea>
            </CardContent>
            <CardFooter className="absolute bottom-5.5 w-full">
                <Drawer>
                <DrawerTrigger asChild className="w-full">
                    <Button className="w-full cursor-pointer" variant={"default"}>
                        Answer
                    </Button>
                </DrawerTrigger>
                {userRole !== "guest" && (
                <DrawerContent className="h-[calc(50%+48px)]">
                        <DrawerHeader>
                        <DrawerTitle>
                            {title}
                            <Badge className="ml-2" variant={diff}>{diff}</Badge>
                            <Badge className="ml-2" variant="outline">{type}</Badge>
                        </DrawerTitle>
                        <DrawerDescription>{formatRelativeTime(date)} | by {author}</DrawerDescription>
                        <DrawerDescription className="text-[#f4f4f4]">{question}</DrawerDescription>
                        </DrawerHeader>
                        <DrawerFooter>
                        <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {type === "form" && (
                                <FormField
                                control={form.control}
                                name="answer"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Answer here..." {...field} />
                                    </FormControl>
                                    <FormMessage className="text-destructive"/>
                                    </FormItem>
                                )}
                                />
                            )}
                            {type === "multiple-choices" && choices && (
                                <FormField
                                    control={form.control}
                                    name="answer"
                                    render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>Select the correct answer</FormLabel>
                                        <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex flex-col space-y-2"
                                        >
                                            <ScrollArea className='max-h-[24vh] pr-3'>
                                                <div className="space-y-2">
                                                {choices.map((choice, index) => (
                                                    <FormItem key={index} className="flex items-center space-x-3">
                                                        <FormControl>
                                                        <RadioGroupItem value={choice} />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">{choice}</FormLabel>
                                                    </FormItem>
                                                ))}
                                                </div>
                                            </ScrollArea>
                                        </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                            )}
                            {type === "true-false" && (
                                <FormField
                                    control={form.control}
                                    name="answer"
                                    render={({ field }) => (
                                    <FormItem className="mb-12">
                                        <FormLabel>Select True or False</FormLabel>
                                        <FormControl>
                                        <ToggleGroup type="single" value={field.value} onValueChange={field.onChange} className="w-[48vh]">
                                            <ToggleGroupItem value="true">true</ToggleGroupItem>
                                            <ToggleGroupItem value="false">false</ToggleGroupItem>
                                        </ToggleGroup>
                                        </FormControl>
                                        <FormMessage className="text-destructive" />
                                    </FormItem>
                                    )}
                                />
                            )}
                            <Button className="w-full mb-2" type="submit">Submit</Button>
                        </form>
                        <DrawerClose asChild>
                            <Button variant="outline">Close</Button>
                        </DrawerClose>
                        </Form>
                        </DrawerFooter>
                    </DrawerContent>
                    )}
                    {userRole === "guest" && (
                        <DrawerContent className="h-[24vh]">
                            <DrawerHeader>
                            <DrawerTitle className="text-center">You must login to answer this question</DrawerTitle>
                            </DrawerHeader>
                            <DrawerFooter>
                            <DrawerClose className="space-y-3">
                            <Button asChild variant={"logreg"} className="w-full border-1">
                                <Link href="/login">Login</Link>
                            </Button>
                                <Button variant="outline">Cancel</Button>
                            </DrawerClose>
                            </DrawerFooter>
                        </DrawerContent>
                    )}
                </Drawer>
                </CardFooter>
        </Card>
    )
}