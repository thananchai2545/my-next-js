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
      <Select name="limit" defaultValue="5">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Limit" />
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
