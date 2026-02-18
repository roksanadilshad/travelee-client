
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Bell } from "lucide-react";
import { ToastContainer } from "react-toastify";

export default function Page({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 justify-between pr-5 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 bg-primary data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden text-accent md:block">
                  <BreadcrumbLink href="/">Back home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden text-accent md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Welcome to dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex gap-3 items-center">
            <Field className="hiiden md:block" orientation="horizontal">
              <Input type="search" placeholder="Search..." />
            </Field>
            <Bell size={20} />
          </div>
        </header>

        {/* Dashboard Contents */}
        <div className="flex pt-5 bg-gray-200 flex-1 flex-col gap-4 p-4 pt-0">
          {children}
        </div>
      </SidebarInset>
      {/* Toastify  */}
      <ToastContainer />
    </SidebarProvider>
  );
}
