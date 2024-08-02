import DebouncedInput from "@/components/DebouncedInput";

const DEBOUNCED_TIME = 1000;

export default function DebouncedInputScreen() {
  return <DebouncedInput debounceTime={DEBOUNCED_TIME} />;
}
