import { useState } from 'react'
import { Col, Row, Container } from 'reactstrap'
import { Button,Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css"
import Sidebar from './components/SideBar';
import Search from './components/Search';
import { BrowserRouter as Router } from 'react-router-dom';



function App(args) {

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (


    <Router>
      <div>
        <div className=" flex-row p-2 ">
          <Sidebar />
        </div>
        <div className="d-flex">
          <div className="p-2 flex-grow-1"></div>
          <div className="p-2 flex-grow-1 text-center">
            <div className="flex-column text-center">
              <h1 className='p-3'>I Need to Recycle...</h1>
              <Search />
              <div>
      <Button outline className="bi bi-question-circle m-3 px-2"  onClick={toggle}>

      </Button>
      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalHeader toggle={toggle}>Welcome to "Name of App"!</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </ModalBody>
        <ModalFooter>
         
          <Button color="secondary" onClick={toggle}>
            Back
          </Button>
        </ModalFooter>
      </Modal>

    </div>
            </div>
          </div>
          <div className="p-2 flex-grow-1"></div>
        </div>
        </div>
      

      

      
    
      
        
      

      







    </Router>


  )
}

export default App
