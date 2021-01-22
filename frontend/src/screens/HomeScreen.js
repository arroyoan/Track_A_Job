import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Route } from 'react-router-dom'

import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import SearchBar from '../components/SearchBar'
import DropdownList from '../components/DropdownList'
import { getUserJobs } from '../actions/JobActions'

const HomeScreen = ({ history, match }) => {
  const dispatch = useDispatch()

  // dropdown menue list of options
  const pageItems = [5, 10, 25, 50]
  const sortItems = ['updatedAt', 'isImportant', 'hasApplied', 'haveInterviewed', 'haveOffer']

  // gonna be match params for keywords for when i do search
  const keywords = match.params.keywords || ''

  // gets page number from url if there is one
  const pageNumber = match.params.pageNumber || 1

  // get sort type from url
  const sortBy = match.params.sortBy || 'updatedAt'

  // get page size from url
  const pageSize = match.params.pageSize || 10

  // Get state from store
  const userJobs = useSelector(state => state.userJobs)
  const { loading, error, jobs, page, pages } = userJobs

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  //useEffect hoook stuff
  useEffect(() => {
    if (userInfo) {
      dispatch(getUserJobs(keywords, pageNumber, sortBy, pageSize))
    } else {
      history.push('/login')
    }

  }, [dispatch, userInfo, history, pageNumber, keywords, sortBy, pageSize])

  // local methods

  return (
    <>
      <div className='py-3' style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', background: '' }}>
        <h4 style={{ background: '' }}>Your Applications</h4>
        <Route render={({ history }) => <SearchBar history={history} pageSize={pageSize} sortBy={sortBy} pageNumber={pageNumber} />} />
        <Link style={{ background: '' }} className='appButton' to='/addjob' >+ New App</Link>
      </div>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}

      {!jobs || jobs.length === 0 ?
        (
          <div style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center', paddingTop: '15px' }}>
            <h1>You have no job applications!</h1>
          </div>

        ) : (
          <>
            <Table size='sm' striped hover bordered responsive>
              <thead style={{ background: '#eb6864', color: 'white' }}>
                <tr className='text-center'>
                  <th> <strong>Job</strong></th>
                  <th> <strong>Job Id</strong></th>
                  <th><strong>Company</strong></th>
                  <th><strong>Important</strong></th>
                  <th><strong>Applied</strong></th>
                  <th><strong>Interviewed</strong></th>
                  <th><strong>Offer</strong></th>
                  <th><strong>Details</strong></th>
                </tr>
              </thead>
              <tbody style={{ background: 'white' }}>
                {
                  jobs.map((job) => {
                    return (
                      <tr key={job._id} className='text-center'>
                        <td>{job.jobTitle}</td>
                        <td>{job.companyJobId}</td>
                        <td>{job.companyName}</td>
                        <td className='align-middle text-center' >{job.isImportant ? (
                          <i className="fas fa-star " style={{ color: 'goldenrod' }}></i>
                        ) : (
                            <i className="far fa-star "></i>
                          )}</td>
                        <td className='align-middle text-center'>
                          {job.hasApplied ? (
                            <i className='fas fa-check' style={{ color: 'green' }}></i>
                          ) : (
                              <i className='fas fa-times' style={{ color: 'red' }}></i>
                            )}
                        </td>
                        <td className='align-middle text-center'>
                          {job.haveInterviewed ? (
                            <i className='fas fa-check' style={{ color: 'green' }}></i>
                          ) : (
                              <i className='fas fa-times' style={{ color: 'red' }}></i>
                            )}
                        </td>
                        <td className='align-middle text-center'>
                          {job.haveOffer ? (
                            <i className='fas fa-check' style={{ color: 'green' }}></i>
                          ) : (
                              <i className='fas fa-times' style={{ color: 'red' }}></i>
                            )}
                        </td>
                        <td className='align-middle text-center'>
                          <Link to={`/myjobs/${job._id}`} style={{ color: '#369' }}>Details</Link>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>
            <div className='pt-3' style={{ background: '', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <DropdownList items={pageItems} pageNumber={pageNumber} keywords={keywords} pageSize={pageSize} sortBy={sortBy} type={"Page Size"} />
              <Paginate pages={pages} page={page} keywords={keywords} pageSize={pageSize} sortBy={sortBy} />
              <DropdownList items={sortItems} pageNumber={pageNumber} keywords={keywords} pageSize={pageSize} sortBy={sortBy} type={"Sort"} />
            </div>
          </>
        )}
    </>
  )
}

export default HomeScreen
