import React, { useEffect, useState } from 'react';  // Importerer React, useState til state management og useEffect til side-effekter
import { View, Text, FlatList, StyleSheet } from 'react-native';  // Importerer nødvendige React Native-komponenter
import { getDatabase, ref, onValue } from "firebase/database";  // Firebase-funktioner til at hente data fra databasen

// Definerer BookingHistory-komponenten
function BookingHistory() {
    const [bookings, setBookings] = useState([]); // Definerer en state til at gemme bookinger. En React Hook, der giver  mulighed for at tilføje en tilstandsvariabel til ens komponent.

    // useEffect kører en gang, når komponenten mountes. Montering er processen med at udlæse den virtuelle repræsentation af en komponent til den endelige UI-repræsentation
    useEffect(() => {
        // Henter data fra Firebase, når komponenten loader, og opdaterer listen med (ikke implementeret fuldt endnu)
        const db = getDatabase(); // Initialiserer Firebase-databasen
        const bookingsRef = ref(db, 'Bookings/');  /// Refererer til 'Bookings i databasen

        // Lytter til ændringer i databasen og opdaterer bookingState
        onValue(bookingsRef, (snapshot) => {
            let data = snapshot.val() ? snapshot.val() : {};
            let bookingList = Object.keys(data).map(key => ({
                id: key, //Tilføjer et unikt ID til hver booking
                ...data[key]
            }));
            setBookings(bookingList); // Opdaterer bookings-state med booking-listen
        });

        return () => {
            setBookings([]);  // Nulstil state, når komponenten unmountes
        };
    }, []);

    // Funktion til at vise hver booking i listen
    const renderItem = (booking) => {
        return (
            <View style={styles.listItem}>
                <Text style={styles.listItemText}>Area: {booking.item.area}</Text>
                <Text style={styles.listItemText}>Type: {booking.item.type}</Text>
                <Text style={styles.listItemText}>Date: {booking.item.date}</Text>  {/* Tilføj dato eller anden relevant information */}
            </View>
        );
    };

    // Returnerer layout for bookinghistorikken
    return (
        <View style={styles.container}>
            <Text style={styles.title}>My booking history</Text>
            {
                bookings.length > 0 ? ( // Hvis der er bookinger, vises listen
                    <FlatList
                        data={bookings} // Data til listen hentes fra bookings-state
                        renderItem={renderItem} // Hver booking renderes med renderItem
                        keyExtractor={item => item.id} // Hver item får en unik nøgle baseret på bookingens id
                    />
                ) : (
                    <Text>No bookings found.</Text>
                )
            }
        </View>
    );
}
export default BookingHistory; // Eksporterer komponenten, så den kan bruges i andre dele af appen

//Layout og formatering
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    listItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 10,
    },
    listItemText: {
        fontSize: 18,
    },
});
