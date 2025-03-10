"use client"
import React, { useEffect, useState } from "react";
import QCard from '@/components/QCard';
import { ScrollArea } from "@/components/ui/scroll-area"
import { Slash } from "lucide-react"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import Link from "next/link";

function filterByTime(q: Question, time: string): boolean {
    const questionDate = new Date(q.createdDate);
    const now = new Date();
  
    switch (time) {
      case "today":
        return (
          questionDate.getFullYear() === now.getFullYear() &&
          questionDate.getMonth() === now.getMonth() &&
          questionDate.getDate() === now.getDate()
        );
      case "thisWeek": {
        // Assume week starts on Sunday
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        startOfWeek.setHours(0, 0, 0, 0);
        return questionDate >= startOfWeek;
      }
      case "thisMonth":
        return (
          questionDate.getFullYear() === now.getFullYear() &&
          questionDate.getMonth() === now.getMonth()
        );
      case "thisYear":
        return questionDate.getFullYear() === now.getFullYear();
      default:
        return true;
    }
} 
  

interface Question {
    answer: any;
    choices: string[];
    author: string;
    id: number;
    title: string;
    diff: "easy" | "medium" | "hard";
    type: "true-false" | "form" | "multiple-choices";
    createdDate: string;
    content: string;
}

type FilterOption = {
    value: string;
    label: string;
};
  
const timeFilter: FilterOption[] = [
    { value: "today", label: "Today" },
    { value: "thisWeek", label: "This Week" },
    { value: "thisMonth", label: "This Month" },
    { value: "thisYear", label: "This Year" },
];
  
const typeFilter: FilterOption[] = [
    { value: "true-false", label: "True/False" },
    { value: "form", label: "Form" },
    { value: "multiple-choices", label: "Multiple Choices" },
];
  
const diffFilter: FilterOption[] = [
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" },
];
  

export default function Home() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filterOpen, setFilterOpen] = React.useState(false)
    const [timeValue, setTimeValue] = React.useState("")
    const [typeValue, setTypeValue] = useState("");
    const [diffValue, setDiffValue] = useState("");

    const [userRole, setUserRole] = useState<"guest" | "user" | "admin">("guest");

    useEffect(() => {
        const storedRole = localStorage.getItem("userRole");
        if (storedRole === "admin" || storedRole === "user") {
            setUserRole(storedRole);
        }
    }, []);

    const fetchQuestions = async () => {
        try {
          const res = await fetch(`http://localhost:5000/api/questions/`);
          if (!res.ok) {
            throw new Error("Failed to fetch questions");
          }
          const data = await res.json();
          setQuestions(data);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
    };
      
    useEffect(() => {
        fetchQuestions();
    }, []);
    
    if (loading) return <div className="w-full h-[calc(72vh+48px)] flex items-center justify-center absolute top-12">Loading questions...</div>;
    if (error) return <div className="w-full h-[calc(72vh+48px)] flex items-center justify-center absolute top-12">Error: {error}</div>;
    
    const filteredQuestions = questions.filter((q) => {
        const timeMatch = timeValue ? filterByTime(q, timeValue) : true;
        const typeMatch = typeValue ? q.type === typeValue : true;
        const diffMatch = diffValue ? q.diff === diffValue : true;
        return timeMatch && typeMatch && diffMatch;
    });
    
    const filterLabel = `${timeValue ? timeFilter.find((t) => t.value === timeValue)?.label : "All Time"} / ${
        typeValue ? typeFilter.find((t) => t.value === typeValue)?.label : "All Types"
    } / ${diffValue ? diffFilter.find((d) => d.value === diffValue)?.label : "All Difficulties"}`;
     
    return (
        <>
            {userRole === "guest" && (
                <div className="flex absolute right-[48px] gap-3 top-[-51px]">
                    <Button asChild variant={"logreg"} size={"sm"}>
                        <Link href="/register">Register</Link>
                    </Button>
                    <Button asChild variant={"logreg"} size={"sm"}>
                        <Link href="/login">Login</Link>
                    </Button>
                </div>
            )}
            {userRole !== "guest" && (
                <div className="flex absolute right-[48px] gap-3 top-[-51px]">
                    <h1 className="text-[#242424] text-[12px] mt-1.5">{userRole}</h1>
                    <Button variant="destructive" className="cursor-pointer" size={"sm"} onClick={() => {setUserRole("guest"); localStorage.removeItem("userRole");}}>
                        Logout
                    </Button>
                </div>
            )}
            {userRole === "admin" && (
                <Button variant="outline" size={"sm"} className="cursor-pointer flex absolute right-[200px] gap-3 top-[-51px] w-24 p-0">
                    <Link href="/add" className="flex items-center justify-center w-full h-full hover:text-[#242424]">Add</Link>
                </Button>
            )}
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
                </BreadcrumbList>
            </Breadcrumb>
            <Popover open={filterOpen} onOpenChange={setFilterOpen}>
            <PopoverTrigger asChild>
            <Button variant="outline" className="w-[400px] justify-between absolute right-[48px] top-[18px]">
                {filterLabel}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[220px] p-0">
            <Command>
                <CommandInput placeholder="Search filters..." />
                <CommandList>
                <CommandEmpty>No filter found.</CommandEmpty>
                <CommandGroup heading="Time">
                    {timeFilter.map((item) => (
                    <CommandItem
                        key={item.value}
                        onSelect={() => {
                        setTimeValue(item.value === timeValue ? "" : item.value);
                        }}
                    >
                        <Check
                        className={cn(
                            "mr-2 h-4 w-4",
                            timeValue === item.value ? "opacity-100" : "opacity-0"
                        )}
                        />
                        {item.label}
                    </CommandItem>
                    ))}
                </CommandGroup>
                <CommandGroup heading="Question Type">
                    {typeFilter.map((item) => (
                    <CommandItem
                        key={item.value}
                        onSelect={() => {
                        setTypeValue(item.value === typeValue ? "" : item.value);
                        }}
                    >
                        <Check
                        className={cn(
                            "mr-2 h-4 w-4",
                            typeValue === item.value ? "opacity-100" : "opacity-0"
                        )}
                        />
                        {item.label}
                    </CommandItem>
                    ))}
                </CommandGroup>
                <CommandGroup heading="Difficulty">
                    {diffFilter.map((item) => (
                    <CommandItem
                        key={item.value}
                        onSelect={() => {
                        setDiffValue(item.value === diffValue ? "" : item.value);
                        }}
                    >
                        <Check
                        className={cn(
                            "mr-2 h-4 w-4",
                            diffValue === item.value ? "opacity-100" : "opacity-0"
                        )}
                        />
                        {item.label}
                    </CommandItem>
                    ))}
                </CommandGroup>
                </CommandList>
            </Command>
            </PopoverContent>
        </Popover>
            <ScrollArea className='h-[calc(72vh+48px)] w-[calc(100vw-48px-36px)] pr-[12px] top-18 left-[48px] right-[48px] absolute'>
                {filteredQuestions.length < 1 && (
                    <div className="w-full h-[calc(72vh+48px)] flex items-center justify-center absolute top-6">There's no questions available</div>
                )}
                <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                {filteredQuestions.map((question) => (
                    <QCard
                        key={question.id}
                        id={question.id}
                        title={question.title}
                        diff={question.diff}
                        type={question.type}
                        date={question.createdDate}
                        question={question.content}
                        author={question.author}
                        choices={question.choices}
                        answer={question.answer}
                        refresh={fetchQuestions}
                        userRole={userRole}
                    />
                ))}
                </div>
            </ScrollArea>
        </>
    );
}
