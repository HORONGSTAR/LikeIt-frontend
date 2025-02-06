import ProjectCard from '../shared/ProjectCard'

import { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { fetchShowProjectsThunk } from '../../features/listSlice'

function HomeProjects() {
   const dispatch = useDispatch()
   const { projects, pagination, loading, error } = useSelector((state) => state.list)

   useEffect(() => {
      dispatch(fetchShowProjectsThunk('all'))
   }, [dispatch])

   const showCards = (type) => {
      let cards = []
      if (projects[type]) {
         cards = cards.concat(
            projects[type].map((project) => {
               return <ProjectCard project={project} type={type} />
            })
         )
      }
      return cards
   }

   return (
      projects && (
         <>
            <p>인기 프로젝트 ▶</p>
            <div className="hotCards" style={{ display: 'flex' }}>
               {showCards('hot')}
            </div>
            <p>신규 프로젝트 ▶</p>
            <div className="newCards" style={{ display: 'flex' }}>
               {showCards('new')}
            </div>
            <p>마감 임박 ▶</p>
            <div className="endCards" style={{ display: 'flex' }}>
               {showCards('end')}
            </div>
            <p>공개 예정 ▶</p>
            <div className="commingCards" style={{ display: 'flex' }}>
               {showCards('comming')}
            </div>
         </>
      )
   )
}

export default HomeProjects
