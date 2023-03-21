# Aplikacja webowa do planowania lotów

>## Opis

&nbsp;&nbsp;&nbsp;&nbsp; Aplikacja służąca do wyliczania danych potrzebnych do lotu. Na podstawie trasy narysowanej na mapie OpenLayers i wprowadzonych danych kalkuluje dane nawigacyjne. Daje możliwość pobrania danych wiatru oraz deklinacji magnetycznej z zewnętrznych źródeł przez HTTP. Zapewnia możliwość zalogowania się kontem Google z uwierzytelnieniem za pomocą tokena JWT oraz funkcję zapisania lotów w bazie danych PostgreSQL.

>## Stack technologiczny

<ul>
  <p>serwer:</p>
    <ul>
      <li>Node.js</li>
      <li>Express.js</li>
    </ul>
  <p>klient:</p>
    <ul>
      <li>React.js</li>
      <li>Vite</li>
    </ul>
  <p>baza danych:</p>
    <ul>
      <li>PostgreSQL</li>
      <li>Prisma</li>
    </ul>
  <p>uwierzytelnienie:</p>
    <ul>
      <li>Google Sign In</li>
      <li>JSON Web Token</li>
    </ul>
  <p>testowanie:</p>
    <ul>
      <li>Jest</li>
      <li>Puppeteer</li>
    </ul>
</ul>

>## Instalacja

### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Wymagania:
<ul>
  <li>node</li>
  <li>npm</li>
  <li>baza danych (PostgreSQL lub inna)</li>
  <li>dostęp do Google Cloud Platform i działająca aplikacja z google client id </li>
</ul>

1. Uruchom skrypt ```npm run init```. Zainstaluje on zależności projektu dla backendu i frontendu oraz stworzy plik ```.env```. Przy pytaniach wprowadź zmienne środowiskowe.

2. Jeżeli korzystasz z systemu Windows plik ```.env``` może nie wygenerować się automatycznie i będzie trzeba stworzyć go ręcznie. W pliku ```.env``` potrzebujesz następujących zmiennych:
  - PORT (port serwera backend)
  - NODE_ENV (zmienna określająca środowisko aplikacji - "development" lub "production")
  - GOOGLE_CLIENT_ID (google client id twojej aplikacji - znajdziesz w Google Cloud Console)
  - JWT_SECRET (klucz do generacji tokenów JWT)
  - DATABASE_URL (dla servera postgres hostowanego lokalnie  - ```postgres://[USERNAME]:[PASSWORD]@localhost:5432/[DATABASE_NAME]```)

3. W pliku ```reactmap\frontend\src\components\Main.jsx``` wewnątrz funkcji ```google.accounts.id.initialize``` zmień wartość ```client_id``` na google client id swojej aplikacji.

4. Aby rozpocząc aplikację (backend i frontend) uruchom skrypt ```npm run start```.

5. Aplikację znajdziesz pod adresem ```http://localhost:5173```.