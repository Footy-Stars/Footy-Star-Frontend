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
} from "@chakra-ui/react";

export default function ManagerProfile() {
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
                  25
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Win
                </Heading>
                <Text pt="2" fontSize="sm">
                  2
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Loses
                </Heading>
                <Text pt="2" fontSize="sm">
                  3
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Win Rate
                </Heading>
                <Text pt="2" fontSize="sm">
                  41%
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Elo Division
                </Heading>
                <Text pt="2" fontSize="sm">
                  1,405
                </Text>
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </div>
      <div>
        <h1 className="text-[30px]">Match History</h1>
      </div>
      <div className="flex">
        <Card>
          <CardHeader>
            <Heading size="md">Opponent</Heading>
          </CardHeader>

          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Summary
                </Heading>
                <Text pt="2" fontSize="sm">
                  View a summary of all your clients over the last month.
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Overview
                </Heading>
                <Text pt="2" fontSize="sm">
                  Check out the overview of your clients.
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Analysis
                </Heading>
                <Text pt="2" fontSize="sm">
                  See a detailed analysis of all your business clients.
                </Text>
              </Box>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <Heading size="md">Scoreline</Heading>
          </CardHeader>

          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Summary
                </Heading>
                <Text pt="2" fontSize="sm">
                  View a summary of all your clients over the last month.
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Overview
                </Heading>
                <Text pt="2" fontSize="sm">
                  Check out the overview of your clients.
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Analysis
                </Heading>
                <Text pt="2" fontSize="sm">
                  See a detailed analysis of all your business clients.
                </Text>
              </Box>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <Heading size="md">Result</Heading>
          </CardHeader>

          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Summary
                </Heading>
                <Text pt="2" fontSize="sm">
                  View a summary of all your clients over the last month.
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Overview
                </Heading>
                <Text pt="2" fontSize="sm">
                  Check out the overview of your clients.
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Analysis
                </Heading>
                <Text pt="2" fontSize="sm">
                  See a detailed analysis of all your business clients.
                </Text>
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
