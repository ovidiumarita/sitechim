# Chimie Web App

Acesta este un proiect web creat cu ASP.NET Core (Razor Pages) folosind C#. Proiectul este destinat dezvoltării unui site de chimie.

## Cum rulezi proiectul

1. Asigură-te că ai instalat .NET SDK (https://dotnet.microsoft.com/download)
2. Deschide un terminal în directorul proiectului.
3. Rulează comanda:
   ```powershell
   dotnet run
   ```
4. Accesează site-ul la adresa afișată în terminal (de obicei http://localhost:5000 sau http://localhost:5001)

## Structura proiectului
- `Pages/` – Conține paginile Razor (HTML + C#)
- `wwwroot/` – Conține fișiere statice (CSS, JS, imagini)
- `Startup.cs` și `Program.cs` – Configurare aplicație

## Personalizare
Poți modifica sau adăuga pagini noi în folderul `Pages` pentru a extinde funcționalitatea site-ului de chimie.

---

Proiect generat cu `dotnet new webapp`.
