import type { PropsWithChildren } from "react";
import { Sidebar } from "@/components/ui/sidebar"; //

import HomeAppLayoutStructure from "./home-app-layout-structure";


export function HomeAppLayout({ children }: PropsWithChildren) {

  return (
    <Sidebar>
      <HomeAppLayoutStructure>
        {children}
      </HomeAppLayoutStructure>
    </Sidebar>
  );
}