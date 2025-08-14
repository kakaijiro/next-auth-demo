import { auth } from "@/auth";
import LogoutButton from "@/components/logout-button";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    console.log({ session });
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-slate-200 flex justify-between p-4 items-center">
        <ul className="flex gap-4 font-bold text-lg">
          <li>
            <Link href="/my-account">My Account</Link>
          </li>
          <li>
            <Link href="/password-change">Change Password</Link>
          </li>
        </ul>
        <div className="items-end">
          <LogoutButton />
        </div>
      </nav>
      <div>{children}</div>
    </div>
  );
}
