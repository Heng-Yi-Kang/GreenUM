import { Link, useLocation } from "react-router-dom";
import { SlashIcon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function BreadcrumbWithCustomSeparator() {
  const location = useLocation();
  const { isAdmin } = useAuth();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link
              to="/"
              className={location.pathname === "/" ? "text-foreground font-semibold" : "text-muted-foreground"}
            >
              Home
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <SlashIcon />
        </BreadcrumbSeparator>

        {isAdmin ? (
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                to="/manager/events"
                className={location.pathname === "/manager/events" ? "text-foreground font-semibold" : "text-muted-foreground"}
              >
                My Events
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        ) : (
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                to="/going"
                className={location.pathname === "/going" ? "text-foreground font-semibold" : "text-muted-foreground"}
              >
                Going
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
