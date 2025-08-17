import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex-1 flex justify-center items-center">
      <div className="flex items-center justify-center min-h-screen min-w-screen">
        <Card className="max-w-sm w-full">
          <CardHeader className="text-3xl">
            <CardTitle>Next Auth Demo</CardTitle>
            
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Button asChild>
              <Link href="/my-account">My Account</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/register">Register</Link>
            </Button>
          </CardContent>
          
         
        </Card>
      </div>
    </div>
  );
}
