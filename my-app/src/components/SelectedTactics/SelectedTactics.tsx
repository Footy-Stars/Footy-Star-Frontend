import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import React from "react";

interface SelectedTacticsProps {
  def: number[];
  off: number[];
}

const SelectedTactics: React.FC<SelectedTacticsProps> = ({ def, off }) => {
  return (
    <div>
      <h1 className="text-[50px]">Tactics</h1>
      <div>
        <Card>
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
        <br></br>
      </div>
    </div>
  );
};

export default SelectedTactics;
