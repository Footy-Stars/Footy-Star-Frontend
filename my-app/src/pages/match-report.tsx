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
    <div className="px-[100px] pt-[20px] flex">
      {/* First Column */}
      <div className="mr-10">
      <Image src="/game img.jpg" alt="Game" width={300} height={100}/>

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
        </div>
      </div>

      {/* Second Column */}
      <div>
      <Image src="/game img.jpg" alt="Game" width={300} height={100}/>

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
    </div>
  );
};

export default TacticsComponent;
