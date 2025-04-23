"use client";

import Link from "next/link";

type DashboardCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
  href: string;
  borderColor: string;
  hoverBg: string;
  hoverText: string;
  external?: boolean;
};

export default function DashboardCard({
  title,
  description,
  icon,
  iconBg,
  href,
  borderColor,
  hoverBg,
  hoverText,
  external = false,
}: DashboardCardProps) {
  const Wrapper = external ? "a" : Link;

  return (
    <div
      className={`bg-white border ${borderColor} rounded-lg p-6 flex flex-col items-center text-center shadow-sm`}
    >
      <div className={`${iconBg} w-14 h-14 rounded-full flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Wrapper
        {...(external && {
          target: "_blank",
          rel: "noopener noreferrer",
        })}
        href={href}
        className={`mt-auto text-sm font-medium border rounded-md px-4 py-2 transition-colors duration-200 ${borderColor} text-gray-700 bg-white ${hoverBg} ${hoverText}`}
      >
        Acessar
      </Wrapper>
    </div>
  );
}
