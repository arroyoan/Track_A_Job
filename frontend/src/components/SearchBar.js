import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchBar = ({ history, pageSize, sortBy, pageNumber }) => {
  // useState hook stuff
  const [keywords, setKeywords] = useState('')

  // local methods
  const onSubmitHandler = (e) => {
    e.preventDefault()
    // history push to the keyword search
    if (keywords) {
      history.push(`/search/${keywords}/pageSize/${pageSize}/pageNumber/${pageNumber}/sort/${sortBy}`)
    } else {
      history.push(`/pageSize/${pageSize}/pageNumber/${pageNumber}/sort/${sortBy}`)
    }
  }

  return (
    <Form onSubmit={onSubmitHandler} style={{ background: '' }} inline>
      <Form.Control
        style={{ padding: '5px', borderTopRightRadius: '0px', borderBottomRightRadius: '0px' }}
        type='text'
        placeholder='Search...'
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
      ></Form.Control>
      <Button type='submit' variant='outline-primary' style={{ padding: '6px', borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' }}><i className="fas fa-search"></i></Button>

    </Form>
  )
}

export default SearchBar
