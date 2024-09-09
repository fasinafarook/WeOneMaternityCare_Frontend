import React, { useEffect, useState } from "react";
import { blockUser, getUsers } from "../../api/adminAPI";
import Footer from "../../components/common_pages/Footer";
import AdminNavbar from "../../components/common_pages/AdminHeader";
import AdminSidebar from "../../components/common_pages/AdminSidebars";
import toast from "react-hot-toast";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { FiSearch, FiUser, FiMail, FiPhone, FiLock, FiUnlock } from "react-icons/fi";
import { FaBars } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../components/common_pages/Pagination";
import TableShimmer from "../../components/common_pages/Table";

interface User {
  _id: string;
  name: string;
  email: string;
  mobile: number;
  password: string;
  isBlocked: boolean;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState(1);
  const currentPage = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "5");
  const [show, setShow] = useState(false);
  

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSearch = (name: string) => {
    setSearch(name);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleBlock = async (userId: string, userBlocked: boolean) => {
    try {
      const response = await blockUser(userId);
      if (response.success) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, isBlocked: !userBlocked } : user
          )
        );
        setSelectedUser((prevUser) =>
          prevUser ? { ...prevUser, isBlocked: !userBlocked } : null
        );
        setOpenModal(false);
        toast.success(`User ${userBlocked ? "unblocked" : "blocked"} successfully`);
      } else {
        toast.error("Failed to update user status");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating user status");
    }
  };

  const fetchUsers = async (page: number, limit: number) => {
    try {
      setLoading(true);
      const usersList = await getUsers(page, limit);
      setUsers(usersList.data);
      setTotalPages(Math.ceil(usersList.total / limit));
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch users");
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString(), limit: limit.toString() });
  };

  useEffect(() => {
    fetchUsers(currentPage, limit);
  }, [currentPage, limit]);

  const handleOpenModal = (user: User) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedUser(null);
  };

  return (
    <>
      {/* Header */}
      <AdminNavbar />

      {/* Page Layout */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

        {/* Menu Button */}
        <Button
          variant="primary"
          onClick={handleShow}
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            zIndex: 1000, 
            background:'black'// Ensures button stays on top
          }}
        >
          <FaBars /> Menu
        </Button>

        {/* Sidebar */}
        <AdminSidebar show={show} handleClose={handleClose} />
<br /><br />
        <div className="bg-gray-100 flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Users</h1>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="relative">
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Search for users"
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <FiSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>
<br />
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mobile
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>

                {loading ? (
                  <TableShimmer columns={5} />
                ) : (
                  <tbody className="divide-y divide-gray-200">
                    {filteredUsers.map((user, index) => (
                      <tr key={user._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <FiUser className="h-10 w-10 rounded-full text-gray-400" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {user.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FiMail className="text-gray-400 mr-2" />
                            <div className="text-sm text-gray-900">
                              {user.email}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FiPhone className="text-gray-400 mr-2" />
                            <div className="text-sm text-gray-900">
                              {user.mobile}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleOpenModal(user)}
                            className={`inline-flex items-center px-5 py-2.5 text-sm font-semibold rounded-full shadow-sm transition-all duration-300 ease-in-out ${
                              user.isBlocked
                                ? "bg-white text-green-700 border border-green-300 hover:bg-green-50 hover:border-green-400 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                : "bg-white text-red-700 border border-red-300 hover:bg-red-50 hover:border-red-400 focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            } hover:shadow-md focus:outline-none`}
                          >
                            {user.isBlocked ? (
                              <>
                                <FiUnlock className="mr-2 h-4 w-4 stroke-2" />{" "}
                                Unblock
                              </>
                            ) : (
                              <>
                                <FiLock className="mr-2 h-4 w-4 stroke-2" /> Block
                              </>
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>

            <Pagination
              currentPage={currentPage}
              onPageChange={handlePageChange}
              totalPages={totalPages}
            />

            <Dialog open={openModal} handler={handleCloseModal}>
              <DialogHeader>
                {selectedUser?.isBlocked ? "Unblock User" : "Block User"}
              </DialogHeader>
              <DialogBody divider>
                Are you sure you want to{" "}
                {selectedUser?.isBlocked ? "unblock" : "block"} this user?
              </DialogBody>
              <DialogFooter>
                <Button
                  variant="text"
                  color="red"
                  onClick={handleCloseModal}
                  className="mr-1"
                >
                  Cancel
                </Button>
                <Button
                  variant="gradient"
                  color="green"
                  onClick={() =>
                    handleBlock(
                      selectedUser?._id || "",
                      selectedUser?.isBlocked || false
                    )
                  }
                >
                  {selectedUser?.isBlocked ? "Unblock" : "Block"}
                </Button>
              </DialogFooter>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Users;
