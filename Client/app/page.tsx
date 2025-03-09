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
  

export default function Home() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchQuestions() {
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
        }
        fetchQuestions();
    }, []);
    
    if (loading) return <div className="w-full h-[calc(72vh+48px)] flex items-center justify-center absolute top-12">Loading questions...</div>;
    if (error) return <div className="w-full h-[calc(72vh+48px)] flex items-center justify-center absolute top-12">Error: {error}</div>;
    if (questions.length < 1) return <div className="w-full h-[calc(72vh+48px)] flex items-center justify-center absolute top-12">There's no questions available</div>;

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
                </BreadcrumbList>
            </Breadcrumb>
            <ScrollArea className='h-[calc(72vh+48px)] w-[calc(100vw-48px-36px)] pr-[12px] top-18 left-[48px] right-[48px] absolute'>
                <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                {questions.map((question) => (
                    <QCard
                        key={question.id}
                        title={question.title}
                        diff={question.diff}
                        type={question.type}
                        date={question.createdDate}
                        question={question.content}
                        author={question.author}
                        choices={question.choices}
                        answer={question.answer}
                    />
                ))}
                </div>
            </ScrollArea>
        </>
    );
}
