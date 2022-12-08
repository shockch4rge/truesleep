import { DateTime } from "luxon";

import { Box, Center, Text } from "@chakra-ui/react";
import { LineChart } from "@tremor/react";

interface SleepGraphProps {
    dates: number[];
}

export const SleepGraph: React.FC<SleepGraphProps> = ({dates}) => {
    const data = dates.reverse().map(date => ({
        "Date": DateTime.fromMillis(date).toFormat("LLL dd"),
        "Hours Slept": Math.floor(Math.random() * 10 + 2),
    }));

    return <>
        <Text>Hours Slept in May</Text>
        <LineChart
            data={data}
            dataKey="Date"
            categories={["Hours Slept"]}
            colors={["blue"]}
            marginTop="mt-6"         
            yAxisWidth="w-10"
        />
    </>;

};