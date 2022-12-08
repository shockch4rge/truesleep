import { useNavigate } from "react-router-dom";

import { Button, Input, Tab, TabList, TabPanel, TabPanels, Tabs, VStack } from "@chakra-ui/react";

import { RoutePaths } from "../../../../util/routes";

export const LoginForm: React.FC = () => {
    const navigate = useNavigate();

    return <Tabs flex="2" isFitted variant="soft-rounded" colorScheme="cyan">
        <TabList gap="2" px="4">
            <Tab>Login</Tab>
            <Tab>Register</Tab>
        </TabList>
        <TabPanels>
            <TabPanel>
                <VStack spacing="4">
                    <Input placeholder="Email">
                    </Input>
                    <Input placeholder="Password">
                    </Input>
                    <Button w="full" variant="primary" onClick={() => navigate(RoutePaths.Dashboard, { replace: true })}>
                        Login
                    </Button>
                </VStack>
            </TabPanel>
            <TabPanel>
                <VStack spacing="4">
                    <Input placeholder="Email">
                    </Input>
                    <Input placeholder="Password">
                    </Input>
                    <Button w="full" variant="primary">
                        Register
                    </Button>
                </VStack>
            </TabPanel>
        </TabPanels>
    </Tabs>;
};