import 'dart:io';

void main() {
  stdout.write('Enter a number: ');
  int number = int.parse(stdin.readLineSync()!);

  print('Counting from 1 to $number:');

  for (int i = 1; i <= number; i++) {
    print(i);
  }
}

