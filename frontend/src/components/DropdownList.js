import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const DropdownList = ({ items, keywords, pageSize, pageNumber, sortBy, type }) => {

  return (
    <Dropdown>
      <Dropdown.Toggle>{type}</Dropdown.Toggle>
      <Dropdown.Menu>
        {type === 'Sort' ? (
          items.map((option) => {
            return (
              <LinkContainer
                to={keywords ? `/search/${keywords}/pageSize/${pageSize}/pageNumber/${pageNumber}/sort/${option}` : `/pageSize/${pageSize}/pageNumber/${pageNumber}/sort/${option}`}
              >
                <Dropdown.Item>{option}</Dropdown.Item>
              </LinkContainer>
            )
          })
        ) : (
            items.map((option) => {
              return (
                <LinkContainer
                  to={keywords ? `/search/${keywords}/pageSize/${option}/pageNumber/${pageNumber}/sort/${sortBy}` : `/pageSize/${option}/pageNumber/${pageNumber}/sort/${sortBy}`}
                >
                  <Dropdown.Item>{option}</Dropdown.Item>
                </LinkContainer>
              )
            })
          )
        }
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default DropdownList
