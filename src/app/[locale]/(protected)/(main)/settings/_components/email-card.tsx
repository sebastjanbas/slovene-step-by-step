"use client";

import { useUser } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { VerifiedIcon } from "lucide-react";
import { IconMail } from "@tabler/icons-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const EmailCard = ({ locale }) => {
  const { user, isLoaded } = useUser();

  return (
    <Card className="w-full max-w-4xl rounded-2xl p-1 bg-accent border-none">
      <CardHeader className="pt-5">
        <CardTitle>Email Addresses</CardTitle>
      </CardHeader>
      <CardContent className="bg-white dark:bg-background border border-foreground/10 rounded-2xl p-4">
        {!isLoaded ? (
          <Skeleton className="h-10 w-full" />
        ) : (
          <ul className="space-y-4">
            {user.emailAddresses.map((email) => {
              const isPrimary = email.id === user.primaryEmailAddressId;
              const isVerified = email.verification?.status === "verified";

              return (
                <li
                  key={email.id}
                  className="flex justify-between items-center"
                >
                  <div className="flex text-foreground/50 gap-3 flex-row justify-start items-center">
                    <IconMail size={16} />
                    <span className="text-sm">{email.emailAddress}</span>
                    {isVerified ? (
                      <Tooltip>
                        <TooltipTrigger className="cursor-pointer">
                          <VerifiedIcon
                            size={16}
                            className="text-emerald-500"
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          This email address is verified.
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      <Badge variant="secondary" className="text-xs">
                        Unverified
                      </Badge>
                    )}
                    {isPrimary && (
                      <Badge
                        variant="outline"
                        className="text-emerald-500 text-xs"
                      >
                        Primary
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs text-foreground/50 text-nowrap">
                    Added on{" "}
                    {new Date(user.createdAt).toLocaleDateString(locale, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default EmailCard;
