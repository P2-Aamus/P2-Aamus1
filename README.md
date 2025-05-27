# P2-Aamus1

Dette system er udviklet til Aalborg Musikforening.
Systemet er et kalender system med funktioner som opslagstavler og booking af tider.

## Installation

Dette system kører over en lokal database, kaldet database_db, MySQL server versionen brugt er 8.1.0 . Derudover skal appen "MySQL Workbench" også downloades. 

https://dev.mysql.com/downloads/workbench/

https://downloads.mysql.com/archives/community/ (Vælg version 8.1.0 og det OS, der passer til dit system)

Da databasen er arbejdet på lokalt, skal databasen og tabellerne downloades og oprettes
Tabellerne og databasen kan tilgåes ved at downloade ZIP-filen: database_db.zip.


Efter databasen er opsat, download og installer den seneste LTS-version af Node.js fra nodejs.org

```bash
node -v
npm -v
```

Download og installer denne version af MySQL
```bash
npm install mysql2
```

## Usage

For at starte backend-serveren, skal du køre følgende kommando i terminalen fra mappen script.js:
```bash
node script.js
```
Når serveren kører, kan du tilgå applikationen ved at åbne følgende URL i din webbrowser:
http://127.0.0.1:5500/


## License

MIT License

Copyright (c) [2025] [Gruppe 4]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE-
