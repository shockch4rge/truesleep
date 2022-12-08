import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import TimePicker from "react-time-picker";

import { Avatar, Box, Button, Flex, Heading, Input, Text } from "@chakra-ui/react";

import { useGetSleepDetailsQuery, useLazyTestQuery, useResetStreakMutation } from "../../../api";
import { SleepGraph } from "./components/SleepGraph";
import { SleepTracker } from "./components/SleepTracker";

export const DashboardPage: React.FC = () => {
    const [resetStreak] = useResetStreakMutation();
    const { data: sleepDetails, isLoading } = useGetSleepDetailsQuery("user1");
    const [test, { data }] = useLazyTestQuery();
    const [wakeTime, setWakeTime] = useState<string>("10:00");

    useEffect(() => {
        console.log(sleepDetails);
    }, [sleepDetails]);

    const isSufficientSleep = () => {        
        const awake = DateTime.fromFormat(wakeTime, "HH:mm").toJSDate();
        return (awake.getTime() - Date.now()) / 1000 / 60 / 60 >= 8;
    };

    return <Box h="100vh" w="full" p="24">
        <Flex justifyContent="space-between" mb="4">
            <Heading>Your sleep streak is: {0}</Heading>
            <Avatar size="lg"/>
        </Flex>
        <Box w="full">
            {isLoading ? <Text>Loading...</Text> : <SleepGraph dates={sleepDetails?.map(detail => detail.endedAt) || []} />}
        </Box>
        <Box my="6">
            <Heading mb="4">
                Current Time
            </Heading>
            <TimePicker disableClock clearIcon={null} disabled value={new Date()} />
        </Box>
        <Box my="6">
            <Heading mb="4">
                Wake up
            </Heading>
            <TimePicker disableClock clearIcon={null} onChange={e => setWakeTime(e as string)} value={wakeTime} />
            
        </Box>
        <Button onClick={() => {}}>
            Set Alarms
        </Button>
        <Text>
            {isSufficientSleep() ? "Good job!" : "Try to get more sleep!"}
        </Text>
    </Box>;
};