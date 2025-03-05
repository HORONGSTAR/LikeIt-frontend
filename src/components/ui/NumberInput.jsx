import { IconButton, Divider, InputBase } from '@mui/material'
import { Add, Remove } from '@mui/icons-material'
import { Stack2 } from '../../styles/BaseStyles'

export const NumberInput = ({ id, onChange, value }) => {
   return (
      <Stack2 sx={{ border: '1px solid #ccc', borderRadius: 3, width: 90, minWidth: 80 }}>
         <IconButton size="small" sx={{ width: 24, height: 24, padding: 0.5 }} disabled={!value || value < 2} onClick={() => onChange(id, 'minus', value)}>
            <Remove fontSize="small" />
         </IconButton>
         <Divider orientation="vertical" flexItem />
         <InputBase type="number" aria-label="수량 입력" inputProps={{ style: { textAlign: 'center' } }} value={value || 0} disabled={!value} onChange={(e) => onChange(id, 'num', e.target.value)} />
         <Divider orientation="vertical" flexItem />
         <IconButton size="small" sx={{ width: 24, height: 24, padding: 0.5 }} disabled={!value || value > 100} onClick={() => onChange(id, 'plus', value)}>
            <Add fontSize="small" />
         </IconButton>
      </Stack2>
   )
}
