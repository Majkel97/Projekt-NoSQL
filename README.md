# Wiadomości od studentów [MongoDB + Node.js + Express + React]

## Opis projektu

Projekt jest oparty na frameworku Express.js, który umożliwia tworzenie aplikacji sieciowych w środowisku Node.js. Aplikacja pozwala zasymulować tworzenie, edycję, wyświetlanie i usuwanie wiadomości wysyłanych przez studentów. Opis możliwych endpointów oraz wizualizacja działania aplkiacji znajduje się w kolejneych krokach.

## Użyte narzędzia

1. **MongoDB:**

   - MongoDB to system zarządzania bazą danych NoSQL, który operuje na zasadzie dokumentów w formacie BSON (Binary JSON).
   - Charakteryzuje się skalowalnością, elastycznością i umożliwia efektywne przechowywanie dużych ilości danych w postaci dokumentów.
   - Idealny do zastosowań, gdzie potrzebne są szybkie zapytania i elastyczność schematu danych.

2. **Node.js:**

   - Node.js to środowisko wykonawcze JavaScript zbudowane na silniku V8, który jest używany w przeglądarkach internetowych Chrome.
   - Pozwala na uruchamianie skryptów po stronie serwera, co umożliwia tworzenie aplikacji sieciowych i API w języku JavaScript.
   - Charakteryzuje się asynchronicznym modelem I/O, co sprawia, że jest wydajny w obsłudze wielu równoczesnych żądań.

3. **Express:**

   - Express.js to minimalistyczny framework dla Node.js, który ułatwia tworzenie aplikacji sieciowych.
   - Zapewnia funkcje do obsługi żądań HTTP, routing, obsługi szablonów, oraz integrację z różnymi middleware'ami.
   - Jest lekki, co umożliwia programistom elastyczne dostosowanie go do specyficznych potrzeb projektu.

4. **React:**
   - React to biblioteka JavaScript do budowania interfejsów użytkownika, stworzona przez Facebook.
   - Pozwala na efektywne tworzenie interaktywnych, jednostronicowych aplikacji internetowych.
   - Działa na zasadzie komponentów, co ułatwia strukturyzację i utrzymanie kodu.
   - React wykorzystuje wirtualny DOM do optymalizacji wydajności aplikacji.

## Uruchomienie aplikacji

1. Należy utworzyć darmowe konto Atlas, stworzyć pierwszy klaster i uzyskać łańcuch połączenia do bazy danych.
   Następnie ustawić parametr połączenia Atlas URI w pliku `server/.env`:

```env
ATLAS_URI=mongodb+srv://<username>:<password>@sandbox.jadwj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
```

2. Uruchom serwer Express:

```bash
cd server
npm install
npm run dev
```

3. Uruchom aplikację React (w nowym oknie terminala):

```bash
cd app
npm install
npm start
```

## Zrzuty ekranu z działania aplikacji

1. **Lista wiadomości:**

<img src=""  width="800px" height="auto">

2. **Tworzenie nowej wiadomości:**

<img src=""  width="800px" height="auto">

3. **Szczegóły wiadomości z możliwością edycji i usuwania:**

<img src=""  width="800px" height="auto">

4. **Dodawanie studenta:**

<img src=""  width="800px" height="auto">

5. **Lista studentów:**

<img src=""  width="800px" height="auto">

## Dokumentacja Endpointów

### 1. Pobranie listy wiadomości

**Metoda**: `GET`

**URL**: `http://localhost:5050/`

**Przykład użycia:**

```bash
curl -X GET http://localhost:5050/
```

**Przykład odpowiedzi:**

```json
[
  {
    "_id": "65b6d0d82a0b77b689a4a00f",
    "student": "65b57dfe8b039b55ad2c8b64",
    "odbiorca": "Wykładowca 1",
    "tresc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    "date": "2024-01-31T12:34:21.370Z"
  },
  {
    "_id": "65b6d0d82a0b77b689a4a00f",
    "student": "65b57dfe8b039b55ad2c8b64",
    "odbiorca": "Wykładowca 2",
    "tresc": "Wiadomość dwa",
    "date": "2024-01-21T12:34:21.370Z"
  }
]
```

### 2. Pobranie listy studentów

**Metoda**: `GET`

**URL**: `http://localhost:5050/students`

**Przykład użycia:**

```bash
curl -X GET http://localhost:5050/students
```

**Przykład odpowiedzi:**

```json
{
  "students": [
    {
      "_id": "65b57dfe8b039b55ad2c8b64",
      "imie": "Michał",
      "nazwisko": "Mąka"
    }
  ]
}
```

### 3. Pobranie pojedynczej wiadomości

**Metoda**: `GET`

**URL**: `http://localhost:5050/message/:id`

**Przykład użycia:**

```bash
curl -X GET http://localhost:5050/message/65b6d0d82a0b77b689a4a00f
```

**Przykład odpowiedzi:**

```json
{
  "_id": "65b6d0d82a0b77b689a4a00f",
  "student": "65b57dfe8b039b55ad2c8b64",
  "odbiorca": "Wykładowca 1",
  "tresc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  "date": "2024-01-31T12:34:21.370Z"
}
```

### 4. Dodanie nowej wiadomości

**Metoda**: `POST`

**URL**: `http://localhost:5050/`

**Przykład użycia:**

```bash
curl -X POST -H "Content-Type: application/json" -d '{"student": "65b57dfe8b039b55ad2c8b64", "odbiorca": "Wykładowca 1", "tresc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}' http://localhost:5050/
```

**Przykład odpowiedzi:**

```json
{
  "result": { "ok": 1, "n": 1 },
  "ops": [
    {
      "student": "65b57dfe8b039b55ad2c8b64",
      "odbiorca": "Wykładowca 1",
      "tresc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      "date": "2024-01-31T12:34:21.370Z"
    }
  ]
}
```

### 5. Dodanie nowego studenta

**Metoda**: `POST`

**URL**: `http://localhost:5050/student`

**Przykład użycia:**

```bash
curl -X POST -H "Content-Type: application/json" -d '{"imie": "Nowy", "nazwisko": "Student"}' http://localhost:5050/student
```

**Przykład odpowiedzi:**

```json
{
  "result": { "ok": 1, "n": 1 },
  "ops": [{ "imie": "Nowy", "nazwisko": "Student" }]
}
```

### 6. Usunięcie wiadomości

**Metoda**: `DELETE`

**URL**: `http://localhost:5050/message/:id`

**Przykład użycia:**

```bash
curl -X DELETE http://localhost:5050/message/65b6d0d82a0b77b689a4a00f
```

**Przykład odpowiedzi:**

```json
{ "result": { "ok": 1, "n": 1 } }
```

### 7. Aktualizacja wiadomości

**Metoda**: `PUT`

**URL**: `http://localhost:5050/message/:id`

**Przykład użycia:**

```bash
curl -X PUT -H "Content-Type: application/json" -d '{"tresc": "Zaktualizowana wiadomość"}' http://localhost:5050/message/65b6d0d82a0b77b689a4a00f
```

**Przykład odpowiedzi:**

```json
{ "message": "Wiadomość zaktualizowana pomyślnie", "updatedCount": 1 }
```

### 8. Pobranie wiadomości przypisanych do studenta

**Metoda**: `GET`

**URL**: `http://localhost:5050/messagesByStudent/:studentId`

**Przykład użycia:**

```bash
curl -X GET http://localhost:5050/messagesByStudent/65b57dfe8b039b55ad2c8b64
```

**Przykład odpowiedzi:**

```json
[
  {
    "_id": "65b6d0d82a0b77b689a4a00f",
    "student": "65b57dfe8b039b55ad2c8b64",
    "odbiorca": "Wykładowca 1",
    "tresc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    "date": "2024-01-31T12:34:21.370Z"
  }
]
```

### 9. Pobranie danych studenta na podstawie ID wiadomości

**Metoda**: `GET`

**URL**: `http://localhost:5050/message/student/:msg_id`

**Przykład użycia:**

```bash
curl -X GET http://localhost:5050/message/student/65b6d0d82a0b77b689a4a00f
```

**Przykład odpowiedzi:**

```json
{
  "student": {
    "_id": "65b57dfe8b039b55ad2c8b64",
    "imie": "Michał",
    "nazwisko": "Mąka"
  }
}
```
