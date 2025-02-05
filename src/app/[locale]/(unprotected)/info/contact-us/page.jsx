import { Button } from "@/components/ui/button";

export default function ContactUsPage() {
    return (
        <div className="relative h-screen w-full justify-center items-center flex flex-col gap-10">
            <h1 className="text-4xl">Contact Support</h1>
            <Button variant="mine" asChild>
                <a href="mailto:sebastjan.bas@gmail.com?cc=almn140803@gmail.com&subject=[Slovene Step By Step] - Support&body=<Enter your message here.>">
                    Send Email
                </a>
            </Button>
        </div>
    );
}
