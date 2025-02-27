"use client";

import {usePathname} from "next/navigation";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/Breadcrumb";
import React from "react";
import {Container} from "@/components/shared/Container";

export function BreadcrumbWrapper() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  const pathSegments = pathname.split("/").filter(Boolean);
  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");

    return {
      label: decodeURIComponent(segment),
      href,
      isLast: index === pathSegments.length - 1,
    };
  });

  return (
    <Breadcrumb className="my-5">
      <Container>
        <BreadcrumbList className={"text-md text-gray-400"}>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {breadcrumbs.map((crumb) => (
            <React.Fragment key={crumb.href}>
              <BreadcrumbSeparator/>

              <BreadcrumbItem>
                {crumb.isLast ? (
                  <BreadcrumbPage>
                    {crumb.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link
                      href={crumb.href}
                    >
                      {crumb.label}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Container>
    </Breadcrumb>
  );
}
