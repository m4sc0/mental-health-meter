import type { MentalState } from "./data";
import { Field } from "./field";

interface FieldGridProps {
  data: MentalState;
}

export const FieldGrid: React.FC<FieldGridProps> = ({
  data,
}: FieldGridProps) => {
  const columns = 2;
  const rows = Math.ceil(data.levels.length / columns);

  return (
    <div
      className="grid gap-4"
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
      }}
    >
      {data.levels.map((obj) => (
        <Field key={obj.name} name={obj.name} value={obj.value} />
      ))}
    </div>
  );
};
