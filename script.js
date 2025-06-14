const books = [
    {
        title: "React Billionaire",
        pages: 250,
        author: {
            name: 'Alice',
            age: 35
        },
        available: false,
        price: '101€',
        tags: ['advanced', 'js', 'react', 'senior']
    },
    {
        title: "Advanced JS",
        pages: 500,
        author: {
            name: 'Bob',
            age: 20
        },
        available: true,
        price: '25€',
        tags: ['advanced', 'js', 'mid-senior']
    },
    {
        title: "CSS Secrets",
        pages: 320,
        author: {
            name: 'Alice',
            age: 17
        },
        available: true,
        price: '8€',
        tags: ['html', 'css', 'junior']
    },
    {
        title: "HTML Mastery",
        pages: 200,
        author: {
            name: 'Charlie',
            age: 50
        },
        available: false,
        price: '48€',
        tags: ['html', 'advanced', 'junior', 'mid-senior']
    },
];

// Snack 1 - Filtra e Modifica
// Crea una funzione che somma due numeri.
// Crea un array (longBooks) con i libri che hanno più di 300 pagine;
// Creare un array (longBooksTitles) che contiene solo i titoli dei libri contenuti in longBooks.
// Stampa in console ogni titolo nella console.

const longBooks = books.filter(b => b.pages > 300);
const longBooksTitles = longBooks.map(b => b.title);
longBooksTitles.forEach(b => console.log(b));


// Snack 2 - Il primo libro scontato
// Creare un array (availableBooks) che contiene tutti i libri disponibili.
// Crea un array (discountedBooks) con gli availableBooks, ciascuno con il prezzo scontato del 20% (mantieni lo stesso formato e arrotonda al centesimo)
// Salva in una variabile (fullPricedBook) il primo elemento di discountedBooks che ha un prezzo intero (senza centesimi).

const availableBooks = books.filter(b => b.available === true);
const discountedBooks = availableBooks.map(b => {
    const numericPrice = parseFloat(b.price.replace('€', '').trim());
    b.discountedPrice = `${((numericPrice * 0.8).toFixed(2)).toString()}€`;
    return b;
})
console.log(discountedBooks);

const fullPricedBook = discountedBooks.find(b => {
    const numericPrice = parseFloat(b.discountedPrice.replace('€', '').trim());
    return numericPrice % 1 === 0
})
console.log(fullPricedBook);


// Snack 3 - Ordinare gli Autori
// Creare un array (authors) che contiene gli autori dei libri.
// Crea una variabile booleana (areAuthorsAdults) per verificare se gli autori sono tutti maggiorenni.
// Ordina l’array authors in base all’età, senza creare un nuovo array.
// (se areAuthorsAdult è true, ordina in ordine crescente, altrimenti in ordine decrescente)

const authors = books.map(b => b.author)
const areAuthorsAdult = authors.every(a => a.age >= 18);
console.log(areAuthorsAdult);
authors.sort((a, b) => {
    if (areAuthorsAdult === true) {
        return a.age - b.age
    } else {
        return b.age - a.age
    }
})
console.log(authors);


// Snack 4 - Calcola l’età media
// Creare un array (ages) che contiene le età degli autori dei libri.
// Calcola la somma delle età (agesSum) usando reduce.
// Stampa in console l’età media degli autori dei libri.

const ages = authors.map(a => a.age);
const agesSum = ages.reduce((acc, n) => {
    return acc + n;
}, 0);
const ageAvg = agesSum / ages.length;
console.log(ageAvg);


// Snack 5 (Bonus) - Raccogli i libri
// Nota: a differenza di quanto visto finora negli esempi, per accedere all'API utilizzare l'url base:
// http://localhost:3333
// al posto di:
// https://freetestapi.com/api/v1
// Ad esempio:
// http://localhost:3333/users
// per chiamare l'endpoint /users
// Clicca qui per la guida su come installare il Server API Locale!

// Usando la l'API https://boolean-spec-frontend.vercel.app/freetestapi/books/{id} usa la combinazione di .map() e Promise.all(), per creare una funzione (getBooks) che a partire da un array di id (ids), ritorna una promise che risolve un array di libri (books).
// Testala con l’array [2, 13, 7, 21, 19] .

async function fetchJson(url) {
    const response = await fetch(url);
    const obj = await response.json();
    return obj
}

async function getBooks() {
    try {
        const ids = [2, 13, 7, 21, 19];
        const promises = ids.map(id => {
            return fetchJson(`http://localhost:3333/books/${id}`)
        })

        const books = await Promise.all(promises);

        return books
    } catch (error) {
        throw new Error("Errore nel recupero dei dati: " + error.message)
    }
}

(async () => {
    try {
        const data = await getBooks();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
})()


// Snack 6 (Bonus) - Ordina i libri
// Crea una variabile booleana (areThereAvailableBooks) per verificare se c’è almeno un libro disponibile.
// Crea un array (booksByPrice) con gli elementi di books ordinati in base al prezzo (crescente).
// Ordina l’array booksByPricein base alla disponibilità (prima quelli disponibili), senza creare un nuovo array.





// Snack 7 (Bonus) - Analizza i tag
// Usa reduce per creare un oggetto (tagCounts) che conta quante volte ogni tag viene usato tra i libri.