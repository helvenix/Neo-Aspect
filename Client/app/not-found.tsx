import Link from "next/link"
 
import { Button } from "@/components/ui/button"

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
            <h1 className="text-5xl font-bold">404</h1>
            <p className="mt-4 text-lg mb-5">
                Oops! We couldn’t find the page you’re looking for.
            </p>
            <Button asChild variant={"link"} size={"sm"}>
                <Link href="/">Go back home</Link>
            </Button>
        </div>
    );
  }