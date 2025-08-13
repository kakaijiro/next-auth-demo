import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default async function page() {
  const session = await auth();
  return (
    <div className="flex-1 flex justify-center items-center">
      <div className="flex items-center justify-center min-h-screen min-w-screen">
        <Card className="max-w-sm w-full">
          <CardHeader className="text-3xl">
            <CardHeader className="text-3xl">
              <CardTitle>My Account</CardTitle>
              <CardDescription>User details</CardDescription>
            </CardHeader>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Label>Email Address</Label>
            <div className="text-muted-foreground">{session?.user?.email}</div>
          </CardContent>
          <div className="border-t-1 mx-4 border-slate-200" />
          <CardFooter>
            <Button className="w-full">Use 2 factor authentication</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
