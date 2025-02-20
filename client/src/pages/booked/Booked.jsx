import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import "./booked.css";

const Booked = () => {
  const location = useLocation();
  const booking = location.state;
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [hotelDetails, setHotelDetails] = useState(null);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const res = await axios.get(`/hotels/find/${booking.hotelId}`);
        setHotelDetails(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchHotelDetails();
  }, [booking.hotelId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };

  return (
    <div className="booked">
      <h1>Xác nhận đặt phòng</h1>
      <div className="booking-details">
        <div className="detail-item">
          <span>Tên người đặt:</span>
          <span>{user.username}</span>
        </div>
        {hotelDetails && (
          <div className="detail-item">
            <span>Khách sạn:</span>
            <span>{hotelDetails.name}</span>
          </div>
        )}
        <div className="detail-item">
          <span>Thời gian đặt:</span>
          <span>{new Date(booking.bookingTime).toLocaleString('vi-VN')}</span>
        </div>

        <h2>Chi tiết đặt phòng</h2>
        <div className="detail-item">
          <span>Ngày nhận phòng:</span>
          <span>{formatDate(booking.checkInDate)}</span>
        </div>
        <div className="detail-item">
          <span>Ngày trả phòng:</span>
          <span>{formatDate(booking.checkOutDate)}</span>
        </div>
        <div className="detail-item">
          <span>Tổng giá:</span>
          <span>{booking.totalPrice.toLocaleString()} VND</span>
        </div>
        <div className="rooms-list">
          <h3>Phòng đã đặt:</h3>
          {booking.rooms.map((room, index) => (
            <div key={index} className="room-item">
              <div>Số phòng: {room.roomNumber}</div>
              <div>Tên phòng: {room.title}</div>
              <div>Loại phòng: {room.roomType}</div>
              <div>Giá: {room.price.toLocaleString()} VND</div>
            </div>
          ))}
        </div>
        <button 
          className="ok-button"
          onClick={() => navigate("/")}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default Booked;
