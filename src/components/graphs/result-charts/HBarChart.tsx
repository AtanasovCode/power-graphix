import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "styled-components";
import useWindowSize from "../../hooks/UseWindow";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    Tooltip,
    XAxis, YAxis,
} from "recharts";
import { ChartContext } from "../../../routes/LiftsResults";
import { CustomTooltip } from "../CustomTooltip";

const HBarChartComponent = () => {

    const {
        exercises,
        chartHeight,
        theme,
        AxisFontSize,
        HAxisWidth,
    } = useContext(ChartContext);

    return (
        <ResponsiveContainer width="99%" height={chartHeight}>
            <BarChart 
                data={exercises} 
                layout="vertical"
                margin={{ top: 0, right: 20, bottom: 0, left: 20 }}
            >
                <XAxis
                    type="number" dataKey="pr"
                    tick={{ fill: "#000", fontSize: `${AxisFontSize}` }}
                />
                <YAxis
                    type="category" dataKey="name"
                    width={HAxisWidth}
                    tick={{ fill: "#000", fontSize: `${AxisFontSize}px`}}
                />
                <Bar
                    dataKey="pr"
                    fill={theme.richBlackDark}
                    barSize={50}
                />
                <Tooltip
                    content={
                        <CustomTooltip
                            chartType={sessionStorage.getItem("chartType")}
                        />
                    }
                    cursor={{fill: "#00000030"}}
                />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default HBarChartComponent;