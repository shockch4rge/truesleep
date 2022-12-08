
import { Box, Flex, Heading, Highlight, VStack } from "@chakra-ui/react";

import { LoginForm } from "./components/LoginForm";

export const LoginPage: React.FC = () => {

    return (
        <>
            <VStack h="100vh">
                <Box w="full" pos="fixed" alignItems="start">
                    <Heading ml="6" my="6">TrueSleep</Heading>
                </Box>
                <Flex h="full" maxW="5xl" alignItems="center" direction={["column", "column", "column", "row"]}>
                    <Heading flex="3" size={["xl", "2xl"]} lineHeight="tall" textAlign={["center", "center", "center", "start"]}>
                        <Highlight query="good night's sleep" styles={{ color: "cyan.400" }}>
                            Never miss a good night's sleep ever again.
                        </Highlight>
                    </Heading>
                    <LoginForm />
                </Flex>
            </VStack>

        </>
    );
};