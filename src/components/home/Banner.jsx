import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import { useState, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchShowBannerThunk } from '../../features/indexSlice'

function Banner() {
   const dispatch = useDispatch()
   const { banners, loading, error } = useSelector((state) => state.index)

   useEffect(() => {
      dispatch(fetchShowBannerThunk())
   }, [dispatch])

   const showBanner = () => {
      return banners.map((banner) => {
         return (
            <SwiperSlide key={banner.imgUrl}>
               <img src={process.env.REACT_APP_API_URL + '/bannerProject' + banner.imgUrl} alt="배너 프로젝트" width="100%" />
            </SwiperSlide>
         )
      })
   }

   return (
      banners && (
         <div className="Home_Banner" style={{ padding: '20px 0' }}>
            <Swiper
               spaceBetween={30}
               centeredSlides={true}
               autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
               }}
               pagination={{
                  clickable: true,
               }}
               modules={[Autoplay, Pagination]}
               className="mySwiper"
            >
               {showBanner()}
            </Swiper>
         </div>
      )
   )
}

export default Banner
