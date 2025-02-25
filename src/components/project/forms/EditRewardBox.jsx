import { TextField, Button, List, ListItem, Checkbox, ListItemIcon, ListItemText, Stack, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, Alert } from '@mui/material'
import { useCallback, useState, useEffect } from 'react'
import { NumberInput } from '../../ui/NumberInput'
import { isBlank } from '../../../util/isBlank'

function EditRewardBox({ onSubmit, open, products, reward, children }) {
   const [price, setPrice] = useState(reward?.price || 0)
   const [name, setName] = useState(reward?.name || '')
   const [contents, setContents] = useState(reward?.contents || '')
   const [checked, setChecked] = useState({})
   const [alert, setAlert] = useState(false)

   const optionItems = [
      { id: 'stock', title: '1인당 최대 선택 갯수 제한하기' },
      { id: 'limit', title: '선착순 선물 여부' },
   ]

   useEffect(() => {
      const items = { stock: reward?.stock || 0, limit: reward?.limit || 0 }
      products.map((product) => (items[product.id] = 0))
      reward?.RewardProducts && reward.RewardProducts.map((product) => (items[product.RewardProductRelation.productId] = product.RewardProductRelation.stock))
      setChecked(items)
   }, [reward, products])

   const handleSubmit = useCallback(() => {
      const { stock, limit } = checked
      const relation = products.map((product) => checked[product.id] && { id: product.id, count: checked[product.id] }).filter((product) => product)
      if (!isBlank([name, contents, stock, limit, relation])) return
      const formData = new FormData()
      formData.append('price', price)
      formData.append('name', name)
      formData.append('contents', contents)
      formData.append('stock', stock)
      formData.append('limit', limit)
      formData.append('relation', JSON.stringify({ relation }))
      onSubmit(formData)
   }, [onSubmit, name, contents, checked, price])

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
      <Dialog open={open === 'reward'}>
         <DialogTitle>후원 선물 추가</DialogTitle>
         <DialogContent>
            <Stack pt={1} spacing={3}>
               <TextField value={name} onChange={(e) => setName(e.target.value)} fullWidth label="선물 이름" />
               <List sx={{ border: '1px solid #ccc', borderRadius: 3 }}>
                  {products.map((product) => (
                     <ListItem key={'product' + product.id} sx={{ p: 0.5, pr: 1 }}>
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
               <TextField value={price} type="number" inputProps={{ style: { textAlign: 'end' } }} onChange={(e) => setPrice(e.target.value)} fullWidth label="제작 및 배송 비용을 포함한 후원 금액" />
            </Stack>
         </DialogContent>
         <DialogActions>
            {children}
            <Button color="orenge" onClick={handleSubmit}>
               확인
            </Button>
         </DialogActions>
         <Snackbar open={alert} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={6000} onClose={() => setAlert(false)}>
            <Alert onClose={() => setAlert(false)} severity="error" variant="filled" sx={{ width: '100%' }}>
               모든 항목을 채워주세요.
            </Alert>
         </Snackbar>
         <Alert onClose={() => setAlert(false)} severity="error" variant="filled" sx={{ width: '100%' }}>
            모든 항목을 채워주세요.
         </Alert>
      </Dialog>
   )
}

export default EditRewardBox
