import type { LucideIcon } from "lucide-react";
import { FolderKanban, Layers, Package, Radio } from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const mainNav: NavItem[] = [
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/templates", label: "Templates", icon: Layers },
  { href: "/assets", label: "Assets", icon: Package },
];

export const labsNav: NavItem[] = [
  { href: "/dev/sse", label: "SSE 演示", icon: Radio },
];
