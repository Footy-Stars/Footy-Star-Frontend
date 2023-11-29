import React from "react";
import Image from "next/image";
import SelectedTactics from "@/components/SelectedTactics/SelectedTactics";
import { Button } from "@chakra-ui/react";

const TacticsComponent = () => {
  return (
    <>
      <Button
        colorScheme="red"
        className="ml-[5px]"
        onClick={() => window.history.back()}
      >
        Back to Pre Match
      </Button>

      <div className="text-3xl text-center font-semibold">
        <div className=" my-3 text-5xl">HISTORY MATCH REPORT</div>
        <div className="flex items-center justify-between bg-white p-2.5 mx-10 rounded-3xl">
          {/* Player 1 Image */}
          <div className="flex-1 flex flex-col items-center">
            <Image
              src="/player-logo.png"
              alt="Player 1"
              width={100} // maxWidth of 100px
              height={100} // Height will scale automatically to maintain the aspect ratio
              objectFit="contain" // Ensures the image does not exceed its container's dimensions
            />
            <p>Player 1</p>
          </div>

          {/* Match Details */}
          <div className="flex-[2] text-center space-y-2">
            <p className="text-[smaller]">LA LIGA FootyStars</p>
            <div className="flex items-center justify-center">
              <Image
                src="/eth-logo.png"
                alt="Ethereum"
                width={50} // Width set to 50px
                height={50} // Height should be set, but Next.js will maintain the aspect ratio
                objectFit="contain" // Ensures the image does not exceed its container's dimensions
              />
              <p className="mx-[20px] text-[24px]">2 - 1</p>
              <Image
                src="/eth-logo.png"
                alt="Ethereum"
                width={50} // Width set to 50px
                height={50} // Height should be set, but Next.js will maintain the aspect ratio
                objectFit="contain" // Ensures the image does not exceed its container's dimensions
              />
            </div>
            <p className="text-[smaller]">FULL TIME</p>
            <div className="flex justify-center items-center text-sm">
              <p className="mx-2">Referee: ZKML</p>
              <p className="mx-2">Attendance: Number of Validators</p>
              <p className="mx-2">Venue: On Chain</p>
            </div>
            <p className="text-[smaller]">SEPT 30 (TODAY) 7:45 PM</p>
          </div>

          {/* Player 2 Image */}
          <div className="flex-1 flex flex-col items-center">
            <Image
              src="/player-logo.png"
              alt="Player 2"
              width={100} // maxWidth of 100px
              height={100} // Height will scale automatically to maintain the aspect ratio
              objectFit="contain" // Ensures the image does not exceed its container's dimensions
            />

            <p>Player 2</p>
          </div>
        </div>
      </div>

      <div className=" pt-[20px] flex justify-center align-middle">
        {/* First Column */}
        <div className="mr-10">
          <Image src="/game img.jpg" alt="Game" width={450} height={100} />
          <h1>0x347F61FC3B2AC2B21518d660dE20398776d7C755</h1>
          <SelectedTactics def={[1, 0, 1]} off={[1, 1, 1]} />
        </div>
        <div className="w-px bg-black h-[auto]"></div> {/* Second Column */}
        <div className="ml-10">
          <Image src="/game img.jpg" alt="Game" width={450} height={100} />
          <h1>0x547F61FC3B2AC2B21518d660dE20398776d7C755</h1>
          <SelectedTactics def={[1, 1, 0]} off={[1, 0, 0]} />
        </div>
      </div>
    </>
  );
};

export default TacticsComponent;
