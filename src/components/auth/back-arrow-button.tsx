"use client";
import { useRouter } from "next/navigation";
import { MdArrowBackIos } from "react-icons/md";

export const BackArrowButton = () => {
  const router = useRouter();

  const handleBack = () => {
    // try {
    //     // Check if we can go back
    //     if (!window.history.state || window.history.state.idx === 0) {
    //         router.push('/');
    //         return;
    //     }
    // } catch {
    //     router.push('/');
    //     return;
    // }
    // router.back();
    router.push("/");
  };

  return (
    <button className="cursor-pointer" onClick={handleBack}>
      <MdArrowBackIos
        size={24}
        className="text-custom-light-4 dark:text-custom-dark-4"
      />
    </button>
  );
};
