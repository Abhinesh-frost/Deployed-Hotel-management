package com.example.le_mans_hotel.service;

import java.util.List;
import java.util.Optional;

import com.example.le_mans_hotel.model.Room;

public interface RoomService {

	Room save(Room room);

	Optional<Room> findById(Long id);

	void deleteById(Long id);

	List<Room> findAll();

	Room update(Long id, Room roomDetails);

	List<Room> findByAvailable(boolean available);

}
