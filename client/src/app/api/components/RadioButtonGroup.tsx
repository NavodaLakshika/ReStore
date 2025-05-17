import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
} from "@mui/material";

interface RadioOption {
  value: string;
  label: string;
}

interface Props {
  options: RadioOption[];
  selectedValue: string;
  onChange: (event: any) => void;
}

export default function RadioButtonGroup({
  options,
  selectedValue,
  onChange,
}: Props) {
  return (
    <FormControl fullWidth sx={{ mb: 3 }} component="fieldset">
      <RadioGroup value={selectedValue} onChange={onChange}>
        {options.map(({ value, label }) => (
          <FormControlLabel
            key={value}
            value={value}
            control={<Radio size="small" />}
            label={<Typography variant="body2">{label}</Typography>}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
