import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ page, pages, keywords = '', pageSize = 10, sortBy }) => {
  // it makes sure to that there is more than one page
  // bc if there is not then there is no reason to show pagination
  return pages > 1 && (
    <Pagination>
      {/*
        For [...Array(pages).keys()]
          * Array(pages) creates an array object with pages amount of empty slots in it
          * .keys() fills those empty slots with numbers from 0 to pages-1
          * the [... Array] is spreading that information into a new object
      */}

      {([...Array(pages).keys()].map(pageNum => (
        <LinkContainer
          key={pageNum + 1}
          to={keywords ? `/search/${keywords}/pageSize/${pageSize}/pageNumber/${pageNum + 1}/sort/${sortBy}` : `/pageSize/${pageSize}/pageNumber/${pageNum + 1}/sort/${sortBy}`} >
          <Pagination.Item active={(pageNum + 1) === page} >{pageNum + 1}</Pagination.Item>
        </LinkContainer>
      ))
      )}
    </Pagination>
  )
}

export default Paginate
