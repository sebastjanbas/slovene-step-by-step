import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountCard from "./_components/account-card";
import EmailCard from "./_components/email-card";
import PasswordCard from "./_components/password-card";
import DevicesCard from "./_components/devices-card";
import PreferencesForm from "./_components/preferences-form";

const SettingsPage = ({ params }) => {
  const { locale } = params;
  return (
    <div className="w-full p-5">
      <Tabs defaultValue="account" className="w-full">
        <div className="flex justify-center items-center">
          <TabsList>
            <TabsTrigger
              value="account"
              className="data-[state=active]:bg-white"
            >
              Account
            </TabsTrigger>
            <TabsTrigger
              disabled
              value="billing"
              className="data-[state=active]:bg-white"
            >
              Billing
            </TabsTrigger>
            <TabsTrigger
              disabled
              value="notifications"
              className="data-[state=active]:bg-white"
            >
              Notifications
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent className="w-full" value="account">
          <div className="space-y-8">
            <AccountCard />
            <EmailCard locale={locale} />
            <PasswordCard />
            <PreferencesForm />
            <DevicesCard />
          </div>
        </TabsContent>
        <TabsContent className="w-full" value="billing">
          Change your billing address here.
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
