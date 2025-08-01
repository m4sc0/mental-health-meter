export function dateFormatter(date: number): string {
  const d = new Date(date);
  const pad = (n: number) => n.toString().padStart(2, "0");
  const yy = d.getFullYear().toString().slice(-2);
  const mm = pad(d.getMonth() + 1);
  const dd = pad(d.getDate());
  const hh = pad(d.getHours());
  const min = pad(d.getMinutes());
  return `${yy}-${mm}-${dd}, ${hh}:${min}`;
}
