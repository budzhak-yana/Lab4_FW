import BookingCard from './components/BookingCard';
import { useState, useEffect } from 'react';
import './App.css';
import BookingForm from './components/BookingForm';

function App() {
  
const [bookings, setBookings] = useState(() => {
  const savedBookings = localStorage.getItem('lashBookings');

  return savedBookings ? JSON.parse(savedBookings) : [
    {
      id: 1,
      name: 'Анна',
      service: 'Ламінування вій',
      date: '2026-11-20',
      time: '14:00',
      status: 'Очікує'
    },
    {
      id: 2,
      name: 'Марія',
      service: 'Фарбування брів',
      date: '2026-11-21',
      time: '12:00',
      status: 'Підтверджено'
    }
  ];
});


  const [name, setName] = useState('');
  const [service, setService] = useState('Ламінування вій');
  const [editingId, setEditingId] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');


const [apiClients, setApiClients] = useState([]);
const [apiLoading, setApiLoading] = useState(true);
const [apiError, setApiError] = useState('');

useEffect(() => {
  localStorage.setItem(
    'lashBookings',
    JSON.stringify(bookings)
  );
}, [bookings]);


useEffect(() => {
  async function loadClients() {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users'
      );

      if (!response.ok) {
        throw new Error('Помилка завантаження');
      }

      const data = await response.json();
      

const ukrainianClients = [
  { name: 'Софія Коваль', email: 'sofia@example.com' },
  { name: 'Анастасія Мельник', email: 'anastasia@example.com' },
  { name: 'Вікторія Шевченко', email: 'viktoria@example.com' },
];

const clients = data.slice(0, 3).map((client, index) => ({
  ...client,
  name: ukrainianClients[index].name,
  email: ukrainianClients[index].email,
}));

setApiClients(clients);


    } catch (error) {
      setApiError(error.message);
    } finally {
      setApiLoading(false);
    }
  }

  loadClients();
}, []);

 
function addBooking(event) {
  event.preventDefault();

  if (!name.trim()) return;

  if (editingId !== null) {
    setBookings(bookings.map((booking) =>
      booking.id === editingId
        ? { ...booking, name: name.trim(), service, date, time }
        : booking
    ));
    setEditingId(null);
  } else {
    setBookings([
      ...bookings,
      {
        id: Date.now(),
        name: name.trim(),
       service,
       date,
       time,
      status: 'Очікує',
      },
    ]);
  }

  setName('');
  setService('Ламінування вій');
  setDate('');
  setTime('');
}

function editBooking(booking) {
  setEditingId(booking.id);
  setName(booking.name);
  setService(booking.service);
  setDate(booking.date || '');
  setTime(booking.time || '');
}

  function deleteBooking(id) {
    setBookings(bookings.filter((booking) => booking.id !== id));
  }

 
function updateStatus(id) {
  setBookings(bookings.map((booking) => {
    if (booking.id !== id) return booking;

    let newStatus;

    if (booking.status === 'Очікує') {
      newStatus = 'Підтверджено';
    } else if (booking.status === 'Підтверджено') {
      newStatus = 'Виконано';
    } else {
      newStatus = 'Очікує';
    }

    return { ...booking, status: newStatus };
  }));
}


  return (
    <div className="app">
      <header>
        <h1>Lash Studio</h1>
        <p>Система запису клієнтів</p>
      </header>

      <main>
        
<BookingForm
  name={name}
  setName={setName}
  service={service}
  setService={setService}
  date={date}
  setDate={setDate}
  time={time}
  setTime={setTime}
  editingId={editingId}
  addBooking={addBooking}
/>


        <section className="panel">
          <h2>Записи клієнтів</h2>

          {bookings.map((booking) => (
  <BookingCard
    key={booking.id}
    booking={booking}
    editBooking={editBooking}
    deleteBooking={deleteBooking}
    updateStatus={updateStatus}
  />
))}
        </section>

<section className="panel">
  <h2>Демонстрація роботи з API</h2>

  {apiLoading && <p>Завантаження...</p>}

  {apiError && (
    <p>Помилка: {apiError}</p>
  )}

  {!apiLoading && !apiError && (
    <div>
      {apiClients.map((client) => (
        <div className="booking" key={client.id}>
          <h3>{client.name}</h3>
          <p>Email: {client.email}</p>
        </div>
      ))}
    </div>
  )}
</section>

      </main>
    </div>
  );
}

export default App;
