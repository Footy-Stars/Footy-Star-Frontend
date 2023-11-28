

import React, { useEffect, useState } from "react";
import {
  Table,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

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


export default function Prematch(){
    const [matches, setMatches] = useState([]);

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
        } catch (error) {
          console.log('Error fetching data: ', error);
        }
      };
    
      useEffect(() => {
        fetchData();
      }, []);
    
      useEffect(() => {
        // fetchData();
        // console.log("tx",tx)
      }, [matches]);

    return(
    <div style={{ fontSize: '3em', fontWeight: 'bold', textAlign: 'center'}}>
        <h1>Prematch</h1>
        <h2>Opponent: {}</h2>

        <Button onClick={() => router.push("/team-configuration")}>
            Team Configuration
        </Button>
        <br/>
        <Button colorScheme="blue">
            Lock In Selection
        </Button>

    </div>
    )
}