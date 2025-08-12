"use client";

import { logout } from "@/actions/logout";
import { Button } from "./ui/button";

export default function LogoutButton() {
  return (
    <Button size="sm" onClick={async () => await logout()}>
      Lougot
    </Button>
  );
}
