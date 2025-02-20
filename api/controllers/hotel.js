import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import Booking from "../models/Booking.js";


export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body);

    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    } catch (err) {
        next(err);
    }
}
export const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedHotel);
    } catch (err) {
        next(err);
    }
}
export const deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(
            req.params.id
        );
        res.status(200).json("Hotel has been deleted.");
    } catch (err) {
        next(err);
    }
}
export const getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(
            req.params.id
        );
        res.status(200).json(hotel);
    } catch (err) {
        next(err);
    }
}
// export const getHotels = async (req, res, next) => {
//     const { min, max, ...others } = req.query
//     try {
//         const hotels = await Hotel.find({ ...others, cheapestPrice: { $gt: min | 1, $lt: max || 999 }, }).limit(req.query.limit);
//         res.status(200).json(hotels);
//     } catch (err) {
//         next(err);
//     }
// }

// export const getHotels=async(req,res,next)=>{
//     try {
//         const {limit,featured}=req.query;
//         const hotels=await Hotel.find({featured:featured}).limit(limit);
//         return res.status(200).json(hotels);
//     } catch (err) {
//         next(err);
//     }
// }

export const getHotels = async (req, res, next) => {
    try {
        const { min, max, limit, featured, ...others } = req.query;

        const query = {
            ...others,
            cheapestPrice: { $gt: min || 1, $lt: max || 999 },
        };

        // Nếu "featured" được cung cấp trong query, thêm điều kiện vào tìm kiếm
        if (featured !== undefined) {
            query.featured = featured;
        }

        const hotels = await Hotel.find(query).limit(Number(limit) || 0);
        return res.status(200).json(hotels);
    } catch (err) {
        next(err);
    }
};


export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",")
    try {
        const list = await Promise.all(cities.map(city => {
            return Hotel.countDocuments({ city: city })
        }))
        res.status(200).json(list);
    } catch (err) {
        next(err);
    }
}

export const countByType = async (req, res, next) => {
    try {
        const hotelCount = await Hotel.countDocuments({ type: "hotel" })
        const apartmentCount = await Hotel.countDocuments({ type: "apartment" })
        const resortCount = await Hotel.countDocuments({ type: "resort" })
        const villaCount = await Hotel.countDocuments({ type: "villa" })
        

        res.status(200).json([
            { type: "khách sạn", count: hotelCount },
            { type: "căn hộ", count: apartmentCount },
            { type: "resorts", count: resortCount },
            { type: "villas", count: villaCount },
            
        ]);
    } catch (err) {
        next(err);
    }
}

export const createBooking = async (req, res, next) => {
  const { userId, hotelId, rooms, checkInDate, checkOutDate, totalPrice } = req.body;
  
  try {
    const newBooking = new Booking({
      userId,
      hotelId,
      rooms,
      checkInDate: new Date(checkInDate),
      checkOutDate: new Date(checkOutDate),
      totalPrice
    });

    const savedBooking = await newBooking.save();
    res.status(200).json(savedBooking);
  } catch (err) {
    next(err);
  }
};

export const getBookingsByUser = async (req, res, next) => {
  const { userId } = req.params;
  
  try {
    const bookings = await Booking.find({ userId })
      .populate('hotelId', 'name address')
      .populate('rooms.roomId', 'title price roomNumbers');
      
    res.status(200).json(bookings);
  } catch (err) {
    next(err);
  }
};


export const getHotelRooms = async (req, res, next) => {

    try {
        const hotel = await Hotel.findById(req.params.id);
        const list = await Promise.all(hotel.rooms.map(room => {
            return Room.findById(room);
        })
        );
        res.status(200).json(list)
    } catch (err) {
        next(err);
    }
};
