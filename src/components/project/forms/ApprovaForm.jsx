import { ImgUploadBox, Stack2 } from '../../../styles/BaseStyles'
import { FormGrid } from '../../ui/FormGrid'
import { useCallback, useEffect, useRef, useState } from 'react'
import DateRangePickers from './DateRangePickers'
import { Button, List, ListItem, ListItemText, ListItemIcon, Checkbox } from '@mui/material'

function ApprovaForm({ onSubmit }) {
   const [checked, setChecked] = useState(false)
   const handleSubmit = useCallback(() => {
      if (!checked) return
      onSubmit()
   }, [checked])
   const formItems = [
      {
         name: '안내 사항',
         input: (
            <List>
               <ListItemText>1. 프로젝트 검토에는 공휴일을 제외하고 최대 7일의 기간이 소요됩니다.</ListItemText>
               <ListItemText>2. 프로젝트에 부적절한 내용이 포함되어 있을 경우, 승인 요청이 반려 될 수 있습니다.</ListItemText>
               <ListItemText>3. 반려된 프로젝트는 수정 후 다시 제출 할 수 있습니다.</ListItemText>
               <ListItem sx={{ background: '#eee', borderRadius: 2, maxWidth: 320 }}>
                  <ListItemIcon sx={{ minWidth: '38px' }}>
                     <Checkbox size="small" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
                  </ListItemIcon>
                  안내사항을 확인했으며, 이에 동의합니다.
               </ListItem>
            </List>
         ),
      },
   ]

   return (
      <>
         <FormGrid formItems={formItems} />
         <Stack2 justifyContent="center">
            <Button variant="contained" size="large" disabled={!checked} onClick={handleSubmit}>
               프로젝트 제출하기
            </Button>
         </Stack2>
      </>
   )
}

export default ApprovaForm
