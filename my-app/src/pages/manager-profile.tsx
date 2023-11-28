import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td,useColorModeValue } from '@chakra-ui/react';

import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { useAccount } from "wagmi";

const APIURL = 'https://api.studio.thegraph.com/query/58768/testmatchmaking/v1'

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
`
const client = new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache(),
})

const handleNaN = (value: number): number => {
  // Check if the value is NaN and change it to 0
  return isNaN(value) ? 0 : value;
};

export default function ManagerProfile() {
  const { address, connector, isConnected } = useAccount()

  const [matches, setMatches] = useState([]);
  const [tx, setTx] = useState([]);

  const user = "0xbe92f2692f42580300fd8d0ee198b5bbbe303e78";

  const fetchData = async () => {
    try {
      const { data } = await client.query({
        query: gql(query),
      });

      console.log("data", data)
      const filteredMatches = data.winningResults.filter(
        (match) =>
          match.matchDetail_player1.toLowerCase() === user.toLowerCase() ||
          match.matchDetail_player2.toLowerCase() === user.toLowerCase()
      );
      
      setMatches(filteredMatches);
      setTx(data)
    } catch (error) {
      console.log('Error fetching data: ', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // fetchData();
    console.log("tx",tx)
  }, [matches]);

  //get win rate
  const winRate=(matches.filter(match => match.matchDetail_winner === user).length/matches.length)*100;

  //get win
  const win=matches.filter(match => match.matchDetail_winner === user).length

  //get lose
  const loss=matches.filter(match => match.matchDetail_winner !== user).length
  console.log(loss)
  console.log(matches)

  //get match history: opponent, scoreline, result
  console.log(win, loss, winRate)


  const MatchTable = ({ data }) => {
    console.log("data, ", data)
    const getRowColor = (result) => {
      switch (result) {
        case 'Win':
          return 'green.200';
        case 'Loss':
          return 'red.200';
        default:
          return 'white';
      }
    };
  
    return (
      <Table variant="simple">
        <Tbody>
          <Tr>
            <Th>Opponent</Th>
            <Th>Score</Th>
            <Th>Result</Th>
          </Tr>
          {data.map((match, index) => (
            <Tr key={index} bg={useColorModeValue(getRowColor(match.result), '')}>
              <Td>{ match.matchDetail_player1.toLowerCase() === user.toLowerCase()? 
               match.matchDetail_player2:
               match.matchDetail_player1}</Td>
              <Td>{tx.winningScores.filter(score => score.MatchMaking_id === match.MatchMaking_id)[0].score1
              +" : "+ tx.winningScores.filter(score => score.MatchMaking_id === match.MatchMaking_id)[0].score2
              }</Td>
              <Td>{match.matchDetail_is_draw? "Draw":match.matchDetail_winner === user?"Win":"Loss"
              }</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    );
  };

  return (
    <div className="px-[100px]">
      <div>
        <h1 className="text-[30px]">Manager Stats</h1>
      </div>
      <div>
        <Card>
          <CardHeader>
            <Heading size="md"> Overall Result</Heading>
          </CardHeader>

          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Total Matches
                </Heading>
                <Text pt="2" fontSize="sm">
                  {matches.length}
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Win
                </Heading>
                <Text pt="2" fontSize="sm">
                  {win}
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Loses
                </Heading>
                <Text pt="2" fontSize="sm">
                  {loss}
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Win Rate
                </Heading>
                <Text pt="2" fontSize="sm">
                  {handleNaN(winRate)}%
                </Text>
              </Box>
              <Box>
                {/* <Heading size="xs" textTransform="uppercase">
                  Elo Division
                </Heading>
                <Text pt="2" fontSize="sm">
                  1,405
                </Text> */}
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </div>
      <div>
        <h1 className="text-[30px]">Match History</h1>
      </div>
      <div className="flex">
        {matches.length>0?
              <MatchTable data={matches} />:
              <>No Matches Played</>
        }
      </div>
      <br/>
    </div>
  );
}
