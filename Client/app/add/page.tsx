"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form";
import {z} from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "sonner"
import { Slash } from "lucide-react"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useEffect } from "react";

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title Required"
    }).max(30, {
        message: "Maximum 30 characters"
    }),
    content: z.string().min(1, {
        message: "Question required"
    }).max(500, {
        message: "Maximum 500 characters"
    }),
    diff: z.enum(["easy", "medium", "hard"], {
        errorMap: () => ({ message: "must be selected" }),
    }),
    type: z.enum(['true-false', 'form', 'multiple-choices'], {
        errorMap: () => ({ message: "must be selected" }),
    }),
    answer: z.string().min(1, {
        message: "Answer key required"
    }).max(500, {
        message: "Maximum 500 characters"
    }),
    choices: z.array(z.object({ value: z.string() })),
})
.refine((data) => {
    if (data.type === "multiple-choices") {
        return data.choices !== undefined && data.choices.length >= 2;
    }
        return true;
    }, {
        message: "Multiple choices questions must have at least two options",
        path: ["choices"],
    });


export default function Add(){
    type FormValues = z.infer<typeof formSchema>;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            content: "",
            diff: undefined,
            type: "form",
            answer: "",
            choices: []
        },
    })

    useEffect(() => {
        console.log("Validation Errors:", form.formState.errors);
    }, [form.formState.errors]);

    const questionType = form.watch("type");

    const { fields, append, remove } = useFieldArray<FormValues>({
        control: form.control,
        name: "choices",
    });
      

    async function onSubmit(values: z.infer<typeof formSchema>){
        const newQuestion = {
            ...values,
            author: "Helven",
            choices: values.type === "multiple-choices"
                ? values.choices.map(choiceObj => choiceObj.value)
                : [],
        }
        try {
            const res = await fetch(`http://localhost:5000/api/questions/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newQuestion)
            })
            if (res.ok) {
                toast.success("Question has been added", {
                    description: `${values.title} is live now!`,
                })          
            }
        } catch(err){
            console.error(err);
        }
    }
    return (
        <>
            <Breadcrumb className="absolute top-[18px] left-[48px] ">
                <BreadcrumbList>
                    <BreadcrumbItem>
                    <BreadcrumbLink href="/">
                        <Button className="cursor-pointer" variant={'link'}>
                            Home
                        </Button>
                    </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                    <Slash />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                    <BreadcrumbLink href="/add">
                        <Button className="cursor-pointer" variant={'link'}>
                            Add
                        </Button>
                    </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-[48vh] left-[calc((100%-48vh)/2)] absolute top-24 ">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="title here..." {...field} />
                            </FormControl>
                            <FormDescription>
                                Title for your question
                            </FormDescription>
                            <FormMessage className="text-destructive" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="diff"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Question difficulty</FormLabel>
                            <FormControl>
                                <ToggleGroup type="single" value={field.value} onValueChange={field.onChange} className="w-[24vh]">
                                    <ToggleGroupItem value="easy" className="data-[state=on]:bg-[#478A50] data-[state=on]:text-[#f4f4f4]">
                                        easy
                                    </ToggleGroupItem>
                                    <ToggleGroupItem value="medium" className="data-[state=on]:bg-[#D4AF37] data-[state=on]:text-[#f4f4f4]">
                                        medium
                                    </ToggleGroupItem>
                                    <ToggleGroupItem value="hard" className="data-[state=on]:bg-[#B03A2E] data-[state=on]:text-[#f4f4f4]">
                                        hard
                                    </ToggleGroupItem>
                                </ToggleGroup>
                            </FormControl>
                            <FormMessage className="text-destructive" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                            <FormControl>
                                <Textarea placeholder="question here..." {...field} />
                            </FormControl>
                            <FormMessage className="text-destructive" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Question type</FormLabel>
                            <FormControl>
                                <ToggleGroup type="single" value={field.value} onValueChange={field.onChange} className="w-[48vh]">
                                    <ToggleGroupItem value="true-false">
                                        true/false
                                    </ToggleGroupItem>
                                    <ToggleGroupItem value="multiple-choices">
                                        multiple choices
                                    </ToggleGroupItem>
                                    <ToggleGroupItem value="form">
                                        form
                                    </ToggleGroupItem>
                                </ToggleGroup>
                            </FormControl>
                            <FormMessage className="text-destructive" />
                            </FormItem>
                        )}
                    />
                    {questionType === "true-false" && (
                        <FormField
                            control={form.control}
                            name="answer"
                            render={({ field }) => (
                                <FormItem className="mb-12">
                                <FormControl>
                                    <ToggleGroup type="single" value={field.value} onValueChange={field.onChange} className="w-[48vh]">
                                        <ToggleGroupItem value="true">
                                            true
                                        </ToggleGroupItem>
                                        <ToggleGroupItem value="false">
                                            false
                                        </ToggleGroupItem>
                                    </ToggleGroup>
                                </FormControl>
                                <FormDescription>
                                    Provide the key answer.
                                </FormDescription>
                                <FormMessage className="text-destructive" />
                                </FormItem>
                            )}
                        />
                    )}
                    {questionType === "multiple-choices" && (
                        <FormField
                            control={form.control}
                            name="choices"
                            render={() => (
                            <FormItem>
                                <FormLabel>Multiple Choice Options</FormLabel>
                                <ScrollArea className='h-[24vh] pr-3'>
                                    <div className="space-y-2">
                                        {fields.map((field, index) => {
                                            const currentAnswer = form.watch("answer");
                                            return (
                                                <div key={field.id} className="flex items-center space-x-2">
                                                    <Input
                                                        placeholder={`Option ${index + 1}`}
                                                        {...form.register(`choices.${index}.value`)}
                                                    />
                                                    <Button type="button" variant="destructive" onClick={() => remove(index)}>
                                                        Remove
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        className="w-[15vh]"
                                                        variant={currentAnswer === field.value ? "default" : "outline"}
                                                        onClick={async () => {
                                                            await form.trigger(`choices.${index}.value`);
                                                            const updatedValue = form.getValues(`choices.${index}.value`);
                                                            form.setValue("answer", updatedValue, { shouldValidate: true });
                                                        }}
                                                    >
                                                        Mark as Answer
                                                    </Button>
                                                </div>
                                            )
                                        })}
                                        <Button type="button" onClick={() => append({ value: "" })}>
                                            Add Option
                                        </Button>
                                    </div>
                                </ScrollArea>
                                <FormDescription>
                                    Provide at least two options for multiple choices.
                                </FormDescription>
                                <FormMessage className="text-destructive" />
                            </FormItem>
                            )}
                        />
                    )}
                    {questionType === "form" && (
                        <FormField
                            control={form.control}
                            name="answer"
                            render={({ field }) => (
                                <FormItem>
                                <FormControl>
                                    <Textarea placeholder="key answer..." {...field} />
                                </FormControl>
                                <FormDescription>
                                    Provide the key answer
                                </FormDescription>
                                <FormMessage className="text-destructive" />
                                </FormItem>
                            )}
                        />
                    )}

                    <Button className="cursor-pointer absolute right-0 bottom-0" type="submit" onClick={() => console.log(fields)}>Submit</Button>
                </form>
            </Form>
        </>
      )
}