# Dokumentáció

### Kardos Gergő
___

#### 1. Követelményanalízis
##### 1.1 Célkitűzés
Az oldal célja egy olyan rendszer megvalósítása, melyen háttérképek böngészése, 
letöltése, értékelése valamint feltöltése lenne elérhető.
A háttérképek kategóriákra bontva jelennének meg, melyek között szabadon lehet böngészni továbbá a letöltés is lehetséges.
Az értékeléshez a felhasználónak regisztrálnia kell az oldalon valamint minden képet csak egyszer lehessen értékelni.
A feltöltés szintén regisztrációhoz kötött, továbbá ellenőrzöttnek kell lennie, hogy például biztosan a megfelelő kategóriába kerüljön és megfeleljen az általános direktíváknak.  

###### Funkcionális Követelmények
* Regisztráció
* Bejelentkezés
* Letöltés
* Csak bejelentkezett felhasználónak elérhető
    - Új kép feltöltése
    - Saját kép törlése
    - Értékelés

###### Nem funkcionális Követelmények
* **Könnyű kezelés** - áttekinthetőség - kategóriánkénti csoportosítás - rendezési lehetőség 
* **Megbízhatóság** - jelszóval védett tartalom - a jelszavak biztonságos kezelése - hibás adatok esetén érthető figyelmeztetés
* **Karbantarthatóság** - logikus mappa szerkezet a későbbi bővítésre esetleges szűkítésre
* **Teljesítmény** - az előnézeti képek jól megvalósítása, a gyorsabb működéshez

##### 1.2 Szakterületi fogalomjegyzék


**Háttérkép**: olyan kép, fotó, melyeket a képernyő (kijelző) háttereként szoktunk használni.


**Előnézeti kép**: ebben az esetben az eredeti kép kicsinyített változata a jobb átláthatóság és gyorsabb működés érdekében.

##### 1.3 Szerepkörök
**Vendég**: háttérképek keresését, az oldal publikus részét szabad böngészését, háttérképek letöltését végezheti


**Felhasználó**: a *Vendég* szerepkörön túl lehetősége van a saját háttérképeinek megosztására (feltöltés), törlésére, az oldalon levő (nem saját) háttérképek értékelésére

##### 1.4 Használatieset-modell
![Szerepkörök](images/use_case.png)

Egy egyszerű példa bemutatása:

A felhasználó ellátogat az oldalra, ahova már korábban beregisztrált. Bejelentkezik majd úgy dönt,hogy megosztani kívánja egy háttérképét. Az ellenőrzés után megjelenik az oldalon a kép. Amennyiben a kép nem felel meg az elvárásoknak elutasításra kerül a közzététel melyről értesítést kap a feltöltő.
![](images/new_bg.png)