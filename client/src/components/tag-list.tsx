import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface TagListProps {
  tags: string[];
}

export const TagList: React.FC<TagListProps> = ({ tags }) => {
  return (
    <Card className="flex flex-col justify-between h-full">
      <CardHeader>
        <CardTitle className="text-lg text-muted-foreground">
          Mental health in tags
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-foreground flex flex-col gap-2">
        {tags.map((value) => (
          <Badge variant="default">{value}</Badge>
        ))}
      </CardContent>
    </Card>
  );
};
