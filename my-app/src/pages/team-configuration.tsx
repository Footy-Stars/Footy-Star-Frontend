import { CardPlayer } from "@/components/CardPlayer.tsx/CardPlayer";
import { DroppableField } from "@/components/DroppableField/DroppableField";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Select,
  Card,
  Text,
  CardBody,
  CardHeader,
  Heading,
  Box,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { DndProvider } from "react-dnd";
import Image from "next/image";
import { HTML5Backend } from "react-dnd-html5-backend";
import FootballPlayer from "../../public/FootballPlayer.json";
import MatchMaking from "../../public/MatchMaking.json";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { ethers } from "ethers";

interface Position {
  x: number;
  y: number;
}

interface RawMetadata {
  error: string | null;
  metadata: {
    name: string;
    image: string;
    attributes: {
      trait_type: string;
      value: string;
    }[];
  };
  tokenUri: string;
}

export default function RoomId() {
  const [strikerCard, setStrikerCard] = useState<number[]>([1, 2]);
  const [goalKeeperCard, setGoalKeeperCard] = useState<number[]>([]);
  const [players, setPlayers] = useState<{ [key: number]: RawMetadata | null }>(
    {
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
      6: null,
      7: null,
      8: null,
      9: null,
      10: null,
      // Ensure all player IDs from strikerCard and goalKeeperCard have initial positions as null
    }
  );

  const [availablePlayers, setAvailablePlayers] = useState([]); // List of available players

  const [selectedPlayer, setSelectedPlayer] = useState<string>("player 1");
  const [id, setId] = useState<number>(0);

  const [position1Player, setPosition1Player] = useState<number | null>(null);
  const [position2Player, setPosition2Player] = useState<number | null>(null);
  const [position3Player, setPosition3Player] = useState<number | null>(null);
  const [position4Player, setPosition4Player] = useState<number | null>(null);
  const [position5Player, setPosition5Player] = useState<number | null>(null);
  const [position6Player, setPosition6Player] = useState<number | null>(null);
  const [position7Player, setPosition7Player] = useState<number | null>(null);
  const [position8Player, setPosition8Player] = useState<number | null>(null);
  const [position9Player, setPosition9Player] = useState<number | null>(null);
  const [position10Player, setPosition10Player] = useState<number | null>(null);

  const sharedPositions = [
    { x: 100, y: 320 }, // Position 0
    { x: 245, y: 90 }, // Position 1
    { x: 245, y: 320 }, // Position 2
    { x: 245, y: 550 }, // Position 3
    { x: 460, y: 90 }, // Position 4
    { x: 460, y: 320 }, // Position 5
    { x: 460, y: 550 }, // Position 6
    { x: 620, y: 90 }, // Position 7
    { x: 620, y: 320 }, // Position 8
    { x: 620, y: 550 }, // Position 9
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(
    null
  );

  useEffect(() => {
    const logMouseClickPosition = (e: MouseEvent) => {
      if (droppableFieldRef.current) {
        const rect = droppableFieldRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the droppable area
        const y = e.clientY - rect.top; // y position within the droppable area
        console.log("Mouse click position:", { x, y }); // Log the mouse click position
      }
    };

    const droppableArea = droppableFieldRef.current;
    droppableArea?.addEventListener("click", logMouseClickPosition);

    // Clean up the event listener when the component unmounts
    return () => {
      droppableArea?.removeEventListener("click", logMouseClickPosition);
    };
  }, []);

  const droppableFieldRef = useRef<HTMLDivElement>(null);
  const { address } = useAccount();

  const handleOpenModal = (position: Position) => {
    setSelectedPosition(position);
    setIsModalOpen(true);
  };

  const handleModal = (id: number) => {
    setId(id);
    console.log(id);
    onOpen();
  };

  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_MATCH_MAKING_ADDRESS as `0x${string}`,
    abi: MatchMaking.abi,
    functionName: "quickMatch",
    args: [],
  });

  const { write, isLoading, isSuccess } = useContractWrite(config);

  const handlePlay = () => {
    if (write) write();
  };

  const handleClearField = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (availablePlayers.length === 0) {
      const options = {
        method: "GET",
        headers: { accept: "application/json" },
      };

      fetch(
        `https://eth-sepolia.g.alchemy.com/nft/v3/z6F5YIkN7g8W25b2_IJKT1iKKiEWsfvf/getNFTsForOwner?owner=${address}&contractAddresses[]=${process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS}&withMetadata=true&pageSize=100`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          const player = response.ownedNfts;
          console.log(response);
          setAvailablePlayers(player);
        })
        .catch((err) => console.error(err));
    }
  }, []);

  useEffect(() => {
    console.log(players);
  }, [players]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpen2,
    onOpen: OnOpen2,
    onClose: onClose2,
  } = useDisclosure();

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <div className="flex justify-center">
          <DroppableField>
            <div
              ref={droppableFieldRef}
              className="game-background w-[1440px] h-[700px]"
              onClick={(e) => {
                const x = e.nativeEvent.offsetX; // Relative x position within the div
                const y = e.nativeEvent.offsetY; // Relative y position within the div
                handleOpenModal({ x, y });
              }}
              style={{
                position: "relative", // Ensure the box is positioned relative to its container
              }}
            >
              {/* Left 3rd layer */}
              {sharedPositions.map((position, index) => (
                <div
                  key={index}
                  onClick={() => handleModal(index)} // Open modal with the specific position
                  style={{
                    position: "absolute",
                    border: "2px solid black",
                    width: "70px",
                    height: "70px",
                    top: `${position.y}px`,
                    left: `${position.x}px`,
                  }}
                >
                  {players[index] !== null ? (
                    <Image
                      src={players[index]?.metadata.image} // Replace with your soccer player image source
                      alt={`Soccer Player ${index + 1}`}
                      width={70}
                      height={70}
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </DroppableField>
        </div>
        <div className="px-[100px] pt-[20px]">
          <h1 className="text-[50px]">Tactics</h1>
          <div>
            <Card>
              <CardHeader>
                <Heading size="md">Defensive</Heading>
              </CardHeader>
              <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                  <Box className="flex flex-col">
                    <Heading size="xs" textTransform="uppercase">
                      Defensive Styles
                    </Heading>
                    <Select>
                      <option>Zone Marking</option>
                      <option>Pressure on Heavy Touch</option>
                    </Select>
                    <br />
                    <Heading size="xs" textTransform="uppercase">
                      Defensive Depth
                    </Heading>
                    <Select>
                      <option>High Line</option>
                      <option>Deep</option>
                    </Select>
                    <br />
                    <Heading size="xs" textTransform="uppercase">
                      Defensive Width
                    </Heading>
                    <Select>
                      <option>Narrow</option>
                      <option>Wide</option>
                    </Select>
                  </Box>
                </Stack>
              </CardBody>
            </Card>
          </div>
          <br />
          <div>
            <Card>
              <CardHeader>
                <Heading size="md">Defensive</Heading>
              </CardHeader>
              <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                  <Box className="flex flex-col">
                    <Heading size="xs" textTransform="uppercase">
                      Defensive Styles
                    </Heading>
                    <Select>
                      <option>Zone Marking</option>
                      <option>Pressure on Heavy Touch</option>
                    </Select>
                    <br />
                    <Heading size="xs" textTransform="uppercase">
                      Defensive Depth
                    </Heading>
                    <Select>
                      <option>High Line</option>
                      <option>Deep</option>
                    </Select>
                    <br />
                    <Heading size="xs" textTransform="uppercase">
                      Defensive Width
                    </Heading>
                    <Select>
                      <option>Narrow</option>
                      <option>Wide</option>
                    </Select>
                  </Box>
                </Stack>
              </CardBody>
            </Card>
          </div>
        </div>
        <div className="px-[100px] pt-[20px] flex justify-end">
          <Button
            paddingLeft={10}
            paddingRight={10}
            paddingTop={10}
            paddingBottom={10}
            onClick={OnOpen2}
          >
            <h1 className="text-[20px]">Play</h1>
          </Button>
          <Button
            colorScheme="red"
            paddingLeft={10}
            paddingRight={10}
            paddingTop={10}
            paddingBottom={10}
            onClick={handleClearField}
          >
            <h1 className="text-[20px]">Clear Field</h1>
          </Button>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Choose Player</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Select
              onChange={(e) => {
                const selectedPlayer = parseInt(e.target.value);
                console.log(selectedPlayer);
                console.log(availablePlayers[1].tokenId);
                console.log(availablePlayers[0].tokenId === selectedPlayer);
                const playerData = availablePlayers.find(
                  (player) => parseInt(player.tokenId) === selectedPlayer
                );
                console.log(playerData);
                switch (id) {
                  case 0:
                    setPosition1Player(selectedPlayer);
                    setPlayers({
                      ...players,
                      [id]: playerData?.raw,
                    });
                    break;
                  case 1:
                    setPosition2Player(selectedPlayer);
                    setPlayers({
                      ...players,
                      [id]: playerData?.raw,
                    });
                    break;
                  case 2:
                    setPosition3Player(selectedPlayer);
                    setPlayers({
                      ...players,
                      [id]: playerData?.raw,
                    });
                    break;
                  case 3:
                    setPosition4Player(selectedPlayer);
                    setPlayers({
                      ...players,
                      [id]: playerData?.raw,
                    });
                    break;
                  case 4:
                    setPosition5Player(selectedPlayer);
                    setPlayers({
                      ...players,
                      [id]: playerData?.raw,
                    });
                    break;
                  case 5:
                    setPosition6Player(selectedPlayer);
                    setPlayers({
                      ...players,
                      [id]: playerData?.raw,
                    });
                    break;
                  case 6:
                    setPosition7Player(selectedPlayer);
                    setPlayers({
                      ...players,
                      [id]: playerData?.raw,
                    });
                    break;
                  case 7:
                    setPosition8Player(selectedPlayer);
                    setPlayers({
                      ...players,
                      [id]: playerData?.raw,
                    });
                    break;
                  case 8:
                    setPosition9Player(selectedPlayer);
                    setPlayers({
                      ...players,
                      [id]: playerData?.raw,
                    });
                    break;
                  case 9:
                    setPosition10Player(selectedPlayer);
                    setPlayers({
                      ...players,
                      [id]: playerData?.raw,
                    });
                    break;
                  default:
                    break;
                }

                // Remove the selected player from the available players
                const updatedAvailablePlayers = availablePlayers.filter(
                  (player) => parseInt(player.tokenId) !== selectedPlayer
                );
                console.log("Selected Player", selectedPlayer);
                console.log("Updated Playes", updatedAvailablePlayers);
                // Update the available players list
                setAvailablePlayers(updatedAvailablePlayers);
              }}
            >
              {availablePlayers.map((player, index) => (
                <option key={index} value={player.tokenId}>
                  {player.raw?.metadata.attributes[0].value}
                </option>
              ))}
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpen2} onClose={onClose2}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <div className="flex text-[20px] justify-center px-[50px]">
              <h1>Your Elo:</h1>
              <p>1,405</p>
            </div>
            <div className="flex text-[20px] justify-center px-[50px]">
              <h1>Matching Tier:</h1>
              <p>Division 9</p>
            </div>
            <div className="flex  text-[20px] justify-center px-[50px]">
              <h1>Wager Amount:</h1>
              <p>0.005 ETH</p>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handlePlay}>
              CONFIRM
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </DndProvider>
  );
}
