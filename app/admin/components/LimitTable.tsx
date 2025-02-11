import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const limit = [{ value: "5" }, { value: "10" }, { value: "15" }];
const LimitTable = () => {
  return (
    <div className="m-3">
      <Select name="limit">
        <SelectTrigger className="w-[180px]">
          <SelectValue
            defaultValue={limit[0].value}
            placeholder={[limit[0].value]}
          />
        </SelectTrigger>
        <SelectContent>
          {limit.map((limit) => (
            <SelectItem key={limit.value} value={limit.value}>
              {limit.value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LimitTable;
