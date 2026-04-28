import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

export default function SelectList({
  court,
  handleChange,
  items,
}: {
  court: string;
  handleChange: (event: SelectChangeEvent) => void;
  items: { key: string; label: string }[];
}) {
  // mapping
  const mappingitems = items.map((i) => {
    return (
      <MenuItem key={i.key} value={i.key}>
        {i.label}
      </MenuItem>
    );
  });
  return (
    <div>
      <FormControl fullWidth>
        <InputLabel>Court</InputLabel>

        <Select
          value={court}
          onChange={(e) => {
            handleChange(e);
          }}
          label="Court"
          sx={{
            borderRadius: "12px",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#e5e7eb",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#22c55e",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#22c55e",
            },
          }}
        >
          <MenuItem value="" disabled>
            Select a court
          </MenuItem>
          {mappingitems}
        </Select>
      </FormControl>
    </div>
  );
}
