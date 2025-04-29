// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";
// import "bootstrap-icons/font/bootstrap-icons.css";
// import "../../admin/ManageUser/manage.scss";
// import { useEffect, useState } from "react";
// import {
//   getPostByUserId,
//   createPost,
//   updatePost,
//   deletePost,
//   getStudentId,
//   updateStatusResponse,
// } from "../../../services/PostService";
// import { getUserLogined } from "../../../services/UserService";

// const ManagePost = () => {
//   const [posts, setPosts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [recordsPerPage, setRecordsPerPage] = useState(5);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [responseModalOpen, setResponseModalOpen] = useState(false);
//   const [selectedResponses, setSelectedResponses] = useState([]);
//   const [selectedPost, setSelectedPost] = useState(null);
//   const [loggedInUserId, setLoggedInUserId] = useState(null);
//   const [studentId, setStudentId] = useState(null);
//   const [formData, setFormData] = useState({
//     id_student: null,
//     subject: "",
//     class: "",
//     student_count: "",
//     hours_per_session: "",
//     sessions_per_week: "",
//     audience: "",
//     method: "",
//     tuition: "",
//     phone: "",
//     gender: "",
//     address: "",
//     notes: "",
//     status: "chờ duyệt",
//   });

//   const indexOfLastRecord = currentPage * recordsPerPage;
//   const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
//   const currentRecords = posts.slice(indexOfFirstRecord, indexOfLastRecord);

//   const npage = Math.ceil(posts.length / recordsPerPage);
//   const numbers = [...Array(npage + 1).keys()].slice(1);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const userData = await getUserLogined();
//         if (userData && userData.id) {
//             setLoggedInUserId(userData.id);
//             const studentData = await getStudentId(userData.id);
//             if (studentData && studentData.id_student) {
//                 setStudentId(studentData.id_student);
//                 setFormData((prev) => ({
//                     ...prev,
//                     id_student: parseInt(studentData.id_student),
//                 }));
//             }
//         }
//       } catch (error) {
//         console.error("Lỗi khi lấy dữ liệu người dùng hoặc học sinh:", error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const userId = loggedInUserId;
//   // console.log(userId);
//   // console.log(studentId);

//   useEffect(() => {
//     const fetchPosts = async () => {
//         try {
//           const data = await getPostByUserId(userId);
//           setPosts(data);
//           console.log("Dữ liệu posts từ API:", data);
//         } catch (error) {
//             console.error("Lỗi khi lấy danh sách bài đăng:", error);
//         }
//     };
//     fetchPosts();
//   }, [userId, recordsPerPage]);

//   const handleInputChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [id]: value,
//     }));
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//         if (!studentId) {
//             console.error("studentId is not available.");
//             return;
//         }
//         console.log("Dữ liệu gửi đi:", formData);
//         const data = await createPost(formData);
//         console.log("Dữ liệu trả về từ createPost:", data);
//         setPosts((prev) => [...prev, data]);
//         setModalOpen(false);
//         resetFormData();
//     } catch (error) {
//         console.error("Lỗi khi thêm bài đăng:", error);
//     }
//   };

//   const handleUpdate = async () => {
//     if (!selectedPost) return;
//     try {
//         await updatePost(selectedPost.id_post, formData);
//         setPosts((prev) =>
//             prev.map((p) =>
//                 p.id_post === selectedPost.id_post ? { ...p, ...formData } : p
//             )
//         );
//         setModalOpen(false);
//     } catch (error) {
//         console.error("Lỗi khi cập nhật bài đăng:", error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//         await deletePost(id);
//         setPosts((prev) => prev.filter((p) => p.id_post !== id));
//     } catch (error) {
//         console.error("Lỗi khi xóa bài đăng:", error);
//     }
//   };

//   const handleEditClick = (post) => {
//     setSelectedPost(post);
//     setFormData({
//       id_student: post.id_student || "",
//       subject: post.subject || "",
//       class: post.class || "",
//       student_count: post.student_count || "",
//       hours_per_session: post.hours_per_session || "",
//       sessions_per_week: post.sessions_per_week || "",
//       audience: post.audience || "",
//       method: post.method || "",
//       tuition: post.tuition || "",
//       phone: post.phone || "",
//       gender: post.gender || "",
//       address: post.address || "",
//       notes: post.notes || "",
//       status: post.status || "chờ duyệt",
//     });
//     setModalOpen(true);
//   };

//   const resetFormData = () => {
//     setFormData({
//       id_student: "",
//       subject: "",
//       class: "",
//       student_count: "",
//       hours_per_session: "",
//       sessions_per_week: "",
//       audience: "",
//       method: "",
//       tuition: "",
//       phone: "",
//       gender: "",
//       address: "",
//       notes: "",
//       status: "chờ duyệt",
//     });
//   };

//   const changePage = (id) => {
//     setCurrentPage(id);
//   };

//   const truncateNotes = (notes) => {
//     if (!notes) return "";
//     if (notes.length > 10) {
//       return notes.substring(0, 10) + "...";
//     }
//     return notes;
//   };

//   const handleNotesClick = (e) => {
//     const fullNotes = e.target.getAttribute("data-full-notes");
//     if (fullNotes) {
//       alert(fullNotes);
//     }
//   };

//   const handleResponseStatusChange = (responseId, newStatus) => {
//     setSelectedResponses((prev) =>
//       prev.map((response) =>
//         response.id_response === responseId ? { ...response, status: newStatus } : response
//       )
//     );
//   };

//   const handleViewResponses = (post) => {
//     setSelectedPost(post);
//     setSelectedResponses(post.responses || []);
//     console.log("Dữ liệu selectedResponses:", post.responses);
//     setResponseModalOpen(true);
//   };

//   const handleConfirmResponses = async () => {
//     try {
//       for (const response of selectedResponses) {
//         if (response.id_response && response.status) {
//           await updateStatusResponse(response.id_response, { status: response.status });
//         }
//       }
//       setPosts((prev) =>
//         prev.map((post) =>
//           post.id_post === selectedPost.id_post
//             ? { ...post, responses: selectedResponses }
//             : post
//         )
//       );
//       setResponseModalOpen(false);
//     } catch (error) {
//       console.error("Lỗi khi cập nhật trạng thái phản hồi:", error);
//       alert("Lỗi sửa phản hồi");
//     }
//   };

//   return (
//     <>
//       <div className="container">
//         <h4 className="text-center mt-4">QUẢN LÝ BÀI ĐĂNG</h4>
//         <div className="d-flex justify-content-between align-items-center mb-2">
//           <select
//             className="form-select w-auto"
//             value={recordsPerPage}
//             onChange={(e) => {
//               setRecordsPerPage(Number(e.target.value));
//               setCurrentPage(1);
//             }}
//           >
//             <option value={5}>5 bản ghi/trang</option>
//             <option value={10}>10 bản ghi/trang</option>
//             <option value={15}>15 bản ghi/trang</option>
//           </select>
//           <button
//             className="btn-add"
//             onClick={() => {
//               setSelectedPost(null);
//               resetFormData();
//               setModalOpen(true);
//             }}
//           >
//             <i className="bi bi-file-earmark-plus"></i> Thêm bài đăng
//           </button>
//         </div>

//         <table className="table table-bordered text-center align-middle">
//           <thead>
//             <tr>
//               <th>STT</th>
//               {/* <th>ID Student</th> */}
//               <th>Môn học</th>
//               <th>Lớp</th>
//               <th style={{ width: "10px" }}>Số hv</th>
//               <th style={{ width: "10px" }}>giờ/ buổi</th>
//               <th style={{ width: "10px" }}>buổi/ tuần</th>
//               <th>Đối tượng</th>
//               <th>Hình thức</th>
//               <th>Học phí</th>
//               <th>Điện thoại</th>
//               <th>Giới tính</th>
//               <th>Địa chỉ</th>
//               <th>Ghi chú</th>
//               <th>Trạng thái</th>
//               <th>Phản hồi</th>
//               <th colSpan={2}>Thao tác</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentRecords.map((post, index) => (
//               <tr key={post.id_post}>
//                 <td>{index + 1 + (currentPage - 1) * recordsPerPage}</td>
//                 {/* <td>{post.id_student}</td> */}
//                 <td>{post.subject}</td>
//                 <td>{post.class}</td>
//                 <td>{post.student_count}</td>
//                 <td>{post.hours_per_session}</td>
//                 <td>{post.sessions_per_week}</td>
//                 <td>{post.audience}</td>
//                 <td>{post.method}</td>
//                 <td>{post.tuition}</td>
//                 <td>{post.phone}</td>
//                 <td>{post.gender}</td>
//                 <td>{post.address}</td>
//                 <td
//                   style={{ cursor: "pointer" }}
//                   onClick={handleNotesClick}
//                   data-full-notes={post.notes}
//                 >
//                   {truncateNotes(post.notes)}
//                 </td>
//                 <td>{post.status}</td>
//                 <td>
//                   <button
//                     className="btn btn-info"
//                     onClick={() => handleViewResponses(post)}
//                   >
//                     {/* <i className="bi bi-eye"></i>*/} Xem phản hồi
//                   </button>
//                 </td>
//                 <td
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <button
//                     className="btn btn-warning me-2"
//                     onClick={() => handleEditClick(post)}
//                   >
//                     <i className="bi bi-pencil-square"></i>
//                   </button>
//                   <button
//                     className="btn btn-danger"
//                     onClick={() => handleDelete(post.id_post)}
//                   >
//                     <i className="bi bi-trash"></i>
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <nav>
//           <ul
//             className="pagination pagination-container justify-content-center"
//             style={{ color: "#10B1ff" }}
//           >
//             <li className="page-item">
//               <button
//                 className="page-link"
//                 onClick={() => changePage(currentPage - 1)}
//                 disabled={currentPage === 1}
//               >
//                 Prev
//               </button>
//             </li>
//             {numbers.map((n) => (
//               <li
//                 key={n}
//                 className={`page-item ${currentPage === n ? "active" : ""}`}
//               >
//                 <button className="page-link" onClick={() => changePage(n)}>
//                   {n}
//                 </button>
//               </li>
//             ))}
//             <li className="page-item">
//               <button
//                 className="page-link"
//                 onClick={() => changePage(currentPage + 1)}
//                 disabled={currentPage === npage}
//               >
//                 Next
//               </button>
//             </li>
//           </ul>
//         </nav>
//       </div>

//       {modalOpen && (
//         <div
//           className="modal fade show d-block"
//           tabIndex="-1"
//           style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
//         >
//           <div className="modal-dialog modal-dialog-centered">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">
//                   {selectedPost ? "Cập nhật bài đăng" : "Thêm bài đăng"}
//                 </h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   onClick={() => setModalOpen(false)}
//                 ></button>
//               </div>

//               <div className="modal-body">
//                 {/* <div className="mb-3">
//                   <input
//                     type="text"
//                     id="id_student"
//                     className="form-control"
//                     placeholder="Id học viên"
//                     value={formData.id_student}
//                     onChange={handleInputChange}
//                   />
//                 </div> */}
//                 <div className="mb-3">
//                   <input
//                     type="text"
//                     id="subject"
//                     className="form-control"
//                     placeholder="Môn học"
//                     value={formData.subject}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <input
//                     type="text"
//                     id="class"
//                     className="form-control"
//                     placeholder="Lớp"
//                     value={formData.class}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <input
//                     type="number"
//                     id="student_count"
//                     className="form-control"
//                     placeholder="Số lượng học viên"
//                     value={formData.student_count}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <input
//                     type="number"
//                     step="0.5"
//                     id="hours_per_session"
//                     className="form-control"
//                     placeholder="Số giờ/ buổi"
//                     value={formData.hours_per_session}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <input
//                     type="number"
//                     id="sessions_per_week"
//                     className="form-control"
//                     placeholder="Số buổi/ tuần"
//                     value={formData.sessions_per_week}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <select
//                     id="audience"
//                     className="form-select"
//                     value={formData.audience}
//                     onChange={handleInputChange}
//                   >
//                     <option value="">Chọn đối tượng dạy</option>
//                     <option value="giáo viên">Giáo viên</option>
//                     <option value="sinh viên">Sinh viên</option>
//                   </select>
//                 </div>
//                 <div className="mb-3">
//                   <select
//                     id="method"
//                     className="form-select"
//                     value={formData.method}
//                     onChange={handleInputChange}
//                   >
//                     <option value="">Chọn hình thức học</option>
//                     <option value="online">Online</option>
//                     <option value="offline">Offline</option>
//                   </select>
//                 </div>
//                 <div className="mb-3">
//                   <input
//                     type="number"
//                     id="tuition"
//                     className="form-control"
//                     placeholder="Học phí"
//                     value={formData.tuition}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <input
//                     type="text"
//                     id="phone"
//                     className="form-control"
//                     placeholder="Số điện thoại"
//                     value={formData.phone}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <select
//                     id="gender"
//                     className="form-select"
//                     value={formData.gender}
//                     onChange={handleInputChange}
//                   >
//                     <option value="">Chọn giới tính</option>
//                     <option value="nam">Nam</option>
//                     <option value="nữ">Nữ</option>
//                   </select>
//                 </div>
//                 <div className="mb-3">
//                   <input
//                     type="text"
//                     id="address"
//                     className="form-control"
//                     placeholder="Địa chỉ"
//                     value={formData.address}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <textarea
//                     id="notes"
//                     className="form-control"
//                     placeholder="Ghi chú"
//                     value={formData.notes}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//                 {/* <div className="mb-3">
//                   <select
//                     id="status"
//                     className="form-select"
//                     value={formData.status}
//                     onChange={handleInputChange}
//                   >
//                     <option value="chờ duyệt">Chờ duyệt</option>
//                     <option value="đã duyệt">Đã duyệt</option>
//                     <option value="đã huỷ">Đã huỷ</option>
//                   </select>
//                 </div> */}
//               </div>
//               <div className="modal-footer">
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => setModalOpen(false)}
//                 >
//                   Hủy
//                 </button>
//                 <button
//                   className="btn btn-primary"
//                   onClick={selectedPost ? handleUpdate : handleSubmit}
//                 >
//                   {selectedPost ? "Cập nhật" : "Thêm"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

// {responseModalOpen && (
//         <div
//           className="modal fade show d-block"
//           tabIndex="-1"
//           style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
//         >
//           <div className="modal-dialog modal-dialog-centered modal-lg">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Danh sách phản hồi</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   onClick={() => setResponseModalOpen(false)}
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 {selectedResponses.length > 0 &&
//                 selectedResponses[0].id_response ? (
//                   <table className="table table-bordered">
//                     <thead>
//                       <tr>
//                         <th>STT</th>
//                         <th>Người phản hồi</th>
//                         <th>Nội dung</th>
//                         <th>Thời gian</th>
//                         <th>Trạng thái</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {selectedResponses.map((response, index) => (
//                         <tr key={response.id_response}>
//                           <td>{index + 1}</td>
//                           <td>{response.tutor_name}</td>
//                           <td>{response.message}</td>
//                           <td>{new Date(response.created_at).toLocaleString()}</td>
//                           <td>
//                             <select
//                               className="form-select"
//                               value={response.status || "chờ phản hồi"}
//                               onChange={(e) =>
//                                 handleResponseStatusChange(
//                                   response.id_response,
//                                   e.target.value
//                                 )
//                               }
//                             >
//                               <option value="chờ phản hồi">Chờ phản hồi</option>
//                               <option value="đã chấp nhận">Đồng ý</option>
//                               <option value="từ chối">Từ chối</option>
//                             </select>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 ) : (
//                   <p>Chưa có phản hồi cho bài đăng này.</p>
//                 )}
//               </div>
//               <div className="modal-footer">
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => setResponseModalOpen(false)}
//                 >
//                   Hủy
//                 </button>
//                 <button
//                   className="btn btn-primary"
//                   onClick={handleConfirmResponses}
//                   disabled={
//                     !selectedResponses.length ||
//                     !selectedResponses[0].id_response
//                   }
//                 >
//                   Xác nhận
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ManagePost;

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../admin/ManageUser/manage.scss";
import { useEffect, useState } from "react";
import {
  getPostByUserId,
  createPost,
  updatePost,
  deletePost,
  getStudentId,
  updateStatusResponse,
} from "../../../services/PostService";
import { getUserLogined } from "../../../services/UserService";

const ManagePost = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [modalOpen, setModalOpen] = useState(false);
  const [responseModalOpen, setResponseModalOpen] = useState(false);
  const [selectedResponses, setSelectedResponses] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [studentId, setStudentId] = useState(null);
  const [loading, setLoading] = useState(true); // Thêm trạng thái đang tải
  const [formData, setFormData] = useState({
    id_student: "",
    subject: "",
    class: "",
    student_count: "",
    hours_per_session: "",
    sessions_per_week: "",
    audience: "",
    method: "",
    tuition: "",
    phone: "",
    gender: "",
    address: "",
    notes: "",
    status: "chờ duyệt",
  });

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = posts.slice(indexOfFirstRecord, indexOfLastRecord);

  const npage = Math.ceil(posts.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  // Lấy dữ liệu người dùng và ID học viên
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true); // Đặt trạng thái là true khi đang lấy dữ liệu
        const userData = await getUserLogined();
        if (userData && userData.id) {
          setLoggedInUserId(userData.id);
          const studentData = await getStudentId(userData.id);
          if (studentData && studentData.id_student) {
            setStudentId(studentData.id_student);
          } else {
            console.error("Không tìm thấy studentId trong dữ liệu trả về.");
          }
        } else {
          console.error("Không tìm thấy userId trong dữ liệu người dùng.");
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu người dùng hoặc học sinh:", error);
      } finally {
        setLoading(false); // Đặt trạng thái là false sau khi lấy dữ liệu
      }
    };

    fetchUserData();
  }, []);

  // Cập nhật formData khi studentId thay đổi
  useEffect(() => {
    if (studentId) {
      setFormData((prev) => ({
        ...prev,
        id_student: parseInt(studentId), // Đảm bảo(Ensure) id_student được cập nhật
      }));
    }
  }, [studentId]);

  const userId = loggedInUserId;

  // Lấy bài đăng
  useEffect(() => {
    const fetchPosts = async () => {
      if (!userId) return; // Đợi cho đến khi userId có sẵn (available)
      try {
        const data = await getPostByUserId(userId);
        setPosts(data);
        console.log("Dữ liệu posts từ API:", data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách bài đăng:", error);
      }
    };
    fetchPosts();
  }, [userId, recordsPerPage]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!studentId) {
      console.error("studentId is not available.");
      alert("Không thể thêm bài đăng vì thiếu studentId.");
      return;
    }
    try {
      console.log("Dữ liệu gửi đi:", formData);
      const data = await createPost(formData);
      console.log("Dữ liệu trả về từ createPost:", data);
      setPosts((prev) => [...prev, data]);
      setModalOpen(false);
      resetFormData();
    } catch (error) {
      console.error("Lỗi khi thêm bài đăng:", error);
    }
  };

  const handleUpdate = async () => {
    if (!selectedPost) return;
    try {
      console.log("Dữ liệu formData trước khi updatePost:", formData);
      await updatePost(selectedPost.id_post, formData);
      setPosts((prev) =>
        prev.map((p) =>
          p.id_post === selectedPost.id_post ? { ...p, ...formData } : p
        )
      );
      setModalOpen(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật bài đăng:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePost(id);
      setPosts((prev) => prev.filter((p) => p.id_post !== id));
    } catch (error) {
      console.error("Lỗi khi xóa bài đăng:", error);
    }
  };

  const handleEditClick = (post) => {
    setSelectedPost(post);
    setFormData({
      id_student: post.id_student || studentId || "", // Sử dụng studentId nếu có sẵn
      subject: post.subject || "",
      class: post.class || "",
      student_count: post.student_count || "",
      hours_per_session: post.hours_per_session || "",
      sessions_per_week: post.sessions_per_week || "",
      audience: post.audience || "",
      method: post.method || "",
      tuition: post.tuition || "",
      phone: post.phone || "",
      gender: post.gender || "",
      address: post.address || "",
      notes: post.notes || "",
      status: post.status || "chờ duyệt",
    });
    setModalOpen(true);
  };

  const resetFormData = () => {
    setFormData({
      id_student: studentId || "", // Đảm bảo id_student luôn được đặt thành studenId
      subject: "",
      class: "",
      student_count: "",
      hours_per_session: "",
      sessions_per_week: "",
      audience: "",
      method: "",
      tuition: "",
      phone: "",
      gender: "",
      address: "",
      notes: "",
      status: "chờ duyệt",
    });
  };

  const changePage = (id) => {
    setCurrentPage(id);
  };

  const truncateNotes = (notes) => {
    if (!notes) return "";
    if (notes.length > 10) {
      return notes.substring(0, 10) + "...";
    }
    return notes;
  };

  const handleNotesClick = (e) => {
    const fullNotes = e.target.getAttribute("data-full-notes");
    if (fullNotes) {
      alert(fullNotes);
    }
  };

  const handleResponseStatusChange = (responseId, newStatus) => {
    setSelectedResponses((prev) =>
      prev.map((response) =>
        response.id_response === responseId
          ? { ...response, status: newStatus }
          : response
      )
    );
  };

  const handleViewResponses = (post) => {
    setSelectedPost(post);
    setSelectedResponses(post.responses || []);
    console.log("Dữ liệu selectedResponses:", post.responses);
    setResponseModalOpen(true);
  };

  const handleConfirmResponses = async () => {
    try {
      for (const response of selectedResponses) {
        if (response.id_response && response.status) {
          await updateStatusResponse(response.id_response, {
            status: response.status,
          });
        }
      }
      setPosts((prev) =>
        prev.map((post) =>
          post.id_post === selectedPost.id_post
            ? { ...post, responses: selectedResponses }
            : post
        )
      );
      setResponseModalOpen(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái phản hồi:", error);
      alert("Lỗi sửa phản hồi");
    }
  };

  // Ngăn hiển thị form hoặc gửi dữ liệu cho đến khi studentId được tải
  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  return (
    <>
      <div className="container">
        <h4 className="text-center mt-4">QUẢN LÝ BÀI ĐĂNG</h4>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <select
            className="form-select w-auto"
            value={recordsPerPage}
            onChange={(e) => {
              setRecordsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={5}>5 bản ghi/trang</option>
            <option value={10}>10 bản ghi/trang</option>
            <option value={15}>15 bản ghi/trang</option>
          </select>
          <button
            className="btn-add"
            onClick={() => {
              setSelectedPost(null);
              resetFormData();
              setModalOpen(true);
            }}
            disabled={!studentId} // Vô hiệu hóa nút nếu studentId không có sẵn
          >
            <i className="bi bi-file-earmark-plus"></i> Thêm bài đăng
          </button>
        </div>

        <table className="table table-bordered text-center align-middle">
          <thead>
            <tr>
              <th>STT</th>
              <th>Môn học</th>
              <th>Lớp</th>
              <th style={{ width: "10px" }}>Số hv</th>
              <th style={{ width: "10px" }}>giờ/ buổi</th>
              <th style={{ width: "10px" }}>buổi/ tuần</th>
              <th>Đối tượng</th>
              <th>Hình thức</th>
              <th>Học phí</th>
              <th>Điện thoại</th>
              <th>Giới tính</th>
              <th>Địa chỉ</th>
              <th>Ghi chú</th>
              <th>Trạng thái</th>
              <th>Phản hồi</th>
              <th colSpan={2}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((post, index) => (
              <tr key={post.id_post}>
                <td>{index + 1 + (currentPage - 1) * recordsPerPage}</td>
                <td>{post.subject}</td>
                <td>{post.class}</td>
                <td>{post.student_count}</td>
                <td>{post.hours_per_session}</td>
                <td>{post.sessions_per_week}</td>
                <td>{post.audience}</td>
                <td>{post.method}</td>
                <td>{post.tuition}</td>
                <td>{post.phone}</td>
                <td>{post.gender}</td>
                <td>{post.address}</td>
                <td
                  style={{ cursor: "pointer" }}
                  onClick={handleNotesClick}
                  data-full-notes={post.notes}
                >
                  {truncateNotes(post.notes)}
                </td>
                <td>{post.status}</td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => handleViewResponses(post)}
                  >
                    Xem phản hồi
                  </button>
                </td>
                <td
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => handleEditClick(post)}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(post.id_post)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <nav>
          <ul
            className="pagination pagination-container justify-content-center"
            style={{ color: "#10B1ff" }}
          >
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => changePage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Prev
              </button>
            </li>
            {numbers.map((n) => (
              <li
                key={n}
                className={`page-item ${currentPage === n ? "active" : ""}`}
              >
                <button className="page-link" onClick={() => changePage(n)}>
                  {n}
                </button>
              </li>
            ))}
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => changePage(currentPage + 1)}
                disabled={currentPage === npage}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {modalOpen && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {selectedPost ? "Cập nhật bài đăng" : "Thêm bài đăng"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setModalOpen(false)}
                ></button>
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <input
                    type="text"
                    id="subject"
                    className="form-control"
                    placeholder="Môn học"
                    value={formData.subject}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    id="class"
                    className="form-control"
                    placeholder="Lớp"
                    value={formData.class}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    id="student_count"
                    className="form-control"
                    placeholder="Số lượng học viên"
                    value={formData.student_count}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    step="0.5"
                    id="hours_per_session"
                    className="form-control"
                    placeholder="Số giờ/ buổi"
                    value={formData.hours_per_session}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    id="sessions_per_week"
                    className="form-control"
                    placeholder="Số buổi/ tuần"
                    value={formData.sessions_per_week}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <select
                    id="audience"
                    className="form-select"
                    value={formData.audience}
                    onChange={handleInputChange}
                  >
                    <option value="">Chọn đối tượng dạy</option>
                    <option value="giáo viên">Giáo viên</option>
                    <option value="sinh viên">Sinh viên</option>
                  </select>
                </div>
                <div className="mb-3">
                  <select
                    id="method"
                    className="form-select"
                    value={formData.method}
                    onChange={handleInputChange}
                  >
                    <option value="">Chọn hình thức học</option>
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                  </select>
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    id="tuition"
                    className="form-control"
                    placeholder="Học phí"
                    value={formData.tuition}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    id="phone"
                    className="form-control"
                    placeholder="Số điện thoại"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <select
                    id="gender"
                    className="form-select"
                    value={formData.gender}
                    onChange={handleInputChange}
                  >
                    <option value="">Chọn giới tính</option>
                    <option value="nam">Nam</option>
                    <option value="nữ">Nữ</option>
                  </select>
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    id="address"
                    className="form-control"
                    placeholder="Địa chỉ"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    id="notes"
                    className="form-control"
                    placeholder="Ghi chú"
                    value={formData.notes}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setModalOpen(false)}
                >
                  Hủy
                </button>
                <button
                  className="btn btn-primary"
                  onClick={selectedPost ? handleUpdate : handleSubmit}
                >
                  {selectedPost ? "Cập nhật" : "Thêm"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {responseModalOpen && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Danh sách phản hồi</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setResponseModalOpen(false)}
                ></button>
              </div>
              <div className="modal-body">
                {selectedResponses.length > 0 &&
                selectedResponses[0].id_response ? (
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Người phản hồi</th>
                        <th>Nội dung</th>
                        <th>Thời gian</th>
                        <th>Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedResponses.map((response, index) => (
                        <tr key={response.id_response}>
                          <td>{index + 1}</td>
                          <td>{response.tutor_name}</td>
                          <td>{response.message}</td>
                          <td>
                            {new Date(response.created_at).toLocaleString()}
                          </td>
                          <td>
                            <select
                              className="form-select"
                              value={response.status || "chờ phản hồi"}
                              onChange={(e) =>
                                handleResponseStatusChange(
                                  response.id_response,
                                  e.target.value
                                )
                              }
                            >
                              <option value="chờ phản hồi">Chờ phản hồi</option>
                              <option value="đã chấp nhận">Đồng ý</option>
                              <option value="từ chối">Từ chối</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>Chưa có phản hồi cho bài đăng này.</p>
                )}
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setResponseModalOpen(false)}
                >
                  Hủy
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleConfirmResponses}
                  disabled={
                    !selectedResponses.length ||
                    !selectedResponses[0].id_response
                  }
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManagePost;
