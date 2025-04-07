package com.example.eduwheels.Service;

import com.example.eduwheels.Entity.BookingEntity;
import com.example.eduwheels.Repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    public List<BookingEntity> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Optional<BookingEntity> getBookingById(Long id) {
        return bookingRepository.findById(id);
    }

    public BookingEntity createBooking(BookingEntity booking) {
        return bookingRepository.save(booking);
    }

    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }

    public BookingEntity updateBooking(Long id, BookingEntity updatedBooking) {
        return bookingRepository.findById(id).map(b -> {
            b.setStartDate(updatedBooking.getStartDate());
            b.setEndDate(updatedBooking.getEndDate());
            b.setStatus(updatedBooking.getStatus());
            return bookingRepository.save(b);
        }).orElse(null);
    }
}
