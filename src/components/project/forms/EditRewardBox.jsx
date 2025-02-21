import {
   TextField,
   Button,
   List,
   ListItem,
   Checkbox,
   ListItemIcon,
   ListItemText,
   Stack,
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
} from '@mui/material'
import { useCallback, useState, useEffect } from 'react'
import { NumberInput } from '../../ui/NumberInput'

function EditRewardBox({ open, setOpen, addData, reward, products }) {
   const [price, setPrice] = useState(0)
   const [name, setName] = useState('')
   const [contents, setContents] = useState('')
   const [stock, setStock] = useState(0)
   const [limit, setLimit] = useState(0)
   const [checked, setChecked] = useState({})

   const optionItems = [
      { id: 'stock', title: '1인당 최대 선택 갯수 제한하기' },
      { id: 'limit', title: '선착순 선물 여부' },
   ]

   useEffect(() => {
      const items = { stock, limit }
      products.map((product) => (items[product.id] = 0))
      setChecked(items)
   }, [products])

   useEffect(() => {
      setPrice(reward?.price)
      setName(reward?.name)
      setContents(reward?.contents)
      setStock(reward?.stock)
      setLimit(reward?.limit)
   }, [reward])

   const handleAddReward = useCallback(() => {
      const relation = products.map((product) => checked[product.id] && { id: product.id, count: checked[product.id] }).filter((product) => product)

      console.log(relation)

      addData({ price, name, contents, stock, limit, relation })
      setOpen(false)
   }, [price, name, contents, stock, limit, checked])

   const handleChangeList = useCallback(
      (id) => {
         const value = checked[id] ? 0 : 1
         setChecked({ ...checked, [id]: value })
      },
      [checked]
   )

   const handleChangeConut = useCallback(
      (id, field, value) => {
         const result = {
            minus: Number(value) - 1,
            num: Number(value),
            plus: Number(value) + 1,
         }

         if (0 > result[field] || result[field] > 100) return
         setChecked({ ...checked, [id]: result[field] })
      },
      [checked]
   )

   return (
      <Dialog open={open}>
         <DialogTitle>후원 선물 추가</DialogTitle>
         <DialogContent>
            <Stack pt={1} spacing={3}>
               <TextField value={name} onChange={(e) => setName(e.target.value)} fullWidth label="선물 이름" />
               <List sx={{ border: '1px solid #ccc', borderRadius: 3 }}>
                  {products.map((product) => (
                     <ListItem key={'list' + product.id} sx={{ p: 0.5, pr: 1 }}>
                        <ListItemIcon sx={{ minWidth: '38px' }}>
                           <Checkbox size="small" checked={checked[product.id] ? 1 : 0} onChange={() => handleChangeList(product.id)} />
                        </ListItemIcon>
                        <ListItemText slotProps={{ primary: { noWrap: true } }}>{product.title}</ListItemText>
                        <NumberInput id={product.id} onChange={handleChangeConut} value={checked[product.id]} />
                     </ListItem>
                  ))}
               </List>

               <List sx={{ border: '1px solid #ccc', borderRadius: 3 }}>
                  {optionItems.map((item) => (
                     <ListItem key={'list' + item.id} sx={{ p: 0.5, pr: 1 }}>
                        <ListItemIcon sx={{ minWidth: '38px' }}>
                           <Checkbox size="small" checked={checked[item.id] ? 1 : 0} onChange={() => handleChangeList(item.id)} />
                        </ListItemIcon>
                        <ListItemText slotProps={{ primary: { noWrap: true } }}>{item.title}</ListItemText>
                        <NumberInput id={item.id} onChange={handleChangeConut} value={checked[item.id]} />
                     </ListItem>
                  ))}
               </List>

               <TextField value={contents} onChange={(e) => setContents(e.target.value)} fullWidth label="선물 소개" />
               <TextField
                  value={price}
                  type="number"
                  inputProps={{ style: { textAlign: 'end' } }}
                  onChange={(e) => setPrice(e.target.value)}
                  fullWidth
                  label="제작 및 배송 비용을 포함한 후원 금액"
               />
            </Stack>
         </DialogContent>
         <DialogActions>
            <Button onClick={() => setOpen(false)}>취소</Button>
            <Button color="orenge" onClick={handleAddReward}>
               확인
            </Button>
         </DialogActions>
      </Dialog>
   )
}

export default EditRewardBox
