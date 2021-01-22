import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const DropdownList = ({ items, keywords, pageSize, pageNumber, sortBy, type }) => {
  const sortNames = { 'updatedAt': 'Last Updated', 'isImportant': 'Important', 'hasApplied': 'Applied', 'haveInterviewed': 'Interviewed', 'haveOffer': 'Offer' }

  return (
    <Dropdown>
      <Dropdown.Toggle>{type}</Dropdown.Toggle>
      <Dropdown.Menu>
        {type === 'Sort' ? (
          items.map((option) => {
            return (
              <LinkContainer
                key={option}
                to={keywords ? `/search/${keywords}/pageSize/${pageSize}/pageNumber/${pageNumber}/sort/${option}` : `/pageSize/${pageSize}/pageNumber/${pageNumber}/sort/${option}`}
              >
                <Dropdown.Item>{sortNames[option]}</Dropdown.Item>
              </LinkContainer>
            )
          })
        ) : (
            items.map((option) => {
              return (
                <LinkContainer
                  key={option}
                  to={keywords ? `/search/${keywords}/pageSize/${option}/pageNumber/${1}/sort/${sortBy}` : `/pageSize/${option}/pageNumber/${1}/sort/${sortBy}`}
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
