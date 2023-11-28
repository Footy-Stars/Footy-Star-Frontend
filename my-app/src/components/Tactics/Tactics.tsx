import { Card, CardBody, CardHeader, Heading,Stack, Box, Select,StackDivider } from '@chakra-ui/react'
import React from 'react'

export default function Tactics() {
  return (
    <div>
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
                <Heading size="md">Offensive</Heading>
              </CardHeader>
              <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                  <Box className="flex flex-col">
                    <Heading size="xs" textTransform="uppercase">
                      Chance Creation
                    </Heading>
                    <Select>
                      <option>Posession</option>
                      <option>Forward Runs</option>
                    </Select>
                    <br />
                    <Heading size="xs" textTransform="uppercase">
                      Build-up Speed
                    </Heading>
                    <Select>
                      <option> Slow</option>
                      <option>Fast</option>
                    </Select>
                    <br />
                    <Heading size="xs" textTransform="uppercase">
                      Offensive Width
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
  )
}
