import { UpdatePasswordForm } from "@/components/auth/update-password-form";

const UpdatePassword = () => {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <div className="flex flex-col justify-center items-center h-full">
        <h1 className="text-3xl uppercase font-semibold text-light-1 mb-10">
          Update Password
        </h1>
        <div className="w-96">
          <UpdatePasswordForm />
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
