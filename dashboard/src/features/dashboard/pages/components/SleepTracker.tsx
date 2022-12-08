import { Tracking, TrackingBlock } from "@tremor/react";

const colors = ["green", "yellow", "red"] as const;

export const SleepTracker: React.FC = () => {
    return <>
        <Tracking>
            {Array.from({ length: 31 }).map((val, index) => 
                <TrackingBlock
                    key={index}
                    color={colors[Math.floor(Math.random() * 3)]}
                />
            )}
        </Tracking>
    </>;
};