import Image from "next/image";
import { Inter } from "next/font/google";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center h-screen bg-[#FFEBD8]">
      <div className="text-center w-full">
        <div className="flex justify-center align-center">
          <Image src="/SoccerCard.png" width={200} height={200} alt="logo" />
        </div>
        <h1 className="text-[30px] mb-4">
          Welcome to the On-Chain Football Manager
        </h1>
        <div className="typewriter">
          <p>
            A place where people could play and bet on on chain foot ball
            manager game using ZKML
          </p>
        </div>
        <br />
        <div>
          <Button
            onClick={() => {
              router.push("/create-team");
            }}
          >
            Create a Team
          </Button>
        </div>
        <br />
        <div>
          <Button>View Team</Button>
        </div>
        <div>
          <Button>Match Making</Button>
        </div>
      </div>
    </div>
  );
}
