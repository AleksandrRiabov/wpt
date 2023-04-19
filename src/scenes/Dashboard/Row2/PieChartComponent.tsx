import React, { useState } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";
import { useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import BoxHeader from "../../../components/BoxHeader/BoxHeader";

interface Data {
  name: string;
  value: number;
}

interface Props {
  cx: number;
  cy: number;
  innerRadius: number;
  outerRadius: number;
  fill: string;
  payload: any;
  percent: number;
  value: number;
  midAngle: number;
  startAngle: number;
  endAngle: number;
}

const data: Data[] = [
  { name: "Chill", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const renderActiveShape = (props: Props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="red"
      >{`PV ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="gold"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const PieChartComponent = () => {

    // Use the `useTheme` hook to access the MUI theme object
    const { palette } = useTheme();
    const colors = tokens(palette.mode);

    const [activeIndex, setActiveIndex] = useState(0)


  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };


    return (
      <>
      <BoxHeader title='Volumes'></BoxHeader>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={300} height={300}>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={70}
            fill={colors.green[700]}
            dataKey="value"
            onMouseEnter={onPieEnter}
          />
        </PieChart>
      </ResponsiveContainer></>
    );
  
}

export default PieChartComponent