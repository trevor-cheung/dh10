import { useState } from 'react'
import { Button, InputGroup, Input, InputGroupText, ButtonGroup } from 'reactstrap'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SideBar from "./components/SideBar";
import './App.css'

function App(args) {
  const [count, setCount] = useState(0)

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const [sidebarIsOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);

  return (
    <>
      <div>

      </div>

      <div className="card">

      <SideBar toggle={toggleSidebar} isOpen={sidebarIsOpen} />

      <Button color="info" onClick={toggleSidebar}>
        Toggle
      </Button>
       

        <InputGroup>
          <Input  placeholder='enter query here'/>
        
            <Button>
              Go!
            </Button>
          
        </InputGroup>


   

      </div>


      <div>
        <Button color="danger" onClick={toggle}>
          Click Me
        </Button>
        <Modal isOpen={modal} toggle={toggle} {...args}>
          <ModalHeader toggle={toggle}>Modal title</ModalHeader>
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
            <Button color="primary" onClick={toggle}>
              Do Something
            </Button>{' '}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>

    </>
  )
}

export default App
