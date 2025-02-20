import { useEffect, useState, useContext } from "react";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import "./allbooked.css";

const Allbooked = () => {
  const [bookings, setBookings] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
  }, [user, navigate]);



  useEffect(() => {
    if (user) {
      const fetchBookings = async () => {
        try {
          const res = await axios.get(`/hotels/bookings/${user._id}`);
          setBookings(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchBookings();
    }
  }, [user]);



  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };

  return (
    <div className="allbooked">
      <h1>Lịch sử đặt phòng</h1>
      <div className="bookings-list">
        {bookings.map((booking) => (
          <div key={booking._id} className="booking-item">
            <div className="booking-header">
              <h3>{booking.hotelId.name}</h3>
              <div>{booking.hotelId.address}</div>
            </div>
            <div className="booking-details">
              <div>
                <span>Ngày nhận phòng:</span>
                <span>{formatDate(booking.checkInDate)}</span>
              </div>
              <div>
                <span>Ngày trả phòng:</span>
                <span>{formatDate(booking.checkOutDate)}</span>
              </div>
              <div>
                <span>Tổng giá:</span>
                <span>{booking.totalPrice.toLocaleString()} VND</span>
              </div>
              <div className="rooms-list">
                <h4>Phòng đã đặt:</h4>
                {booking.rooms.map((room, index) => (
                  <div key={index} className="room-item">
                    <div>Tên phòng: {room.title}</div>
                    <div>Số phòng: {room.roomNumber}</div>
                    <div>Giá: {room.price.toLocaleString()} VND</div>
                  </div>

                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Allbooked;
