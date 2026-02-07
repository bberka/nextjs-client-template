"use client";

import { useState } from "react";
import Link from "next/link";
import { ROUTES, localizedRoute } from "@/constants/routes";
import { Menu, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { SidebarNavLinks } from "./sidebar-nav";

interface MobileSidebarProps {
  locale: string;
  isAdmin?: boolean;
}

export function MobileSidebar({ locale, isAdmin }: MobileSidebarProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <Button
        variant="ghost"
        size="icon-sm"
        className="md:hidden"
        onClick={() => setOpen(true)}
      >
        <Menu className="size-5" />
        <span className="sr-only">Open menu</span>
      </Button>
      <SheetContent
        side="left"
        className="w-60 p-0 bg-sidebar text-sidebar-foreground"
        showCloseButton={false}
      >
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <div className="flex h-14 items-center border-b px-4">
          <Link
            href={localizedRoute(locale, ROUTES.DASHBOARD)}
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 font-semibold"
          >
            <Settings className="size-5" />
            <span>App Template</span>
          </Link>
        </div>
        <SidebarNavLinks
          locale={locale}
          isAdmin={isAdmin}
          onNavigate={() => setOpen(false)}
        />
      </SheetContent>
    </Sheet>
  );
}
