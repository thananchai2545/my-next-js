"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Categoty = {
  id: string;
  category_name: string;
};

const category = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [categoryName, setCategoryName] = useState<string>("");
  const [category, setCategory] = useState<Categoty[]>([]);
  const [id, setId] = useState<string>("");
  const [edit, setEdit] = useState(false);
  const [deleteId, setDeleteId] = useState<boolean>(false);

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    const respose = await axios.get("/api/category");
    setCategory(respose.data.category);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios
      .post("/api/category", { category_name: categoryName })
      .then((res) => {
        getCategory();
        setOpen(false);
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = async (item: Categoty) => {
    setCategoryName(item.category_name);
    setId(item.id);
    setEdit(true);
    setOpen(true);
  };

  const handleOpenModal = () => {
    setCategoryName("");
    setId("");
    setEdit(false);
    setOpen(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios
      .post(`/api/category/${id}`, {
        category_name: categoryName,
      })
      .then((res) => {
        getCategory();
        setOpen(false);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = async (id: string) => {
    setId(id);
    setDeleteId(true);
  };

  const handleDeleteConfirm = async () => {
    await axios
      .delete(`/api/category/${id}`)
      .then((res) => {
        setDeleteId(false);
        getCategory();
      })
      .catch((err) => console.log(err));
  };

  const pagination = () => {
    return category.length / 10;
  };
  return (
    <>
      <div className="flex justify-between mb-4">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li className="inline-flex items-center">
              <a
                href="#"
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3 me-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                </svg>
                Home
              </a>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <a
                  href="#"
                  className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                >
                  Projects
                </a>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg
                  className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                  Flowbite
                </span>
              </div>
            </li>
          </ol>
        </nav>
        <button
          onClick={() => handleOpenModal()}
          className="block text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
          Toggle modal
        </button>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <Table className="bg-white">
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-[10%] border-r text-center text-gray-900">
                #
              </TableHead>
              <TableHead className="w-[70%] text-gray-900 border-r">
                ชื่อหมวดหมู่สินค้า
              </TableHead>
              <TableHead className="text-center border-r text-gray-900">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {category.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium text-center border-r">
                  {index + 1}
                </TableCell>
                <TableCell className="border-r">{item.category_name}</TableCell>
                <TableCell className="text-center border-r">
                  <div>
                    <button
                      onClick={() => handleEdit(item)}
                      className="mx-2 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
                    >
                      Delete
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mt-2">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      {/* Modal */}
      {open && (
        <>
          <div
            id="crud-modal"
            className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center w-full md:inset-0 h-screen max-h-full bg-opacity-50 bg-gray-900"
          >
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow-sm ">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t  border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 ">
                    Create New Product
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600"
                    data-modal-toggle="crud-modal"
                  >
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <form
                  className="p-4 md:p-5"
                  onSubmit={(e) => (edit ? handleUpdate(e) : handleAdd(e))}
                >
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        ชื่อหมวดหมู่
                      </label>
                      <input type="hidden" value={id} />
                      <input
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Type product name"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={() => setOpen(!open)}
                      className="mx-2 text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                    >
                      ยกเลิก
                    </button>
                    <button
                      type="submit"
                      className={`text-white inline-flex items-centerfocus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
                        edit
                          ? "bg-green-600 hover:bg-green-700 focus:ring-green-800"
                          : "bg-blue-700 hover:bg-blue-800 focus:ring-blue-300"
                      }`}
                    >
                      เพิ่มหมวดหมู่
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
      {deleteId && (
        <div
          id="popup-modal"
          className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen max-h-full  bg-opacity-50 bg-gray-900 "
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow-sm ">
              <button
                type="button"
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="popup-modal"
              >
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <FontAwesomeIcon
                  icon={faCircleExclamation}
                  size="5x"
                ></FontAwesomeIcon>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete this product?
                </h3>
                <button
                  onClick={() => handleDeleteConfirm()}
                  data-modal-hide="popup-modal"
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:outline-none focus:ring-red-300  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  Yes, I'm sure
                </button>
                <button
                  onClick={() => {
                    setDeleteId(false);
                    setId("");
                  }}
                  data-modal-hide="popup-modal"
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 "
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default category;
