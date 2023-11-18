// import { CardPlayer } from "@/components/CardPlayer.tsx/CardPlayer";
// import { DroppableField } from "@/components/DroppableField/DroppableField";
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalCloseButton,
//   ModalBody,
//   ModalFooter,
//   Button,
//   useDisclosure,
//   Select,
// } from "@chakra-ui/react";
// import React, { useEffect, useRef, useState } from "react";
// import { DndProvider } from "react-dnd";
// import Image from "next/image";
// import { HTML5Backend } from "react-dnd-html5-backend";

// interface Position {
//   x: number;
//   y: number;
// }

// export default function RoomId() {
//   const [strikerCard, setStrikerCard] = useState<number[]>([1, 2]);
//   const [goalKeeperCard, setGoalKeeperCard] = useState<number[]>([]);
//   const [players, setPlayers] = useState<{ [key: number]: Position | null }>({
//     1: null,
//     2: null,
//     3: null,
//     4: null,
//     5: null,
//     6: null,
//     7: null,
//     8: null,
//     9: null,
//     10: null,
//     // Ensure all player IDs from strikerCard and goalKeeperCard have initial positions as null
//   });

//   const [availablePlayers, setAvailablePlayers] = useState([1, 2, 3, 4, 5]); // List of available players

//   const [selectedPlayer, setSelectedPlayer] = useState<string>("player 1");
//   const [id, setId] = useState<number>(0);

//   const [position1Player, setPosition1Player] = useState<number | null>(null);
//   const [position2Player, setPosition2Player] = useState<number | null>(null);
//   const [position3Player, setPosition3Player] = useState<number | null>(null);
//   const [position4Player, setPosition4Player] = useState<number | null>(null);
//   const [position5Player, setPosition5Player] = useState<number | null>(null);
//   const [position6Player, setPosition6Player] = useState<number | null>(null);
//   const [position7Player, setPosition7Player] = useState<number | null>(null);
//   const [position8Player, setPosition8Player] = useState<number | null>(null);
//   const [position9Player, setPosition9Player] = useState<number | null>(null);
//   const [position10Player, setPosition10Player] = useState<number | null>(null);

//   const sharedPositions = [
//     { x: 100, y: 320 }, // Position 0
//     { x: 245, y: 90 }, // Position 1
//     { x: 245, y: 320 }, // Position 2
//     { x: 245, y: 550 }, // Position 3
//     { x: 460, y: 90 }, // Position 4
//     { x: 460, y: 320 }, // Position 5
//     { x: 460, y: 550 }, // Position 6
//     { x: 620, y: 90 }, // Position 7
//     { x: 620, y: 320 }, // Position 8
//     { x: 620, y: 550 }, // Position 9
//   ];

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedPosition, setSelectedPosition] = useState<Position | null>(
//     null
//   );

//   useEffect(() => {
//     const logMouseClickPosition = (e: MouseEvent) => {
//       if (droppableFieldRef.current) {
//         const rect = droppableFieldRef.current.getBoundingClientRect();
//         const x = e.clientX - rect.left; // x position within the droppable area
//         const y = e.clientY - rect.top; // y position within the droppable area
//         console.log("Mouse click position:", { x, y }); // Log the mouse click position
//       }
//     };

//     const droppableArea = droppableFieldRef.current;
//     droppableArea?.addEventListener("click", logMouseClickPosition);

//     // Clean up the event listener when the component unmounts
//     return () => {
//       droppableArea?.removeEventListener("click", logMouseClickPosition);
//     };
//   }, []);

//   const droppableFieldRef = useRef<HTMLDivElement>(null);

//   const handleOpenModal = (position: Position) => {
//     setSelectedPosition(position);
//     setIsModalOpen(true);
//   };

//   const handleModal = (id: number) => {
//     setId(id);
//     console.log(id);
//     onOpen();
//   };

//   const { isOpen, onOpen, onClose } = useDisclosure();

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div>
//         <div className="flex justify-center">
//           <DroppableField>
//             <div
//               ref={droppableFieldRef}
//               className="game-background w-[1440px] h-[700px]"
//               onClick={(e) => {
//                 const x = e.nativeEvent.offsetX; // Relative x position within the div
//                 const y = e.nativeEvent.offsetY; // Relative y position within the div
//                 handleOpenModal({ x, y });
//               }}
//               style={{
//                 position: "relative", // Ensure the box is positioned relative to its container
//               }}
//             >
//               {/* Left 3rd layer */}
//               {sharedPositions.map((position, index) => (
//                 <div
//                   key={index}
//                   onClick={() => handleModal(index)} // Open modal with the specific position
//                   style={{
//                     position: "absolute",
//                     border: "2px solid black",
//                     width: "70px",
//                     height: "70px",
//                     top: `${position.y}px`,
//                     left: `${position.x}px`,
//                   }}
//                 >
//                   {players[index] !== null ? (
//                     <Image
//                       src="/SoccerCard.png" // Replace with your soccer player image source
//                       alt={`Soccer Player ${index + 1}`}
//                       width={70}
//                       height={70}
//                     />
//                   ) : null}
//                 </div>
//               ))}
//             </div>
//           </DroppableField>
//           <div>
//             <Button
//               onClick={() => {
//                 console.log(position1Player);
//                 console.log(position2Player);
//                 console.log(position3Player);
//               }}
//             >
//               Submit
//             </Button>
//           </div>
//         </div>
//       </div>
//       <Modal isOpen={isOpen} onClose={onClose}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Choose Player</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             <Select
//               onChange={(e) => {
//                 const selectedPlayer = parseInt(e.target.value);
//                 console.log(selectedPlayer);
//                 switch (id) {
//                   case 0:
//                     setPosition1Player(selectedPlayer);
//                     setPlayers({
//                       ...players,
//                       [id]: selectedPlayer,
//                     });
//                     break;
//                   case 1:
//                     setPosition2Player(selectedPlayer);
//                     setPlayers({
//                       ...players,
//                       [id]: selectedPlayer,
//                     });
//                     break;
//                   case 2:
//                     setPosition3Player(selectedPlayer);
//                     setPlayers({
//                       ...players,
//                       [id]: selectedPlayer,
//                     });
//                     break;
//                   case 3:
//                     setPosition4Player(selectedPlayer);
//                     setPlayers({
//                       ...players,
//                       [id]: selectedPlayer,
//                     });
//                     break;
//                   case 4:
//                     setPosition5Player(selectedPlayer);
//                     setPlayers({
//                       ...players,
//                       [id]: selectedPlayer,
//                     });
//                     break;
//                   case 5:
//                     setPosition6Player(selectedPlayer);
//                     setPlayers({
//                       ...players,
//                       [id]: selectedPlayer,
//                     });
//                     break;
//                   case 6:
//                     setPosition7Player(selectedPlayer);
//                     setPlayers({
//                       ...players,
//                       [id]: selectedPlayer,
//                     });
//                     break;
//                   case 7:
//                     setPosition8Player(selectedPlayer);
//                     setPlayers({
//                       ...players,
//                       [id]: selectedPlayer,
//                     });
//                     break;
//                   case 8:
//                     setPosition9Player(selectedPlayer);
//                     setPlayers({
//                       ...players,
//                       [id]: selectedPlayer,
//                     });
//                     break;
//                   case 9:
//                     setPosition10Player(selectedPlayer);
//                     setPlayers({
//                       ...players,
//                       [id]: selectedPlayer,
//                     });
//                     break;
//                   default:
//                     break;
//                 }

//                 // Remove the selected player from the available players
//                 const updatedAvailablePlayers = availablePlayers.filter(
//                   (player) => player !== selectedPlayer
//                 );
//                 // Update the available players list
//                 // based on the field positions that have been assigned players
//                 setAvailablePlayers(updatedAvailablePlayers);
//               }}
//             >
//               {availablePlayers.map((player) => (
//                 <option key={player} value={player}>
//                   Player {player}
//                 </option>
//               ))}
//             </Select>
//           </ModalBody>

//           <ModalFooter>
//             <Button colorScheme="blue" mr={3} onClick={onClose}>
//               Close
//             </Button>
//             <Button variant="ghost">Secondary Action</Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </DndProvider>
//   );
// }
