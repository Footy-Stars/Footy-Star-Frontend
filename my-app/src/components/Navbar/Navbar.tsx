import { Button } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/router";

export const Navbar = () => {
  const router = useRouter();
  return (
    <div className="flex justify-end p-[20px]">
      <div className="flex">
        <div>
          <Button onClick={() => router.push("/manager-profile")}>
            Manager Profile
          </Button>
        </div>
        <div className="ml-[10px]">
          <Button onClick={() => router.push("/")}>Player Management</Button>
        </div>
        <div className="ml-[10px]">
          <Button onClick={() => router.push("/team-configuration")}>
            Team Configuration
          </Button>
        </div>
        <ConnectButton />
      </div>
    </div>
  );
};
