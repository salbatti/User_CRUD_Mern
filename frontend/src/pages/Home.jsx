import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Card, Dropdown, DropdownItem } from "flowbite-react";
import { Button, Checkbox, Label, Modal, ModalBody, ModalHeader, TextInput } from "flowbite-react";
// import { FaWindowClose } from "react-icons/fa";

// import Image from "next/image";

const Home = () => {
  const [users, setUsers] = useState([])
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });

  // 🔹 Handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  useEffect(() => {

    axios
      .get('http://localhost:3000/api/getUser/')
      .then((res) => {
        setUsers(res.data.allUser)
        console.log(res.data.allUser);
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])



  // 🔹 Add user 
  const addUser = async () => {
    if (!formData.username || !formData.email || !formData.password) {
      alert("All fields required"); return;
    }
    try {
      const res = await axios.post(
        'http://localhost:3000/api/addUser',
        formData
      ); // Update UI instantly 
      setUsers([...users, res.data.newUser]);

      // Close modal 
      setOpenModal(false);
      // Reset form
      setFormData({
        username: "",
        email: "",
        password: ""
      });
    } catch (error) {
      alert(error.response?.data || "Error adding user");
    }
  };

  return (
    <div className='w-full'>
      <div className={openModal ? "blur-sm " : ""}>

        <h1 className='text-blue-900 text-center text-4xl my-10'>Home pages</h1>

        <div className='flex justify-end mb-4 px-10'>
          <a href="#"
            onClick={() => setOpenModal(true)}
            className="inline-flex items-center rounded-lg bg-green-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Add User
          </a>
        </div>
        <div className='grid grid-cols-2 lg:grid-cols-3 gap-6 px-10'>
          {
            users.map((user, index) => (
              <Card className="max-w-sm" key={index}>

                <div className="flex flex-col items-center py-10 px-10  bg-gray-500 ">

                  <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{user.username}</h5>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{user.email}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{user.password}</span>

                  <div className="mt-4 flex space-x-3 lg:mt-6">

                    <a
                      href="#"
                      className="inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                    >
                      Edit
                    </a>
                    <a
                      href="#"
                      className="inline-flex items-center rounded-lg border border-red-300 bg-red-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-600 dark:bg-red-600 dark:text-white dark:hover:border-red-700 dark:hover:bg-red-700 dark:focus:ring-red-800"                  >
                      Delete
                    </a>
                  </div>
                </div>
              </Card>
            ))
          }
        </div>
      </div>

      {/* Add User Modal */}
      <Modal show={openModal} size="md" className='mx-10' onClose={() => setOpenModal(false)} popup>
        <ModalHeader />
        <ModalBody className='bg-gray-600 rounded-lg'>
          {/* <div className="space-y-6 bg-gray-800 p-6 rounded-lg"> */}
          <div className='flex justify-between '>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Add User
            </h3>

            {/* <FaWindowClose  className='bg-red-600'/> */}
            <h1 className='bg-red-600 w-4 flex text-center ps-1 text-amber-50 ' onClick={() => setOpenModal(false)}>
              x
            </h1>
          </div>


          <div>
            <Label>Username</Label>
            <TextInput
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
              sizing="lg"
            />
          </div>

          <div>
            <Label>Email</Label>
            <TextInput
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              sizing="lg"
            />
          </div>

          <div>
            <Label>Password</Label>
            <TextInput
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              sizing="lg"
            />
          </div>



          <div className="w-full">
            <button
              onClick={addUser}
              className="w-full bg-green-600 text-white py-2 rounded-lg mt-3" >
              Add User
            </button>
          </div>
          {/* </div> */}
        </ModalBody>
      </Modal>

    </div>
  )
}

export default Home