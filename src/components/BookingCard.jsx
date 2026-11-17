
function BookingCard({
  booking,
  editBooking,
  deleteBooking,
  updateStatus,
}) {
  return (
    <div className="booking">
      <h3>{booking.name}</h3>

      <p>{booking.service}</p>

      {booking.date && (
        <p>Дата: {booking.date}</p>
      )}

      {booking.time && (
        <p>Час: {booking.time}</p>
      )}

      <p>Статус: {booking.status}</p>

      <button onClick={() => editBooking(booking)}>
        Редагувати
      </button>

   
<button onClick={() => updateStatus(booking.id)}>
  {booking.status === 'Очікує'
    ? 'Підтвердити'
    : booking.status === 'Підтверджено'
      ? 'Виконано'
      : 'Повернути в очікування'}
</button>


      <button
        className="delete"
        onClick={() => deleteBooking(booking.id)}
      >
        Видалити
      </button>
    </div>
  );
}

export default BookingCard;
