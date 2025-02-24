import { TextField, Button, IconButton, Stack } from '@mui/material'
import { Stack2 } from '../../../styles/BaseStyles'
import { FormGrid } from '../../ui/FormGrid'
import { ListCard } from '../../ui/Cards'
import { useCallback, useState, useRef, useEffect } from 'react'
import EditProductBox from './EditProductBox'
import { AddCircle, Create, Delete } from '@mui/icons-material'
import { deleteProductThunk } from '../../../features/rewardSlice'
import { useDispatch } from 'react-redux'

function ProjectDetailForm({ onSubmit, initVals = {}, isSave }) {
   const [products, setProducts] = useState(initVals.products)
   const [product, setProduct] = useState(null)
   const [rewards, setRewards] = useState(initVals.rewards)
   const [reward, setReward] = useState(null)
   const [open, setOpen] = useState(false)
   const dispatch = useDispatch()

   const handleDeleteProduct = useCallback(
      (productId) => {
         dispatch(deleteProductThunk(productId))
            .unwrap()
            .then((result) => setProducts(products.filter((product) => product.id !== result.productId)))
            .catch()
      },
      [dispatch]
   )

   const ResetData = useCallback(() => {
      setProduct({ imgFile: null, imgUrl: '', title: '', contents: '' })
      setOpen(true)
   }, [])

   const ChangeData = useCallback((product) => {
      setOpen(true)
      setProduct(product)
   }, [])

   const formItems = [
      {
         name: '선물 구성품',
         input: (
            <>
               <Button startIcon={<AddCircle fontSize="small" />} onClick={() => ResetData(true)} variant="outlined">
                  선물 구성품 추가
               </Button>
               <Stack spacing={1} mt={1}>
                  <EditProductBox open={open} setOpen={setOpen} product={product} setProducts={setProducts} products={products} />
                  {products.map((product) => (
                     <ListCard product={product} key={'product' + product.id}>
                        <IconButton aria-label="수정" size="small" onClick={() => ChangeData(product)}>
                           <Create fontSize="small" />
                        </IconButton>
                        <IconButton aria-label="삭제" size="small" onClick={() => handleDeleteProduct(product.id)}>
                           <Delete fontSize="small" />
                        </IconButton>
                     </ListCard>
                  ))}
               </Stack>
            </>
         ),
      },
   ]

   return (
      <>
         <FormGrid formItems={formItems} />
         <Stack2 justifyContent="end">
            <Button variant="contained" size="large">
               내용 저장하기
            </Button>
         </Stack2>
      </>
   )
}

export default ProjectDetailForm
