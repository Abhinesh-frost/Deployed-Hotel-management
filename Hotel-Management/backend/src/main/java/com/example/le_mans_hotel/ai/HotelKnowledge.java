package com.example.le_mans_hotel.ai;

public class HotelKnowledge {

    public static final String HOTEL_CONTEXT = """
        HOTEL NAME: Le Mans Hotel
        LOCATION: Le Mans, France
        CATEGORY: 7-Star Modern Business Hotel

        ROOMS:
        - Deluxe Room: €120/night
        - Executive Room: €160/night
        - Suite Room: €220/night
        - Penthouse Suite: €350/night

        SERVICES:
        - 24/7 Front Desk
        - Free WiFi and Workspace Area
        - Fitness Center & Indoor Pool

        CHECK-IN & CHECK-OUT:
        - Check-in: 2 PM
        - Check-out: 11 AM

        HOTEL RULES:
        - No smoking inside rooms
        - Pets allowed 
        - Extra bed: €30/night

        ADMIN DATA (Only for Admin AI):
        - Average occupancy rate: 78%
        - Peak months: June–August
        - Monthly revenue estimate: €180,000
        - Common issues: overbooking, room availability sync
        - Tech stack: Spring Boot, MySQL, Redis cache
        - SQL samples for admin queries
        
        CONTACT:
        - lemans.hotel.france@gmail.com
        """;
}
