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
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { DndProvider } from "react-dnd";
import Image from "next/image";
import { HTML5Backend } from "react-dnd-html5-backend";
import MatchMaking from "../../public/MatchMaking.json";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import Tactics from "@/components/Tactics/Tactics";
// import { ethers } from "ethers";

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
  const [field, setField] = useState([null, null, null, null, null]);
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
  const [selectedPlayerTokenIds, setSelectedPlayerTokenIds] = useState<
    Set<number>
  >(new Set());

  const toast = useToast();

  const [availablePlayers, setAvailablePlayers] = useState([]); // List of available players

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

  const handleSelectPlayer = (selectedPlayer: any) => {
    const selectedPlayerTokenId = selectedPlayer.tokenId;

    // Check if the selected player has already been added to the field
    if (selectedPlayerTokenIds.has(selectedPlayerTokenId)) {
      // Player is already on the field, do not add duplicates
      toast({
        title: "Duplicate Player.",
        description: "No Duplicate Players Allowed.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });

      return;
    }

    // Update the selected position with the chosen player
    const updatedPlayers = { ...players };
    updatedPlayers[id] = selectedPlayer.raw;
    setPlayers(updatedPlayers);

    // Add the previous player back to available players
    if (players[id] !== null) {
      setAvailablePlayers([...availablePlayers, { raw: players[id] }]);
    }

    // Remove the selected player from available players
    const updatedAvailablePlayers = availablePlayers.filter(
      (player) => parseInt(player.tokenId) !== selectedPlayerTokenId
    );
    setAvailablePlayers(updatedAvailablePlayers);

    // Add the selected player's tokenId to the set
    setSelectedPlayerTokenIds(
      new Set(selectedPlayerTokenIds).add(selectedPlayerTokenId)
    );
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

  const handleSaveConfiguration = () => {
    const nullCount = Object.values(players).filter(
      (player) => player === null
    ).length;

    if (nullCount > 5) {
      // Display an error message or take appropriate action
      toast({
        title: "Incomplete Configuration.",
        description: "Please fill the field with players.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    } else {
      // Continue with saving the configuration
      toast({
        title: "Configuration Saved.",
        description: "Your configuration has been saved.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      // Add your logic to save the configuration here
      //TODO
    }
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
          console.log(response.ownedNfts);
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
            {sharedPositions.map((position, index) => {
              console.log(players[index]);
              return (
                <div
                  className="rounded"
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
                  {players[index] !== null && players[index] !== undefined ? (
                    <Image
                      src={players[index]?.metadata.image}
                      alt="Player"
                      width={70}
                      height={70}
                    />
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>

        <Tactics />

        <div className="px-[100px] pt-[20px] flex justify-end">
          <Button
            paddingLeft={10}
            paddingRight={10}
            paddingTop={10}
            paddingBottom={10}
            marginRight={10}
            onClick={handleSaveConfiguration}
          >
            <h1 className="text-[20px]">Save Configuration</h1>
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
                const selectedPlayerId = parseInt(e.target.value);
                const selectedPlayer = availablePlayers.find(
                  (player) => parseInt(player.tokenId) === selectedPlayerId
                );
                if (selectedPlayer) {
                  handleSelectPlayer(selectedPlayer);
                }
              }}
            >
              {availablePlayers.length < 1 ? (
                <option>no players</option>
              ) : (
                availablePlayers.map((player, index) => (
                  <option key={index} value={player.tokenId}>
                    {player.raw?.metadata.attributes[0].value}
                  </option>
                ))
              )}
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
