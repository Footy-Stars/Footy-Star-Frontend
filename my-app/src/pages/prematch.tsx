import React, { useEffect, useState } from "react";
import {
  Text,
  Button,
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import router from "next/router";
import { off } from "process";
import OpponentHistory from "@/components/OpponentHistory/OpponentHistory";

const APIURL = "https://api.studio.thegraph.com/query/58768/testmatchmaking/v1";

const query = `
  query {
    winningScores {
      id
      score1
      score2
      MatchMaking_id
    }
    winningResults {
      id
      matchDetail_winner
      matchDetail_player1
      matchDetail_player2
      wagerResult_amount2
      wagerResult_amount1
      MatchMaking_id
      matchDetail_is_draw
    }
  }
`;
const client = new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache(),
});

type TeamConfigTacticsProps = {
  def: number[];
  off: number[];
};

const TeamConfigTactics: React.FC<TeamConfigTacticsProps> = ({ def, off }) => {
  return (
    <div>
      <h1 className="text-[40px]">Tactics</h1>
      <div className="flex justify-center items-center space-x-4">
        <Card className="w-60">
          <CardHeader>
            <Heading size="md">Defensive</Heading>
          </CardHeader>
          <CardBody>
            <Stack divider={<StackDivider />} spacing="1">
              <Box className="flex flex-col">
                <Heading size="xs" textTransform="uppercase">
                  Defensive Styles
                </Heading>
                <Text>
                  {def[0] === 0 ? "Zone Marking" : "Pressure on Heavy Touch"}
                </Text>
                <br />
                <Heading size="xs" textTransform="uppercase">
                  Defensive Depth
                </Heading>
                <Text>{def[1] === 0 ? "High Line" : "Deep"}</Text>
                <br />
                <Heading size="xs" textTransform="uppercase">
                  Defensive Width
                </Heading>
                <Text>{def[2] === 0 ? "Narrow" : "Wide"}</Text>
              </Box>
            </Stack>
          </CardBody>
        </Card>

        <Card className="w-60">
          <CardHeader>
            <Heading size="md">Offensive</Heading>
          </CardHeader>
          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Box className="flex flex-col">
                <Heading size="xs" textTransform="uppercase">
                  Chance Creation
                </Heading>
                <Text>{off[0] === 0 ? "Posession" : "Forward Runs"}</Text>
                <br />
                <Heading size="xs" textTransform="uppercase">
                  Build-up Speed
                </Heading>
                <Text>{off[1] === 0 ? "Slow" : "Fast"}</Text>
                <br />
                <Heading size="xs" textTransform="uppercase">
                  Offensive Width
                </Heading>
                <Text>{off[2] === 0 ? "Narrow" : "Wide"}</Text>
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default function Prematch() {
  const [matches, setMatches] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await client.query({
        query: gql(query),
      });

      console.log("data", data);
      const filteredMatches = data.winningResults.filter(
        (match) =>
          match.matchDetail_player1.toLowerCase() === user.toLowerCase() ||
          match.matchDetail_player2.toLowerCase() === user.toLowerCase()
      );

      setMatches(filteredMatches);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // fetchData();
    // console.log("tx",tx)
  }, [matches]);

  return (
    <div className=" text-center space-y-3 bg-slate-200 rounded-3xl">
      <div className="text-[2em] font-bold">
        <h1>Prematch</h1>
        <h2>Opponent: {}</h2>
      </div>

      {/* match history component */}
      <div className="grid place-items-center">
        <OpponentHistory />
      </div>

      {/* team config component */}
      <div className="grid place-items-center">
        <TeamConfigTactics def={[1, 1, 1]} off={[0, 0, 0]} />
      </div>

      <Button onClick={() => router.push("/team-configuration")}>
        Team Configuration
      </Button>
      <br />
      <Button colorScheme="blue">Lock In Selection</Button>
    </div>
  );
}
