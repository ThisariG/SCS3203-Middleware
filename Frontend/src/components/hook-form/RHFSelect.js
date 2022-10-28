import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { Select, MenuItem, Input, InputLabel, FormControl ,FormLabel } from '@mui/material';

// ----------------------------------------------------------------------

RHFTextField.propTypes = {
  name: PropTypes.string,
  options: PropTypes.array,
};

export default function RHFTextField({ name, options, label, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl sx={{ m: 1, minWidth: 120 }}>

          <InputLabel id="demo-simple-select-helper-label" >{label}</InputLabel>
          <Select {...field}  labelId="demo-simple-select-helper-label" label={label} error={!!error}>
            {options.map((tag, index) => (
              <MenuItem key={index} value={tag}>
                {tag[0].toUpperCase() + tag.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </ FormControl>
      )}
    />
  );
}
