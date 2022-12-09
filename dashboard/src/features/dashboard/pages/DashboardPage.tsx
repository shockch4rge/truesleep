import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import TimePicker from "react-time-picker";

import { Avatar, Box, Button, Flex, Heading, Input, Text } from "@chakra-ui/react";

import { useGetSleepDetailsQuery, useResetStreakMutation, useSetAlarmMutation } from "../../../api";
import { SleepGraph } from "./components/SleepGraph";
import { SleepTracker } from "./components/SleepTracker";

export const DashboardPage: React.FC = () => {
    const [resetStreak] = useResetStreakMutation();
    const [setAlarm] = useSetAlarmMutation();
    const { data: sleepDetails, isLoading } = useGetSleepDetailsQuery("user1");
    const [wakeUpTime, setWakeUpTime] = useState<string>("10:00");

    const isSufficientSleep = () => {        
        const awake = DateTime.fromFormat(wakeUpTime, "HH:mm").toJSDate();
        return (awake.getTime() - Date.now()) / 1000 / 60 / 60 >= 8;
    };

    console.log(DateTime.fromFormat(wakeUpTime, "HH:mm").toMillis());
    

    return <Box h="100vh" w="full" p="24">
        <Flex justifyContent="space-between" mb="4">
            <Heading>Your sleep streak is: {0}</Heading>
            <Avatar size="lg"/>
        </Flex>
        <Box w="full">
            {isLoading ? <Text>Loading...</Text> : <SleepGraph dates={sleepDetails?.map(detail => detail.endedAt) || []} />}
        </Box>
        
        <Flex justify="space-around" align="center">
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
                <TimePicker disableClock clearIcon={null} onChange={e => setWakeUpTime(e as string)} value={wakeUpTime} />
            </Box>
            <Box>
                <Button onClick={() => setAlarm({
                    userId: "user1",
                    wakeUpTime: DateTime.fromFormat(wakeUpTime, "HH:mm").toMillis(),
                    startTime: Date.now(),
                })}>
            Set Alarm
                </Button>
                <Text mt="4">
                    {isSufficientSleep() ? "Good job!" : "Try to get more sleep!"}
                </Text>
            </Box>

        </Flex>
        
    
    </Box>;
};