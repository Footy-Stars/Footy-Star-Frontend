import React from "react";
import Image from "next/image";
import SelectedTactics from "@/components/SelectedTactics/SelectedTactics";

const TacticsComponent = () => {
  return (
    <>
      <div style={{ fontSize: '3em',  textAlign: 'center' }}>
        HISTORY MATCH
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', padding: '10px', borderRadius: '10px' }}>
          {/* Player 1 Image */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src={"https://cdn-icons-png.flaticon.com/512/5281/5281503.png"} alt="Player 1" style={{ maxWidth: '100px', height: 'auto' }} />
            <p>Player 1</p>
          </div>

          {/* Match Details */}
          <div style={{ flex: 2, textAlign: 'center' }}>
            <p style={{ fontSize: 'smaller' }}>LA LIGA FootyStars</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={"https://cryptologos.cc/logos/ethereum-eth-logo.png"} alt="Ethereum" style={{ width: '50px', height: 'auto' }} />
              <p style={{ margin: '0 20px', fontSize: '24px' }}>2 - 1</p>
              <img src={"https://cryptologos.cc/logos/ethereum-eth-logo.png"} alt="Ethereum" style={{ width: '50px', height: 'auto' }} />
            </div>
            <p style={{ fontSize: 'smaller' }}>FULL TIME</p>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '14px' }}>
              <p style={{ margin: '0 5px' }}>Referee: ZKML</p>
              <p style={{ margin: '0 5px' }}>Attendance: Number of Validators</p>
              <p style={{ margin: '0 5px' }}>Venue: On Chain</p>
            </div>
            <p style={{ fontSize: 'smaller' }}>SEPT 30 (TODAY) 7:45 PM</p>
          </div>

          {/* Player 2 Image */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src={"https://cdn-icons-png.flaticon.com/512/5281/5281503.png"} alt="Player 2" style={{ maxWidth: '100px', height: 'auto' }} />
            <p>Player 2</p>
          </div>
        </div>
      </div>
      
      <div className="px-[100px] pt-[20px] flex justify-center align-middle">
            
        {/* First Column */}
        <div className="mr-10">
        <Image src="/game img.jpg" alt="Game" width={450} height={100}/>
          <h1>0x547F61FC3B2AC2B21518d660dE20398776d7C755</h1>
          <SelectedTactics def={[1,0,1]} off={[1,1,1]}/>
        </div>

        {/* Second Column */}
        <div>
        <Image src="/game img.jpg" alt="Game" width={450} height={100}/>
          <h1>0x547F61FC3B2AC2B21518d660dE20398776d7C755</h1>
          <SelectedTactics def={[1,1,0]} off={[1,0,0]}/>
        </div>

      </div>
    </>

  );
};

export default TacticsComponent;
