
import axios from "axios";
import { Table, TableBody, Button, TableCell, TableHead, TableHeadCell, TableRow, ButtonGroup } from "flowbite-react";
export default function EnquiryList({ data, getAllData, Swal, setFormData }) {


  let deleteRow = (delId) => {

    Swal.fire({
      title: "Do you want to delete?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Yes",

    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:3000/api/website/enquery/delete/${delId}`)
          .then((res) => {
            Swal.fire("Deleted", "", "success");
            getAllData();
          })
      }
    });
  }


  let editRow = (editId) => {

    axios.get(`http://localhost:3000/api/website/enquery/single/${editId}`)
      .then((res) => {
        let data = res.data
        setFormData(data.enquery);
      })
  }


  return (
    <div>

      <Table hoverable>
        <TableHead>
          <TableRow>
            <TableHeadCell>#</TableHeadCell>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Email</TableHeadCell>
            <TableHeadCell>Phone No.</TableHeadCell>
            <TableHeadCell>Comments</TableHeadCell>
            <TableHeadCell>
              <span className="sr-only">Edit</span>
            </TableHeadCell>
          </TableRow>
        </TableHead>

        <TableBody className="divide-y">
          {
            data.length >= 1 ?
              data.map((item, index) => {
                return (
                  <TableRow key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {index + 1}
                    </TableCell>
                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {item.name}
                    </TableCell>
                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {item.email}
                    </TableCell>
                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {item.phone}
                    </TableCell>
                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {item.messege}
                    </TableCell>
                    <TableCell>

                      <button onClick={() => editRow(item._id)} >Edit</button>
                      <button onClick={() => deleteRow(item._id)} >Delete</button>

                    </TableCell>
                  </TableRow>

                )
              })
              :
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  No Data found!
                </TableCell>
              </TableRow>
          }

        </TableBody>
      </Table>
    </div>
  )
}