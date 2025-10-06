// Import the 'dart:io' library for handling user input and output.
import 'dart:io';

// A helper function to neatly ask the user for input and return their response.
String promptUser(String promptText) {
  // Display the prompt message to the user.
  stdout.write(promptText);
  // Read the user's typed input and return it.
  // If the user provides no input (null), it defaults to an empty string.
  return stdin.readLineSync() ?? '';
}

void main() {
  print('--- Greeting Program ---');

  // 1. Get user's name using the helper function.
  // The 'final' keyword means the variable cannot be reassigned.
  final String userName = promptUser('What is your name? ');

  // 2. Get the desired number of greetings.
  final String repetitionInput = promptUser('How many times should we greet you? ');

  // 3. Safely convert the input string to an integer.
  // int.tryParse() is safer than int.parse() because it returns null
  // if the string is not a valid number, instead of crashing the program.
  // If it's null (or invalid), we default to 0.
  final int numberOfGreetings = int.tryParse(repetitionInput) ?? 0;

  print('\n======== Starting Greetings ========');

  // 4. Use a 'while' loop instead of a 'for' loop.
  int counter = 0;
  while (counter < numberOfGreetings) {
    // We add 1 to the counter for a natural 1, 2, 3... display.
    print('${counter + 1}. Greetings, $userName!');
    // Increment the counter to proceed to the next loop iteration.
    counter++;
  }

  print('====================================');
  print('All greetings have been delivered!');
}