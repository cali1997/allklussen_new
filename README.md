# allklussen040

Deze applicatie is een portaal voor beheerder en klant, gebaseerd op het originele project uit /allklussen/n8n.

## Functionaliteit
- Beheerder kan inloggen, sleutels aanmaken en klantberichten bekijken
- Klant kan inloggen met een key en berichten sturen
- SQLite database voor opslag
- Volledig Flask 3.x, geen externe database nodig

## Installatie
1. Installeer requirements:
   ```
   pip install -r requirements.txt
   ```
2. Start de applicatie:
   ```
   python app.py
   ```
3. De site draait op poort 8086 (http://localhost:8086)

## Standaard logins
- Beheerder: admin / change-me-now (pas aan in .env of app.py)

## Oorsprong
Gebaseerd op de broncode uit /allklussen/n8n