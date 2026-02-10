import React from "react";
import { Outlet } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

const MainLayout = () => {
  const isMobile = useIsMobile();

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {isMobile ? (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50 md:hidden">
              <MenuIcon className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="p-0 w-full max-w-full sm:w-80 sm:max-w-sm"
          >
            <Sidebar />
          </SheetContent>
        </Sheet>
      ) : (
        <aside className="w-64 flex-shrink-0 border-r bg-sidebar dark:bg-sidebar-background p-4 hidden md:block">
          <Sidebar />
        </aside>
      )}
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;