import { DatePickerWithPresets } from "@/components/calendar-preset";

export default async function Page() {
  return (
    <div className="">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-medium">Balance detail</h1>
        <div>
          <DatePickerWithPresets />
        </div>
      </div>
    </div>
  );
}
