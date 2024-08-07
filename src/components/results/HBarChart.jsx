import { useContext } from "react";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    Tooltip,
    XAxis, YAxis,
} from "recharts";
import { ChartContext } from "../../routes/LiftResult";
import { CustomTooltip } from "../CustomTooltip";

const HBarChart = () => {

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
                    tick={{ fill: "#fff", fontSize: `${AxisFontSize}` }}
                />
                <YAxis
                    type="category" dataKey="name"
                    width={HAxisWidth}
                    tick={{ fill: "#fff", fontSize: `${AxisFontSize}px`}}
                />
                <Bar
                    dataKey="pr"
                    fill={theme.accent}
                    barSize={50}
                />
                <Tooltip
                    content={
                        <CustomTooltip
                            chartType={sessionStorage.getItem("chartType")}
                        />
                    }
                    cursor={{ fill: "#163cba60" }}
                />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default HBarChart;