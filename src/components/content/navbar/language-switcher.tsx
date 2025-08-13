"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { usePathname, useRouter } from "@/i18n/routing";
import { IconWorld } from "@tabler/icons-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function LanguageSwitcher({
  locale,
  className,
}: {
  locale: string;
  className?: string;
}) {
  const [lang, setLang] = useState(locale);
  const router = useRouter();
  const pathname = usePathname();
  const handleLangChange = (event) => {
    const newLang = event;
    setLang(event);
    router.replace(pathname, { locale: newLang });
  };

  return (
    <>
      {/* <div className="flex flex-row items-center justify-between gap-x-1 py-1 px-3 w-full text-sm text-sl-primary  bg-transparent border-[1px] shadow-sm border-gray-200 dark:border-gray-700 rounded-xl pointer-events-none">
        <span>{lang}</span>
        <ChevronDownIcon className="h-4 w-4 text-sl-primary" />
      </div> */}

      <Select value={lang} onValueChange={handleLangChange}>
        <SelectTrigger
          variant="icon"
          className={cn("cursor-pointer p-2 focus-visible:ring-0", className)}
        >
          <IconWorld className="" />
          {/* <SelectValue placeholder="Language" /> */}
        </SelectTrigger>
        <SelectContent>
          <SelectItem className="cursor-pointer" value="en">
            en
          </SelectItem>
          <SelectItem className="cursor-pointer" value="sl">
            sl
          </SelectItem>
          <SelectItem className="cursor-pointer" value="it">
            it
          </SelectItem>
          <SelectItem className="cursor-pointer" value="ru">
            ru
          </SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}
