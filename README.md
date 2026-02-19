# Kom i gang med Supabase

> Rasmus Cederdorff (RACE) · Senior Lecturer & Web App Developer · race@eaaa.dk

---

## Indholdsfortegnelse

- [0. Opret et Supabase projekt](#0-opret-et-supabase-projekt)
- [1. Opret en tabel (products)](#1-opret-en-tabel-products)
- [2. Indsæt data i din tabel](#2-indsæt-data-i-din-tabel)
- [3. REST API i Supabase](#3-rest-api-i-supabase)
- [4. Security og Row Level Security (RLS)](#4-security-og-row-level-security-rls)
- [5. Test i browser](#5-test-i-browser)
- [6. Test REST API med Thunderclient](#6-test-rest-api-med-thunderclient)
- [7. Filtrering i REST API](#7-filtrering-i-rest-api)

---

## 0. Opret et Supabase projekt

1. Gå til [supabase.com](https://supabase.com)
2. Klik **"Start your project"**
3. Login med GitHub — eller **"Sign up"** for at oprette konto med email og password
4. Klik **"Create a new organisation"**, udfyld felterne og klik **"Create organisation"**
5. Klik **"Create a new project"**
6. Generér et **"Database password"** og gem det til senere brug
7. Sørg for at **"Enable Data API"** er slået til

Nu har du:

- En PostgreSQL database
- Et REST API
- API keys

---

## 1. Opret en tabel (products)

1. I Dashboard → venstre menu → **"Table editor"**
2. Klik **"Create Table"** og angiv table name: `products`
3. Tilføj kolonner via **"Add column"**:

| column     | type               |
| ---------- | ------------------ |
| id         | int8 (primary key) |
| created_at | timestamp          |
| title      | text               |
| price      | numeric            |
| image      | text               |

4. Klik **"Save"**

---

## 2. Indsæt data i din tabel

1. Find den grønne **"Insert"**-knap → **"Insert row"**
2. Indtast kun værdier for `title`, `price` og `image` — `id` og `created_at` autogenereres
3. Du kan genbruge produktdata fra:  
   `https://raw.githubusercontent.com/cederdorff/race/refs/heads/master/data/webshop/products.json`
4. Klik **"Save"** for hvert produkt
5. Gentag og opret ~3–4 produkter

---

## 3. REST API i Supabase

Supabase bruger **PostgREST**, som automatisk eksponerer dine tabeller som REST endpoints:

| Metode | Endpoint                    | Beskrivelse              |
| ------ | --------------------------- | ------------------------ |
| GET    | `/rest/v1/products`         | Hent alle produkter      |
| POST   | `/rest/v1/products`         | Opret nyt produkt        |
| PATCH  | `/rest/v1/products?id=eq.1` | Opdater produkt med id=1 |
| DELETE | `/rest/v1/products?id=eq.1` | Slet produkt med id=1    |

Ingen serverkode nødvendig ✅

---

## 4. Security og Row Level Security (RLS)

1. Gå til **"Integrations"** → **"Data API"** og kopiér din API URL
2. Gå til **"Project Settings"** → **"API Keys"** og kopiér **"Publishable key"**
3. Gå til **"Table Editor"** → de tre dots ud for `products` → **"View policies"**
4. Vælg **"Disable RLS"** for products-tabellen

> ⚠️ Vi slår Row Level Security fra for at gøre det nemt at teste. I et produktionsmiljø skal RLS være slået til og konfigureret korrekt.

---

## 5. Test i browser

Test din URL i browseren:

```
https://dit-project-id.supabase.co/rest/v1/products?apikey=din-publishable-key
```

Du skulle nu se en JSON-liste med alle dine produkter.

---

## 6. Test REST API med Thunderclient

**Thunderclient** er en HTTP-klient der er bygget direkte ind i VS Code — tænk på det som Postman, men uden at forlade editoren. Vi bruger den til at sende rigtige HTTP-requests til Supabase og se hvad API'et svarer, inden vi skriver en linje React-kode.

### Installér Thunderclient

1. Gå til **Extensions** i VS Code (`Cmd+Shift+X`)
2. Søg efter `Thunder Client`
3. Klik **Install**
4. Et lyn-ikon dukker op i venstre sidebar — klik på det for at åbne Thunderclient

### Opret en ny request

Klik på **"New Request"** øverst i Thunderclient-panelet. Du får en tom request med:

- Et dropdown til at vælge **HTTP-metode** (GET, POST, PATCH, DELETE …) — helt til venstre
- Et **URL-felt** til højre for metoden — her indsætter du din endpoint-URL
- Faner nedenunder: **Headers**, **Body**, **Query** m.fl.

### Headers — bruges i alle requests

Supabase kræver en API-nøgle på **alle** requests. Den sætter vi som en header:

1. Klik på fanen **"Headers"**
2. Klik **"Add Header"**
3. Udfyld:
   - **Name:** `apikey`
   - **Value:** din publishable key (den lange `sb_publishable_...`-nøgle fra trin 4)

> 💡 Du skal tilføje denne header i **alle fire** requests herunder. Nogle requests kræver desuden en `Content-Type`-header — det er beskrevet under hvert punkt.

---

### 6.1. READ — Hent alle produkter (GET)

GET bruges til at **hente data**. Vi sender ingen body — vi beder bare om at få alle rækker i `products`-tabellen tilbage.

**Thunderclient — trin for trin:**

1. Sæt metoden til **`GET`**
2. Indsæt URL: `https://dit-project-id.supabase.co/rest/v1/products`
3. Gå til fanen **"Headers"** og tilføj:
   - `apikey` → din publishable key
4. Klik den blå **"Send"**-knap
5. I bunden ser du svaret — en JSON-liste med alle dine produkter

**JavaScript fetch:**

```js
const response = await fetch("https://xyz.supabase.co/rest/v1/products", {
  headers: {
    apikey: "YOUR_ANON_KEY"
  }
});

const data = await response.json();
console.log(data);
```

---

### 6.2. CREATE — Opret nyt produkt (POST)

POST bruges til at **oprette en ny række** i databasen. Her skal vi sende data med i requestens **body** som JSON.

**Thunderclient — trin for trin:**

1. Sæt metoden til **`POST`**
2. Indsæt URL: `https://dit-project-id.supabase.co/rest/v1/products`
3. Gå til fanen **"Headers"** og tilføj begge headers:
   - `apikey` → din publishable key
   - `Content-Type` → `application/json`  
     _(Fortæller Supabase at vi sender JSON i body'en)_
4. Gå til fanen **"Body"** → vælg **"JSON"**
5. Indsæt dette i tekstfeltet:

```json
{
  "title": "MacBook",
  "price": 12000,
  "image": "https://example.com/macbook.jpg"
}
```

6. Klik **"Send"** — du får det oprettede produkt retur med det autogenererede `id`

**JavaScript fetch:**

```js
await fetch("https://xyz.supabase.co/rest/v1/products", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    apikey: "YOUR_ANON_KEY"
  },
  body: JSON.stringify({
    title: "MacBook",
    price: 12000,
    image: "https://example.com/macbook.jpg"
  })
});
```

---

### 6.3. UPDATE — Opdater eksisterende produkt (PATCH)

PATCH bruges til at **ændre en eksisterende række**. Vi skal fortælle Supabase hvilket produkt vi vil opdatere — det gør vi med en **query parameter** i URL'en: `?id=eq.1` betyder "hvor id er lig med 1".

**Thunderclient — trin for trin:**

1. Sæt metoden til **`PATCH`**
2. Indsæt URL med id på det produkt du vil opdatere:  
   `https://dit-project-id.supabase.co/rest/v1/products?id=eq.1`  
   _(Skift `1` ud med et rigtigt id fra din tabel)_
3. Gå til fanen **"Headers"** og tilføj:
   - `apikey` → din publishable key
   - `Content-Type` → `application/json`
4. Gå til fanen **"Body"** → vælg **"JSON"**
5. Indsæt kun de felter du vil ændre:

```json
{
  "title": "MacBook Pro",
  "price": 15000
}
```

6. Klik **"Send"** — Supabase returnerer den opdaterede række

> 💡 Med PATCH sender du **kun** de felter du vil ændre — de øvrige felter i rækken forbliver uændrede.

**JavaScript fetch:**

```js
const id = 1;

await fetch(`https://xyz.supabase.co/rest/v1/products?id=eq.${id}`, {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
    apikey: "YOUR_ANON_KEY"
  },
  body: JSON.stringify({
    title: "MacBook Pro",
    price: 15000
  })
});
```

---

### 6.4. DELETE — Slet eksisterende produkt (DELETE)

DELETE bruges til at **slette en række** fra databasen. Ligesom PATCH bruger vi en query parameter til at angive hvilken række der skal slettes. Der sendes ingen body.

**Thunderclient — trin for trin:**

1. Sæt metoden til **`DELETE`**
2. Indsæt URL med id på det produkt du vil slette:  
   `https://dit-project-id.supabase.co/rest/v1/products?id=eq.1`  
   _(Skift `1` ud med et rigtigt id fra din tabel)_
3. Gå til fanen **"Headers"** og tilføj:
   - `apikey` → din publishable key
4. Lad **"Body"** være tom — DELETE behøver ingen data
5. Klik **"Send"** — du får et tomt svar tilbage med statuskode `204 No Content`, hvilket betyder at det lykkedes

> ⚠️ DELETE kan ikke fortrydes! Tjek altid at du har det rigtige `id` i URL'en inden du sender. I en rigtig app bør du bekræfte med brugeren først, fx med `window.confirm()`.

---

## 7. Filtrering i REST API

Supabase bruger **query parameters** til filtrering direkte i URL'en — ingen ekstra kode nødvendig.

### Syntaks

```
/rest/v1/products?<kolonne>=<operator>.<værdi>
```

### Operatorer

| Operator | Betydning                 | Eksempel             |
| -------- | ------------------------- | -------------------- |
| `eq`     | Lig med (equals)          | `?id=eq.1`           |
| `neq`    | Ikke lig med              | `?id=neq.1`          |
| `lt`     | Mindre end                | `?price=lt.1000`     |
| `lte`    | Mindre end eller lig med  | `?price=lte.1000`    |
| `gt`     | Større end                | `?price=gt.5000`     |
| `gte`    | Større end eller lig med  | `?price=gte.5000`    |
| `like`   | Mønster (case-sensitive)  | `?title=like.Mac*`   |
| `ilike`  | Mønster (case-insensitiv) | `?title=ilike.*mac*` |
| `is`     | Er null/true/false        | `?image=is.null`     |

### Eksempler

**Hent produkt med id = 1:**

```
/rest/v1/products?id=eq.1
```

**Hent produkter billigere end kr. 1.000:**

```
/rest/v1/products?price=lt.1000
```

**Hent produkter dyrere end eller lig med kr. 5.000:**

```
/rest/v1/products?price=gte.5000
```

**Søg produkter der indeholder "mac" (case-insensitiv):**

```
/rest/v1/products?title=ilike.*mac*
```

**Sortering — billigste først:**

```
/rest/v1/products?order=price.asc
```

**Sortering — dyreste først:**

```
/rest/v1/products?order=price.desc
```

**Kombiner filtrering og sortering:**

```
/rest/v1/products?price=lt.5000&order=price.asc
```

**Begræns antal resultater (limit):**

```
/rest/v1/products?limit=5
```

### JavaScript fetch med filtrering

```js
// Hent de 5 billigste produkter under kr. 5.000
const response = await fetch("https://xyz.supabase.co/rest/v1/products?price=lt.5000&order=price.asc&limit=5", {
  headers: {
    apikey: "YOUR_ANON_KEY"
  }
});

const data = await response.json();
console.log(data);
```

---

> **Dokumentation:** [supabase.com/docs](https://supabase.com/docs) · [PostgREST filtering](https://postgrest.org/en/stable/references/api/tables_views.html#horizontal-filtering)
