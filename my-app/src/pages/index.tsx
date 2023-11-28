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
          FootyStars
        </h1>
        <div className="typewriter">
          <p>
            Onchain fantasy football with real-world stakes and provable simulation.
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
