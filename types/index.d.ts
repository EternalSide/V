import React from "react";

export interface ChildrenProps {
  children: React.ReactNode;
}

export interface HomeFiltersTypes {
  value: string;
  label: string;
}
export interface SideBarLinksType {
  label: string;
  route: string;
  icon: React.JSXE;
  auth: boolean;
}

export interface SearchParamsProps {
  searchParams: {
    [key: string]: string | undefined;
  };
}
