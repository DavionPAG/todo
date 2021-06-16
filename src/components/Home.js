import React from 'react'
import {Nav} from 'react-bootstrap'

export default function Home() {
  return (
    
    <Nav variant="pills" defaultActiveKey="/">
      <Nav.Item className='bg-primary'>
        <Nav.Link href="/">Home</Nav.Link>
      </Nav.Item>
    </Nav>

  )
}