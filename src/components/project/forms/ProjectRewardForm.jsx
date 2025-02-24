import { Button, Card, IconButton, Grid2, CardContent, Typography, Stack } from '@mui/material'
import { Stack2, Dot } from '../../../styles/BaseStyles'
import { ListCard } from '../../ui/Cards'
import { FormGrid } from '../../ui/FormGrid'
import EditProductBox from './EditProductBox'
import EditRewardBox from './EditRewardBox'
import { AddCircle, Create, Delete } from '@mui/icons-material'
import { useCallback, useState } from 'react'
import { createProductThunk, updateProductThunk, deleteProductThunk, createRewardThunk, updateRewardThunk, deleteRewardThunk } from '../../../features/rewardSlice'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'

function ProjectRewardForm({ initVals }) {
   const { id } = useParams()
   const { products, rewards, setProducts, setRewards } = initVals
   const [product, setProduct] = useState(null)
   const [reward, setReward] = useState(null)
   const [open, setOpen] = useState(null)
   const dispatch = useDispatch()

   const handleDeleteProduct = useCallback(
      (productId) => {
         dispatch(deleteProductThunk(productId))
            .unwrap()
            .then((result) => setProducts(products.filter((product) => result.productId !== product.id)))
            .catch()
      },
      [dispatch, products]
   )

   const handleDeleteReward = useCallback(
      (productId) => {
         dispatch(deleteRewardThunk(productId))
            .unwrap()
            .then((result) => setRewards(rewards.filter((reward) => result.rewardId !== reward.id)))
            .catch()
      },
      [dispatch, rewards]
   )

   const openCreateProductBox = useCallback(() => {
      setProduct(null)
      setOpen('product')
   }, [])

   const openEditProductBox = useCallback((product) => {
      setProduct(product)
      setOpen('product')
   }, [])

   const openCreateRewardBox = useCallback(() => {
      setReward(null)
      setOpen('reward')
   }, [])

   const openEditeRwardBox = useCallback((reward) => {
      setReward(reward)
      setOpen('reward')
   }, [])

   const productSubmit = useCallback(
      (formData) => {
         if (product?.id) {
            dispatch(updateProductThunk({ productId: product.id, productData: formData }))
               .unwrap()
               .then((result) => setProducts(products.map((product) => (result.product.id === product.id ? result.product : product))))
               .catch()
         } else {
            dispatch(createProductThunk({ projectId: id, productData: formData }))
               .unwrap()
               .then((result) => setProducts(products.concat(result.product)))
               .catch()
         }
         setOpen(null)
      },
      [dispatch, id, product, products]
   )

   const rewardSubmit = useCallback(
      (formData) => {
         if (reward?.id) {
            dispatch(updateRewardThunk({ rewardId: reward.id, rewardData: formData }))
               .unwrap()
               .then((result) => setRewards(rewards.map((reward) => (result.reward.id === reward.id ? result.reward : reward))))
               .catch()
         } else {
            dispatch(createRewardThunk({ projectId: id, rewardData: formData }))
               .unwrap()
               .then((result) => {
                  setRewards(rewards.concat(result.reward))
               })
               .catch()
         }
         setOpen(null)
      },
      [dispatch, id, reward, rewards]
   )

   const formItems = [
      {
         name: '선물 구성품',
         input: (
            <>
               <Button onClick={openCreateProductBox} startIcon={<AddCircle fontSize="small" />} variant="outlined">
                  구성품 추가
               </Button>
               {open && (
                  <EditProductBox open={open} onSubmit={productSubmit} product={product}>
                     <Button onClick={() => setOpen(null)}>취소</Button>
                  </EditProductBox>
               )}
               <Stack spacing={1} mt={1}>
                  {products.map((product) => (
                     <ListCard product={product} key={'product' + product.id}>
                        <IconButton aria-label="수정" size="small" onClick={() => openEditProductBox(product)}>
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
      {
         name: '후원 선물',
         input: (
            <>
               <Button startIcon={<AddCircle fontSize="small" />} variant="outlined" onClick={openCreateRewardBox}>
                  후원 선물 추가
               </Button>
               {open && (
                  <EditRewardBox open={open} onSubmit={rewardSubmit} products={products} reward={reward}>
                     <Button onClick={() => setOpen(null)}>취소</Button>
                  </EditRewardBox>
               )}
               <Grid2 container columnSpacing={1.5} rowSpacing={{ sm: 3, xs: 1.5 }}>
                  {rewards.map((reward) => (
                     <Grid2 key={'reward' + reward.id} size={{ sm: 6, xs: 12 }}>
                        <Card variant="outlined" sx={{ flexDirection: 'column' }}>
                           <CardContent>
                              <Stack2>
                                 <Typography noWrap variant="h6" sx={{ flexGrow: 1 }}>
                                    {reward.name}
                                 </Typography>
                                 <IconButton aria-label="수정" size="small" onClick={() => openEditeRwardBox(reward)}>
                                    <Create fontSize="small" />
                                 </IconButton>
                                 <IconButton aria-label="삭제" size="small" onClick={() => handleDeleteReward(reward.id)}>
                                    <Delete fontSize="small" />
                                 </IconButton>
                              </Stack2>
                              <Typography fontSize={20} fontWeight={600}>
                                 {reward.price}원
                              </Typography>
                              {reward.RewardProducts &&
                                 reward.RewardProducts.map((product) => (
                                    <Dot size={3}>
                                       <Typography noWrap key={'RewardProducts' + product.RewardProductRelation.productId}>
                                          {product.title}
                                       </Typography>
                                       <Typography ml={0.5} variant="body2" color="grey">
                                          (×{product.RewardProductRelation.stock})
                                       </Typography>
                                    </Dot>
                                 ))}
                           </CardContent>
                        </Card>
                     </Grid2>
                  ))}
               </Grid2>
            </>
         ),
      },
   ]

   return <FormGrid formItems={formItems} />
}

export default ProjectRewardForm
