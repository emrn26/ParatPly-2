import React from 'react'; //Importerer React
import { View, Text, StyleSheet, Button, Linking, ScrollView } from 'react-native'; //En container-komponent, der fungerer som en fleksibel boks (en slags div i web). Den bruges til at placere andre komponenter som tekst, billeder osv.

const Support = () => {
  
  // Function to open an email client with predefined fields
  const sendEmail = () => {
    const email = 'support@paraplyapp.com';  // Din support email
    const subject = 'Support Request';  // Email 
    const body = 'Hi, I need help with...';  //Brødtekst

//konstruerer en e-mail ved hjælp af mailto:-protokollen. Den åbner brugerens standard-e-mailklient med forudfyldt modtager, emne og brødtekst.
//En funktion fra React Native, der gør det muligt at åbne eksterne links eller apps som f.eks. e-mailklienter, telefonopkald osv.
//Denne funktion åbner den e-mail-klient, som brugeren har på sin enhed, med den forudfyldte e-mail-adresse, emne og brødtekst.
    const mailUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    Linking.openURL(mailUrl); 
  };

//Simpel styling
  return (
    <ScrollView contentContainerStyle={styles.container}> 
      <Text style={styles.header}>Support</Text>
      <Text style={styles.paragraph}>
        If you need assistance, feel free to reach out to our support team. We are here to help you!
      </Text>

      <Text style={styles.subHeader}>Contact Information:</Text>
      <Text style={styles.contactText}>Email: support@paraplyapp.com</Text>
      <Text style={styles.contactText}>Phone: +45 12 34 56 78</Text>

      <Text style={styles.subHeader}>Frequently Asked Questions:</Text>
      <Text style={styles.faqQuestion}>How do I reserve an umbrella?</Text>
      <Text style={styles.faqAnswer}>To reserve an umbrella, go to the map, select an available umbrella, and press "Reserve".</Text>

      <Text style={styles.faqQuestion}>How can I contact support?</Text>
      <Text style={styles.faqAnswer}>You can contact support via email or phone as shown above.</Text>

      {/* Add a button to send an email */}
      <Button title="Send an email to support" onPress={sendEmail} />
    </ScrollView>
  );
};

export default Support;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  contactText: {
    fontSize: 16,
    marginBottom: 10,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  faqAnswer: {
    fontSize: 16,
    marginBottom: 10,
  },
});
