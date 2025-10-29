import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Alert,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {
  Provider as PaperProvider,
  TextInput,
  Button,
  RadioButton,
  Checkbox,
  Text,
  Card,
  Title,
  Paragraph,
} from 'react-native-paper';
import Slider from '@react-native-community/slider';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

// This is the correct file for your screen's content
export default function RegistrationScreen() {
  // State variables for each form field
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [gender, setGender] = useState<string>('male');
  const [course, setCourse] = useState<string>('it');
  const [age, setAge] = useState<number>(18);
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  // Function to handle date changes from the picker
  const onDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  // Function to format the date for display
  const formatDate = (dateToFormat: Date): string => {
    return `${dateToFormat.getDate()}/${
      dateToFormat.getMonth() + 1
    }/${dateToFormat.getFullYear()}`;
  };

  // Function to handle form submission
  const handleSubmit = () => {
    if (!name || !email) {
      Alert.alert('Validation Error', 'Please enter your name and email.');
      return;
    }

    if (!termsAccepted) {
      Alert.alert('Validation Error', 'You must accept the terms and conditions.');
      return;
    }

    const formData = {
      name,
      email,
      phone,
      gender,
      course,
      age: Math.round(age),
      dateOfBirth: formatDate(date),
      termsAccepted,
    };

    Alert.alert(
      'Registration Successful!',
      JSON.stringify(formData, null, 2),
      [{ text: 'OK' }]
    );
  };

  return (
    <PaperProvider>
        <ScrollView contentContainerStyle={styles.container}>
            <Card style={styles.card}>
            <Card.Content>
                <Title>Student Registration</Title>
                <Paragraph>Please fill out the form below.</Paragraph>

                <TextInput
                label="Full Name"
                value={name}
                onChangeText={setName}
                mode="outlined"
                style={styles.input}
                />

                <TextInput
                label="Email Address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                mode="outlined"
                style={styles.input}
                />

                <TextInput
                label="Phone Number"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                mode="outlined"
                style={styles.input}
                />

                <View style={styles.fieldContainer}>
                <Text style={styles.label}>Gender</Text>
                <RadioButton.Group
                    onValueChange={(newValue) => setGender(newValue)}
                    value={gender}
                >
                    <View style={styles.radioContainer}>
                    <RadioButton.Item label="Male" value="male" />
                    <RadioButton.Item label="Female" value="female" />
                    <RadioButton.Item label="Other" value="other" />
                    </View>
                </RadioButton.Group>
                </View>

                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <TextInput
                    label="Date of Birth"
                    value={formatDate(date)}
                    mode="outlined"
                    style={styles.input}
                    editable={false}
                    right={<TextInput.Icon icon="calendar" />}
                />
                </TouchableOpacity>

                {showDatePicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    display="default"
                    onChange={onDateChange}
                />
                )}

                <View style={styles.fieldContainer}>
                <Text style={styles.label}>Select Course</Text>
                <View style={styles.pickerWrapper}>
                    <Picker
                    selectedValue={course}
                    onValueChange={(itemValue) => setCourse(itemValue)}
                    >
                    <Picker.Item label="Information Technology" value="it" />
                    <Picker.Item label="Computer Science" value="cs" />
                    <Picker.Item label="Civil Engineering" value="civil" />
                    <Picker.Item label="Electrical Engineering" value="elec" />
                    </Picker>
                </View>
                </View>

                <View style={styles.fieldContainer}>
                <Text style={styles.label}>Age: {Math.round(age)}</Text>
                <Slider
                    style={{ width: '100%', height: 40 }}
                    minimumValue={16}
                    maximumValue={60}
                    minimumTrackTintColor="#6200ee"
                    maximumTrackTintColor="#03dac4"
                    thumbTintColor="#6200ee"
                    value={age}
                    onValueChange={setAge}
                />
                </View>

                <Checkbox.Item
                label="I accept the Terms and Conditions"
                status={termsAccepted ? 'checked' : 'unchecked'}
                onPress={() => {
                    setTermsAccepted(!termsAccepted);
                }}
                />

                <Button
                mode="contained"
                onPress={handleSubmit}
                style={styles.button}
                labelStyle={styles.buttonText}
                >
                Submit Registration
                </Button>
            </Card.Content>
            </Card>
        </ScrollView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    flexGrow: 1,
    justifyContent: 'center'
  },
  card: {
    borderRadius: 8,
    elevation: 4,
  },
  input: {
    marginBottom: 16,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 4,
  },
  button: {
    marginTop: 24,
    paddingVertical: 8,
  },
  buttonText: {
    fontSize: 16,
  },
});

