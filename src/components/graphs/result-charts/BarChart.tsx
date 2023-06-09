import { useContext, useEffect } from "react";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    Tooltip,
    XAxis, YAxis,
    CartesianGrid,
} from "recharts";
import { ChartContext } from "../../../routes/LiftsResults";
import { AppContext } from "../../context/AppContext";
import { CustomTooltip } from "../CustomTooltip";

const BarChartComponent = () => {

    const {
        exercises,
        chartHeight,
        theme,
        AxisFontSize,
        AxisWidth,
    } = useContext(ChartContext);

    return (
        <ResponsiveContainer width="99%" height={chartHeight}>
            <BarChart data={exercises}>
                <XAxis
                    type="category" dataKey="name"
                    tick={{
                        fontSize: `${AxisFontSize}px`, 
                        fill: "#000",
                    }}
                />
                <YAxis
                    type="number" dataKey="pr"
                    tick={{ fill: "#000", fontSize: `${AxisFontSize}` }}
                    width={AxisWidth}
                />
                <Bar
                    dataKey="pr"
                    fill={theme.richBlackDark}
                />
                <Tooltip
                    content={
                        <CustomTooltip
                            chartType={sessionStorage.getItem("chartType")}
                        />
                    }
                    cursor={{ fill: "#00000030" }}
                />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default BarChartComponent;