import { TextField, Button, IconButton, List, ListItem, Checkbox, ListItemIcon, InputBase, Divider, Box, Typography } from '@mui/material'
import { Add, Remove } from '@mui/icons-material'
import { Stack2 } from '../../../styles/BaseStyles'
import { FormGrid } from '../../ui/FormGrid'
import { useCallback, useState } from 'react'

function ProjectRewardForm({ onSubmit, initVals = {}, products }) {
   const [price, setPrice] = useState(initVals.price)
   const [name, setName] = useState(initVals.name)
   const [contents, setContents] = useState(initVals.contents)
   const [stock, setStock] = useState(initVals.stock)
   const [limit, setLimit] = useState(initVals.limit)
   const [count, setCount] = useState(1)

   const [checked, setChecked] = useState([0])

   const handleSaveData = useCallback(() => {
      const formData = new FormData()
      formData.append('rewards')
      onSubmit(formData)
   }, [onSubmit, price, name])

   const rewardForm = (
      <>
         <TextField value={name} onChange={(e) => setName(e.target.value)} fullWidth label="선물 이름" />
         <List>
            {products.map((product) => (
               <ListItem>
                  <ListItemIcon>
                     <Checkbox />
                  </ListItemIcon>
                  {product.title}
                  <Stack2 sx={{ border: '1px solid #ccc', borderRadius: 3, width: 96 }}>
                     <IconButton size="small">
                        <Remove fontSize="small" />
                     </IconButton>
                     <Divider orientation="vertical" flexItem />
                     <Typography sx={{ width: '100%', textAlign: 'center' }}>{count}</Typography>
                     <Divider orientation="vertical" flexItem />
                     <IconButton size="small">
                        <Add fontSize="small" />
                     </IconButton>
                  </Stack2>
               </ListItem>
            ))}
         </List>

         <TextField value={contents} onChange={(e) => setContents(e.target.value)} fullWidth label="선물 소개" />
         <TextField value={price} onChange={(e) => setPrice(e.target.value)} fullWidth label="제작 및 배송 비용을 포함한 후원 금액" />
      </>
   )

   const formItems = [
      {
         name: '후원 선물',
         input: <>{rewardForm}</>,
      },
      {
         name: '선물 목록',
         input: <></>,
      },
   ]

   return (
      <>
         <FormGrid formItems={formItems} />
         <Stack2 justifyContent="end">
            <Button variant="contained" size="large" onClick={handleSaveData}>
               내용 저장하기
            </Button>
         </Stack2>
      </>
   )
}

export default ProjectRewardForm
