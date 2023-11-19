import React from "react";
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  StackDivider,
  Text,
  Select,
} from "@chakra-ui/react";
import Image from "next/image";

const TacticsComponent = () => {
  return (
<>
<div style={{ fontSize: '3em', fontWeight: 'bold', textAlign: 'center' }}>
      Score: 1:3
    </div>
      <div className="px-[100px] pt-[20px] flex justify-center align-middle">
        
      {/* First Column */}
      <div className="mr-10">
      <Image src="/game img.jpg" alt="Game" width={300} height={100}/>
        <h1>0x547F61FC3B2AC2B21518d660dE20398776d7C755</h1>
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
                  <Text>
                    Zone Marking
                  </Text>
                  <br />
                  <Heading size="xs" textTransform="uppercase">
                    Defensive Depth
                  </Heading>
                  <Text>
                    High Line
                  </Text>
                  <br />
                  <Heading size="xs" textTransform="uppercase">
                    Defensive Width
                  </Heading>
                  <Text>
                    Wide
                  </Text>
                </Box>
              </Stack>
            </CardBody>
          </Card>
          <br></br>
          <Card>
              <CardHeader>
                <Heading size="md">Offensive</Heading>
              </CardHeader>
              <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                  <Box className="flex flex-col">
                    <Heading size="xs" textTransform="uppercase">
                      Chance Creation
                    </Heading>
                    <Text>
                      Forward Runs
                    </Text>
                    <br />
                    <Heading size="xs" textTransform="uppercase">
                      Build-up Speed
                    </Heading>
                    <Text>
                      Fast
                    </Text>
                    <br />
                    <Heading size="xs" textTransform="uppercase">
                      Offensive Width
                    </Heading>
                    <Text>
                      Wide
                    </Text>
                  </Box>
                </Stack>
              </CardBody>
            </Card>
        </div>
      </div>

      {/* Second Column */}
      <div>
      <Image src="/game img.jpg" alt="Game" width={300} height={100}/>
<h1>0x547F61FC3B2AC2B21518d660dE20398776d7C755</h1>

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
                    <Text>
                    Zone Marking
                    </Text>
                  <br />
                  <Heading size="xs" textTransform="uppercase">
                    Defensive Depth
                  </Heading>
                  <Text>
                    Deep
                  </Text>
                  <br />
                  <Heading size="xs" textTransform="uppercase">
                    Defensive Width
                  </Heading>
                  <Text>
                    Wide
                  </Text>
                </Box>
              </Stack>
            </CardBody>
          </Card>
          <br></br>
          <Card>
              <CardHeader>
                <Heading size="md">Offensive</Heading>
              </CardHeader>
              <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                  <Box className="flex flex-col">
                    <Heading size="xs" textTransform="uppercase">
                      Chance Creation
                    </Heading>
                    <Text>
                      Posession
                    </Text>
                    <br />
                    <Heading size="xs" textTransform="uppercase">
                      Build-up Speed
                    </Heading>
                    <Text>
                      Fast
                    </Text>
                    <br />
                    <Heading size="xs" textTransform="uppercase">
                      Offensive Width
                    </Heading>
                    <Text>
                      Narrow
                    </Text>
                  </Box>
                </Stack>
              </CardBody>
            </Card>
            <br></br>
        </div>
      </div>
    </div>
   </>

  );
};

export default TacticsComponent;
