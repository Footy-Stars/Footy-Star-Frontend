import router from "next/router";
import React from "react";

interface OpponentHistoryProps {
  name: string;
  address: string;
  wins: number;
  losses: number;
  draws: number;
  history: number[]; //[{id:1, score1:1, score2:2, MatchMaking_id:1, result: 1/0}]
}

const OpponentHistory: React.FC<OpponentHistoryProps> = () => {
  const matches = [
    { id: 1, score: "1-2", status: "L" },
    { id: 2, score: "1-1", status: "D" },
    { id: 3, score: "2-1", status: "W" },
    { id: 4, score: "0-2", status: "L" },
    { id: 5, score: "2-2", status: "D" },
    { id: 6, score: "2-0", status: "W" },
    { id: 7, score: "1-2", status: "L" },
    { id: 8, score: "1-1", status: "D" },
    { id: 9, score: "2-1", status: "W" },
    { id: 10, score: "0-2", status: "L" },
  ];
  const handleClick = (id: any) => {
    // console.log(`Navigating to details of match ${id}`);
    router.push("/match-report");
  };

  return (
    <div>
      <h1 className="text-[40px]">Match History</h1>
      <ul className="list-none max-h-[150px] overflow-y-auto w-[600px] text-[20px]">
        {matches.map((match) => (
          <li
            key={match.id}
            onClick={() => handleClick(match.id)}
            className=" cursor-pointer p-[5px] bg-white rounded-b-md my-[5px]"
          >
            <span>{match.score}</span>,{" "}
            {match.status === "W" ? (
              <span className=" text-[green]">Win</span>
            ) : match.status === "D" ? (
              <span className="">Draw</span>
            ) : (
              <span className=" text-[red]">Lose</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OpponentHistory;
