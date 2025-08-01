import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export interface FieldProps {
  name: string;
  value: number; // 0-10 scale assumed
  max?: number;
}

export const Field: React.FC<FieldProps> = ({ name, value, max = 10 }) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100)); // cap at 0-100

  return (
    <Card className="flex flex-col justify-between h-full">
      <CardHeader className="">
        <CardTitle className="text-lg text-muted-foreground">{name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-end justify-center gap-2">
        <div className="flex items-end gap-2">
          <div className="text-5xl font-bold text-primary">{value}</div>
          <div className="text-xl font-bold text-muted-foreground">/ {max}</div>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </CardContent>
    </Card>
  );
};
