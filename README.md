<h1><b> Prezentarea aplicației </b></h1>
<hr>

![image](https://github.com/GaitanaruTeodora/energy-app/assets/74835274/91174232-3c4a-4ef3-b16c-475526dbc802)

Prima interfață disponibilă utilizatorilor atunci când accesează aplicația de energie electrică este formularul de autentificare. Utilizatorii au posibilitatea să acceseze funcționalitățile aplicației doar în baza unui cont. Pentru autentificare se introduc e-mailului și parola. Dacă parola sau e-mailul nu corespund cu cele salvate în baza de date, utilizatorul va fi notificat pentru a le reintroduce, iar în caz contrar va fi redirecționat către pagina principală a aplicației.

![image](https://github.com/GaitanaruTeodora/energy-app/assets/74835274/6caa88b9-6fbb-4f80-bf5f-01babda0050f)
Pagina de Dashboard este pagina principală a aplicației. În cadrul aplicației utilizatorul are urmatoarele opțiuni:
- vizualizarea listei de configurații
- adaugarea de noi configurații energetice
- vizualizarea recomandărilor de dispozitive eficiente
- accesarea știrilor precum 
  
În urma adăugării consumatorilor electrici în configurații, utilizatorul vizualizează pe pagina principală consumul său total pe zi, luna, an și cheltuielile lunare pe care le plătește pe energie conform prețului introdus de acesta.

![image](https://github.com/GaitanaruTeodora/energy-app/assets/74835274/60ff9cd1-2e9f-4028-99b3-557800c3ac94)

De asemenea, pagina principală este primul contact al utilizatorului cu aplicația de energie electrică și de aceea este gândită în așa fel încât să ofere informații suplimentare despre domeniul energiei electrice. Astfel, aici se vor regăsi sfaturi importante pentru reducerea consumului din locuință, graficele consumului procentual și total disponibil pe zi, săptămână, luna, an, precum și o scurtă descriere despre aplicația de consum energetic.

![image](https://github.com/GaitanaruTeodora/energy-app/assets/74835274/4359d076-4ead-4d59-9f9c-84d679003838)

Pentru a fi la curent cu noile informații sau modificări de pe piața energiei electrice, am realizat o interfață de știri prin care utilizatorul va putea vizualiza stirile din ultima lună. Acestea au fost preluate cu ajutorul News API, cuvântul cheie setat este “consum energetic”, iar accesarea unei știri conduce la deschiderea articolului într-o pagină nouă.

![image](https://github.com/GaitanaruTeodora/energy-app/assets/74835274/ca77d2c6-dc68-4b5d-b3c8-091fec5cf721)

Pentru adaugarea consumatorilor, sunt disponibile patru camere predefinite. Adăugarea se face fie manual, fie automat, iar diferența dintre modul manual si cel automat este dată de schimbarea formularului cu unul simplificat în care utilizatorul doar selectează consumatorul din lista de consumatori predefiniți. Singurul câmp pe care îl va completa este câmpul frecvenței de utilizare.

![image](https://github.com/GaitanaruTeodora/energy-app/assets/74835274/6a92823e-d674-4cd1-802f-cda56c9a0f53)

Aplicația calculează consumul total al unui dispozitiv înmulțind consumul cu frecvența de utilizare. În cazul modului manual, utilizatorul poate introduce unitate de măsură pe care o găsește pe specificațiile dispozitivului (W, kWh, kWh/1000 ore, kWh/an, kWh/100 cicluri), iar aplicația transformă automat în kWh pentru a afla consumul dispozitivului pe zi.

![image](https://github.com/GaitanaruTeodora/energy-app/assets/74835274/b11abab8-4b06-4c42-a74b-a5556cb5607e)

În cazul în care utilizatorul dorește să își înlocuiască configurația de consum poate accesa recomandările eficiente. Recomandările folosesc în spate un algoritm de machine learning antrenat pe setul de date al consumatorilor predefiniți cu cele 761 de produse.
![image](https://github.com/GaitanaruTeodora/energy-app/assets/74835274/1fea7149-088c-40e0-b7b3-ec9640c5c065)

Aplicația recomandă primele trei cele mai potrivite electrocasnice ținând cont de prețul și consumul pe care dispozitivul selectat le are.

![image](https://github.com/GaitanaruTeodora/energy-app/assets/74835274/55bd0570-d051-433e-aca7-c0c9146beeac)
