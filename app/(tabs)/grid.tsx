import Grid from "@/components/Grid";

function generateArray(num: number) {
  return Array.from({ length: num }, (_, index) => index);
}

const data = generateArray(16);

export default function GridScreen() {
  return <Grid views={data} />;
}
