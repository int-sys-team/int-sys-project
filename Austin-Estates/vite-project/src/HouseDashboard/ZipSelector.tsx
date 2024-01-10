import * as React from 'react';
import Autocomplete from '@mui/joy/Autocomplete';
import AutocompleteOption from '@mui/joy/AutocompleteOption';
import FormControl, { FormControlProps } from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';

export default function ZipSelector({ onChange, ...props }) {
 const { sx, ...other } = props;
 const zipCodes = [
   78660, 78617, 78717, 78724, 78747, 78725, 78726, 78744, 78732,
   78750, 78729, 78719, 78731, 78730, 78753, 78733, 78746, 78735,
   78734, 78737, 78619, 78759, 78739, 78652, 78653, 78758, 78749,
   78728, 78754, 78736, 78757, 78727, 78745, 78704, 78741, 78742,
   78752, 78723, 78748, 78738, 78705, 78703, 78702, 78701, 78722,
   78721, 78751, 78756
 ];

 // Set the initial value to the first ZIP code
 const initialValue = { label: zipCodes[0].toString(), code: zipCodes[0] };

 return (
   <FormControl {...other} sx={sx}>
     <FormLabel>ZIP Code</FormLabel>
     <Autocomplete
       autoHighlight
       options={zipCodes.map((zip) => ({ label: zip.toString(), code: zip }))}
       isOptionEqualToValue={(option, value) => option.code === value.code}
       renderOption={(optionProps, option) => (
         <AutocompleteOption {...optionProps}>
           {option.label}
         </AutocompleteOption>
       )}
       slotProps={{
         input: {
           autoComplete: 'new-password', // disable autocomplete and autofill
         },
       }}
       value={initialValue} // Set the initial value
       onChange={(event, newValue) => {
 
         onChange(newValue?.code || null);
       }}
     />
   </FormControl>
 );
}