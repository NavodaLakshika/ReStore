import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";

interface Props {
  items: string[];
  checked: string[];
  onChange: (items: string[]) => void;
}

export default function CheckboxButtons({ items, checked, onChange }: Props) {
  const [checkedItems, setCheckedItems] = useState<string[]>(checked || []);

  useEffect(() => {
    setCheckedItems(checked); // Sync with props if updated externally
  }, [checked]);

  function handleChecked(value: string) {
    const newChecked = checkedItems.includes(value)
      ? checkedItems.filter((item) => item !== value)
      : [...checkedItems, value];

    setCheckedItems(newChecked);
    onChange(newChecked);
  }

  return (
    <FormGroup>
      {items.map((item) => (
        <FormControlLabel
          key={item}
          control={
            <Checkbox
              size="small"
              checked={checkedItems.includes(item) }
              onChange={() => handleChecked(item)}
            />
          }
          label={<Typography variant="body2">{item}</Typography>}
        />
      ))}
    </FormGroup>
  );
}
