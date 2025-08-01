import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export interface TextInfoProps {
  title: string;
  description: string;
}

export const TextInfo: React.FC<TextInfoProps> = ({ title, description }) => {
  return (
    <Card className="flex flex-col justify-between h-full">
      <CardHeader>
        <CardTitle className="text-lg text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-foreground">
        {description}
      </CardContent>
    </Card>
  );
};
