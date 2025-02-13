import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchCommunitiesThunk } from '../../../features/communitySlice'
import CommuList from '../community/CommuList'
import CommuDetail from '../community/CommuDetail'

const Community = () => {
   const [open, setOpen] = useState('')

   const dispatch = useDispatch()
   useEffect(() => {
      dispatch(fetchCommunitiesThunk({ page: 1, limit: 10 }))
   }, [dispatch])

   return <>{open ? <CommuDetail id={open} setOpen={setOpen} /> : <CommuList setOpen={setOpen} />}</>
}

export default Community
