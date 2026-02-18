import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import './AdminDashboard.css';

function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin");
  };

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const res = await API.get(
        "/api/admin/bookings",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setBookings(res.data);
      setLoading(false);
    } catch (err) {
      alert("Unauthorized ❌");
      setLoading(false);
    }
  };

  const handleDelete = async (bookingId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this booking? This action cannot be undone."
    );

    if (!confirmDelete) return;

    setDeletingId(bookingId);

    try {
      const token = localStorage.getItem("adminToken");

      await API.delete(
        `/api/admin/bookings/${bookingId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setBookings(bookings.filter(booking => booking._id !== bookingId));
      
      alert("Booking deleted successfully ✅");
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete booking ❌");
    } finally {
      setDeletingId(null);
    }
  };

  // 📊 Calculate Stats (without revenue)
  const calculateStats = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const activeBookings = bookings.filter(b => 
      new Date(b.checkOut) >= today
    ).length;

    const pastBookings = bookings.filter(b => 
      new Date(b.checkOut) < today
    ).length;

    const thisMonthBookings = bookings.filter(b => {
      const bookingDate = new Date(b.checkIn);
      return bookingDate.getMonth() === today.getMonth() &&
             bookingDate.getFullYear() === today.getFullYear();
    }).length;

    return {
      total: bookings.length,
      active: activeBookings,
      past: pastBookings,
      thisMonth: thisMonthBookings
    };
  };

  const stats = calculateStats();

  // 📄 Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = bookings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(bookings.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    pageNumbers.push(
      <button
        key="prev"
        className={`page-button ${currentPage === 1 ? 'disabled' : ''}`}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ‹
      </button>
    );

    // First page
    if (startPage > 1) {
      pageNumbers.push(
        <button
          key={1}
          className="page-button"
          onClick={() => handlePageChange(1)}
        >
          1
        </button>
      );
      if (startPage > 2) {
        pageNumbers.push(<span key="dots1" className="page-dots">...</span>);
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`page-button ${currentPage === i ? 'active' : ''}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    // Last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(<span key="dots2" className="page-dots">...</span>);
      }
      pageNumbers.push(
        <button
          key={totalPages}
          className="page-button"
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    // Next button
    pageNumbers.push(
      <button
        key="next"
        className={`page-button ${currentPage === totalPages ? 'disabled' : ''}`}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        ›
      </button>
    );

    return pageNumbers;
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-content">
          <h2 className="dashboard-title">Admin Dashboard</h2>
          <button className="logout-button" onClick={handleLogout}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            Logout
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        {/* 📊 Stats Cards - 3 Cards Only */}
        {loading ? (
          <div className="stats-grid">
            {[1, 2, 3].map(i => (
              <div key={i} className="stats-card skeleton-card">
                <div className="skeleton skeleton-icon"></div>
                <div className="stat-content">
                  <div className="skeleton skeleton-text"></div>
                  <div className="skeleton skeleton-value"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="stats-grid">
            <div className="stats-card">
              <div className="stat-icon stat-icon-blue">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              <div className="stat-content">
                <h3 className="stat-label">Total Bookings</h3>
                <p className="stat-value">{stats.total}</p>
                <span className="stat-description">All time bookings</span>
              </div>
            </div>

            <div className="stats-card">
              <div className="stat-icon stat-icon-green">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <div className="stat-content">
                <h3 className="stat-label">Active Bookings</h3>
                <p className="stat-value">{stats.active}</p>
                <span className="stat-description">Current & upcoming</span>
              </div>
            </div>

            <div className="stats-card">
              <div className="stat-icon stat-icon-purple">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div className="stat-content">
                <h3 className="stat-label">This Month</h3>
                <p className="stat-value">{stats.thisMonth}</p>
                <span className="stat-description">New bookings</span>
              </div>
            </div>
          </div>
        )}

        {/* 🔄 Loading Skeletons & Table */}
        {loading ? (
           <div className="table-container">
            <table className="bookings-table">
            <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th> {/* 👈 NEW COLUMN */}
              <th>Check In</th>
              <th>Check Out</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map(i => (
            <tr key={i} className="skeleton-row">
              <td><div className="skeleton skeleton-text"></div></td>
              <td><div className="skeleton skeleton-text"></div></td>
              <td><div className="skeleton skeleton-text-small"></div></td>
              <td><div className="skeleton skeleton-text-small"></div></td>
              <td><div className="skeleton skeleton-text-small"></div></td>
              <td><div className="skeleton skeleton-button"></div></td>
            </tr>
        ))}
      </tbody>
    </table>
 </div>
        ) : bookings.length === 0 ? (
          <div className="empty-state">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <p>No bookings found</p>
          </div>
        ) : (
          <>
            <div className="table-container">
            <div className="table-header">
              <h3>Recent Bookings</h3>
              <span className="table-count">
                Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, bookings.length)} of {bookings.length}
              </span>
            </div>
            <table className="bookings-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th> {/* 👈 NEW COLUMN */}
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentBookings.map((booking) => (
                  <tr key={booking._id} className={deletingId === booking._id ? 'deleting' : ''}>
                    <td>{booking.name}</td>
                    <td>{booking.email}</td>
                    <td>{booking.phone}</td>
                    <td>{new Date(booking.checkIn).toLocaleDateString()}</td>
                    <td>{new Date(booking.checkOut).toLocaleDateString()}</td>
                    <td>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(booking._id)}
                        disabled={deletingId === booking._id}
                      >
                        {deletingId === booking._id ? (
                          <span className="button-loading">Deleting...</span>
                        ) : (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 4 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                            Delete
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

            {/* 📄 Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <div className="pagination-info">
                  Page {currentPage} of {totalPages}
                </div>
                <div className="pagination-buttons">
                  {renderPageNumbers()}
                </div>
                <div className="pagination-jump">
                  <span>Go to page:</span>
                  <input
                    type="number"
                    min="1"
                    max={totalPages}
                    value={currentPage}
                    onChange={(e) => {
                      const page = parseInt(e.target.value);
                      if (page >= 1 && page <= totalPages) {
                        handlePageChange(page);
                      }
                    }}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;