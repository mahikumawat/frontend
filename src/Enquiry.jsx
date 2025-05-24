import React from 'react'
import { Button, Textarea, Label, TextInput, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import EnquiryList from './EnquireyList';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2/dist/sweetalert2.js'
export default function Enquiry() {

  const [enqueryList, setEnqueryList] = useState([])

  let [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    messege: '',
    _id: ''
  })



  let saveEnqury = (e) => {
    e.preventDefault()

    if (formData._id) {
      axios.put(`http://localhost:3000/api/website/enquery/update/${formData._id}`, formData)
        .then((res) => {
          setFormData({
            name: '',
            email: '',
            phone: '',
            messege: ''
          })
          toast.success(res.data.msg);
          getAllData();
        })

    } else {
      axios.post(`http://localhost:3000/api/website/enquery/insert`, formData)
        .then((res) => {
          setFormData({
            name: '',
            email: '',
            phone: '',
            messege: ''
          })

          if (res.data.status === 0) {
            if (res.data?.error?.code === 11000 && res.data?.error?.keyPattern?.email) {
              toast.error(`Email "${res.data.error.keyValue.email}" already exists.`);
            } else {
              toast.error(res.data.msg || 'Something went wrong');
            }
          } else {
            toast.success(res.data.msg);
          }
          getAllData();
        })
    }



  }
  let getValue = (e) => {
    let inputName = e.target.name
    let inputValue = e.target.value
    let oldData = { ...formData }

    oldData[inputName] = inputValue;
    setFormData(oldData)
  }



  let getAllData = () => {
    axios.get(`http://localhost:3000/api/website/enquery/view`)
      .then((res) => {
        return res.data;
      })

      .then((finalData) => {
        if (finalData.status) {
          setEnqueryList(finalData.enqueryList);
        }

      })
  }


  useEffect(() => {
    getAllData();
  }, [])


  return (
    <div className='bg-gray-900 p-4 h-screen grid grid-cols-[30%_auto] gap-40 '>
      <div className=''>
        <ToastContainer />
        <h1 className='text-4xl text-left pb-10 text-white font-bold'>Enquiry form</h1>
        <form action="" className=" gap-4" onSubmit={saveEnqury}>

          <div>
            <div className="mb-2 ">
              <Label htmlFor="name" className='text-black'>Name</Label>
            </div>
            <TextInput id="name" value={formData.name} onChange={getValue} type="text" name='name' placeholder="Name" />
          </div>
          <div>
            <div className="mb-2 ">
              <Label htmlFor="email" className='text-black'>Email</Label>
            </div>
            <TextInput id="email" value={formData.email} onChange={getValue} type="email" name='email' placeholder="Email" />
          </div>
          <div>
            <div className="mb-2 ">
              <Label htmlFor="phone" className='text-black'>phone No.</Label>
            </div>
            <TextInput id="phone" value={formData.phone} onChange={getValue} type="text" name='phone' placeholder="phone No." />
          </div>
          <div>
            <div className="mb-2 ">
              <Label htmlFor="messege" className='text-black'>Comment</Label>
            </div>
            <Textarea id="messege" value={formData.messege} onChange={getValue} name="messege" placeholder="Leave a comment..." rows={4} />
          </div>
          <Button type="submit">
            {formData._id ? 'Update' : 'Save'}
          </Button>
        </form>
      </div>
      <div className="overflow-x-auto">
        <h1 className='text-4xl text-left pb-10 text-white font-bold'>Enquiry form list</h1>
        <EnquiryList data={enqueryList} getAllData={getAllData} Swal={Swal} setFormData={setFormData} />
      </div>

    </div>

  )
}
