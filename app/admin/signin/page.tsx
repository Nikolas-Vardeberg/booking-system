import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { getSession, login } from "@/lib/lib";

import { cn } from "@/lib/utils";

import { redirect } from "next/navigation";

const page = async() => {
    const session = await getSession();

    if(session) {
        redirect("/admin/dashboard")
    }

    return(
        <div className="flex flex-col items-center justify-center text-center mt-28">
        <Card className="w-[400px]"> 
            <CardHeader>
                <div className="w-full flex flex-col gap-y-4 items-center justify-center">
                    <h1 className={cn("text-3xl font-semibold")}>
                        🔐 Auth
                    </h1>
                    <p className="text-muted-foreground text-md">
                        Welcome Back
                    </p>
                </div>
            </CardHeader>
            <CardContent>
                <form className="space-y-6 text-left"
                    action={async (formData) => {
                        "use server"
                        await login(formData);
                        redirect("/admin/dashboard")
                    }}
                >
                    <div className="space-y-4">
                        <Label>Email</Label>
                        <Input type="email" id="email" name="email" placeholder="email"/>
                    </div>
                    <div className="space-y-4">
                        <Label>Password</Label>
                        <Input type="password" id="password" name="password" placeholder="password"/>
                    </div>

                    <Button className="w-full" type="submit">
                        login
                    </Button>
                </form>
            </CardContent>
        </Card>
        </div>
    )
}

export default page